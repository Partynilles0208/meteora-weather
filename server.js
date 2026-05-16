const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env"));

const port = Number(process.env.PORT || 5174);
const groqKey = process.env.GROQ_API_KEY || process.env.QROK_API_KEY;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".svg": "image/svg+xml",
};

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { error: { message: text.slice(0, 500) } };
  }
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function weatherSummary(context) {
  const weather = context?.weather;
  const warnings = context?.warnings;
  return JSON.stringify({
    weather,
    warnings: warnings ? {
      supported: warnings.supported,
      alertCount: warnings.alerts?.length ?? 0,
      alerts: warnings.alerts?.slice(0, 5),
    } : null,
    radar: context?.radar,
    map: context?.map,
  }, null, 2);
}

async function handleChat(request, response) {
  if (!groqKey) {
    sendJson(response, 500, {
      error: "GROQ_API_KEY fehlt. Setze den Key als Umgebungsvariable und starte den Node-Server neu.",
    });
    return;
  }

  try {
    const payload = JSON.parse(await readBody(request));
    const userMessages = Array.isArray(payload.messages) ? payload.messages.slice(-12) : [];
    const system = [
      "Du bist ein deutschsprachiger Wetterassistent in einer Wetter-App.",
      "Du darfst nur die mitgelieferten Wetterdaten, Warnungen, Radar- und Karteninformationen aus dem Kontext benutzen.",
      "Erkläre Wetter, Regenrisiko, Wind, Luftqualität, Tagesverlauf und amtliche Warnungen verständlich und praktisch.",
      "Wenn Warnungen leer sind, sage, dass aktuell keine aktiven Warnungen im Kontext stehen.",
      "Nenne keine technischen Datenquellen oder API-Namen.",
      "Halte Antworten kurz, konkret und hilfreich.",
      `Aktueller App-Kontext:\n${weatherSummary(payload.context)}`,
    ].join("\n");

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: system },
          ...userMessages.map((message) => ({
            role: message.role === "assistant" ? "assistant" : "user",
            content: String(message.content || "").slice(0, 4000),
          })),
        ],
        temperature: 0.3,
        max_tokens: 700,
      }),
    });

    const data = await readJsonResponse(groqResponse);
    if (!groqResponse.ok) {
      sendJson(response, groqResponse.status, { error: data?.error?.message || "Groq Chat API Fehler." });
      return;
    }

    sendJson(response, 200, { reply: data?.choices?.[0]?.message?.content || "Ich konnte keine Antwort erzeugen." });
  } catch (error) {
    sendJson(response, 500, { error: error.message || "Chat-Server Fehler." });
  }
}

function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.resolve(root, `.${requestedPath}`);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/chat") {
    handleChat(request, response);
    return;
  }
  if (request.method === "GET" || request.method === "HEAD") {
    serveStatic(request, response);
    return;
  }
  response.writeHead(405);
  response.end("Method not allowed");
});

server.listen(port, () => {
  console.log(`Meteora server running at http://localhost:${port}`);
});
