# Deno Example for Convox

A Deno application with Oak framework ready to deploy on Convox.

This example demonstrates how to deploy a modern Deno application on Convox. It showcases TypeScript support, web standard APIs, the Oak framework for routing, and JSON API endpoints - everything you need for building modern server applications.

Deploy to Convox Cloud for a fully-managed platform experience, or to your own Convox Rack for complete control over your infrastructure. Either way, you'll get automatic SSL, load balancing, and zero-downtime deployments out of the box.

## Deploy to Convox Cloud

1. **Create a Cloud Machine** at [console.convox.com](https://console.convox.com)

2. **Create the app**:
```bash
convox cloud apps create deno -i your-machine-name
```

3. **Deploy the app**:
```bash
convox cloud deploy -a deno -i your-machine-name
```

4. **View your app**:
```bash
convox cloud services -a deno -i your-machine-name
```

Visit your URL to see the Deno application!

## Deploy to Convox Rack

1. **Create the app**:
```bash
convox apps create deno
```

2. **Deploy the app**:
```bash
convox deploy -a deno
```

3. **View your app**:
```bash
convox services -a deno
```

Visit your URL to see the Deno application!

## Features

- **Deno 2.0** - Modern JavaScript/TypeScript runtime
- **Oak Framework** - Express-like web framework for Deno
- **TypeScript Native** - No compilation step needed
- **Secure by Default** - Explicit permissions model
- **Web Standards** - Fetch API, Web Crypto, and more
- **ES Modules** - Modern module system

## Application Endpoints

- `GET /` - Homepage with environment info
- `GET /health` - Health check endpoint
- `GET /api/status` - System status JSON
- `GET /api/info` - Runtime information JSON
- `POST /api/echo` - Echo back JSON data

## Test the API

```bash
# Check health
curl https://your-app-url/health

# Get status
curl https://your-app-url/api/status

# Get system info
curl https://your-app-url/api/info

# Test POST endpoint
curl -X POST https://your-app-url/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Deno!"}'
```

## Local Development

```bash
# Install Deno (if not installed)
curl -fsSL https://deno.land/install.sh | sh

# Run locally
deno run --allow-net --allow-env --allow-read main.ts

# Run with watch mode
deno run --allow-net --allow-env --allow-read --watch main.ts
```

Visit http://localhost:8080 to see your app running locally.

## Project Structure

```
.
├── Dockerfile       # Deno 2.0 Docker image
├── convox.yml      # Convox configuration
├── deps.ts         # Dependency management
└── main.ts         # Main application file
```

## Scaling

### Convox Cloud
```bash
convox cloud scale app --count 2 --cpu 500 --memory 1024 -a deno -i your-machine-name
```

### Convox Rack
```bash
convox scale app --count 2 --cpu 500 --memory 1024 -a deno
```

## Environment Variables

Set custom environment variables:

### Convox Cloud
```bash
convox cloud env set API_KEY=secret DATABASE_URL=postgres://... -a deno -i your-machine-name
```

### Convox Rack
```bash
convox env set API_KEY=secret DATABASE_URL=postgres://... -a deno
```

## Common Commands

### View logs

Cloud:
```bash
convox cloud logs -a deno -i your-machine-name
```

Rack:
```bash
convox logs -a deno
```

### Run Deno commands

Cloud:
```bash
convox cloud run app "deno --version" -a deno -i your-machine-name
```

Rack:
```bash
convox run app "deno --version" -a deno
```

### Access REPL

Cloud:
```bash
convox cloud run app "deno repl" -a deno -i your-machine-name
```

Rack:
```bash
convox run app "deno repl" -a deno
```

## Adding Dependencies

Deno uses URL imports. Add new dependencies to `deps.ts`:

```typescript
// deps.ts
export { serve } from "https://deno.land/std@0.211.0/http/server.ts";
export { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";
```

Then import in your code:
```typescript
import { serve, DB } from "./deps.ts";
```

## Testing

Create test files with `.test.ts` suffix:

```typescript
// main.test.ts
import { assertEquals } from "https://deno.land/std@0.211.0/assert/mod.ts";

Deno.test("example test", () => {
  assertEquals(1 + 1, 2);
});
```

Run tests locally:
```bash
deno test --allow-all
```

## Deno-specific Features

### Permissions

Deno requires explicit permissions. The Dockerfile grants:
- `--allow-net` - Network access
- `--allow-env` - Environment variable access
- `--allow-read` - File system read access

### Format Code

```bash
deno fmt
```

### Lint Code

```bash
deno lint
```

### Bundle for Production

```bash
deno bundle main.ts bundle.js
```

## Performance Tips

- Use `deno compile` for single binary deployments
- Enable `--unstable-sloppy-imports` for Node.js compatibility
- Use Web Workers for CPU-intensive tasks
- Leverage Deno KV for built-in persistence (when available)

## Migrating from Node.js

Deno supports many Node.js packages via npm specifiers:

```typescript
import express from "npm:express@4";
```

Or use the Node.js compatibility layer:
```typescript
import { createRequire } from "https://deno.land/std@0.211.0/node/module.ts";
const require = createRequire(import.meta.url);
const express = require("express");
```

## Resources

- [Deno Documentation](https://deno.land/manual)
- [Oak Framework](https://oakserver.github.io/oak/)
- [Deno Standard Library](https://deno.land/std)
- [Deno Third Party Modules](https://deno.land/x)