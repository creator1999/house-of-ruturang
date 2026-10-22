// Generates elegant placeholder imagery for the RUTURANG storefront.
//
// Every image is a clearly-marked demonstration placeholder (muted washes,
// the RUTURANG wordmark and an "image coming soon" caption) — never a real
// saree presented as inventory. Replace the SVGs with real photography later
// and update the paths in src/lib/products.ts.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = join(__dirname, "..", "public", "images", "products");
const EDITORIAL_DIR = join(__dirname, "..", "public", "images", "editorial");

// Muted, desaturated tones drawn from the brand palette — subtle by design.
const products = [
  { slug: "banarasi-maroon", name: "Banarasi Silk Saree", tone: "#6E3A44" },
  { slug: "kanjivaram-emerald", name: "Kanjivaram Silk Saree", tone: "#4E6B5C" },
  { slug: "paithani-peacock", name: "Paithani Silk Saree", tone: "#3F6B6A" },
  { slug: "banarasi-rose-gold", name: "Banarasi Silk Saree", tone: "#B07A72" },
  { slug: "chanderi-blush", name: "Chanderi Cotton-Silk Saree", tone: "#C89A94" },
  { slug: "georgette-sapphire", name: "Georgette Embroidered Saree", tone: "#56627F" },
  { slug: "handloom-indigo", name: "Handloom Cotton Saree", tone: "#4E5680" },
  { slug: "organza-ivory", name: "Organza Silk Saree", tone: "#C2B49A" },
];

const GOLD = "#B69A74";
const IVORY = "#FAF7F2";
const INK = "#282323";
const MUTED = "#786D68";

const shots = [
  { key: "1", label: "FRONT VIEW", variant: "front" },
  { key: "2", label: "PALLU DETAIL", variant: "detail" },
  { key: "3", label: "FABRIC CLOSE-UP", variant: "fabric" },
];

function productSvg({ name, tone }, shot) {
  const dense = shot.variant === "fabric";
  const dotOpacity = dense ? "0.10" : "0.05";
  const motifY = shot.variant === "detail" ? 560 : 418;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" role="img" aria-label="${name} — ${shot.label.toLowerCase()}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${tone}" stop-opacity="0.20"/>
      <stop offset="0.55" stop-color="${tone}" stop-opacity="0.07"/>
      <stop offset="1" stop-color="${tone}" stop-opacity="0.13"/>
    </linearGradient>
    <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.4" fill="${tone}" opacity="${dotOpacity}"/>
    </pattern>
  </defs>

  <rect width="800" height="1000" fill="${IVORY}"/>
  <rect width="800" height="1000" fill="url(#wash)"/>
  <rect width="800" height="1000" fill="url(#dots)"/>

  <!-- soft drape curve -->
  <path d="M0 700 C 220 640, 420 740, 800 650 L 800 1000 L 0 1000 Z" fill="${tone}" opacity="0.06"/>

  <!-- gold double frame -->
  <rect x="36" y="36" width="728" height="928" fill="none" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="2"/>
  <rect x="46" y="46" width="708" height="908" fill="none" stroke="${GOLD}" stroke-opacity="0.22" stroke-width="1"/>

  <!-- center motif -->
  <g fill="none" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2">
    <rect x="340" y="${motifY - 58}" width="120" height="120" transform="rotate(45 400 ${motifY})"/>
    <rect x="358" y="${motifY - 40}" width="84" height="84" transform="rotate(45 400 ${motifY})"/>
    <circle cx="400" cy="${motifY}" r="9" fill="${GOLD}" fill-opacity="0.5" stroke="none"/>
  </g>

  <text x="400" y="300" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="44" fill="${INK}">${name}</text>
  <line x1="340" y1="${shot.variant === 'detail' ? 700 : 560}" x2="460" y2="${shot.variant === 'detail' ? 700 : 560}" stroke="${GOLD}" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="400" y="${shot.variant === 'detail' ? 726 : 586}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="4" fill="${MUTED}">${shot.label}</text>
  <text x="400" y="898" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="3" fill="${MUTED}" opacity="0.85">IMAGE COMING SOON</text>
  <text x="400" y="936" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" letter-spacing="8" fill="${GOLD}">RUTURANG</text>
</svg>
`;
}

function editorialSvg({ label, tone, width, height }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${tone}" stop-opacity="0.24"/>
      <stop offset="0.6" stop-color="${tone}" stop-opacity="0.06"/>
      <stop offset="1" stop-color="${tone}" stop-opacity="0.14"/>
    </linearGradient>
    <pattern id="dots" width="46" height="46" patternUnits="userSpaceOnUse">
      <circle cx="23" cy="23" r="1.4" fill="${tone}" opacity="0.06"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="${IVORY}"/>
  <rect width="${width}" height="${height}" fill="url(#wash)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>

  <!-- soft drape curves -->
  <path d="M0 ${height * 0.72} C ${width * 0.3} ${height * 0.62}, ${width * 0.6} ${height * 0.78}, ${width} ${height * 0.66} L ${width} ${height} L 0 ${height} Z" fill="${tone}" opacity="0.07"/>

  <!-- hairline frame -->
  <rect x="${width * 0.045}" y="${height * 0.045}" width="${width * 0.91}" height="${height * 0.91}" fill="none" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.5"/>

  <!-- ornament -->
  <g fill="none" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2">
    <rect x="${width / 2 - 60}" y="${height / 2 - 60}" width="120" height="120" transform="rotate(45 ${width / 2} ${height / 2})"/>
    <circle cx="${width / 2}" cy="${height / 2}" r="9" fill="${GOLD}" fill-opacity="0.5" stroke="none"/>
  </g>

  <text x="${width / 2}" y="${height / 2 - 90}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(width * 0.055)}" letter-spacing="6" fill="${INK}">${label}</text>
  <text x="${width / 2}" y="${height * 0.92}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="12" letter-spacing="3" fill="${MUTED}">IMAGE COMING SOON</text>
  <text x="${width / 2}" y="${height * 0.955}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" letter-spacing="8" fill="${GOLD}">RUTURANG</text>
</svg>
`;
}

mkdirSync(PRODUCTS_DIR, { recursive: true });
for (const p of products) {
  for (const shot of shots) {
    writeFileSync(
      join(PRODUCTS_DIR, `${p.slug}-${shot.key}.svg`),
      productSvg(p, shot),
    );
  }
  console.log(`wrote ${p.slug} (3 views)`);
}

mkdirSync(EDITORIAL_DIR, { recursive: true });
const editorial = [
  { file: "hero", label: "DRAPED IN TRADITION", tone: "#7A4552", width: 900, height: 1200 },
  { file: "story", label: "THE HOUSE OF RUTURANG", tone: "#A98A5E", width: 900, height: 1100 },
  { file: "signature", label: "THE SIGNATURE EDIT", tone: "#6E4A5A", width: 1600, height: 900 },
];
for (const e of editorial) {
  writeFileSync(join(EDITORIAL_DIR, `${e.file}.svg`), editorialSvg(e));
  console.log(`wrote editorial/${e.file}.svg`);
}

console.log(
  `Done. ${products.length * shots.length} product + ${editorial.length} editorial images written.`,
);
