const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "dist");

const files = [
  "index.html",
  "app.js",
  "styles.css",
  "PixVerse_V6_Image_Text_360P_ich_will_das_es_si.mp4",
  "Video Project (1).mp4",
  "creatorshome-mountain-wind-371074.mp3",
  "dreamingrelaxation-intense-rain-city-night-171461.mp3",
];

function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(out, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(out, relativePath);
  fs.cpSync(source, target, { recursive: true });
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) copyFile(file);
copyDir("assets");

console.log("Built static app into dist/");
