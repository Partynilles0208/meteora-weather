const form = document.querySelector("#searchForm");
const input = document.querySelector("#cityInput");
const statusText = document.querySelector("#statusText");
const geoButton = document.querySelector("#geoButton");
const soundButton = document.querySelector("#soundButton");
const suggestionsPanel = document.querySelector("#suggestionsPanel");
const weatherArt = document.querySelector("#weatherArt");
const rainPane = document.querySelector("#rainPane");
const cloudPane = document.querySelector("#cloudPane");
const hourlyStrip = document.querySelector("#hourlyStrip");
const dailyList = document.querySelector("#dailyList");
const alertCard = document.querySelector("#alertCard");
const homeTab = document.querySelector("#homeTab");
const radarTab = document.querySelector("#radarTab");
const radarView = document.querySelector("#radarView");
const radarPlace = document.querySelector("#radarPlace");
const radarCard = document.querySelector(".radar-card");
const radarMap = document.querySelector("#radarMap");
const baseTiles = document.querySelector("#baseTiles");
const radarTiles = document.querySelector("#radarTiles");
const radarLoading = document.querySelector("#radarLoading");
const radarTime = document.querySelector("#radarTime");
const radarZoomLabel = document.querySelector("#radarZoomLabel");
const radarFrameCount = document.querySelector("#radarFrameCount");
const radarSlider = document.querySelector("#radarSlider");
const radarPlay = document.querySelector("#radarPlay");
const radarRefresh = document.querySelector("#radarRefresh");
const radarRecenter = document.querySelector("#radarRecenter");
const radarFullscreen = document.querySelector("#radarFullscreen");
const radarZoomIn = document.querySelector("#radarZoomIn");
const radarZoomOut = document.querySelector("#radarZoomOut");
const menuButton = document.querySelector("#menuButton");
const menuPanel = document.querySelector("#menuPanel");
const menuClose = document.querySelector("#menuClose");
const centerWeatherButton = document.querySelector("#centerWeatherButton");
const mapTab = document.querySelector("#mapTab");
const settingsTab = document.querySelector("#settingsTab");
const mapTiles = document.querySelector("#mapTiles");
const mapPlace = document.querySelector("#mapPlace");
const mapLat = document.querySelector("#mapLat");
const mapLon = document.querySelector("#mapLon");
const mapZoomLabel = document.querySelector("#mapZoomLabel");
const mapZoomIn = document.querySelector("#mapZoomIn");
const mapZoomOut = document.querySelector("#mapZoomOut");
const mapRecenter = document.querySelector("#mapRecenter");
const settingsSound = document.querySelector("#settingsSound");
const settingsAnimations = document.querySelector("#settingsAnimations");
const settingsLocation = document.querySelector("#settingsLocation");
const settingsLocate = document.querySelector("#settingsLocate");
const privacyLocate = document.querySelector("#privacyLocate");
const unitButton = document.querySelector("#unitButton");
const unitLabel = document.querySelector("#unitLabel");
const designButton = document.querySelector("#designButton");
const designLabel = document.querySelector("#designLabel");
const languageButton = document.querySelector("#languageButton");
const languageLabel = document.querySelector("#languageLabel");
const chatPanel = document.querySelector("#chatPanel");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");
const classicEls = {
  searchButton: document.querySelector("#classicSearchButton"),
  settingsButton: document.querySelector("#classicSettingsButton"),
  searchPanel: document.querySelector("#classicSearchPanel"),
  searchForm: document.querySelector("#classicSearchForm"),
  searchInput: document.querySelector("#classicSearchInput"),
  searchResults: document.querySelector("#classicSearchResults"),
  favoritesPanel: document.querySelector("#classicFavorites"),
  appTitle: document.querySelector("#classicAppTitle"),
  place: document.querySelector("#classicPlace"),
  temp: document.querySelector("#classicTemp"),
  condition: document.querySelector("#classicCondition"),
  time: document.querySelector("#classicTime"),
  wind: document.querySelector("#classicWind"),
  windDirection: document.querySelector("#classicWindDirection"),
  humidity: document.querySelector("#classicHumidity"),
  feels: document.querySelector("#classicFeels"),
  rain: document.querySelector("#classicRain"),
  hourly: document.querySelector("#classicHourly"),
};

const els = {
  countryName: document.querySelector("#countryName"),
  conditionText: document.querySelector("#conditionText"),
  currentTemp: document.querySelector("#currentTemp"),
  feelsLike: document.querySelector("#feelsLike"),
  highTemp: document.querySelector("#highTemp"),
  lowTemp: document.querySelector("#lowTemp"),
  miniLow: document.querySelector("#miniLow"),
  miniHigh: document.querySelector("#miniHigh"),
  miniCondition: document.querySelector("#miniCondition"),
  rainChance: document.querySelector("#rainChance"),
  miniWind: document.querySelector("#miniWind"),
  miniWindUnit: document.querySelector("#miniWindUnit"),
  windValue: document.querySelector("#windValue"),
  windUnit: document.querySelector("#windUnit"),
  windDirection: document.querySelector("#windDirection"),
  humidityValue: document.querySelector("#humidityValue"),
  uvValue: document.querySelector("#uvValue"),
  uvLabel: document.querySelector("#uvLabel"),
  alertTitle: document.querySelector("#alertTitle"),
  alertText: document.querySelector("#alertText"),
  warningList: document.querySelector("#warningList"),
  airQualityValue: document.querySelector("#airQualityValue"),
  airQualityLabel: document.querySelector("#airQualityLabel"),
  pressureValue: document.querySelector("#pressureValue"),
  visibilityValue: document.querySelector("#visibilityValue"),
  precipValue: document.querySelector("#precipValue"),
  cloudValue: document.querySelector("#cloudValue"),
  sunriseValue: document.querySelector("#sunriseValue"),
  sunsetValue: document.querySelector("#sunsetValue"),
};

function updateDeviceLayout() {
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  const shortestSide = Math.min(window.innerWidth, window.innerHeight);
  const longestSide = Math.max(window.innerWidth, window.innerHeight);
  const handheld = coarsePointer || shortestSide <= 900;
  const tablet = handheld && shortestSide >= 700 && longestSide >= 900;
  const phone = handheld && !tablet;
  document.body.classList.toggle("is-handheld", handheld);
  document.body.classList.toggle("is-tablet", tablet);
  document.body.classList.toggle("is-phone", phone);
  document.body.classList.toggle("is-portrait", portrait);
  document.body.classList.toggle("is-landscape", !portrait);
}

updateDeviceLayout();

const weatherCodes = {
  0: ["Clear Sky", "sun"],
  1: ["Mostly Clear", "sun"],
  2: ["Partly Cloudy", "cloud"],
  3: ["Cloudy", "cloud"],
  45: ["Fog", "fog"],
  48: ["Rime Fog", "fog"],
  51: ["Light Drizzle", "rain"],
  53: ["Drizzle", "rain"],
  55: ["Heavy Drizzle", "rain"],
  56: ["Freezing Drizzle", "rain"],
  57: ["Heavy Freezing Drizzle", "rain"],
  61: ["Light Rain", "rain"],
  63: ["Rain", "rain"],
  65: ["Heavy Rain", "rain"],
  66: ["Freezing Rain", "rain"],
  67: ["Heavy Freezing Rain", "rain"],
  71: ["Light Snow", "snow"],
  73: ["Snow", "snow"],
  75: ["Heavy Snow", "snow"],
  77: ["Snow Grains", "snow"],
  80: ["Light Showers", "rain"],
  81: ["Showers", "rain"],
  82: ["Heavy Showers", "rain"],
  85: ["Light Snow Showers", "snow"],
  86: ["Snow Showers", "snow"],
  95: ["Thunderstorm", "rain"],
  96: ["Thunder With Hail", "rain"],
  99: ["Severe Thunderstorm", "rain"],
};

const soundState = {
  enabled: false,
  scene: "clear",
  rain: new Audio("dreamingrelaxation-intense-rain-city-night-171461.mp3"),
  cloud: new Audio("creatorshome-mountain-wind-371074.mp3"),
};

soundState.rain.loop = true;
soundState.cloud.loop = true;
soundState.rain.volume = 0.55;
soundState.cloud.volume = 0.42;

const radarState = {
  location: null,
  center: null,
  api: null,
  frames: [],
  frameIndex: 0,
  zoom: 6,
  playing: false,
  timer: null,
};

const mapState = {
  location: null,
  center: null,
  zoom: 6,
};

const appState = {
  unit: "metric",
  language: "de",
  design: ["modern", "sketch", "classic"].includes(localStorage.getItem("meteoraDesign")) ? localStorage.getItem("meteoraDesign") : "modern",
  lastLocation: null,
  weatherContext: null,
  warningContext: null,
  chatMessages: [],
};

const searchState = {
  suggestions: [],
  activeIndex: -1,
  timer: null,
  requestId: 0,
};

const classicState = {
  searchTimer: null,
  searchResults: [],
  favorites: JSON.parse(localStorage.getItem("meteoraClassicFavorites") || "[]"),
};

const weatherCacheKey = "meteoraLastWeatherSnapshot";

function describe(code) {
  return weatherCodes[code] ?? ["Unknown", "cloud"];
}

function round(value) {
  return Math.round(Number(value));
}

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.style.color = isError ? "#ff9f9f" : "";
}

function formatHour(value) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: true }).format(new Date(value)).replace(" ", "");
}

function formatDay(value) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(value));
}

function formatRadarTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(timestamp * 1000));
}

function formatShortTime(value) {
  if (!value) return "--";
  return new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function uvLabel(value) {
  if (value < 3) return "Low";
  if (value < 6) return "Moderate";
  if (value < 8) return "High";
  if (value < 11) return "Very High";
  return "Extreme";
}

function windDirection(degrees = 225) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degrees / 45) % 8];
}

function applyDesign() {
  const sketch = appState.design === "sketch";
  const classic = appState.design === "classic";
  document.body.classList.toggle("theme-sketch", sketch);
  document.body.classList.toggle("theme-classic", classic);
  designButton.textContent = classic ? "Klasisch" : sketch ? "Kritzel" : "Modern";
  designLabel.textContent = classic ? "Klassische Wetter-App" : sketch ? "Kritzel-Wetter" : "Modernes Gewitter";
  localStorage.setItem("meteoraDesign", appState.design);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.slice(0, 300) };
  }
}

async function geocodeCity(city) {
  const results = await findCities(city, 12);
  const location = results[0];
  if (!location) throw new Error("Ort nicht gefunden.");
  return locationFromResult(location);
}

function parseCoordinateInput(value) {
  const query = value.trim();
  if (!query) return null;
  const numbers = query.match(/[-+]?\d+(?:[.,]\d+)?/g);
  if (!numbers || numbers.length !== 2) return null;

  const leftover = query
    .replace(/[-+]?\d+(?:[.,]\d+)?/g, "")
    .replace(/\b(lat|latitude|breite|lon|lng|longitude|laenge)\b/gi, "")
    .replace(/[,:;=\s|/()\u00b0]+/g, "");
  if (leftover) return null;

  let latitude = Number(numbers[0].replace(",", "."));
  let longitude = Number(numbers[1].replace(",", "."));
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  if (Math.abs(latitude) > 90 && Math.abs(longitude) <= 90) {
    [latitude, longitude] = [longitude, latitude];
  }
  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    throw new Error("Koordinaten muessen im Bereich -90 bis 90 und -180 bis 180 liegen.");
  }

  return {
    name: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    country: "",
    countryCode: "",
    region: "Koordinaten",
    latitude,
    longitude,
  };
}

function queryVariants(query) {
  const clean = query.trim().replace(/\s+/g, " ");
  const parts = clean.split(",").map((part) => part.trim()).filter(Boolean);
  const variants = [clean];
  if (parts.length > 1) {
    variants.push(parts[0]);
    variants.push(parts.slice(0, 2).join(" "));
    variants.push(parts.slice(0, 2).join(", "));
  }
  if (clean.includes("Vereinigte Sta")) variants.push(clean.replace(/Vereinigte Sta.*/i, "United States"));
  if (clean.includes("Vereinigte Staaten")) variants.push(clean.replace(/Vereinigte Staaten/i, "United States"));
  const expanded = [];
  for (const variant of variants) {
    expanded.push(variant);
    const variantParts = variant.split(",").map((part) => part.trim()).filter(Boolean);
    if (variantParts.length > 1) expanded.push(variantParts[0]);
  }
  return [...new Set(expanded.filter((variant) => variant.length >= 2))];
}

function queryHints(query) {
  const normalized = normalizeSearch(query);
  return {
    parts: query.split(",").map((part) => normalizeSearch(part)).filter(Boolean),
    wantsUS: /vereinigtesta|unitedstates|usa| usa$/.test(normalized),
  };
}

async function findCities(query, count = 10) {
  const variants = queryVariants(query);
  const batches = await Promise.all(variants.map((variant) => searchCities(variant, count).catch(() => [])));
  const hints = queryHints(query);
  return compactLocations(batches.flat())
    .map((result) => ({ result, score: locationScore(query, hints, result) }))
    .sort((a, b) => a.score - b.score || (b.result.population || 0) - (a.result.population || 0))
    .slice(0, count)
    .map((entry) => entry.result);
}

function locationScore(query, hints, result) {
  let score = typoScore(query.split(",")[0], result);
  const admin = normalizeSearch(result.admin1 || "");
  const country = normalizeSearch(result.country || "");
  const countryCode = normalizeSearch(result.country_code || "");
  for (const part of hints.parts.slice(1)) {
    if (admin.startsWith(part) || admin.includes(part)) score -= 3;
    if (country.startsWith(part) || country.includes(part) || countryCode === part) score -= 2;
  }
  if (hints.wantsUS && result.country_code === "US") score -= 4;
  return score;
}

function locationFromResult(location) {
  return {
    name: location.name,
    country: location.country || "",
    countryCode: location.country_code || "",
    region: location.admin1 || "",
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

async function searchCities(query, count = 8) {
  const params = new URLSearchParams({
    name: query,
    count: String(count),
    language: "en",
    format: "json",
  });
  const data = await fetchJson(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  return data.results ?? [];
}

function normalizeSearch(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

function editDistance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);
  for (let col = 1; col <= b.length; col += 1) rows[0][col] = col;
  for (let row = 1; row <= a.length; row += 1) {
    for (let col = 1; col <= b.length; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      rows[row][col] = Math.min(rows[row - 1][col] + 1, rows[row][col - 1] + 1, rows[row - 1][col - 1] + cost);
    }
  }
  return rows[a.length][b.length];
}

function typoScore(query, result) {
  const q = normalizeSearch(query);
  const name = normalizeSearch(result.name || "");
  if (!q || !name) return 99;
  if (name.startsWith(q)) return 0;
  if (name.includes(q)) return 1;
  return editDistance(q, name.slice(0, Math.max(q.length, Math.min(name.length, q.length + 2))));
}

function compactLocations(results) {
  const seen = new Set();
  return results.filter((result) => {
    const key = `${result.name}-${result.admin1}-${result.country}-${result.latitude}-${result.longitude}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderSuggestions(results) {
  searchState.suggestions = results.map(locationFromResult);
  searchState.activeIndex = -1;
  if (!searchState.suggestions.length) {
    suggestionsPanel.classList.remove("is-open");
    suggestionsPanel.innerHTML = "";
    return;
  }
  suggestionsPanel.innerHTML = searchState.suggestions.map((location, index) => `
    <button class="suggestion-item" type="button" role="option" data-index="${index}">
      <strong>${location.name}</strong>
      <span>${[location.region, location.country].filter(Boolean).join(", ")}</span>
    </button>
  `).join("");
  suggestionsPanel.classList.add("is-open");
}

function favoriteKey(location) {
  return `${location.name}|${location.region}|${location.country}|${Number(location.latitude).toFixed(4)}|${Number(location.longitude).toFixed(4)}`;
}

function isClassicFavorite(location) {
  const key = favoriteKey(location);
  return classicState.favorites.some((favorite) => favorite.key === key);
}

function saveClassicFavorites() {
  localStorage.setItem("meteoraClassicFavorites", JSON.stringify(classicState.favorites));
}

function toggleClassicFavorite(location) {
  const key = favoriteKey(location);
  const index = classicState.favorites.findIndex((favorite) => favorite.key === key);
  if (index >= 0) {
    classicState.favorites.splice(index, 1);
  } else {
    classicState.favorites.unshift({ key, ...location });
  }
  saveClassicFavorites();
  renderClassicSearchResults(classicState.searchResults);
  renderClassicFavorites();
}

function renderClassicSearchResults(results) {
  classicState.searchResults = results.map((result) => (
    result.latitude !== undefined && result.longitude !== undefined && result.countryCode !== undefined
      ? result
      : locationFromResult(result)
  ));
  if (!classicState.searchResults.length) {
    classicEls.searchResults.innerHTML = `<p class="classic-empty">Keine Treffer.</p>`;
    return;
  }
  classicEls.searchResults.innerHTML = classicState.searchResults.map((location, index) => {
    const active = isClassicFavorite(location);
    const place = [location.region, location.country].filter(Boolean).join(", ");
    return `
      <article class="classic-result-card">
        <button class="classic-result-main" type="button" data-classic-result="${index}">
          <strong>${location.name}</strong>
          <span>${place || "Ort"}</span>
        </button>
        <button class="classic-heart ${active ? "is-saved" : ""}" type="button" data-classic-heart="${index}" aria-label="${active ? "Favorit entfernen" : "Favorit speichern"}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /></svg>
        </button>
      </article>
    `;
  }).join("");
}

function renderClassicFavorites() {
  if (!classicState.favorites.length) {
    classicEls.favoritesPanel.innerHTML = `
      <article class="classic-favorite-empty">
        <strong>Noch keine Favoriten</strong>
        <span>Suche eine Stadt und tippe auf das Herz.</span>
      </article>
    `;
    return;
  }
  classicEls.favoritesPanel.innerHTML = classicState.favorites.map((location, index) => `
    <article class="classic-favorite-card">
      <button class="classic-favorite-main" type="button" data-classic-favorite="${index}">
        <strong>${location.name}</strong>
        <span>${[location.region, location.country].filter(Boolean).join(", ") || "Favorit"}</span>
      </button>
      <button class="classic-heart is-saved" type="button" data-classic-remove="${index}" aria-label="Favorit entfernen">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /></svg>
      </button>
    </article>
  `).join("");
}

async function updateClassicSearch() {
  const query = classicEls.searchInput.value.trim();
  if (query.length < 2) {
    classicEls.searchResults.innerHTML = "";
    classicState.searchResults = [];
    return;
  }
  try {
    const results = parseCoordinateInput(query) ? [parseCoordinateInput(query)] : await findCities(query, 8);
    renderClassicSearchResults(results);
  } catch {
    renderClassicSearchResults([]);
  }
}

function queueClassicSearch() {
  window.clearTimeout(classicState.searchTimer);
  classicState.searchTimer = window.setTimeout(updateClassicSearch, 180);
}

function setClassicPanel(panel) {
  document.body.classList.toggle("classic-search-open", panel === "search");
  document.body.classList.toggle("classic-favorites-open", panel === "favorites");
  if (panel === "search") {
    classicEls.searchInput.focus();
    queueClassicSearch();
  }
  if (panel === "favorites") renderClassicFavorites();
}

function setActiveSuggestion(index) {
  const items = [...suggestionsPanel.querySelectorAll(".suggestion-item")];
  searchState.activeIndex = Math.max(-1, Math.min(index, items.length - 1));
  items.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === searchState.activeIndex));
}

async function updateSuggestions() {
  const query = input.value.trim();
  const requestId = ++searchState.requestId;
  if (query.length < 2) {
    renderSuggestions([]);
    return;
  }
  try {
    if (parseCoordinateInput(query)) {
      renderSuggestions([]);
      return;
    }
  } catch {
    renderSuggestions([]);
    return;
  }
  try {
    const direct = await findCities(query, 12);
    const typoBase = direct.length >= 3 ? [] : await findCities(query.slice(0, Math.max(2, query.length - 1)), 10);
    if (requestId !== searchState.requestId) return;
    const results = compactLocations([...direct, ...typoBase]).slice(0, 6);
    renderSuggestions(results);
  } catch {
    renderSuggestions([]);
  }
}

function queueSuggestions() {
  window.clearTimeout(searchState.timer);
  searchState.timer = window.setTimeout(updateSuggestions, 220);
}

async function chooseSuggestion(location) {
  suggestionsPanel.classList.remove("is-open");
  input.value = location.name;
  await loadByLocation(location);
}

async function fetchWeather(location) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,cloud_cover,visibility",
    hourly: "temperature_2m,precipitation_probability,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset",
    timezone: "auto",
    forecast_days: "7",
  });
  if (appState.unit === "imperial") {
    params.set("temperature_unit", "fahrenheit");
    params.set("wind_speed_unit", "mph");
  }
  const weather = await fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`);
  return { location, weather };
}

async function fetchAirQuality(location) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "us_aqi,european_aqi,pm2_5,pm10",
    timezone: "auto",
  });
  return fetchJson(`https://air-quality-api.open-meteo.com/v1/air-quality?${params}`);
}

function airQualityLabel(value) {
  if (!Number.isFinite(value)) return "--";
  if (value <= 50) return "Good";
  if (value <= 100) return "Moderate";
  if (value <= 150) return "Unhealthy";
  if (value <= 200) return "Poor";
  if (value <= 300) return "Very Poor";
  return "Hazardous";
}

async function fetchOfficialWarnings(location) {
  if (location.countryCode === "US" || location.country === "United States") {
    const params = new URLSearchParams({
      point: `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`,
    });
    const data = await fetchJson(`https://api.weather.gov/alerts/active?${params}`);
    return {
      source: "National Weather Service",
      supported: true,
      alerts: data.features?.map((feature) => feature.properties) ?? [],
    };
  }

  if (location.countryCode === "DE" || location.country === "Deutschland" || location.country === "Germany") {
    const delta = 0.08;
    const bbox = [
      location.longitude - delta,
      location.latitude - delta,
      location.longitude + delta,
      location.latitude + delta,
      "EPSG:4326",
    ].join(",");
    const params = new URLSearchParams({
      SERVICE: "WFS",
      VERSION: "2.0.0",
      REQUEST: "GetFeature",
      typeName: "dwd:Warnungen_Gemeinden",
      outputFormat: "application/json",
      srsName: "EPSG:4326",
      BBOX: bbox,
    });
    const data = await fetchJson(`https://maps.dwd.de/geoserver/dwd/ows?${params}`);
    const features = data.features ?? [];
    const containingFeatures = features.filter((feature) => geometryContainsPoint(feature.geometry, location.longitude, location.latitude));
    const selected = containingFeatures.length ? containingFeatures : features;
    return {
      source: "Deutscher Wetterdienst",
      supported: true,
      alerts: selected.map((feature) => {
        const props = feature.properties ?? {};
        return {
          event: props.EVENT,
          headline: props.HEADLINE,
          description: props.DESCRIPTION,
          instruction: props.INSTRUCTION,
          severity: props.SEVERITY,
          urgency: props.URGENCY,
          areaDesc: props.AREADESC || props.NAME,
          effective: props.EFFECTIVE,
          expires: props.EXPIRES,
          senderName: props.SENDERNAME || "Deutscher Wetterdienst",
        };
      }),
    };
  }

  return {
    source: location.countryCode ? `Official provider for ${location.countryCode}` : "Official provider",
    supported: false,
    alerts: [],
  };
}

function geometryContainsPoint(geometry, longitude, latitude) {
  if (!geometry) return false;
  if (geometry.type === "Polygon") {
    return geometry.coordinates.some((ringSet) => pointInRing(longitude, latitude, ringSet[0] ? ringSet : []));
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((polygon) => polygon.some((ring) => pointInRing(longitude, latitude, ring)));
  }
  return false;
}

function pointInRing(longitude, latitude, ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const xi = ring[index][0];
    const yi = ring[index][1];
    const xj = ring[previous][0];
    const yj = ring[previous][1];
    const intersects = ((yi > latitude) !== (yj > latitude)) && (longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}

function warningRank(alert) {
  const severity = alert.severity || "";
  const event = alert.event || "";
  if (/Extreme|Severe/.test(severity) || /Warning|Emergency|Tornado|Flash Flood/i.test(event)) return 3;
  if (/Moderate/.test(severity) || /Watch/i.test(event)) return 2;
  if (/Minor/.test(severity) || /Advisory|Statement/i.test(event)) return 1;
  return 0;
}

function formatAlertDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function renderOfficialWarnings(result) {
  appState.warningContext = result;
  alertCard.classList.remove("is-clear", "is-watch", "is-warning");
  alertCard.setAttribute("aria-expanded", "false");
  els.warningList.innerHTML = "";
  alertCard.style.display = "grid";

  if (!result.supported) {
    alertCard.classList.add("is-watch");
    els.alertTitle.textContent = "Amtliche Warnungen nicht verfuegbar";
    els.alertText.textContent = "Fuer diesen Ort ist noch keine amtliche Warnquelle eingerichtet.";
    return;
  }

  const alerts = [...result.alerts].sort((a, b) => warningRank(b) - warningRank(a));
  if (!alerts.length) {
    alertCard.classList.add("is-clear");
    els.alertTitle.textContent = "Keine amtlichen Warnungen";
    els.alertText.textContent = "Aktuell keine aktiven Warnungen fuer dieses Gebiet.";
    els.warningList.innerHTML = `
      <article class="warning-item">
        <strong>Alles ruhig</strong>
        <span>Tippe hier, um den Warnstatus ein- oder auszuklappen.</span>
      </article>
    `;
    return;
  }

  const top = alerts[0];
  const rank = warningRank(top);
  alertCard.classList.add(rank >= 3 ? "is-warning" : rank >= 2 ? "is-watch" : "is-clear");
  els.alertTitle.textContent = top.event || "Official Weather Alert";
  els.alertText.textContent = `${alerts.length} aktive Warnung${alerts.length === 1 ? "" : "en"} - tippen fuer Details.`;
  els.warningList.innerHTML = alerts.slice(0, 5).map((alert) => `
    <article class="warning-item">
      <strong>${escapeHtml(alert.event || "Weather Alert")}</strong>
      <span>${escapeHtml(alert.areaDesc || "Affected area")} - bis ${escapeHtml(formatAlertDate(alert.expires) || "unbekannt")} - ${escapeHtml(alert.severity || "Severity unknown")}</span>
      <p>${escapeHtml(alert.headline || alert.description || "Keine Beschreibung im Warnkontext.")}</p>
    </article>
  `).join("");
}

function saveWeatherSnapshot(snapshot) {
  try {
    localStorage.setItem(weatherCacheKey, JSON.stringify({
      ...snapshot,
      savedAt: new Date().toISOString(),
      unit: appState.unit,
    }));
  } catch {
    // Local storage can be full or disabled; live weather still works.
  }
}

function loadWeatherSnapshot() {
  try {
    const snapshot = JSON.parse(localStorage.getItem(weatherCacheKey) || "null");
    if (!snapshot?.bundle?.location || !snapshot?.bundle?.weather) return null;
    return snapshot;
  } catch {
    return null;
  }
}

function renderWeatherSnapshot(snapshot, offline = false) {
  if (!snapshot) return false;
  appState.unit = snapshot.unit || appState.unit;
  renderCurrent(snapshot.bundle);
  renderHourly(snapshot.bundle.weather);
  renderDaily(snapshot.bundle.weather);
  if (snapshot.warnings) renderOfficialWarnings(snapshot.warnings);
  if (snapshot.airQuality) renderAirQuality(snapshot.airQuality, snapshot.bundle.location);
  const saved = snapshot.savedAt ? formatShortTime(snapshot.savedAt) : "--";
  setStatus(offline ? `Offline: zeige zuletzt gespeicherte Wetterdaten von ${saved}.` : `Gespeicherte Wetterdaten geladen (${saved}).`, offline);
  return true;
}

function stopSounds() {
  soundState.rain.pause();
  soundState.cloud.pause();
}

async function playSceneSound() {
  stopSounds();
  if (!soundState.enabled) return;
  const audio = soundState.scene === "rain" ? soundState.rain : soundState.scene === "cloud" ? soundState.cloud : null;
  if (!audio) return;
  try {
    audio.currentTime = audio.currentTime || 0;
    await audio.play();
  } catch {
    setStatus("Klicke einmal auf den Sound-Button, damit der Browser Audio freigibt.", true);
  }
}

function setWeatherScene(icon) {
  const scene = icon === "rain" ? "rain" : icon === "cloud" || icon === "fog" ? "cloud" : "clear";
  soundState.scene = scene;
  document.body.classList.toggle("is-raining", scene === "rain");
  document.body.classList.toggle("is-cloudy", scene === "cloud");
  playSceneSound();
}

function buildRaindrops() {
  rainPane.innerHTML = Array.from({ length: 58 }, (_, index) => {
    const width = 5 + (index % 6);
    const height = 22 + ((index * 7) % 42);
    const x = (index * 23) % 101;
    const drift = 34 + ((index * 13) % 56);
    const duration = 2.1 + ((index * 17) % 34) / 10;
    const delay = -((index * 19) % 80) / 10;
    const alpha = 0.22 + ((index * 11) % 52) / 100;
    const blur = index % 5 === 0 ? 0.7 : 0;
    return `<span class="raindrop" style="--x:${x}%;--w:${width}px;--h:${height}px;--drift:${drift}px;--duration:${duration}s;--delay:${delay}s;--alpha:${alpha};--blur:${blur}px"></span>`;
  }).join("");
}

function buildClouds() {
  cloudPane.innerHTML = Array.from({ length: 14 }, (_, index) => {
    const size = 280 + ((index * 87) % 520);
    const x = -14 + ((index * 19) % 112);
    const y = 6 + ((index * 13) % 62);
    const duration = 68 + ((index * 11) % 58);
    const delay = -((index * 17) % 80);
    const alpha = 0.2 + ((index * 9) % 42) / 100;
    return `<span class="cloud-mass" style="--size:${size}px;--x:${x}%;--y:${y}%;--duration:${duration}s;--delay:${delay}s;--alpha:${alpha}"></span>`;
  }).join("");
}

function latLonToTile(latitude, longitude, zoom) {
  const latRad = latitude * Math.PI / 180;
  const scale = 2 ** zoom;
  return {
    x: (longitude + 180) / 360 * scale,
    y: (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * scale,
  };
}

function tileToLatLon(x, y, zoom) {
  const scale = 2 ** zoom;
  const longitude = x / scale * 360 - 180;
  const n = Math.PI - 2 * Math.PI * y / scale;
  const latitude = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { latitude, longitude };
}

function satelliteTileUrl(x, y, zoom) {
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${x}`;
}

function renderTileLayer(container, makeUrl, center, zoom) {
  const tileSize = 256;
  const tilePoint = latLonToTile(center.latitude, center.longitude, zoom);
  const centerTileX = Math.floor(tilePoint.x);
  const centerTileY = Math.floor(tilePoint.y);
  const offsetX = (tilePoint.x - centerTileX) * tileSize;
  const offsetY = (tilePoint.y - centerTileY) * tileSize;
  const mapWidth = container.parentElement.clientWidth || 800;
  const mapHeight = container.parentElement.clientHeight || 520;
  const radiusX = Math.ceil(mapWidth / tileSize / 2) + 1;
  const radiusY = Math.ceil(mapHeight / tileSize / 2) + 1;
  const maxTile = 2 ** zoom;
  const tiles = [];

  for (let dx = -radiusX; dx <= radiusX; dx += 1) {
    for (let dy = -radiusY; dy <= radiusY; dy += 1) {
      const rawX = centerTileX + dx;
      const x = ((rawX % maxTile) + maxTile) % maxTile;
      const y = centerTileY + dy;
      if (y < 0 || y >= maxTile) continue;
      const left = mapWidth / 2 + dx * tileSize - offsetX;
      const top = mapHeight / 2 + dy * tileSize - offsetY;
      tiles.push(`<img src="${makeUrl(x, y, zoom)}" alt="" style="--tile-size:${tileSize}px;--tile-x:${left}px;--tile-y:${top}px" loading="eager" draggable="false" />`);
    }
  }

  container.innerHTML = tiles.join("");
}

function renderBaseMap() {
  if (!radarState.center) return;
  renderTileLayer(
    baseTiles,
    satelliteTileUrl,
    radarState.center,
    radarState.zoom,
  );
}

function renderSimpleMap() {
  if (!mapState.center || !mapState.location) return;
  renderTileLayer(
    mapTiles,
    satelliteTileUrl,
    mapState.center,
    mapState.zoom,
  );
  mapPlace.textContent = mapState.location.name;
  mapLat.textContent = mapState.location.latitude.toFixed(4);
  mapLon.textContent = mapState.location.longitude.toFixed(4);
  mapZoomLabel.textContent = mapState.zoom;
}

function renderRadarFrame() {
  if (!radarState.center || !radarState.api || !radarState.frames.length) return;
  const frame = radarState.frames[radarState.frameIndex];
  renderBaseMap();
  renderTileLayer(
    radarTiles,
    (x, y, zoom) => `${radarState.api.host}${frame.path}/512/${zoom}/${x}/${y}/2/1_1.png`,
    radarState.center,
    radarState.zoom,
  );
  radarTime.textContent = formatRadarTime(frame.time);
  radarZoomLabel.textContent = radarState.zoom;
  radarSlider.value = String(radarState.frameIndex);
  radarLoading.classList.add("is-hidden");
}

async function loadRadar() {
  if (!radarState.location) return;
  radarLoading.textContent = "Lade Radar...";
  radarLoading.classList.remove("is-hidden");
  radarPlace.textContent = radarState.location.name;
  try {
    const api = await fetchJson("https://api.rainviewer.com/public/weather-maps.json");
    radarState.api = api;
    radarState.frames = api.radar?.past ?? [];
    radarState.frameIndex = Math.max(0, radarState.frames.length - 1);
    radarSlider.max = String(Math.max(0, radarState.frames.length - 1));
    radarFrameCount.textContent = `${radarState.frames.length} Frames`;
    if (!radarState.frames.length) throw new Error("Keine Radarframes verfügbar.");
    renderRadarFrame();
  } catch (error) {
    radarLoading.textContent = error.message || "Radar konnte nicht geladen werden.";
  }
}

function setView(view) {
  if (appState.design === "classic") {
    if (view === "radar") {
      view = "home";
      window.setTimeout(() => setClassicPanel("search"), 0);
    } else if (view === "map") {
      view = "home";
      window.setTimeout(() => setClassicPanel("favorites"), 0);
    } else if (view === "chat") {
      view = "home";
    } else if (view !== "home") {
      setClassicPanel(null);
    }
  }
  const isRadar = view === "radar";
  const isMap = view === "map";
  const isSettings = view === "settings";
  const isChat = view === "chat";
  document.body.classList.toggle("view-radar", isRadar);
  document.body.classList.toggle("view-map", isMap);
  document.body.classList.toggle("view-settings", isSettings);
  document.body.classList.toggle("view-chat", isChat);
  homeTab.classList.toggle("active", view === "home");
  radarTab.classList.toggle("active", isRadar);
  mapTab.classList.toggle("active", isMap);
  settingsTab.classList.toggle("active", isSettings);
  document.body.classList.remove("menu-open");
  if (!isRadar && radarState.playing) toggleRadarPlayback();
  if (isRadar) loadRadar();
  if (isMap) renderSimpleMap();
}

function toggleRadarPlayback() {
  radarState.playing = !radarState.playing;
  radarPlay.classList.toggle("is-active", radarState.playing);
  radarPlay.setAttribute("aria-label", radarState.playing ? "Radar Animation pausieren" : "Radar Animation starten");
  if (!radarState.playing) {
    window.clearInterval(radarState.timer);
    radarState.timer = null;
    return;
  }
  radarState.timer = window.setInterval(() => {
    if (!radarState.frames.length) return;
    radarState.frameIndex = (radarState.frameIndex + 1) % radarState.frames.length;
    renderRadarFrame();
  }, 750);
}

function panMapState(state, deltaX, deltaY) {
  if (!state.center) return;
  const tilePoint = latLonToTile(state.center.latitude, state.center.longitude, state.zoom);
  const tileSize = 512;
  const nextTile = {
    x: tilePoint.x - deltaX / tileSize,
    y: tilePoint.y - deltaY / tileSize,
  };
  const next = tileToLatLon(nextTile.x, nextTile.y, state.zoom);
  state.center = {
    latitude: Math.max(-85, Math.min(85, next.latitude)),
    longitude: ((next.longitude + 540) % 360) - 180,
  };
}

function attachMapDragging(element, state, render) {
  const drag = {
    active: false,
    pointerId: null,
    x: 0,
    y: 0,
  };

  element.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button, input, a")) return;
    drag.active = true;
    drag.pointerId = event.pointerId;
    drag.x = event.clientX;
    drag.y = event.clientY;
    element.classList.add("is-dragging");
    element.setPointerCapture(event.pointerId);
  });

  element.addEventListener("pointermove", (event) => {
    if (!drag.active || event.pointerId !== drag.pointerId) return;
    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    panMapState(state, deltaX, deltaY);
    render();
  });

  function endDrag(event) {
    if (event.pointerId !== drag.pointerId) return;
    drag.active = false;
    drag.pointerId = null;
    element.classList.remove("is-dragging");
  }

  element.addEventListener("pointerup", endDrag);
  element.addEventListener("pointercancel", endDrag);
}

function attachMapWheelZoom(element, state, render, minZoom = 2, maxZoom = 18) {
  element.addEventListener("wheel", (event) => {
    if (!state.center) return;
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    const nextZoom = Math.max(minZoom, Math.min(maxZoom, state.zoom + direction));
    if (nextZoom === state.zoom) return;
    state.zoom = nextZoom;
    render();
  }, { passive: false });
}

function isRadarFullscreen() {
  return document.fullscreenElement === radarCard || radarCard.classList.contains("is-fullscreen");
}

function updateRadarFullscreenState() {
  const active = isRadarFullscreen();
  radarCard.classList.toggle("is-fullscreen", active);
  document.body.classList.toggle("radar-fullscreen-open", active);
  radarFullscreen.setAttribute("aria-label", active ? "Radar-Vollbild schließen" : "Radar im Vollbild öffnen");
  radarFullscreen.title = active ? "Vollbild schließen" : "Vollbild";
  window.setTimeout(renderRadarFrame, 80);
}

async function toggleRadarFullscreen() {
  try {
    if (document.fullscreenElement === radarCard) {
      await document.exitFullscreen();
      return;
    }
    if (radarCard.requestFullscreen) {
      await radarCard.requestFullscreen();
      return;
    }
  } catch {
    // Fallback below keeps fullscreen usable when the browser blocks the API.
  }
  radarCard.classList.toggle("is-fullscreen");
  updateRadarFullscreenState();
}

function renderCurrent({ location, weather }) {
  const current = weather.current;
  const daily = weather.daily;
  const [condition, icon] = describe(current.weather_code);
  const high = round(daily.temperature_2m_max[0]);
  const low = round(daily.temperature_2m_min[0]);
  const rainChance = round(daily.precipitation_probability_max[0]);
  const wind = round(current.wind_speed_10m);
  const uv = round(daily.uv_index_max[0]);
  appState.weatherContext = {
    location,
    current: {
      condition,
      temperature: round(current.temperature_2m),
      apparentTemperature: round(current.apparent_temperature),
      humidity: round(current.relative_humidity_2m),
      precipitationMm: Number(current.precipitation || 0).toFixed(1),
      rain: round(current.rain),
      windSpeed: wind,
      windDirection: windDirection(current.wind_direction_10m),
      pressure: round(current.pressure_msl),
      visibilityKm: Number(current.visibility / 1000).toFixed(1),
      cloudCover: round(current.cloud_cover),
      weatherCode: current.weather_code,
    },
    today: {
      high,
      low,
      rainChance,
      uv,
      sunrise: daily.sunrise?.[0],
      sunset: daily.sunset?.[0],
    },
    hourly: weather.hourly.time.slice(0, 24).map((time, index) => ({
      time,
      temperature: round(weather.hourly.temperature_2m[index]),
      rainChance: round(weather.hourly.precipitation_probability[index]),
      condition: describe(weather.hourly.weather_code[index])[0],
    })),
    daily: weather.daily.time.map((time, index) => ({
      time,
      high: round(weather.daily.temperature_2m_max[index]),
      low: round(weather.daily.temperature_2m_min[index]),
      rainChance: round(weather.daily.precipitation_probability_max[index]),
      condition: describe(weather.daily.weather_code[index])[0],
    })),
    units: appState.unit === "metric" ? { temperature: "C", wind: "km/h" } : { temperature: "F", wind: "mph" },
  };

  weatherArt.className = `weather-art ${icon}`;
  setWeatherScene(icon);
  radarState.location = location;
  radarState.center = { latitude: location.latitude, longitude: location.longitude };
  mapState.location = location;
  mapState.center = { latitude: location.latitude, longitude: location.longitude };
  appState.lastLocation = location;
  radarPlace.textContent = location.name;
  mapPlace.textContent = location.name;
  menuPanel.querySelector("#menuLocation").textContent = location.name;
  settingsLocation.textContent = [location.name, location.region, location.country].filter(Boolean).join(", ");
  if (document.body.classList.contains("view-radar")) loadRadar();
  if (document.body.classList.contains("view-map")) renderSimpleMap();

  input.value = location.name;
  els.countryName.textContent = [location.region, location.country].filter(Boolean).join(", ") || "Current location";
  els.conditionText.textContent = condition;
  els.currentTemp.textContent = round(current.temperature_2m);
  els.feelsLike.textContent = round(current.apparent_temperature);
  els.highTemp.textContent = high;
  els.lowTemp.textContent = low;
  els.miniHigh.textContent = high;
  els.miniLow.textContent = low;
  els.miniCondition.textContent = condition;
  els.rainChance.textContent = rainChance;
  els.miniWind.textContent = wind;
  els.miniWindUnit.textContent = appState.unit === "metric" ? "km/h" : "mph";
  els.windValue.textContent = wind;
  els.windUnit.textContent = appState.unit === "metric" ? "km/h" : "mph";
  els.windDirection.textContent = windDirection(current.wind_direction_10m);
  els.humidityValue.textContent = `${round(current.relative_humidity_2m)}%`;
  els.uvValue.textContent = uv;
  els.uvLabel.textContent = uvLabel(uv);
  els.pressureValue.textContent = Number.isFinite(Number(current.pressure_msl)) ? round(current.pressure_msl) : "--";
  els.visibilityValue.textContent = Number.isFinite(Number(current.visibility)) ? (current.visibility / 1000).toFixed(1) : "--";
  els.precipValue.textContent = Number.isFinite(Number(current.precipitation)) ? Number(current.precipitation).toFixed(1) : "--";
  els.cloudValue.textContent = Number.isFinite(Number(current.cloud_cover)) ? round(current.cloud_cover) : "--";
  els.sunriseValue.textContent = `Rise ${formatShortTime(daily.sunrise?.[0])}`;
  els.sunsetValue.textContent = `Set ${formatShortTime(daily.sunset?.[0])}`;
  renderClassicCurrent({ location, weather, condition, icon, high, low, rainChance, wind });

}

function formatClassicDayTime(value = new Date()) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

function renderClassicCurrent({ location, weather, condition, rainChance, wind }) {
  const current = weather.current;
  const city = location.name || "Aktueller Ort";
  const unitSuffix = appState.unit === "metric" ? "C" : "F";
  classicEls.appTitle.textContent = `Wetter in ${city}`;
  classicEls.place.textContent = city;
  classicEls.temp.textContent = round(current.temperature_2m);
  classicEls.condition.textContent = condition === "Clear Sky" || condition === "Mostly Clear" ? "Sonnig" : condition;
  classicEls.time.textContent = formatClassicDayTime(new Date());
  classicEls.wind.textContent = wind;
  classicEls.windDirection.textContent = `aus ${windDirection(current.wind_direction_10m)}`;
  classicEls.humidity.textContent = round(current.relative_humidity_2m);
  classicEls.feels.textContent = round(current.apparent_temperature);
  classicEls.rain.textContent = rainChance;
  classicEls.hourly.dataset.unit = unitSuffix;
}

function appendChatMessage(role, content) {
  const article = document.createElement("article");
  article.className = `chat-message ${role}`;
  article.textContent = content;
  chatMessages.appendChild(article);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return article;
}

function openChat() {
  if (appState.design === "classic") return;
  setView("chat");
  chatPanel.setAttribute("aria-hidden", "false");
  chatInput.focus();
}

function chatContext() {
  return {
    weather: appState.weatherContext,
    warnings: appState.warningContext,
    radar: {
      frames: radarState.frames.length,
      zoom: radarState.zoom,
      center: radarState.center,
    },
    map: {
      zoom: mapState.zoom,
      center: mapState.center,
    },
  };
}

async function sendChatMessage(message) {
  appState.chatMessages.push({ role: "user", content: message });
  appendChatMessage("user", message);
  const pending = appendChatMessage("assistant", "Analysiere Wetterdaten...");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: appState.chatMessages.slice(-12),
        context: chatContext(),
      }),
    });
    const data = await parseJsonResponse(response);
    if (!response.ok) throw new Error(data.error || "Chat konnte nicht antworten.");
    pending.textContent = data.reply;
    appState.chatMessages.push({ role: "assistant", content: data.reply });
  } catch (error) {
    pending.textContent = error.message || "Chat konnte nicht antworten.";
  }
}

function renderAirQuality(data, location) {
  const current = data.current ?? {};
  const rawValue = location.countryCode === "US" ? current.us_aqi : current.european_aqi || current.us_aqi;
  const value = round(rawValue);
  els.airQualityValue.textContent = Number.isFinite(value) ? value : "--";
  els.airQualityLabel.textContent = airQualityLabel(value);
}

function renderHourly(weather) {
  const now = Date.now();
  const startIndex = weather.hourly.time.findIndex((time) => new Date(time).getTime() >= now - 60 * 60 * 1000);
  const start = Math.max(startIndex, 0);
  const hours = weather.hourly.time.slice(start, start + 7);

  hourlyStrip.innerHTML = hours.map((time, index) => {
    const realIndex = start + index;
    const [condition, icon] = describe(weather.hourly.weather_code[realIndex]);
    return `
      <article class="hour-card" title="${condition}">
        <time datetime="${time}">${index === 0 ? "NOW" : formatHour(time)}</time>
        <span class="weather-art ${icon}" aria-hidden="true"></span>
        <strong>${round(weather.hourly.temperature_2m[realIndex])}°</strong>
      </article>
    `;
  }).join("");
  renderClassicHourly(weather, start, hours);
}

function renderClassicHourly(weather, start, hours) {
  classicEls.hourly.innerHTML = hours.slice(0, 6).map((time, index) => {
    const realIndex = start + index;
    const [condition, icon] = describe(weather.hourly.weather_code[realIndex]);
    return `
      <article class="classic-hour-card ${index === 0 ? "is-active" : ""}" title="${condition}">
        <time datetime="${time}">${formatShortTime(time).replace(":00", ":00")}</time>
        <span class="weather-art ${icon}" aria-hidden="true"></span>
        <strong>${round(weather.hourly.temperature_2m[realIndex])}°</strong>
      </article>
    `;
  }).join("");
}

function renderDaily(weather) {
  dailyList.innerHTML = weather.daily.time.map((day, index) => {
    const [, icon] = describe(weather.daily.weather_code[index]);
    const low = round(weather.daily.temperature_2m_min[index]);
    const high = round(weather.daily.temperature_2m_max[index]);
    return `
      <article class="day-card">
        <time datetime="${day}">${formatDay(day)}</time>
        <span class="weather-art ${icon}" aria-hidden="true"></span>
        <span class="temp-range">
          <span>${low}°</span>
          <span class="temp-bar"></span>
          <span>${high}°</span>
        </span>
      </article>
    `;
  }).join("");
}

async function loadByLocation(location) {
  try {
    setStatus("Aktualisiere Wetterdaten...");
    const bundle = await fetchWeather(location);
    renderCurrent(bundle);
    renderHourly(bundle.weather);
    renderDaily(bundle.weather);
    const warnings = await fetchOfficialWarnings(location);
    renderOfficialWarnings(warnings);
    let airQuality = null;
    try {
      airQuality = await fetchAirQuality(location);
      renderAirQuality(airQuality, location);
    } catch {
      els.airQualityValue.textContent = "--";
      els.airQualityLabel.textContent = "Unavailable";
    }
    saveWeatherSnapshot({ bundle, warnings, airQuality });
    setStatus("Wetterdaten aktualisiert");
  } catch (error) {
    if (renderWeatherSnapshot(loadWeatherSnapshot(), true)) return;
    setStatus(error.message || "Wetterdaten konnten nicht geladen werden.", true);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (searchState.activeIndex >= 0 && searchState.suggestions[searchState.activeIndex]) {
    await chooseSuggestion(searchState.suggestions[searchState.activeIndex]);
    return;
  }
  const city = input.value.trim();
  if (city.length < 2) {
    setStatus("Bitte gib mindestens zwei Zeichen ein.", true);
    return;
  }
  try {
    setStatus("Suche Ort...");
    await loadByLocation(parseCoordinateInput(city) || await geocodeCity(city));
  } catch (error) {
    setStatus(error.message || "Ort konnte nicht geladen werden.", true);
  }
});

input.addEventListener("input", queueSuggestions);
input.addEventListener("focus", queueSuggestions);
input.addEventListener("keydown", async (event) => {
  if (!suggestionsPanel.classList.contains("is-open")) return;
  if (event.key === "ArrowDown") {
    event.preventDefault();
    setActiveSuggestion(searchState.activeIndex + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setActiveSuggestion(searchState.activeIndex - 1);
  } else if (event.key === "Enter" && searchState.activeIndex >= 0) {
    event.preventDefault();
    await chooseSuggestion(searchState.suggestions[searchState.activeIndex]);
  } else if (event.key === "Escape") {
    suggestionsPanel.classList.remove("is-open");
  }
});

suggestionsPanel.addEventListener("pointerdown", async (event) => {
  const item = event.target.closest(".suggestion-item");
  if (!item) return;
  event.preventDefault();
  await chooseSuggestion(searchState.suggestions[Number(item.dataset.index)]);
});

document.addEventListener("pointerdown", (event) => {
  if (!form.contains(event.target)) suggestionsPanel.classList.remove("is-open");
});

function toggleWarnings() {
  const expanded = !alertCard.classList.contains("is-expanded");
  alertCard.classList.toggle("is-expanded", expanded);
  alertCard.setAttribute("aria-expanded", String(expanded));
}

alertCard.addEventListener("click", toggleWarnings);
alertCard.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  toggleWarnings();
});

geoButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("Dein Browser unterstuetzt Standortabfrage nicht.", true);
    return;
  }
  setStatus("Frage Standort ab...");
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    await loadByLocation({
      name: "Current Location",
      country: "",
      region: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
      latitude,
      longitude,
    });
  }, () => {
    setStatus("Standort wurde nicht freigegeben.", true);
  }, { enableHighAccuracy: true, timeout: 9000 });
});

soundButton.addEventListener("click", async () => {
  soundState.enabled = !soundState.enabled;
  soundButton.classList.toggle("is-active", soundState.enabled);
  settingsSound.classList.toggle("is-on", soundState.enabled);
  settingsSound.setAttribute("aria-pressed", String(soundState.enabled));
  soundButton.setAttribute("aria-pressed", String(soundState.enabled));
  soundButton.title = soundState.enabled ? "Wettersound ausschalten" : "Wettersound einschalten";
  soundButton.setAttribute("aria-label", soundButton.title);
  if (soundState.enabled) {
    await playSceneSound();
  } else {
    stopSounds();
  }
});

homeTab.addEventListener("click", () => setView("home"));
radarTab.addEventListener("click", () => setView("radar"));
centerWeatherButton.addEventListener("click", openChat);
mapTab.addEventListener("click", () => setView("map"));
settingsTab.addEventListener("click", () => setView("settings"));
homeTab.addEventListener("click", (event) => {
  if (appState.design !== "classic") return;
  event.stopImmediatePropagation();
  setClassicPanel(null);
  setView("home");
}, true);
radarTab.addEventListener("click", (event) => {
  if (appState.design !== "classic") return;
  event.stopImmediatePropagation();
  setView("home");
  setClassicPanel("search");
}, true);
mapTab.addEventListener("click", (event) => {
  if (appState.design !== "classic") return;
  event.stopImmediatePropagation();
  setView("home");
  setClassicPanel("favorites");
}, true);
radarRefresh.addEventListener("click", loadRadar);
radarRecenter.addEventListener("click", () => {
  if (!radarState.location) return;
  radarState.center = { latitude: radarState.location.latitude, longitude: radarState.location.longitude };
  renderRadarFrame();
});
radarFullscreen.addEventListener("click", toggleRadarFullscreen);
document.addEventListener("fullscreenchange", updateRadarFullscreenState);
radarPlay.addEventListener("click", toggleRadarPlayback);
radarSlider.addEventListener("input", () => {
  radarState.frameIndex = Number(radarSlider.value);
  renderRadarFrame();
});
radarZoomIn.addEventListener("click", () => {
  radarState.zoom = Math.min(10, radarState.zoom + 1);
  renderRadarFrame();
});
radarZoomOut.addEventListener("click", () => {
  radarState.zoom = Math.max(2, radarState.zoom - 1);
  renderRadarFrame();
});
mapZoomIn.addEventListener("click", () => {
  mapState.zoom = Math.min(18, mapState.zoom + 1);
  renderSimpleMap();
});
mapZoomOut.addEventListener("click", () => {
  mapState.zoom = Math.max(2, mapState.zoom - 1);
  renderSimpleMap();
});
mapRecenter.addEventListener("click", () => {
  if (!mapState.location) return;
  mapState.center = { latitude: mapState.location.latitude, longitude: mapState.location.longitude };
  renderSimpleMap();
});
menuButton.addEventListener("click", () => document.body.classList.toggle("menu-open"));
menuClose.addEventListener("click", () => document.body.classList.remove("menu-open"));
menuPanel.querySelectorAll("[data-menu-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.menuView));
});
classicEls.searchButton.addEventListener("click", () => {
  setView("home");
  setClassicPanel(document.body.classList.contains("classic-search-open") ? null : "search");
});
classicEls.settingsButton.addEventListener("click", () => setView("settings"));
classicEls.searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = classicState.searchResults[0];
  if (!location) return;
  await loadByLocation(location);
  setClassicPanel(null);
});
classicEls.searchInput.addEventListener("input", queueClassicSearch);
classicEls.searchResults.addEventListener("click", async (event) => {
  const heart = event.target.closest("[data-classic-heart]");
  if (heart) {
    toggleClassicFavorite(classicState.searchResults[Number(heart.dataset.classicHeart)]);
    return;
  }
  const result = event.target.closest("[data-classic-result]");
  if (!result) return;
  await loadByLocation(classicState.searchResults[Number(result.dataset.classicResult)]);
  setClassicPanel(null);
});
classicEls.favoritesPanel.addEventListener("click", async (event) => {
  const remove = event.target.closest("[data-classic-remove]");
  if (remove) {
    classicState.favorites.splice(Number(remove.dataset.classicRemove), 1);
    saveClassicFavorites();
    renderClassicFavorites();
    return;
  }
  const favorite = event.target.closest("[data-classic-favorite]");
  if (!favorite) return;
  await loadByLocation(classicState.favorites[Number(favorite.dataset.classicFavorite)]);
  setClassicPanel(null);
});
settingsSound.addEventListener("click", () => soundButton.click());
settingsAnimations.addEventListener("click", () => {
  const enabled = !document.body.classList.toggle("reduce-motion");
  settingsAnimations.classList.toggle("is-on", enabled);
  settingsAnimations.setAttribute("aria-pressed", String(enabled));
});
unitButton.addEventListener("click", () => {
  appState.unit = appState.unit === "metric" ? "imperial" : "metric";
  unitButton.textContent = appState.unit === "metric" ? "Metric" : "Imperial";
  unitLabel.textContent = appState.unit === "metric" ? "Celsius / km/h" : "Fahrenheit / mph";
  if (appState.lastLocation) loadByLocation(appState.lastLocation);
});
designButton.addEventListener("click", () => {
  const previousDesign = appState.design;
  appState.design = appState.design === "modern" ? "sketch" : appState.design === "sketch" ? "classic" : "modern";
  applyDesign();
  if (appState.design === "classic" && previousDesign !== "classic") {
    window.location.reload();
  }
});
settingsLocate.addEventListener("click", () => geoButton.click());
privacyLocate.addEventListener("click", () => geoButton.click());
languageButton.addEventListener("click", () => {
  appState.language = appState.language === "de" ? "en" : "de";
  languageButton.textContent = appState.language.toUpperCase();
  languageLabel.textContent = appState.language === "de" ? "Deutsch" : "English";
  setStatus(appState.language === "de" ? "Sprache auf Deutsch gesetzt" : "Language set to English");
});
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  chatInput.value = "";
  await sendChatMessage(message);
});
window.addEventListener("resize", () => {
  updateDeviceLayout();
  if (document.body.classList.contains("view-radar")) renderRadarFrame();
  if (document.body.classList.contains("view-map")) renderSimpleMap();
});
window.addEventListener("orientationchange", () => {
  window.setTimeout(() => {
    updateDeviceLayout();
    if (document.body.classList.contains("view-radar")) renderRadarFrame();
    if (document.body.classList.contains("view-map")) renderSimpleMap();
  }, 220);
});

attachMapDragging(radarMap, radarState, renderRadarFrame);
attachMapDragging(document.querySelector("#simpleMap"), mapState, renderSimpleMap);
attachMapWheelZoom(radarMap, radarState, renderRadarFrame, 2, 10);
attachMapWheelZoom(document.querySelector("#simpleMap"), mapState, renderSimpleMap, 2, 18);

buildRaindrops();
buildClouds();
applyDesign();
renderWeatherSnapshot(loadWeatherSnapshot());
geocodeCity(input.value).then(loadByLocation).catch((error) => {
  if (renderWeatherSnapshot(loadWeatherSnapshot(), true)) return;
  setStatus(error.message, true);
});
