const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(path.join(root, "osaka")).filter((file) => path.basename(file) === "index.html");
const bad = [];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");

  if (!html.includes("<title>") || !html.includes('<link rel="canonical"') || !html.includes("<h1>")) {
    bad.push(["missing-required-meta", file]);
  }

  if (/undefined|NaN|\[object Object\]/.test(html)) {
    bad.push(["unexpanded-token", file]);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      bad.push(["invalid-jsonld", file, error.message]);
    }
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];

    if (/^(https?:|#|mailto:|tel:)/.test(href)) {
      continue;
    }

    const target = path.resolve(path.dirname(file), href);
    const fileToCheck = href.endsWith("/") ? path.join(target, "index.html") : target;

    if (!fs.existsSync(fileToCheck)) {
      bad.push(["missing-relative-link-target", file, href, fileToCheck]);
    }
  }
}

console.log(JSON.stringify({ htmlFiles: files.length, bad }, null, 2));

if (bad.length) {
  process.exit(1);
}
