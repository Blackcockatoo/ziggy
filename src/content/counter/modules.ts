import type { CounterModuleConfig } from "./types";

/** Public order and visibility for the everyday Counter. */
export const counterModules = [
  { id: "shop-status", enabled: true, size: "full" },
  { id: "today-board", enabled: true, size: "narrow" },
  { id: "world-clocks", enabled: true, size: "wide" },
  { id: "ziggy-daily", enabled: true, size: "narrow" },
  { id: "remember-this", enabled: true, size: "wide" },
  { id: "useful-links", enabled: true, size: "full" },
] as const satisfies readonly CounterModuleConfig[];
