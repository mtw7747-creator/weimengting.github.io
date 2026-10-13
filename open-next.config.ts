import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// The portfolio uses bundled content; no paid R2 cache is required.
const config = defineCloudflareConfig();
// Bypass the platform-selecting build script to avoid recursive builds.
config.buildCommand = 'npm run build:next';
export default config;
