import { createCn } from "cn/config";

// Register the type scale from layout.css so `cn` treats e.g. `text-h1` as a
// font size (not a color) and resolves conflicts correctly.
export const cn = createCn({
	extend: {
		classGroups: {
			"font-size": [
				{
					text: ["display", "h1", "h2", "h3", "h4", "lead", "body", "small", "caption", "micro"],
				},
			],
		},
	},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
