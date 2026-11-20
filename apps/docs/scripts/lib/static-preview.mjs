import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';

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

/**
 * Playwright is not a direct dependency of every workspace package, so resolve
 * it from the places a pnpm install can leave it.
 */
export function loadPlaywright(docsDir) {
  const require = createRequire(path.join(docsDir, 'scripts', 'noop.mjs'));
  const candidates = [
    path.resolve(docsDir, 'node_modules/playwright'),
    path.resolve(docsDir, '../../packages/ui/node_modules/playwright'),
    path.resolve(docsDir, '../../node_modules/playwright'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return require(candidate);
    }
  }
  return require('playwright');
}

export function findChromiumExecutable(chromium) {
  if (
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH &&
    fs.existsSync(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH)
  ) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  }
  try {
    const bundled = chromium.executablePath();
    if (bundled && fs.existsSync(bundled)) return undefined;
  } catch {}
  const candidates = ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'];
  return candidates.find((p) => fs.existsSync(p));
}

/** Launch options shared by the visual gate and the design audit. */
export function chromiumLaunchOptions(executablePath) {
  return {
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      // Normalize text rasterization so local and CI renders agree.
      '--font-render-hinting=none',
      '--disable-lcd-text',
      '--force-color-profile=srgb',
    ],
    env: {
      ...process.env,
      HOME: process.env.HOME && process.env.HOME !== '/' ? process.env.HOME : '/tmp',
      XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME || '/tmp/xdg',
      XDG_CACHE_HOME: process.env.XDG_CACHE_HOME || '/tmp/xdg-cache',
    },
  };
}

/**
 * Serve the static `out` directory used by both scripts. Every request is a
 * file lookup inside the build output, so no dev server or port is fixed.
 */
export function startStaticServer(outDir) {
  function resolveStaticFile(urlPath) {
    const clean = decodeURIComponent(urlPath.split('?')[0]);
    const rel = clean.replace(/^\/+/, '');
    const candidates = [
      path.join(outDir, rel),
      path.join(outDir, `${rel}.html`),
      path.join(outDir, rel, 'index.html'),
    ];
    for (const file of candidates) {
      if (file.startsWith(outDir) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        return file;
      }
    }
    return null;
  }

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
