'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRealtime } from '@/lib/hooks/useRealtime';
import type { RealTimeUpdate } from '@/types';

interface RealTimeContextType {
  isConnected: boolean;
  lastEvent: any;
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
}

const RealTimeContext = createContext<RealTimeContextType | null>(null);

export function RealTimeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const realtime = useRealtime({
    enabled: true,
    onLeadUpdate: (update) => console.log('Lead updated:', update),
    onFactRecorded: (update) => console.log('Fact recorded:', update),
    onActivity: (update) => console.log('Activity:', update),
    onLeadMove: (update) => console.log('Lead moved:', update),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <RealTimeContext.Provider value={{
      isConnected: realtime.isConnected,
      lastEvent: realtime.lastEvent,
      subscribe: realtime.subscribe,
      unsubscribe: realtime.unsubscribe,
    }}>
      {children}
    </RealTimeContext.Provider>
  );
}

export function useRealTime() {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
}