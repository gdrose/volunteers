// PostToolUse (Edit|Write|MultiEdit): format the edited apps/web file and rule-check it.
// Exit 2 shows stderr to Claude so it fixes the violation straight away.
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';

const input = await Bun.stdin.json();
const file: string = input.tool_input?.file_path ?? '';
const web = join(process.env.CLAUDE_PROJECT_DIR ?? process.cwd(), 'apps/web');
const rel = relative(web, file);

if (rel.startsWith('..') || !/\.(svelte|ts|js|css|json|md)$/.test(rel)) process.exit(0);

// Honours .prettierignore (components/ui stays in shadcn style).
spawnSync('bunx', ['prettier', '--write', '--ignore-unknown', '--log-level', 'silent', file], {
	cwd: web
});

if (!/^(src|messages)\//.test(rel)) process.exit(0);
const check = spawnSync('bun', ['scripts/check-rules.ts', file], { cwd: web, encoding: 'utf8' });
if (check.status !== 0) {
	console.error(check.stderr || check.stdout);
	process.exit(2);
}
