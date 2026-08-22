/**
 * The Ask Ziggy machine's states.
 *
 * The cabinet is a physical object, so it moves through a sequence rather than
 * showing a spinner: it wakes, it thinks, it prints, and then the ticket is on
 * the tray. `data-machine-state` carries this to CSS and to the tests.
 */
export type MachineState =
  | "idle"
  | "waking"
  | "thinking"
  | "issuing"
  | "revealed";

export const machineStates: MachineState[] = [
  "idle",
  "waking",
  "thinking",
  "issuing",
  "revealed",
];

/** What the live region says while the machine is working. */
export const machineStatus: Record<MachineState, string> = {
  idle: "",
  waking: "The machine is waking up.",
  thinking: "Ziggy is thinking.",
  issuing: "Printing your ticket.",
  revealed: "",
};

/**
 * Milliseconds spent in each state before advancing.
 *
 * Deliberately short: this is a mechanism doing something, not a loading
 * screen. Under reduced motion the whole sequence is skipped and the ticket is
 * shown immediately — see `useMachineSequence`.
 */
export const stateDurations: Record<Exclude<MachineState, "idle" | "revealed">, number> = {
  waking: 600,
  thinking: 700,
  issuing: 480,
};

/**
 * The sequence for one pull of the lever.
 *
 * The first pull wakes the cabinet; later pulls skip straight to thinking,
 * because by then the machine is already awake.
 */
export function sequenceFor(firstPull: boolean): Array<keyof typeof stateDurations> {
  return firstPull ? ["waking", "thinking", "issuing"] : ["thinking", "issuing"];
}
