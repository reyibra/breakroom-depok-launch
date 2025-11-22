import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeConfig {
  table: 'news' | 'promos' | 'reviews';
  filter?: string;
  onUpdate: () => void;
}

/**
 * Centralized realtime subscription hook
 * Consolidates multiple WebSocket connections into a single channel
 * to reduce bandwidth usage and prevent channel errors
 */
export const useRealtimeSubscription = (configs: RealtimeConfig[]) => {
  useEffect(() => {
    // Create a single channel for all subscriptions
    const channel = supabase.channel('unified-realtime-updates');

    // Subscribe to all tables in one channel
    configs.forEach(({ table, filter, onUpdate }) => {
      // Listen to INSERT events
      channel.on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table,
          ...(filter && { filter }),
        },
        () => {
          console.log(`📡 [${table}] New item inserted`);
          onUpdate();
        }
      );

      // Listen to UPDATE events
      channel.on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table,
          ...(filter && { filter }),
        },
        () => {
          console.log(`📡 [${table}] Item updated`);
          onUpdate();
        }
      );

      // Listen to DELETE events
      channel.on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table,
        },
        () => {
          console.log(`📡 [${table}] Item deleted`);
          onUpdate();
        }
      );
    });

    // Subscribe once for all tables
    channel.subscribe((status, err) => {
      if (err) {
        console.error('❌ Unified subscription error:', err);
      } else {
        console.log('📡 Unified subscription status:', status);
      }
    });

    // Cleanup: remove the single channel
    return () => {
      console.log('📡 Unsubscribing from unified channel');
      supabase.removeChannel(channel);
    };
  }, [configs]);
};
