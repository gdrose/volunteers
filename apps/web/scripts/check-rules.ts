// Mechanical checks for the rules in UX-RULES.md. Run: `bun run check:rules [files…]`.
// With no arguments it scans all of src/ and the message files; with file paths it checks only those.
// Also run by the Claude Code hooks in /.claude/hooks.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

type Rule = {
	id: string;
	pattern: RegExp;
	message: string;
	svelteOnly?: boolean;
	includeUi?: boolean;
};

const rules: Rule[] = [
	{
		id: 'ring-50',
		pattern: /ring-ring\/50/,
		message: 'use a solid focus ring (focus-visible:ring-ring), never ring-ring/50',
		includeUi: true
	},
	{
		id: 'arbitrary-radius',
		pattern: /rounded(-[a-z]+)?-\[/,
		message: 'use a radius token (rounded-sm … rounded-4xl)',
		includeUi: true
	},
	{
		id: 'arbitrary-text',
		pattern: /text-\[[0-9#]/,
		message: 'use the type scale (text-h1, text-body, …)',
		includeUi: true
	},
	{
		id: 'reorder',
		pattern: /\border-(last|first|\d+)\b|flex-row-reverse|flex-col-reverse|grid-flow-dense/,
		message: 'reading order must equal visual order; reorder the DOM instead',
		includeUi: true
	},
	{
		id: 'bare-outline-none',
		// Passes when the same line also sets a focus-visible: style other than outline-none.
		pattern: /^(?!.*focus-visible:(?!outline-none)).*\boutline-none\b/,
		message: 'outline-none needs a focus-visible: replacement or a wrapping focus-within',
		svelteOnly: true
	},
	{
		id: 'arbitrary-px',
		// Spacing/sizing/offset utilities with px values; safe-area env() expressions are fine.
		pattern:
			/(?<![\w-])-?(?:[pm][xytrblse]?|gap(?:-[xy])?|space-[xy]|size|(?:min-|max-)?[wh]|top|left|right|bottom|inset(?:-[xy])?|start|end)-\[(?![^\]]*env\()[^\]\s]*\dpx[^\]\s]*\]/,
		message: 'use the 4/8px spacing scale, not arbitrary px',
		svelteOnly: true
	},
	{
		id: 'raw-hex',
		pattern: /#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?\b/,
		message: 'use a colour token from layout.css, never a raw hex',
		svelteOnly: true
	}
];

// Known, reviewed exceptions: [file suffix, rule id, substring on the line, reason].
const allowed: [string, string, string, string][] = [
	['ui/dialog/dialog-footer.svelte', 'reorder', 'flex-col-reverse', 'shadcn primitive'],
	['groups/group-details.svelte', 'reorder', 'order-last', 'dt/dd visual swap'],
	['about/about-hero.svelte', 'reorder', 'order-', 'dt/dd visual swap'],
	[
		'groups/group-search.svelte',
		'bare-outline-none',
		'bg-transparent',
		'wrapping label has focus-within ring'
	],
	[
		'groups/group-search.svelte',
		'bare-outline-none',
		'data-highlighted',
		'combobox item; focus stays on the input'
	],
	[
		'news/post-card.svelte',
		'bare-outline-none',
		'after:absolute',
		"Card 'post' variant rings on has-[a:focus-visible]"
	],
	[
		'shared/arrow-link.svelte',
		'bare-outline-none',
		'after:absolute',
		'stretched link; the card ancestor shows the focus ring'
	],
	['shared/section-title.svelte', 'arbitrary-px', 'absolute', 'decorative ornament offset'],
	['about/story-timeline.svelte', 'arbitrary-px', 'absolute', 'decorative ornament offset'],
	[
		'newsletter/newsletter-section.svelte',
		'arbitrary-px',
		'absolute',
		'decorative ornament offset'
	],
	[
		'newsletter/newsletter-section.svelte',
		'arbitrary-px',
		'h-[38px] w-[7.5px]',
		'decorative ornament box'
	]
];

const skipDirs = new Set(['node_modules', 'paraglide']);

function walk(dir: string): string[] {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return skipDirs.has(name) ? [] : walk(path);
		return /\.(svelte|ts|js|css)$/.test(name) && !name.endsWith('sanity.types.ts') ? [path] : [];
	});
}

const args = process.argv.slice(2).map((p) => resolve(p));
const files = args.length ? args : walk(join(root, 'src'));
const problems: string[] = [];

for (const file of files) {
	const rel = relative(root, file);
	if (!rel.startsWith('src/') || !/\.(svelte|ts|js|css)$/.test(rel)) continue;
	const isUi = rel.startsWith('src/lib/components/ui/');
	const lines = readFileSync(file, 'utf8').split('\n');
	lines.forEach((line, i) => {
		for (const rule of rules) {
			if (rule.svelteOnly && !rel.endsWith('.svelte')) continue;
			if (isUi && !rule.includeUi) continue;
			if (!rule.pattern.test(line)) continue;
			const ok = allowed.some(
				([suffix, id, match]) => rel.endsWith(suffix) && id === rule.id && line.includes(match)
			);
			if (!ok) problems.push(`${rel}:${i + 1}  [${rule.id}] ${rule.message}\n    ${line.trim()}`);
		}
	});
}

// Every locale must have exactly the keys of the base locale.
const checkMessages = !args.length || args.some((p) => relative(root, p).startsWith('messages/'));
if (checkMessages) {
	const dir = join(root, 'messages');
	const keysOf = (f: string) =>
		new Set(
			Object.keys(JSON.parse(readFileSync(join(dir, f), 'utf8'))).filter((k) => k !== '$schema')
		);
	const base = keysOf('en.json');
	for (const f of readdirSync(dir).filter((f) => f.endsWith('.json') && f !== 'en.json')) {
		const keys = keysOf(f);
		const missing = [...base].filter((k) => !keys.has(k));
		const extra = [...keys].filter((k) => !base.has(k));
		if (missing.length) problems.push(`messages/${f}  missing keys: ${missing.join(', ')}`);
		if (extra.length) problems.push(`messages/${f}  keys not in en.json: ${extra.join(', ')}`);
	}
}

if (problems.length) {
	console.error(`UX-RULES violations (see apps/web/UX-RULES.md):\n\n${problems.join('\n')}`);
	process.exit(1);
}
