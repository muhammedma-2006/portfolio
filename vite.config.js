import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContactSubmission } from './api/contactHandler.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all environment variables (including non-VITE_ keys for server use)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'dev-api-contact-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res, next) => {
            if (req.method === 'OPTIONS') {
              res.statusCode = 200;
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              res.end();
              return;
            }

            let rawBody = '';
            req.on('data', chunk => {
              rawBody += chunk;
            });

            req.on('end', async () => {
              let body = {};
              try {
                if (rawBody) {
                  body = JSON.parse(rawBody);
                }
              } catch (e) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload.' }));
                return;
              }

              const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';

              try {
                const result = await handleContactSubmission({
                  method: req.method,
                  body,
                  clientIp,
                  env,
                });

                res.statusCode = result.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result.body));
              } catch (err) {
                console.error('[Vite Dev API Contact Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  success: false, 
                  message: 'Internal server error while processing message.' 
                }));
              }
            });
          });
        }
      }
    ],
  };
});
