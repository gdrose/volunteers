// PreToolUse (Edit|Write|MultiEdit): block hand edits to generated files.
// Exit 2 cancels the tool call and shows stderr to Claude.
const input = await Bun.stdin.json();
const file: string = input.tool_input?.file_path ?? '';

const generated: [RegExp, string][] = [
	[/apps\/web\/src\/lib\/sanity\/sanity\.types\.ts$/, 'run `bun run --cwd apps/studio-volunteers typegen`'],
	[/apps\/studio-volunteers\/schema\.json$/, 'run `bun run --cwd apps/studio-volunteers typegen`'],
	[/apps\/web\/src\/lib\/paraglide\//, 'edit apps/web/messages/*.json (all 5 locales) instead']
];

for (const [pattern, fix] of generated) {
	if (pattern.test(file)) {
		console.error(`${file} is generated; don't edit it by hand. Instead: ${fix}.`);
		process.exit(2);
	}
}
