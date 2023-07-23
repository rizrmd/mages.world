import { statSync, watch } from "fs";
import * as path from "path";

const PROJECT_ROOT = import.meta.dir;
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, "public");
const BUILD_DIR = path.resolve(PROJECT_ROOT, "build");

const buildReact = async () => {
  await Bun.build({
    entrypoints: ["./src/index.tsx"],
    outdir: "./build",
    minify: true,
    sourcemap: "external",
  });
  await Bun.build({
    entrypoints: ["./src/exports.tsx"],
    outdir: "./build",
    minify: true,
    sourcemap: "external",
  });
};
watch("./src", {
  recursive: true,
  persistent: true,
}).on("change", async () => {
  buildReact();
});
await buildReact();

function serveFromDir(config: {
  directory: string;
  path: string;
}): Response | null {
  let basePath = path.join(config.directory, config.path);
  const suffixes = ["", ".html", "index.html"];

  for (const suffix of suffixes) {
    try {
      const pathWithSuffix = path.join(basePath, suffix);
      const stat = statSync(pathWithSuffix);
      if (stat && stat.isFile()) {
        const headers = new Headers();
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        headers.set(
          "Access-Control-Allow-Headers",
          "x-access-token,content-type"
        );
        return new Response(Bun.file(pathWithSuffix), {
          headers,
        });
      }
    } catch (err) {}
  }

  return null;
}

const server = Bun.serve({
  fetch(request) {
    let reqPath = new URL(request.url).pathname;
    if (reqPath === "/") reqPath = "/index.html";

    // check public
    const publicResponse = serveFromDir({
      directory: PUBLIC_DIR,
      path: reqPath,
    });
    if (publicResponse) return publicResponse;

    // check /.build
    const buildResponse = serveFromDir({ directory: BUILD_DIR, path: reqPath });
    if (buildResponse) return buildResponse;

    return new Response(Bun.file(path.join(PUBLIC_DIR, "index.html")), {
      status: 200,
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
