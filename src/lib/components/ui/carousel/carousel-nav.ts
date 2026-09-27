import { tv } from "tailwind-variants";

/**
 * Edge navigation: the whole side of the carousel is the hit target (the
 * standard full-screen photo viewer pattern), with a round chevron chip
 * centred inside it and a scrim that fades in from the edge on hover.
 */
export const carouselEdgeNavVariants = tv({
	slots: {
		zone: "group/edge absolute inset-y-0 z-10 flex w-24 cursor-pointer touch-manipulation items-center justify-center text-white outline-none from-black/40 to-transparent transition-colors disabled:pointer-events-none disabled:opacity-0 lg:w-32",
		chip: "flex size-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-[background-color,transform] group-hover/edge:bg-white/20 group-active/edge:scale-95 group-focus-visible/edge:ring-[3px] group-focus-visible/edge:ring-white/60 lg:size-14 [&_svg]:size-6 lg:[&_svg]:size-7",
	},
	variants: {
		side: {
			start: { zone: "start-0 hover:bg-linear-to-r rtl:hover:bg-linear-to-l" },
			end: { zone: "end-0 hover:bg-linear-to-l rtl:hover:bg-linear-to-r" },
		},
	},
});

export type CarouselNavLayout = "button" | "edge";
