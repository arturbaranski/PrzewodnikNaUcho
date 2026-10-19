import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DESTINATIONS } from "./js/destinations.js";
import { loadSupplement } from "./js/more-web.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const port = Number(process.env.PORT || 8787);

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function findPlace(destinationId, placeId) {
  const destinations = destinationId
    ? DESTINATIONS.filter((item) => item.id === destinationId)
    : DESTINATIONS;
  const matches = [];
  for (const destination of destinations) {
    const place = destination.places.find((item) => item.id === placeId);
    if (place) matches.push({ destinationId: destination.id, place });
  }
  return matches.length === 1 ? matches[0] : null;
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (req.method === "POST" && urlPath === "/api/wiecej") {
    try {
      const body = JSON.parse(await readBody(req) || "{}");
      const destinationId = typeof body.destination === "string" ? body.destination : "";
      const placeId = typeof body.id === "string" ? body.id : "";
      const found = placeId ? findPlace(destinationId, placeId) : null;
      if (!found) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "nie ma takiego miejsca" }));
        return;
      }
      const started = performance.now();
      const extra = await loadSupplement(found.place, found.destinationId);
      const ms = Math.round(performance.now() - started);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ms, ...extra }));
    } catch (error) {
      console.error(error);
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Wikipedia nie odpowiedziała. Spróbuj jeszcze raz za chwilę." }));
    }
    return;
  }
  const rel = urlPath === "/" ? "/index.html" : urlPath;
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("no");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Przewodnik na ucho: http://localhost:${port}`);
});
