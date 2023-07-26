import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { watch } from "fs";
import { readAsync, removeAsync, writeAsync } from "fs-jetpack";
import { readdir } from "fs/promises";
import { route } from "./server/boot";
import { wsRoute } from "./server/ws";

const buildReact = async () => {
  await removeAsync("build");
  await Bun.build({
    entrypoints: ["./client/index.tsx"],
    outdir: "./build",
    minify: true,
    sourcemap: "external",
  });
  await Bun.build({
    entrypoints: ["./client/exports.tsx"],
    outdir: "./build",
    sourcemap: "external",
    minify: true,
    define: { "process.env.NODE_ENV": '"production"' },
    external: ["react", "react-dom"],
    plugins: [
      globalExternals({
        react: {
          varName: "window.React",
          type: "cjs",
        },
        "react/jsx-dev-runtime": {
          varName: "{...window.JSXRuntime, jsxDEV: window.JSXRuntime.jsx}",
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
  });

  const res = await readdir("build");
  res.forEach(async (e) => {
    if (e.startsWith("index") && e.endsWith(".css")) {
      let index = await readAsync("public/index.html");
      if (index) {
        index = replaceBetween(
          index,
          `<!--css:start-->`,
          `<!--css:end-->`,
          `<link rel="stylesheet" href="/${e}">`
        );
        await writeAsync("public/index.html", index);
      }
    }
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

const replaceBetween = function (
  str: string,
  start: string,
  end: string,
  what: string
) {
  const start_idx = str.indexOf(start) + start.length;
  const end_idx = str.indexOf(end);
  return str.substring(0, start_idx) + what + str.substring(end_idx);
};
