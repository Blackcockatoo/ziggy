"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

const tickLength = 30_000;
const CounterTimeContext = createContext<number | null>(null);

const getClientSnapshot = () => Math.floor(Date.now() / tickLength) * tickLength;
const getServerSnapshot = () => null;

function subscribe(onStoreChange: () => void) {
  const interval = window.setInterval(onStoreChange, tickLength);
  return () => window.clearInterval(interval);
}

/** One inexpensive browser clock shared by every current-data Counter module. */
export function CounterTimeProvider({ children }: { children: ReactNode }) {
  const now = useSyncExternalStore<number | null>(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  return <CounterTimeContext.Provider value={now}>{children}</CounterTimeContext.Provider>;
}

export function useCounterTime(): Date | null {
  const value = useContext(CounterTimeContext);
  return value === null ? null : new Date(value);
}
