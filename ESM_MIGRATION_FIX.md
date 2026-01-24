# ESM Migration Fix for openid-client Error

## Problem
The application was failing on Railway with the error:
```
Error [ERR_REQUIRE_ESM]: require() of ES Module /app/node_modules/openid-client/build/index.js from /app/dist/index.cjs not supported.
```

This occurred because:
- `openid-client` v6.x is a pure ES Module (ESM)
- The build script was bundling the server as CommonJS (`.cjs`)
- CommonJS cannot `require()` ES Modules

## Solution
Migrated the server build from CommonJS to ES Module format.

### Changes Made

#### 1. Updated `script/build.ts`
- Changed `format: "cjs"` to `format: "esm"`
- Changed output from `dist/index.cjs` to `dist/index.mjs`
- Added a banner to provide `require()` compatibility for any legacy CommonJS dependencies:
  ```typescript
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  }
  ```

#### 2. Updated `package.json`
- Changed start script from `node dist/index.cjs` to `node dist/index.mjs`

## Deployment Updates Required

### Railway Configuration
You need to update your Railway deployment configuration to use the new `.mjs` file:

1. **If using a Procfile or start command override:**
   Update it to:
   ```
   npm start
   ```
   or directly:
   ```
   NODE_ENV=production node dist/index.mjs
   ```

2. **If Railway is auto-detecting the start command:**
   It should automatically pick up the updated `package.json` start script.

3. **Rebuild and redeploy:**
   - Commit these changes
   - Push to your repository
   - Railway will automatically rebuild with the new configuration

## Testing Locally

To test the fix locally:

```bash
# Build the project
npm run build

# Start the production server
npm start
```

The server should now start without the ESM error.

## Why This Fix Works

1. **ESM Format**: By outputting as `.mjs`, Node.js treats the file as an ES Module
2. **Native Import Support**: ESM can natively import both ESM and CommonJS modules
3. **Backward Compatibility**: The `createRequire` banner ensures any legacy code using `require()` still works
4. **Future-Proof**: ESM is the modern standard and will be better supported going forward

## Additional Notes

- The `package.json` already had `"type": "module"` set, which is good for ESM
- All bundled dependencies in the allowlist will work with ESM
- External dependencies will be loaded as-is (ESM or CommonJS as they're published)
