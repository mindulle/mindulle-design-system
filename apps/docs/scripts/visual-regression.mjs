import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(DOCS_DIR, 'out');
const BASELINE_DIR = path.join(DOCS_DIR, 'tests', 'visual-baselines');
const DIFF_DIR = path.join(DOCS_DIR, 'tests', 'visual-diffs');

const UPDATE = process.env.UPDATE_BASELINES === '1' || process.argv.includes('--update');
const MAX_DIFF_RATIO = Number(process.env.VISUAL_MAX_DIFF_RATIO ?? '0.005');

const TARGET_PAGES = [
  { name: 'archetype-a-landing', route: '/docs' },
  { name: 'archetype-b-component-button', route: '/docs/components/button' },
  { name: 'archetype-c-foundation-colors', route: '/docs/foundations/colors' },
  { name: 'archetype-d-guide-brand', route: '/docs/brand' },
];

const THEMES = ['light', 'dark'];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = [
    path.resolve(DOCS_DIR, 'node_modules/playwright'),
    path.resolve(DOCS_DIR, '../../packages/ui/node_modules/playwright'),
    path.resolve(DOCS_DIR, '../../node_modules/playwright'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return require(candidate);
    }
  }
  return require('playwright');
}

function resolveStaticFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const rel = clean.replace(/^\/+/, '');
  const candidates = [
    path.join(OUT_DIR, rel),
    path.join(OUT_DIR, `${rel}.html`),
    path.join(OUT_DIR, rel, 'index.html'),
  ];
  for (const file of candidates) {
    if (file.startsWith(OUT_DIR) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      return file;
    }
  }
  return null;
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const file = resolveStaticFile(req.url || '/');
    if (!file) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

async function comparePngBuffers(page, baselineBuf, currentBuf) {
  const b64A = baselineBuf.toString('base64');
  const b64B = currentBuf.toString('base64');

  return page.evaluate(
    async ({ a, b }) => {
      async function loadImage(base64) {
        const res = await fetch(`data:image/png;base64,${base64}`);
        const blob = await res.blob();
        return createImageBitmap(blob);
      }

      const [imgA, imgB] = await Promise.all([loadImage(a), loadImage(b)]);
      const width = Math.max(imgA.width, imgB.width);
      const height = Math.max(imgA.height, imgB.height);

      const getData = (img) => {
        const c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, width, height).data;
      };

      const dataA = getData(imgA);
      const dataB = getData(imgB);
      let diffPixels = 0;
      const totalPixels = width * height;

      for (let i = 0; i < dataA.length; i += 4) {
        const dr = Math.abs(dataA[i] - dataB[i]);
        const dg = Math.abs(dataA[i + 1] - dataB[i + 1]);
        const db = Math.abs(dataA[i + 2] - dataB[i + 2]);
        const da = Math.abs(dataA[i + 3] - dataB[i + 3]);
        if (dr + dg + db + da > 16) {
          diffPixels++;
        }
      }

      return {
        sizeMismatch: imgA.width !== imgB.width || imgA.height !== imgB.height,
        diffPixels,
        totalPixels,
        diffRatio: diffPixels / totalPixels,
      };
    },
    { a: b64A, b: b64B }
  );
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`Missing static build at ${OUT_DIR}. Run "pnpm --filter @mindulle/docs build" first.`);
    process.exit(1);
  }

  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  const { chromium } = loadPlaywright();
  const { server, baseUrl } = await startStaticServer();
  const browser = await chromium.launch({ headless: true });

  let failures = 0;
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    for (const target of TARGET_PAGES) {
      for (const theme of THEMES) {
        await page.addInitScript((t) => {
          localStorage.setItem('theme', t);
        }, theme);

        await page.goto(`${baseUrl}${target.route}`, { waitUntil: 'networkidle' });
        await page.evaluate(async (t) => {
          document.documentElement.classList.toggle('dark', t === 'dark');
          document.documentElement.dataset.theme = t;
          await document.fonts.ready;
        }, theme);

        const filename = `${target.name}-${theme}.png`;
        const baselinePath = path.join(BASELINE_DIR, filename);
        const currentBuf = await page.screenshot({ fullPage: true });

        if (UPDATE) {
          fs.writeFileSync(baselinePath, currentBuf);
          console.log(`[UPDATED] ${filename}`);
          continue;
        }

        if (!fs.existsSync(baselinePath)) {
          console.error(`[MISSING BASELINE] ${filename} (run "pnpm --filter @mindulle/docs test:visual:update")`);
          failures++;
          continue;
        }

        const baselineBuf = fs.readFileSync(baselinePath);
        const result = await comparePngBuffers(page, baselineBuf, currentBuf);
        const pct = (result.diffRatio * 100).toFixed(3);

        if (result.sizeMismatch || result.diffRatio > MAX_DIFF_RATIO) {
          fs.mkdirSync(DIFF_DIR, { recursive: true });
          fs.writeFileSync(path.join(DIFF_DIR, filename), currentBuf);
          console.error(`[FAIL] ${filename} — diff=${pct}% (max ${(MAX_DIFF_RATIO * 100).toFixed(2)}%)`);
          failures++;
        } else {
          console.log(`[PASS] ${filename} — diff=${pct}%`);
        }
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
