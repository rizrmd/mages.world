import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { watch } from "fs";
import { route } from "./server/server";
import { wsRoute } from "./server/ws";

const buildReact = async () => {
  await Bun.build({
    entrypoints: ["./client/index.tsx"],
    outdir: "./build",
    minify: true,
    sourcemap: "external",
  });
  await Bun.build({
    entrypoints: ["./client/exports.tsx"],
    outdir: "./build",
    // minify: true,
    external: ["react", "react-dom"],
    plugins: [
      globalExternals({
        react: {
          varName: "window.React",
          type: "cjs",
        },
        "react/jsx-dev-runtime": {
          varName: "window.JSXDevRuntime",
          type: "cjs",
        },
        "react/jsx-runtime": {
          varName: "window.JSXRuntime",
          type: "cjs",
        },
        "react-dom/server": {
          varName: "window.ReactDOMServer",
          type: "cjs",
        },
        "react-dom": {
          varName: "window.ReactDOM",
          type: "cjs",
        },
      }),
    ],
    // sourcemap: "external",
  });
};
watch("./client", {
  recursive: true,
  persistent: true,
}).on("change", async () => {
  buildReact();
});
await buildReact();

const server = Bun.serve({
  fetch: route,
  websocket: wsRoute,
});

console.log(`Listening on http://localhost:${server.port}`);
