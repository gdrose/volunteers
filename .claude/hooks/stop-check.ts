// Stop: if apps/web has uncommitted changes, run the fast UX-RULES checks before the turn ends.
// Slow checks (svelte-check, tests, build) stay in the verify-web skill and CI.
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const input = await Bun.stdin.json();
if (input.stop_hook_active) process.exit(0); // already blocked once; don't loop

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const status = spawnSync('git', ['status', '--porcelain', '--', 'apps/web'], {
	cwd: root,
	encoding: 'utf8'
});
if (!status.stdout.trim()) process.exit(0);

const check = spawnSync('bun', ['scripts/check-rules.ts'], {
	cwd: join(root, 'apps/web'),
	encoding: 'utf8'
});
if (check.status !== 0) {
	console.error(check.stderr || check.stdout);
	process.exit(2);
}
