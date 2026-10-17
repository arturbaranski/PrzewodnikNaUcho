import { DESTINATIONS } from "./destinations.js";
import { chooseTarget, nearestPlace, formatDistance, canRepeat, distanceMeters } from "./engine.js";

const SETTINGS_KEY = "przewodnik-na-ucho-settings";
const SPOKEN_KEY = "przewodnik-na-ucho-spoken";
const LEGACY_SETTINGS_KEY = "malta-na-ucho-settings";
const LEGACY_SPOKEN_KEY = "malta-na-ucho-spoken";

const state = {
  view: "now",
  tracking: false,
  preview: false,
  watchId: null,
  pos: null,
  gps: "off",
  gpsDetail: "",
  lockedId: null,
  nearestId: null,
  speakingId: null,
  pendingId: null,
  chunks: [],
  chunkIndex: 0,
  sheetId: null,
  query: "",
  island: "all",
  voices: [],
  installEvent: null,
  wakeLock: null,
  map: null,
  userMarker: null,
  mapCentered: false,
};

const settings = loadSettings();
const spokenAt = loadSpoken();

function loadSettings() {
  const defaults = {
    autoplay: true,
    rate: 1,
    radiusScale: 1,
    repeatMode: "visit",
    keepAwake: true,
    vibrate: true,
    voiceURI: "",
    voicePinned: false,
    destination: "",
  };
  try {
    const raw = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem(LEGACY_SETTINGS_KEY);
    const saved = { ...defaults, ...JSON.parse(raw || "{}") };
    if (saved.rate === 0.92) saved.rate = 1;
    return saved;
  } catch {
    return defaults;
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  localStorage.removeItem(LEGACY_SETTINGS_KEY);
}

function loadSpoken() {
  try {
    const raw = localStorage.getItem(SPOKEN_KEY) || localStorage.getItem(LEGACY_SPOKEN_KEY);
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

function saveSpoken() {
  localStorage.setItem(SPOKEN_KEY, JSON.stringify(spokenAt));
  localStorage.removeItem(LEGACY_SPOKEN_KEY);
}

function currentDestination() {
  return DESTINATIONS.find((item) => item.id === settings.destination) || null;
}

function currentPlaces() {
  const destination = currentDestination();
  return destination ? destination.places : [];
}

function placeById(id) {
  return currentPlaces().find((place) => place.id === id) || null;
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function paragraphs(text) {
  return text.split(/\n\n+/).map((part) => `<p>${esc(part)}</p>`).join("");
}

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function islandClass(island) {
  if (island === "gozo" || island === "fabryki" || island === "parki") return "gozo";
  if (island === "comino" || island === "deptak" || island === "stare") return "comino";
  if (island === "miasto" || island === "waly") return "miasto";
  if (island === "pamiec") return "pamiec";
  return "malta";
}

function visiblePlaces() {
  const q = normalize(state.query.trim());
  return currentPlaces().filter((place) => {
    if (state.island !== "all" && place.island !== state.island) return false;
    if (!q) return true;
    return normalize(`${place.name} ${place.area} ${place.speech}`).includes(q);
  });
}

function sortedPlaces() {
  const items = visiblePlaces();
  if (!state.pos) return items;
  return items
    .map((place) => ({ place, d: nearestDistance(place) }))
    .sort((a, b) => a.d - b.d)
    .map((item) => item.place);
}

function nearestDistance(place) {
  if (!state.pos) return Infinity;
  const nearest = nearestPlace([place], state.pos.lat, state.pos.lng);
  return nearest ? nearest.d : Infinity;
}

function polishVoices() {
  return state.voices.filter((voice) => (voice.lang || "").toLowerCase().startsWith("pl"));
}

function isGooglePolish(voice) {
  const name = (voice.name || "").toLowerCase();
  const lang = (voice.lang || "").toLowerCase().replaceAll("_", "-");
  const uri = (voice.voiceURI || "").toLowerCase();
  const google = name.includes("google") || uri.includes("google");
  const polish = lang.startsWith("pl") || name.includes("polski") || name.includes("polish");
  return google && polish;
}

function googlePolishVoice(voices) {
  const found = voices.filter(isGooglePolish);
  return found.find((voice) => (voice.lang || "").toLowerCase().replaceAll("_", "-") === "pl-pl") || found[0] || null;
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length) state.voices = voices;
}

function selectedVoice() {
  refreshVoices();
  const voices = state.voices;
  const google = googlePolishVoice(voices);
  if (!settings.voicePinned && google) return google;
  if (settings.voiceURI) {
    const chosen = voices.find((voice) => voice.voiceURI === settings.voiceURI);
    if (chosen) return chosen;
  }
  if (google) return google;
  const polish = polishVoices();
  return polish.find((voice) => (voice.lang || "").toLowerCase().replaceAll("_", "-") === "pl-pl") || polish[0] || null;
}

function secureContext() {
  return window.isSecureContext;
}

function setStatus(mode, text, extra = "") {
  const el = document.getElementById("status");
  el.className = `status ${mode}`;
  el.innerHTML = `<span><i class="dot"></i>${esc(text)}</span><span>${esc(extra)}</span>`;
}

function renderStatus() {
  if (!secureContext()) {
    setStatus("bad", "Brak GPS na tej stronie", "potrzebny https");
    return;
  }
  if (state.preview) {
    setStatus("bad", "Podgląd bez prawdziwego GPS", state.pos ? `±${Math.round(state.pos.accuracy)} m` : "");
    return;
  }
  if (state.gps === "searching") setStatus("", "Szukam sygnału GPS…", "");
  else if (state.gps === "live") setStatus("live", "GPS działa", state.pos ? `±${Math.round(state.pos.accuracy)} m` : "");
  else if (state.gps === "weak") setStatus("bad", "Słaby sygnał GPS", state.pos ? `±${Math.round(state.pos.accuracy)} m` : "");
  else if (state.gps === "denied") setStatus("bad", "Brak zgody na lokalizację", "możesz słuchać z listy");
  else if (state.gps === "unsupported") setStatus("bad", "Ten telefon nie podał GPS", "");
  else setStatus("", "GPS wyłączony", state.tracking ? "" : "przewodnik czeka");
}

function renderNav() {
  document.querySelectorAll("nav button").forEach((button) => {
    button.classList.toggle("on", button.dataset.view === state.view);
  });
}

function renderPlayer() {
  const el = document.getElementById("player");
  if (!state.speakingId) {
    el.hidden = true;
    el.innerHTML = "";
    return;
  }
  const place = placeById(state.speakingId);
  const title = place ? place.name : "Przewodnik";
  el.hidden = false;
  el.innerHTML = `<p><b>${esc(title)}</b><span>Czytam na głos</span></p><button type="button" data-action="stop-speech">Stop</button>`;
}

function render() {
  renderBrand();
  renderStatus();
  renderNav();
  renderPlayer();
  const main = document.getElementById("main");
  const focus = document.activeElement;
  const search = focus && focus.id === "search" ? { start: focus.selectionStart, end: focus.selectionEnd } : null;
  if (!currentDestination()) {
    main.innerHTML = renderPicker();
    return;
  }
  if (state.view === "now") main.innerHTML = renderNow();
  else if (state.view === "list") main.innerHTML = renderList();
  else if (state.view === "map") main.innerHTML = renderMap();
  else main.innerHTML = renderSettings();
  if (search) {
    const field = document.getElementById("search");
    if (field) {
      field.focus();
      field.setSelectionRange(search.start, search.end);
    }
  }
  if (state.view === "map") requestAnimationFrame(showMap);
}

function renderBrand() {
  const destination = currentDestination();
  const title = document.getElementById("brand-title");
  const sub = document.getElementById("brand-sub");
  const change = document.getElementById("change-destination");
  const name = destination ? destination.title : "Przewodnik na ucho";
  if (title) title.textContent = name;
  if (sub) sub.textContent = destination ? destination.subtitle : "Wybierz kierunek";
  if (change) change.hidden = !destination;
  document.title = name;
}

function renderPicker() {
  return `
    <section class="hero">
      <h2>Dokąd jedziesz?</h2>
      <p class="lede">Wybierz przewodnik. Nazwa w nagłówku zmieni się razem z miejscem, a opowieści będą o tym jednym kierunku.</p>
    </section>
    <div class="destinations">
      ${DESTINATIONS.map((item) => `<button type="button" data-action="destination" data-id="${item.id}"><b>${esc(item.title)}</b><span>${esc(item.blurb)}</span></button>`).join("")}
    </div>
  `;
}

function farBanner() {
  const destination = currentDestination();
  if (!destination || !state.pos) return "";
  const [lat, lng] = destination.center;
  if (distanceMeters(state.pos.lat, state.pos.lng, lat, lng) < 40000) return "";
  return `<div class="banner">Jesteś daleko od tego przewodnika. Stuknij Zmień i wybierz kierunek, w którym naprawdę stoisz.</div>`;
}

function renderNow() {
  if (!state.tracking && !state.pos) return renderWelcome();
  const places = currentPlaces();
  const nearest = state.pos ? nearestPlace(places, state.pos.lat, state.pos.lng) : null;
  const choice = state.pos
    ? chooseTarget(places, state.pos.lat, state.pos.lng, state.pos.accuracy, state.lockedId, settings.radiusScale, 85)
    : null;
  const featured = (choice && choice.target) || (nearest && nearest.place);
  const distance = featured ? nearestDistance(featured) : null;
  const arrived = choice && choice.target && choice.target.id === featured.id;
  const threshold = featured ? Math.round(featured.radius * settings.radiusScale) : 0;
  return `
    ${farBanner()}
    ${state.preview ? `<div class="preview-banner">To jest podgląd. Włącz przewodnik na miejscu, żeby użyć prawdziwego GPS.</div>` : ""}
    ${state.speechError ? `<div class="banner">${esc(state.speechError)}</div>` : ""}
    ${!secureContext() ? insecureBanner() : ""}
    <article class="card">
      <p class="kicker">${arrived ? "Jesteś przy miejscu" : "Najbliżej"}</p>
      <h3>${featured ? esc(featured.name) : "Szukam okolicy"}</h3>
      <p class="meta">${featured ? `${esc(featured.area)} · <span id="featured-distance">${formatDistance(distance)}</span>` : "Włącz GPS albo wybierz miejsce z listy."}</p>
      ${arrived ? `<div class="here">W zasięgu opowieści</div>` : ""}
      ${featured ? `<p class="meta">Opowieść włącza się sama w promieniu ${threshold} m.${choice && !choice.accurate ? " Czekam na dokładniejszy GPS." : ""}</p>` : ""}
      <div class="row">
        ${featured ? `<button class="primary" type="button" data-action="play" data-id="${featured.id}">Odtwórz</button>` : ""}
        ${state.tracking ? `<button class="secondary" type="button" data-action="stop-tracking">Zatrzymaj GPS</button>` : `<button class="secondary" type="button" data-action="start">Włącz GPS</button>`}
      </div>
      ${featured ? `<div class="speech" style="margin-top:14px">${paragraphs(featured.speech)}</div>` : ""}
    </article>
  `;
}

function renderWelcome() {
  const destination = currentDestination();
  const samples = (destination ? destination.samples : [])
    .map(placeById)
    .filter(Boolean);
  const lede = destination?.lede || "Trzymaj aplikację otwartą na spacerze. Przy zabytku przewodnik sam przeczyta historię po polsku.";
  return `
    ${!secureContext() ? insecureBanner() : ""}
    <section class="hero">
      <h2>Telefon opowie, gdy podejdziesz.</h2>
      <p class="lede">${lede}</p>
      <button class="primary" type="button" data-action="start">Włącz przewodnik</button>
      <button class="secondary" type="button" data-action="test-voice">Sprawdź polski głos</button>
    </section>
    ${voiceWarning()}
    <div class="samples">
      ${samples.map((place) => `<button type="button" data-action="open" data-id="${place.id}"><b>${esc(place.name)}</b><span>${esc(place.area)} · posłuchaj próbki</span></button>`).join("")}
    </div>
  `;
}

function insecureBanner() {
  return `<div class="banner">GPS w telefonie działa tylko na adresie z kłódką, czyli https. Otwórz przewodnik z linku, a nie z pliku zapisanego w pamięci.</div>`;
}

function voiceWarning() {
  if (!("speechSynthesis" in window)) {
    return `<div class="banner">Ta przeglądarka nie czyta tekstu na głos. Zostań przy Chrome.</div>`;
  }
  if (state.voices.length && !polishVoices().length) {
    return `<div class="banner">Nie widzę polskiego głosu. W ustawieniach telefonu doinstaluj polski lektor, inaczej opowieść poleci po angielsku albo wcale.</div>`;
  }
  return "";
}

function renderList() {
  const destination = currentDestination();
  const places = sortedPlaces();
  const grouped = !state.pos;
  let body = "";
  if (!places.length) body = `<p class="empty">Nic nie pasuje do szukania.</p>`;
  else if (grouped) {
    body = destination.areas.map((area) => {
      const items = places.filter((place) => place.area === area);
      if (!items.length) return "";
      return `<div class="group">${esc(area)}</div>${items.map(placeRow).join("")}`;
    }).join("");
  } else body = places.map(placeRow).join("");

  return `
    <div class="chips">
      ${destination.filters.map((item) => chip(item.id, item.label)).join("")}
    </div>
    <input id="search" class="search" type="search" placeholder="Szukaj zabytku albo miejscowości" value="${esc(state.query)}" data-action="search">
    ${state.pos ? `<p class="meta">Ułożone od najbliższego.</p>` : `<p class="meta">${currentPlaces().length} miejsc. Włącz GPS, a ułożę je według odległości.</p>`}
    ${body}
  `;
}

function chip(id, label) {
  return `<button type="button" data-action="island" data-island="${id}" class="${state.island === id ? "on" : ""}">${label}</button>`;
}

function placeRow(place) {
  const distance = state.pos ? formatDistance(nearestDistance(place)) : place.area;
  const heard = spokenAt[place.id] ? `<span class="heard"> · wysłuchane</span>` : "";
  return `<button class="place" type="button" data-action="open" data-id="${place.id}"><i class="island ${islandClass(place.island)}"></i><span><strong>${esc(place.name)}</strong><small><span data-distance-for="${place.id}">${esc(distance)}</span>${place.area && state.pos ? ` · ${esc(place.area)}` : ""}${heard}</small></span></button>`;
}

function renderMap() {
  return `
    <p class="meta">Kropka w kolorze morza to Ty. Stuknij miejsce, żeby odsłuchać opowieść. Kafelki mapy pobierają się z internetu i zostają w telefonie.</p>
    <div id="map" class="map-wrap"></div>
  `;
}

function renderSettings() {
  refreshVoices();
  const google = googlePolishVoice(state.voices);
  const autoName = google ? `${google.name} · ${google.lang}` : "polski głos z telefonu";
  const voiceOptions = [
    `<option value="" ${settings.voicePinned ? "" : "selected"}>${esc(autoName)}</option>`,
    ...state.voices.map((voice) => `<option value="${esc(voice.voiceURI)}" ${settings.voicePinned && settings.voiceURI === voice.voiceURI ? "selected" : ""}>${esc(voice.name)} · ${esc(voice.lang || "")}</option>`),
  ].join("");
  return `
    <section class="field">
      <label><input type="checkbox" data-setting="autoplay" ${settings.autoplay ? "checked" : ""}> Czytaj samo, gdy wejdę w zasięg</label>
    </section>
    <section class="field">
      <label for="rate">Tempo mowy: ${settings.rate.toFixed(2).replace(".", ",")}</label>
      <input id="rate" data-setting="rate" type="range" min="0.8" max="1.1" step="0.01" value="${settings.rate}">
    </section>
    <section class="field">
      <label for="radius">Zasięg opowieści</label>
      <select id="radius" data-setting="radiusScale">
        <option value="0.8" ${settings.radiusScale === 0.8 ? "selected" : ""}>Bliżej, w ciasnych uliczkach</option>
        <option value="1" ${settings.radiusScale === 1 ? "selected" : ""}>Standard</option>
        <option value="1.35" ${settings.radiusScale === 1.35 ? "selected" : ""}>Szerzej, gdy GPS skacze</option>
      </select>
    </section>
    <section class="field">
      <label for="repeat">Powtarzanie</label>
      <select id="repeat" data-setting="repeatMode">
        <option value="visit" ${settings.repeatMode === "visit" ? "selected" : ""}>Ponów najwcześniej po 3 godzinach</option>
        <option value="always" ${settings.repeatMode === "always" ? "selected" : ""}>Przy każdym kolejnym podejściu</option>
        <option value="trip" ${settings.repeatMode === "trip" ? "selected" : ""}>Tylko raz na cały urlop</option>
      </select>
    </section>
    <section class="field">
      <label for="voice">Głos</label>
      <select id="voice" data-setting="voiceURI">${voiceOptions}</select>
      <p class="help">Pierwsza pozycja na liście to Google polski pl-PL, jeśli Chrome go widzi. Zostaw ją. Inny głos wybieraj tylko wtedy, gdy na telefonie Google nie jest na liście.</p>
    </section>
    <section class="field">
      <label><input type="checkbox" data-setting="keepAwake" ${settings.keepAwake ? "checked" : ""}> Zostaw ekran włączony podczas przewodnika</label>
      <p class="help">Samsung usypia GPS, gdy ekran długo jest zgaszony. Na spacerze lepiej nie chować telefonu głęboko do kieszeni. Głośność ustawiasz przyciskami multimediów, dobrze działają słuchawki.</p>
    </section>
    <section class="field">
      <label><input type="checkbox" data-setting="vibrate" ${settings.vibrate ? "checked" : ""}> Wibracja przy nowej opowieści</label>
    </section>
    <button class="secondary" type="button" data-action="test-voice">Zdanie próbne</button>
    <button class="secondary" type="button" data-action="reset-heard">Wyczyść listę wysłuchanych</button>
    <button class="secondary" type="button" data-action="change-destination">Zmień kierunek</button>
    <button class="secondary" type="button" data-action="install">Dodaj do ekranu głównego</button>
    <div class="help" style="margin-top:16px">
      <p>Lokalizacja zostaje w telefonie. Aplikacja nie wysyła pozycji na żaden serwer. Mapa bierze kafelki z internetu.</p>
      <p>Godziny, bilety i wejścia zmieniają się z sezonu na sezon. Przy hipogeum w Paoli rezerwacja z wyprzedzeniem jest obowiązkowa. W Łodzi cmentarz żydowski i część muzeów mają własne godziny bram. W Szczecinie tak samo Przełomy, willa Lentza i cmentarz centralny. Nad Jeziorem Szmaragdowym nie wchodź do wody.</p>
      <p>Przed wyjazdem otwórz przewodnik raz przy Wi-Fi, odtwórz zdanie próbne i dodaj ikonę na pulpit. Opowieści działają potem bez sieci. Mapa w nowym rejonie potrzebuje internetu za pierwszym razem.</p>
    </div>
  `;
}

function openSheet(id) {
  const place = placeById(id);
  if (!place) return;
  state.sheetId = id;
  const distance = state.pos ? formatDistance(nearestDistance(place)) : "brak GPS";
  const sheet = document.getElementById("sheet");
  sheet.hidden = false;
  sheet.innerHTML = `
    <article class="sheet-card">
      <div class="handle"></div>
      <button class="back" type="button" data-action="close-sheet">Zamknij</button>
      <p class="kicker">${esc(place.area)}</p>
      <h3>${esc(place.name)}</h3>
      <p class="meta">${esc(distance)} · opowieść w promieniu ${Math.round(place.radius * settings.radiusScale)} m</p>
      <div class="row">
        <button class="primary" type="button" data-action="play" data-id="${place.id}">Odtwórz</button>
        <button class="secondary" type="button" data-action="navigate" data-id="${place.id}">Prowadź</button>
      </div>
      <div class="row" style="margin-top:8px">
        <button class="secondary" type="button" data-action="show-map" data-id="${place.id}">Pokaż na mapie</button>
        <button class="secondary" type="button" data-action="simulate" data-id="${place.id}">Udaj, że tu jestem</button>
      </div>
      <div class="speech" style="margin-top:14px">${paragraphs(place.speech)}</div>
    </article>
  `;
}

function closeSheet() {
  state.sheetId = null;
  const sheet = document.getElementById("sheet");
  sheet.hidden = true;
  sheet.innerHTML = "";
}

function showMap() {
  const node = document.getElementById("map");
  if (!node || !window.L) {
    if (node) node.innerHTML = `<p class="empty">Mapa się nie wczytała. Lista miejsc działa bez niej.</p>`;
    return;
  }
  if (!state.map) {
    state.map = L.map(node, { zoomControl: true });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap &copy; CARTO",
    }).addTo(state.map);
    const colors = {
      malta: "#8d3d24",
      gozo: "#1d6b58",
      comino: "#8a6a28",
      deptak: "#8a6a28",
      fabryki: "#8d3d24",
      miasto: "#1e5364",
      pamiec: "#3d3a34",
      stare: "#8a6a28",
      waly: "#1e5364",
      parki: "#1d6b58",
    };
    for (const place of currentPlaces()) {
      const marker = L.circleMarker([place.lat, place.lng], {
        radius: 7,
        color: colors[place.island] || colors.malta,
        weight: 2,
        fillColor: "#fffaf3",
        fillOpacity: 1,
      }).addTo(state.map);
      marker.bindTooltip(place.name, { direction: "top" });
      marker.on("click", () => openSheet(place.id));
    }
    state.userMarker = L.circleMarker([0, 0], {
      radius: 9,
      color: "#ffffff",
      weight: 3,
      fillColor: "#143642",
      fillOpacity: 1,
    });
  }
  state.map.invalidateSize();
  updateUserMarker(true);
}

function updateUserMarker(recenter) {
  if (!state.map || !state.userMarker || !state.pos) {
    if (state.map && recenter && !state.mapCentered) {
      const destination = currentDestination();
      state.map.setView(destination ? destination.center : [35.94, 14.38], destination ? destination.zoom : 10);
      state.mapCentered = true;
    }
    return;
  }
  const ll = [state.pos.lat, state.pos.lng];
  if (!state.map.hasLayer(state.userMarker)) state.userMarker.addTo(state.map);
  state.userMarker.setLatLng(ll);
  if (recenter && !state.mapCentered) {
    state.map.setView(ll, 15);
    state.mapCentered = true;
  }
}

async function requestWake() {
  if (!settings.keepAwake || !("wakeLock" in navigator)) return;
  try {
    state.wakeLock = await navigator.wakeLock.request("screen");
  } catch {
    state.wakeLock = null;
  }
}

function releaseWake() {
  if (state.wakeLock) {
    state.wakeLock.release().catch(() => {});
    state.wakeLock = null;
  }
}

function startTracking() {
  if (!secureContext()) {
    state.view = "now";
    render();
    return;
  }
  if (!("geolocation" in navigator)) {
    state.gps = "unsupported";
    render();
    return;
  }
  state.preview = false;
  state.tracking = true;
  state.gps = "searching";
  state.view = "now";
  render();
  speakText("welcome", "Przewodnik włączony. Gdy podejdziesz do miejsca, opowiem o nim po polsku.");
  requestWake();
  if (state.watchId != null) navigator.geolocation.clearWatch(state.watchId);
  state.watchId = navigator.geolocation.watchPosition(
    (pos) => applyFix(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 99, false),
    (error) => {
      state.gps = error.code === 1 ? "denied" : "weak";
      state.gpsDetail = error.message || "";
      render();
    },
    { enableHighAccuracy: true, maximumAge: 4000, timeout: 20000 }
  );
}

function stopTracking() {
  state.tracking = false;
  state.preview = false;
  state.gps = "off";
  if (state.watchId != null && "geolocation" in navigator) {
    navigator.geolocation.clearWatch(state.watchId);
  }
  state.watchId = null;
  releaseWake();
  render();
}

function featuredIdFrom(choice) {
  if (choice && choice.target) return choice.target.id;
  if (choice && choice.nearest) return choice.nearest.place.id;
  return null;
}

function applyFix(lat, lng, accuracy, preview) {
  state.pos = { lat, lng, accuracy, preview };
  state.preview = preview;
  if (!preview) state.gps = accuracy > 85 ? "weak" : "live";
  const choice = chooseTarget(currentPlaces(), lat, lng, accuracy, state.lockedId, settings.radiusScale, 85);
  const nearest = choice.nearest;
  const previousFeatured = state.nearestId;
  const previousArrived = state.lockedId;
  state.nearestId = nearest ? nearest.place.id : null;
  if (choice.accurate && !choice.target) state.lockedId = null;
  else if (choice.target && choice.target.id !== state.lockedId) {
    state.lockedId = choice.target.id;
    if (state.tracking && settings.autoplay && canRepeat(spokenAt, choice.target.id, settings.repeatMode, Date.now())) {
      queueSpeech(choice.target.id);
    }
  }
  if (state.view === "map") updateUserMarker(false);
  const arrivedNow = !choice.accurate ? previousArrived : (choice.target ? choice.target.id : null);
  const featuredNow = !choice.accurate ? (previousArrived || previousFeatured) : featuredIdFrom(choice);
  const featuredChanged = featuredNow !== (previousArrived || previousFeatured);
  const arrivedChanged = arrivedNow !== previousArrived;
  if ((state.view === "now" || state.view === "list") && state.pos && !featuredChanged && !arrivedChanged && !preview) {
    patchLive();
    return;
  }
  if (state.view === "now" || state.view === "list" || preview) render();
  else renderStatus();
}

function patchLive() {
  renderStatus();
  const featured = document.getElementById("featured-distance");
  if (featured && state.nearestId) {
    const place = placeById(state.lockedId || state.nearestId);
    if (place) featured.textContent = formatDistance(nearestDistance(place));
  }
  document.querySelectorAll("[data-distance-for]").forEach((el) => {
    const place = placeById(el.dataset.distanceFor);
    if (place) el.textContent = formatDistance(nearestDistance(place));
  });
}

let speechToken = 0;

function queueSpeech(id) {
  if (state.speakingId) state.pendingId = id;
  else speakPlace(id, { manual: false });
}

function speakPlace(id, options = { manual: true }) {
  const place = placeById(id);
  if (!place) return;
  if (options.manual) state.pendingId = null;
  spokenAt[id] = Date.now();
  saveSpoken();
  if (settings.vibrate && navigator.vibrate) navigator.vibrate([30, 50, 30]);
  speakText(id, place.speech);
}

function speakText(id, text) {
  if (!("speechSynthesis" in window)) {
    state.speakingId = null;
    renderPlayer();
    return;
  }
  const token = ++speechToken;
  state.speakingId = id;
  state.speechError = "";
  state.chunks = splitSpeech(text);
  state.chunkIndex = 0;
  state.speechToken = token;
  const start = () => {
    if (token !== speechToken) return;
    renderPlayer();
    utterNext(token);
  };
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
    window.setTimeout(start, 80);
  } else start();
}

function utterNext(token) {
  if (token !== speechToken) return;
  if (state.chunkIndex >= state.chunks.length) {
    finishSpeech(token);
    return;
  }
  const voice = selectedVoice();
  const utterance = new SpeechSynthesisUtterance(state.chunks[state.chunkIndex]);
  utterance.lang = voice && voice.lang ? voice.lang : "pl-PL";
  utterance.rate = settings.rate;
  utterance.pitch = 1;
  if (voice) utterance.voice = voice;
  utterance.onend = () => {
    if (token !== speechToken) return;
    state.chunkIndex += 1;
    utterNext(token);
  };
  utterance.onerror = (event) => {
    if (token !== speechToken) return;
    const reason = event.error || "";
    if (reason !== "interrupted" && reason !== "canceled") {
      state.speechError = "Nie udało się czytać na głos. Tekst zostaje na ekranie. W ustawieniach sprawdź, czy telefon ma polski głos.";
    }
    finishSpeech(token);
  };
  window.speechSynthesis.speak(utterance);
}

function finishSpeech(token) {
  if (token !== speechToken) return;
  state.speakingId = null;
  state.chunks = [];
  const pending = state.pendingId;
  state.pendingId = null;
  renderPlayer();
  if (pending) speakPlace(pending, { manual: false });
  else if (state.speechError && (state.view === "now" || state.view === "settings")) render();
}

function stopSpeech() {
  speechToken += 1;
  state.pendingId = null;
  state.speakingId = null;
  state.chunks = [];
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  renderPlayer();
}

function splitSpeech(text) {
  const paragraphs = text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const chunks = [];
  for (const paragraph of paragraphs) {
    const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [paragraph];
    let buffer = "";
    for (const sentence of sentences) {
      const piece = sentence.trim();
      if (!piece) continue;
      if (buffer && (buffer + " " + piece).length > 420) {
        chunks.push(buffer);
        buffer = piece;
      } else buffer = buffer ? `${buffer} ${piece}` : piece;
    }
    if (buffer) chunks.push(buffer);
  }
  return chunks.length ? chunks : [text.trim()];
}

function simulate(id) {
  const place = placeById(id);
  if (!place) return;
  if (state.watchId != null && "geolocation" in navigator) navigator.geolocation.clearWatch(state.watchId);
  state.watchId = null;
  state.lockedId = null;
  delete spokenAt[id];
  saveSpoken();
  state.tracking = true;
  state.view = "now";
  closeSheet();
  applyFix(place.lat, place.lng, 8, true);
}

function navigateTo(id) {
  const place = placeById(id);
  if (!place) return;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=walking`;
  window.open(url, "_blank", "noopener");
}

function focusOnMap(id) {
  const place = placeById(id);
  if (!place) return;
  closeSheet();
  state.view = "map";
  render();
  requestAnimationFrame(() => {
    showMap();
    if (state.map) state.map.setView([place.lat, place.lng], 17);
  });
}

function resetMap() {
  if (state.map) {
    state.map.remove();
    state.map = null;
    state.userMarker = null;
  }
  state.mapCentered = false;
}

function selectDestination(id) {
  if (!DESTINATIONS.some((item) => item.id === id)) return;
  stopSpeech();
  closeSheet();
  settings.destination = id;
  saveSettings();
  state.island = "all";
  state.query = "";
  state.lockedId = null;
  state.view = "now";
  resetMap();
  render();
}

function clearDestination() {
  stopSpeech();
  closeSheet();
  settings.destination = "";
  saveSettings();
  state.island = "all";
  state.query = "";
  state.lockedId = null;
  state.view = "now";
  resetMap();
  render();
}

function onClick(event) {
  if (event.target.id === "sheet") {
    closeSheet();
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id, view, island } = button.dataset;
  if (action === "nav") {
    state.view = view;
    render();
  } else if (action === "start") startTracking();
  else if (action === "stop-tracking") stopTracking();
  else if (action === "play") speakPlace(id);
  else if (action === "stop-speech") stopSpeech();
  else if (action === "open") openSheet(id);
  else if (action === "close-sheet") closeSheet();
  else if (action === "simulate") simulate(id);
  else if (action === "navigate") navigateTo(id);
  else if (action === "show-map") focusOnMap(id);
  else if (action === "island") {
    state.island = island;
    render();
  } else if (action === "destination") selectDestination(id);
  else if (action === "change-destination") clearDestination();
  else if (action === "test-voice") {
    speakText("test", "Dzień dobry. Tak będzie brzmieć przewodnik na ucho.");
  } else if (action === "reset-heard") {
    for (const key of Object.keys(spokenAt)) delete spokenAt[key];
    saveSpoken();
    render();
  } else if (action === "install") installApp();
}

function onInput(event) {
  if (event.target.id === "search") {
    state.query = event.target.value;
    render();
  }
  if (event.target.dataset.setting === "rate") {
    settings.rate = Number(event.target.value);
    saveSettings();
    const label = event.target.previousElementSibling;
    if (label) label.textContent = `Tempo mowy: ${settings.rate.toFixed(2).replace(".", ",")}`;
  }
}

function onChange(event) {
  const key = event.target.dataset.setting;
  if (!key) return;
  if (key === "voiceURI") {
    settings.voiceURI = event.target.value;
    settings.voicePinned = Boolean(event.target.value);
    saveSettings();
    return;
  }
  if (event.target.type === "checkbox") settings[key] = event.target.checked;
  else if (key === "radiusScale") settings[key] = Number(event.target.value);
  else settings[key] = event.target.value;
  saveSettings();
  if (key === "keepAwake") {
    if (settings.keepAwake && state.tracking) requestWake();
    else releaseWake();
  }
  if (key === "radiusScale" || key === "repeatMode" || key === "autoplay") render();
}

function installApp() {
  if (state.installEvent) {
    state.installEvent.prompt();
    return;
  }
  alert("W Chrome stuknij trzy kropki i wybierz „Dodaj do ekranu głównego” albo „Zainstaluj aplikację”.");
}

function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  state.voices = window.speechSynthesis.getVoices();
  const select = document.getElementById("voice");
  if (select && state.view === "settings") render();
  else if (state.view === "now" && !state.tracking) render();
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  state.installEvent = event;
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.tracking && !state.preview) requestWake();
});

document.addEventListener("click", onClick);
document.addEventListener("input", onInput);
document.addEventListener("change", onChange);

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}

if ("serviceWorker" in navigator && secureContext()) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
