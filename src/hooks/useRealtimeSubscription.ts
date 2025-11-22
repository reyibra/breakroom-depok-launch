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
        onUpdate
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
        onUpdate
      );

      // Listen to DELETE events
      channel.on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table,
        },
        onUpdate
      );
    });

    // Subscribe once for all tables
    channel.subscribe();

    // Cleanup: remove the single channel
    return () => {
      supabase.removeChannel(channel);
    };
  }, [configs]);
};
