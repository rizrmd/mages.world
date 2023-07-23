import * as automerge from "@automerge/automerge";

const GLOBAL = {
  players: {} as Record<
    string,
    { id: string; name: string; battle_id: string }
  >,
  battles: {} as Record<string, string>,
  conns: new WeakMap<WebSocket, string>(),
};
export const g = global as unknown as typeof GLOBAL;
if (!g.conns) {
  for (const [k, v] of Object.entries(GLOBAL)) {
    (g as any)[k] = v;
  }
}
