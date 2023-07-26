import { WebSocketHandler } from "bun";
import { g } from "./global";

export const wsRoute: WebSocketHandler = {
  open(ws) {
    console.log("connected");
  },
  message(ws, message) {},
};
