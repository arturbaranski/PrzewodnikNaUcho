import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profile = mkdtempSync(path.join(tmpdir(), "malta-guide-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  `--user-data-dir=${profile}`,
  "--remote-debugging-port=9223",
  "http://localhost:8787",
], { stdio: "ignore" });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function debuggerUrl() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch("http://127.0.0.1:9223/json");
      const tabs = await res.json();
      const page = tabs.find((tab) => tab.type === "page" && tab.url.includes("8787"));
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
    await sleep(250);
  }
  throw new Error("Chrome debug port did not open");
}

const ws = new WebSocket(await debuggerUrl());
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve);
  ws.addEventListener("error", reject);
});

let seq = 0;
const pending = new Map();
const logs = [];
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  } else if (message.method === "Runtime.consoleAPICalled") {
    logs.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
  } else if (message.method === "Runtime.exceptionThrown") {
    logs.push(`EXC ${message.params.exceptionDetails.text}`);
  }
});

function send(method, params = {}) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve) => pending.set(id, resolve));
}

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  mobile: true,
});
await sleep(600);

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.result.exceptionDetails) {
    throw new Error(result.result.exceptionDetails.text + " " + (result.result.result?.description || ""));
  }
  return result.result.result.value;
}

function click(selector) {
  return evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
}

const checks = [];
function check(name, ok, detail = "") {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "OK" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
}

check("welcome", (await evaluate("document.querySelector('h2')?.textContent")) === "Telefon opowie, gdy podejdziesz.");
const welcomeShot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync("preview-welcome.png", Buffer.from(welcomeShot.result.data, "base64"));
await evaluate("document.querySelector('main').scrollTop = document.querySelector('main').scrollHeight");
await sleep(200);
const bottomShot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync("preview-bottom.png", Buffer.from(bottomShot.result.data, "base64"));
const lastFullyVisible = await evaluate(`(() => {
  const card = document.querySelector('.samples button:last-child');
  const nav = document.querySelector('nav');
  const cardBox = card.getBoundingClientRect();
  const navBox = nav.getBoundingClientRect();
  return cardBox.bottom <= navBox.top + 1;
})()`);
check("last sample sits above the navigation", lastFullyVisible);
await click('[data-view="list"]');
await sleep(200);
const count = await evaluate("document.querySelectorAll('button.place').length");
check("list has every place", count === 65, String(count));
await evaluate(`{
  const input = document.querySelector('#search');
  input.value = 'Mdina';
  input.dispatchEvent(new Event('input', { bubbles: true }));
}`);
await sleep(200);
const filtered = await evaluate("document.querySelectorAll('button.place').length");
check("search Mdina narrows the list", filtered > 0 && filtered < count, String(filtered));
await click('[data-id="mdina-bastion"]');
await sleep(200);
check("sheet opens", await evaluate("!document.querySelector('#sheet').hidden"));
check("story is on the sheet", (await evaluate("document.querySelector('#sheet').innerText")).includes("murach"));
const spoken = await evaluate(`(() => {
  document.querySelector('[data-action="simulate"]').click();
  const player = document.querySelector('#player');
  return { hidden: player.hidden, text: player.innerText };
})()`);
await sleep(300);
const now = await evaluate("document.querySelector('main').innerText");
check("simulation says you arrived", now.includes("W zasięgu opowieści") && now.includes("Mury Mdiny"));
const heard = spoken.hidden === false || now.includes("Nie udało się czytać");
check("story is read or the voice problem is explained", heard, JSON.stringify(spoken));
if (await evaluate("!!document.querySelector('[data-action=\"stop-speech\"]')")) {
  await click('[data-action="stop-speech"]');
}
await click('[data-view="map"]');
await sleep(800);
check("map container exists", await evaluate("!!document.querySelector('#map') && !!window.L"));
const mapOk = await evaluate("!!document.querySelector('.leaflet-container')");
check("leaflet attached", mapOk);
await click('[data-view="settings"]');
await sleep(200);
const settings = await evaluate("document.querySelector('main').innerText");
check("settings explain the Samsung voice", settings.includes("Synteza mowy") && settings.includes("Samsung"));
check("no console exceptions", !logs.some((line) => line.startsWith("EXC")), logs.join(" | "));
await click('[data-view="now"]');
await sleep(300);
const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync("preview-phone.png", Buffer.from(shot.result.data, "base64"));

ws.close();
chrome.kill();
const failed = checks.filter((item) => !item.ok);
if (failed.length) {
  console.log("FAILED", failed.map((item) => item.name).join(", "));
  process.exit(1);
}
console.log("ALL CHECKS PASSED");
