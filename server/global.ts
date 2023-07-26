import { TypedDoc, TypedMap } from "yjs-types";

export type BattlePlayer = { id: string; name: string; hp: number; mp: number };
export type Battle = { started_at: number; p1: BattlePlayer; p2: BattlePlayer };

const GLOBAL = {
  players: {} as Record<
    string,
    { id: string; name: string; battle_id: string }
  >,
  battles: {} as Record<string, TypedDoc<{ map: TypedMap<Battle> }>>,
  conns: new WeakMap<WebSocket, string>(),
};
export const g = global as unknown as typeof GLOBAL;
if (!g.conns) {
  for (const [k, v] of Object.entries(GLOBAL)) {
    (g as any)[k] = v;
  }
}
