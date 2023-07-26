import { open } from "lmdb";
import { TypedDoc, TypedMap } from "yjs-types";

export type BattlePlayer = {
  id: string;
  name: string;
  hp: number;
  mp: number;
  seq: BattleSeq[];
  spell: BattleSpell[];
};

export type BattleSpell = {
  id: string;
  start_cast: number;
  end_cast: number;
};

export type BattleSeq = { id: "fire" } | { id: "earth" } | { id: "water" };
export type Battle = { tick: number; p1: BattlePlayer; p2: BattlePlayer };

const GLOBAL = {
  players: {} as Record<
    string,
    { id: string; name: string; battle_id: string }
  >,
  battles: {} as Record<string, TypedDoc<{ map: TypedMap<Battle> }>>,
  conns: new WeakMap<WebSocket, string>(),
  db: {
    player: open({ path: "data/player.lmdb", compression: true }),
    battle: open({ path: "data/batte.lmdb", compression: true }),
  },
};

export const g = global as unknown as typeof GLOBAL;

if (!g.conns) {
  for (const [k, v] of Object.entries(GLOBAL)) {
    (g as any)[k] = v;
  }
}
