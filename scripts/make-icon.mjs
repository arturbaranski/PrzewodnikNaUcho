import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function png(size, paint) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = paint(x, y, size);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }
  const idat = zlib.deflateSync(raw);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc(Buffer.concat([Buffer.from(type), data])), 8 + data.length);
  return out;
}

function crc(buf) {
  let c = ~0;
  for (const byte of buf) {
    c ^= byte;
    for (let k = 0; k < 8; k += 1) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function paint(x, y, size) {
  const px = (x + 0.5) / size;
  const py = (y + 0.5) / size;
  const dx = px - 0.5;
  const dy = py - 0.5;
  const sand = [243, 238, 230, 255];
  const sea = [20, 54, 66, 255];
  const terra = [141, 61, 36, 255];
  const inRounded = Math.abs(dx) < 0.38 && Math.abs(dy) < 0.38
    || (Math.abs(dx) - 0.28) ** 2 + (Math.abs(dy) - 0.28) ** 2 < 0.1 ** 2;
  if (!inRounded) return sand;
  const archX = Math.abs(dx);
  const archY = py - 0.34;
  const onArch = archY > 0 && archX < 0.16 && Math.hypot(dx / 0.16, (py - 0.58) / 0.28) > 0.78 && py < 0.72;
  const post = py > 0.46 && py < 0.74 && archX > 0.145 && archX < 0.19;
  if (onArch || post) return sand;
  const dot = Math.hypot(dx, py - 0.46) < 0.035;
  if (dot) return terra;
  return sea;
}

fs.mkdirSync("icons", { recursive: true });
fs.writeFileSync(path.join("icons", "icon-192.png"), png(192, paint));
fs.writeFileSync(path.join("icons", "icon-512.png"), png(512, paint));
console.log("icons ready");
