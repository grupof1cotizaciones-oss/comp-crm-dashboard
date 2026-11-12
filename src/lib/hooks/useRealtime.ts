'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { RealTimeUpdate, WebSocketMessage } from '@/types';

type EventHandler = (update: RealTimeUpdate) => void;

interface UseRealtimeOptions {
  onLeadUpdate?: (update: RealTimeUpdate) => void;
  onFactRecorded?: (update: RealTimeUpdate) => void;
  onActivity?: (update: RealTimeUpdate) => void;
  onLeadMove?: (update: RealTimeUpdate) => void;
  enabled?: boolean;
}

export function useRealtime(options: UseRealtimeOptions = {}) {
  const { onLeadUpdate, onFactRecorded, onActivity, onLeadMove, enabled = true } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<RealTimeUpdate | null>(null);

  const handlers = useRef({
    onLeadUpdate: options.onLeadUpdate,
    onFactRecorded: options.onFactRecorded,
    onActivity: options.onActivity,
    onLeadMove: options.onLeadMove,
  });

  useEffect(() => {
    handlers.current = {
      onLeadUpdate: options.onLeadUpdate,
      onFactRecorded: options.onFactRecorded,
      onActivity: options.onActivity,
      onLeadMove: options.onLeadMove,
    };
  }, [options.onLeadUpdate, options.onFactRecorded, options.onActivity, options.onLeadMove]);

  const connect = useCallback(() => {
    if (!enabled) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `wss://${window.location.host}/api/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('[WebSocket] Connected');
      setIsConnected(true);
      reconnectAttempts.current = 0;

      // Subscribe to channels
      const msg: WebSocketMessage = {
        type: 'subscribe',
        channel: 'leads',
      };
      ws.send(JSON.stringify(msg));
    };

    ws.onmessage = (event) => {
      try {
        const data: RealTimeUpdate = JSON.parse(event.data);
        setLastEvent(data);

        switch (data.type) {
          case 'lead_updated':
            handlers.current.onLeadUpdate?.(data);
            break;
          case 'lead_moved':
            handlers.current.onLeadMove?.(data);
            break;
          case 'fact_recorded':
            handlers.current.onFactRecorded?.(data);
            break;
          case 'activity':
            handlers.current.onActivity?.(data);
            break;
        }
      } catch (err) {
        console.error('WebSocket message parse error:', err);
      }
    };

    ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
      setIsConnected(false);
      
      if (enabled && reconnectAttempts.current < 5) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current++;
          connect();
        }, delay);
      }
    };

    ws.onerror = (error) => {
      console.error('[WebSocket] Error:', error);
    };

    wsRef.current = ws;
  }, [enabled]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => disconnect();
  }, [enabled, connect, disconnect]);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  const subscribe = useCallback((channel: string) => {
    sendMessage({ type: 'subscribe', channel });
  }, [sendMessage]);

  const unsubscribe = useCallback((channel: string) => {
    sendMessage({ type: 'unsubscribe', channel });
  }, [sendMessage]);

  return {
    isConnected,
    lastEvent,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    sendMessage,
  };
}

export function useRealtimeLeadUpdates(leadId: string, onUpdate: (data: any) => void) {
  const { isConnected, lastEvent } = useRealtime({
    onLeadUpdate: (update) => {
      if (update.payload?.leadId === leadId) {
        onUpdate(update.payload);
      }
    },
    enabled: !!leadId,
  });

  return { isConnected, lastEvent };
}