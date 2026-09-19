import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0];
        const apiName = urlPath.replace(/^\/api\//, '').replace(/\/$/, '');
        const baseDir = import.meta.dirname || path.resolve();
        const handlerFile = path.resolve(baseDir, `../api/${apiName}.js`);

        if (!fs.existsSync(handlerFile)) {
          return next();
        }

        let bodyBuffer = '';
        req.on('data', (chunk) => {
          bodyBuffer += chunk;
        });

        req.on('end', async () => {
          try {
            if (bodyBuffer) {
              try {
                req.body = JSON.parse(bodyBuffer);
              } catch {
                req.body = bodyBuffer;
              }
            } else {
              req.body = {};
            }

            res.status = function (statusCode) {
              res.statusCode = statusCode;
              return res;
            };

            res.json = function (data) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            delete require.cache[require.resolve(handlerFile)];
            const handler = require(handlerFile);

            await handler(req, res);
          } catch (err) {
            console.error('[API Dev Server Error]', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err.message }));
            }
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
  server: {
    port: 3000,
    open: false,
  },
});
