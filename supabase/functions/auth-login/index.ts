import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.83.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION_MINUTES = 15

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()

    // Get client IP address
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown'

    console.log('Login attempt from IP:', clientIp)

    // Create Supabase client with service role for rate limit checks
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Check rate limits
    const { data: rateLimit, error: rateLimitError } = await supabaseAdmin
      .from('rate_limits')
      .select('*')
      .eq('identifier', clientIp)
      .eq('action', 'login')
      .single()

    if (!rateLimitError && rateLimit) {
      const windowStart = new Date(rateLimit.window_start)
      const now = new Date()
      const minutesSinceWindowStart = (now.getTime() - windowStart.getTime()) / (1000 * 60)

      // Check if still in lockout period
      if (rateLimit.attempts >= MAX_ATTEMPTS && minutesSinceWindowStart < LOCKOUT_DURATION_MINUTES) {
        const remainingMinutes = Math.ceil(LOCKOUT_DURATION_MINUTES - minutesSinceWindowStart)
        console.log(`IP ${clientIp} is locked out for ${remainingMinutes} more minutes`)
        
        return new Response(
          JSON.stringify({ 
            error: 'Too many failed login attempts. Please try again later.',
            remainingMinutes,
            locked: true
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Reset if window has expired
      if (minutesSinceWindowStart >= LOCKOUT_DURATION_MINUTES) {
        await supabaseAdmin
          .from('rate_limits')
          .update({ 
            attempts: 0, 
            window_start: now.toISOString(),
            last_attempt: now.toISOString()
          })
          .eq('id', rateLimit.id)
      }
    }

    // Attempt login with anon key (user-facing)
    const supabaseAnonKey = Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.log('Login failed for IP:', clientIp, 'Error:', authError.message)
      
      // Increment failed attempts
      if (rateLimit) {
        const newAttempts = rateLimit.attempts + 1
        await supabaseAdmin
          .from('rate_limits')
          .update({ 
            attempts: newAttempts,
            last_attempt: new Date().toISOString()
          })
          .eq('id', rateLimit.id)

        // Check if this puts them into lockout
        if (newAttempts >= MAX_ATTEMPTS) {
          return new Response(
            JSON.stringify({ 
              error: `Too many failed attempts. Account locked for ${LOCKOUT_DURATION_MINUTES} minutes.`,
              remainingAttempts: 0,
              locked: true
            }),
            { 
              status: 429,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        return new Response(
          JSON.stringify({ 
            error: authError.message,
            remainingAttempts: MAX_ATTEMPTS - newAttempts
          }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      } else {
        // Create new rate limit entry
        await supabaseAdmin
          .from('rate_limits')
          .insert({
            identifier: clientIp,
            action: 'login',
            attempts: 1,
            window_start: new Date().toISOString(),
            last_attempt: new Date().toISOString()
          })

        return new Response(
          JSON.stringify({ 
            error: authError.message,
            remainingAttempts: MAX_ATTEMPTS - 1
          }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    // Login successful - clear rate limit
    console.log('Login successful for IP:', clientIp)
    if (rateLimit) {
      await supabaseAdmin
        .from('rate_limits')
        .delete()
        .eq('id', rateLimit.id)
    }

    return new Response(
      JSON.stringify({ 
        session: authData.session,
        user: authData.user
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in auth-login function:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
