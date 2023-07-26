import { Server } from "bun";
import { statSync } from "fs";
import * as path from "path";

const PROJECT_ROOT = path.join(import.meta.dir, "..");
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, "public");
const BUILD_DIR = path.resolve(PROJECT_ROOT, "build");

export const route = (req: Request, server: Server) => {
  let reqPath = new URL(req.url).pathname;
  if (reqPath === "/") reqPath = "/index.html";

  if (reqPath === "/ws" && server.upgrade(req)) {
    return; // do not return a Response
  }

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
};

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
