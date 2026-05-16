# Meteora Weather

Eine lokale Wetter-App mit mehreren Designs:

- Modernes Gewitter-Design
- Kritzel-Design
- Klasisch-Design
- Wetterdaten, Vorhersage, Warnungen, Karte und Satellit/Regen-Ansicht
- Offline-Anzeige der zuletzt geladenen Wetterdaten
- WebView-freundliches Handy-/Tablet-Hochformat
- Optionaler Wetter-Chat ueber einen lokalen Server

## Starten

```bash
npm start
```

Dann im Browser oeffnen:

```text
http://localhost:5174
```

## Optional: Wetter-Chat

Der Wetter-Chat braucht einen Groq API-Key. Lege lokal eine `.env` Datei an:

```bash
GROQ_API_KEY=dein_key
```

Die `.env` Datei wird von Git ignoriert.

## Checks

```bash
npm run check
```
