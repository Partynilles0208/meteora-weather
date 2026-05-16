const groqKey = process.env.GROQ_API_KEY || process.env.QROK_API_KEY;

function sendJson(response, status, body) {
  response.status(status).json(body);
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

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (!groqKey) {
    sendJson(response, 500, {
      error: "GROQ_API_KEY fehlt. Setze den Key in den Vercel Environment Variables.",
    });
    return;
  }

  try {
    const payload = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
    const userMessages = Array.isArray(payload.messages) ? payload.messages.slice(-12) : [];
    const system = [
      "Du bist ein deutschsprachiger Wetterassistent in einer Wetter-App.",
      "Du darfst nur die mitgelieferten Wetterdaten, Warnungen, Radar- und Karteninformationen aus dem Kontext benutzen.",
      "Erklaere Wetter, Regenrisiko, Wind, Luftqualitaet, Tagesverlauf und amtliche Warnungen verstaendlich und praktisch.",
      "Wenn Warnungen leer sind, sage, dass aktuell keine aktiven Warnungen im Kontext stehen.",
      "Nenne keine technischen Datenquellen oder API-Namen.",
      "Halte Antworten kurz, konkret und hilfreich.",
      `Aktueller App-Kontext:\n${weatherSummary(payload.context)}`,
    ].join("\n");

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqKey}`,
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
};
