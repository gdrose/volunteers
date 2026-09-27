import { createCn } from "cn/config";
import { defaultConfig } from "tailwind-variants";

// The type scale from layout.css (`text-h1`, `text-body`, …). Class mergers must know these
// are font sizes: by default they read `text-*` as a color and drop e.g. `text-primary`.
const twMergeConfig = {
	extend: {
		classGroups: {
			"font-size": [
				{
					text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "small", "caption", "micro", "eyebrow"],
				},
			],
		},
	},
};

export const cn = createCn(twMergeConfig);

// tailwind-variants merges each `tv()` result with its own bundled tailwind-merge; give it the
// same config. This module is imported by every component before their `tv()` calls run.
defaultConfig.twMergeConfig = twMergeConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
