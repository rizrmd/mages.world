import { useLocal } from "../prasi";

export const Connection = () => {
  const local = useLocal({
    ws: null as null | WebSocket,
    status: "disconnected" as "disconnected" | "connecting" | "connected",
  });

  if (!local.ws) {
    local.status = "connecting";
    const connect = () => {
      const shouldRender = !!local.ws;
      local.status = "connecting";
      local.ws = new WebSocket(`ws://localhost:3000`);
      if (shouldRender) {
        local.render();
      }
      local.ws.onopen = () => {
        local.status = "connected";
        setTimeout(() => {
          local.render();
        });
      };
      local.ws.onclose = () => {
        local.status = "disconnected";
        local.render();
        setTimeout(() => {
          connect();
          local.render();
        }, 2000);
      };
    };
    connect();
  }

  return (
    <div
      className={cx(
        css`
          width: 10px;
          height: 10px;
          color: white;
        `,
        local.status === "connected" &&
          css`
            background: green;
          `,
        local.status === "disconnected" &&
          css`
            background: red;
          `,
        local.status === "connecting" &&
          css`
            background: yellow;
          `
      )}
      onPointerDown={() => {
        console.log("auoa");
      }}
    ></div>
  );
};
