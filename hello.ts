import { serve } from "./deps.ts";
const hostname = "0.0.0.0";
const port = 8080;
const s = serve({ port: port});

const body = new TextEncoder().encode("Hello World\n");
console.log(`Listening on ${hostname}:${port}`);

for await ( const req of s) {
  req.respond({ body });
}