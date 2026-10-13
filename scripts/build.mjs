import { spawnSync } from 'node:child_process';

// Workers Builds delegates deployment to OpenNext before Wrangler's custom
// build hook. Generate OpenNext output during its initial build instead.
// Other hosts (including EdgeOne) retain the standard Next.js build.
const script = process.env.WORKERS_CI ? 'build:cloudflare' : 'build:next';
console.log(`Building for ${process.env.WORKERS_CI ? 'Cloudflare Workers' : 'Next.js hosting'}`);
const result = spawnSync(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', script],
  { stdio: 'inherit', shell: process.platform === 'win32' },
);
if (result.error) {
  console.error(result.error);
  process.exit(1);
}
process.exit(result.status ?? 1);
