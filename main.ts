import { Application, Router } from "./deps.ts";

// Get environment variables from Convox
const PORT = Number(Deno.env.get("PORT") || 8080);
const APP_NAME = Deno.env.get("APP") || "local";
const RACK_NAME = Deno.env.get("RACK") || "local";
const SERVICE_NAME = Deno.env.get("SERVICE") || "app";
const BUILD_ID = Deno.env.get("BUILD") || "dev";

// Create Oak application
const app = new Application();
const router = new Router();

// Middleware for logging
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url.pathname} - ${ms}ms`);
});

// Routes
router.get("/", (ctx) => {
  ctx.response.headers.set("Content-Type", "text/html");
  ctx.response.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Convox Deno Example</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #11BADF 0%, #11495A 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #2D3133;
            }
            .container {
                background: white;
                border-radius: 12px;
                padding: 3rem;
                box-shadow: 0 10px 40px rgba(2, 38, 48, 0.2);
                max-width: 600px;
                width: 90%;
            }
            h1 {
                color: #11495A;
                margin-bottom: 1rem;
            }
            .subtitle {
                color: #11BADF;
                margin-bottom: 2rem;
            }
            .info {
                background: #F7F7F7;
                border-left: 4px solid #11BADF;
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 4px;
            }
            .info strong {
                color: #11495A;
            }
            .features {
                margin: 2rem 0;
            }
            .features li {
                margin: 0.5rem 0;
                list-style-position: inside;
            }
            .endpoints {
                margin: 2rem 0;
            }
            .endpoints a {
                display: inline-block;
                padding: 0.75rem 1.5rem;
                background: #11BADF;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                margin: 0.25rem;
                transition: all 0.2s;
            }
            .endpoints a:hover {
                background: #23DEFF;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(17, 186, 223, 0.3);
            }
            code {
                background: #F7F7F7;
                padding: 0.2rem 0.4rem;
                border-radius: 3px;
                font-family: monospace;
                color: #0B141A;
            }
            .footer {
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid #EDEDED;
                color: #9D9D9D;
                font-size: 0.9rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🦕 Deno on Convox</h1>
            <p class="subtitle">Modern TypeScript/JavaScript Runtime</p>
            
            <div class="info">
                <strong>Environment:</strong><br>
                App: ${APP_NAME}<br>
                Rack: ${RACK_NAME}<br>
                Service: ${SERVICE_NAME}<br>
                Build: ${BUILD_ID}<br>
                Deno: ${Deno.version.deno}<br>
                V8: ${Deno.version.v8}<br>
                TypeScript: ${Deno.version.typescript}
            </div>
            
            <div class="features">
                <h2>Features</h2>
                <ul>
                    <li>✅ TypeScript support out of the box</li>
                    <li>✅ Secure by default (permissions required)</li>
                    <li>✅ Built-in testing and formatting</li>
                    <li>✅ ES modules</li>
                    <li>✅ Web standard APIs</li>
                </ul>
            </div>
            
            <div class="endpoints">
                <h2>API Endpoints</h2>
                <a href="/api/status">Status API</a>
                <a href="/api/info">System Info</a>
                <a href="/health">Health Check</a>
            </div>
            
            <div class="footer">
                Powered by Deno ${Deno.version.deno} on Convox<br>
                <a href="https://docs.convox.com">Documentation</a> | 
                <a href="https://deno.land">Deno.land</a>
            </div>
        </div>
    </body>
    </html>
  `;
});

// Health check endpoint
router.get("/health", (ctx) => {
  ctx.response.body = { status: "healthy", timestamp: new Date().toISOString() };
});

// API status endpoint
router.get("/api/status", (ctx) => {
  ctx.response.body = {
    status: "operational",
    environment: {
      app: APP_NAME,
      rack: RACK_NAME,
      service: SERVICE_NAME,
      build: BUILD_ID,
    },
    runtime: {
      deno: Deno.version.deno,
      v8: Deno.version.v8,
      typescript: Deno.version.typescript,
    },
    timestamp: new Date().toISOString(),
  };
});

// API info endpoint
router.get("/api/info", (ctx) => {
  ctx.response.body = {
    platform: Deno.build.os,
    arch: Deno.build.arch,
    pid: Deno.pid,
    memory: {
      rss: Deno.memoryUsage().rss,
      heapTotal: Deno.memoryUsage().heapTotal,
      heapUsed: Deno.memoryUsage().heapUsed,
      external: Deno.memoryUsage().external,
    },
    uptime: Math.floor(performance.now() / 1000),
    versions: {
      deno: Deno.version.deno,
      v8: Deno.version.v8,
      typescript: Deno.version.typescript,
    },
  };
});

// Example POST endpoint
router.post("/api/echo", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  ctx.response.body = {
    received: body,
    timestamp: new Date().toISOString(),
  };
});

// Use routes
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
console.log(`🦕 Deno server running on http://0.0.0.0:${PORT}`);
console.log(`   Environment: ${APP_NAME} on ${RACK_NAME}`);

await app.listen({ port: PORT, hostname: "0.0.0.0" });