<script lang="ts">
	import { prefersReducedMotion } from "svelte/motion";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import {
		type CarouselAPI,
		type CarouselProps,
		type EmblaContext,
		setEmblaContext,
	} from "./context.js";

	let {
		ref = $bindable(null),
		opts = {},
		plugins = [],
		setApi = () => {},
		orientation = "horizontal",
		class: className,
		children,
		...restProps
	}: WithElementRef<CarouselProps> = $props();

	// svelte-ignore state_referenced_locally
	let carouselState = $state<EmblaContext>({
		api: undefined,
		scrollPrev,
		scrollNext,
		orientation,
		canScrollNext: false,
		canScrollPrev: false,
		handleKeyDown,
		options: opts,
		plugins,
		onInit,
		scrollSnaps: [],
		selectedIndex: 0,
		scrollTo,
	});

	setEmblaContext(carouselState);

	// With reduced motion, programmatic scrolls jump straight to the slide.
	function scrollPrev() {
		carouselState.api?.scrollPrev(prefersReducedMotion.current);
	}

	function scrollNext() {
		carouselState.api?.scrollNext(prefersReducedMotion.current);
	}

	function scrollTo(index: number, jump = prefersReducedMotion.current) {
		carouselState.api?.scrollTo(index, jump);
	}

	function onSelect() {
		if (!carouselState.api) return;
		carouselState.selectedIndex = carouselState.api.selectedScrollSnap();
		carouselState.canScrollNext = carouselState.api.canScrollNext();
		carouselState.canScrollPrev = carouselState.api.canScrollPrev();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			scrollPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			scrollNext();
		}
	}

	function onInit(event: CustomEvent<CarouselAPI>) {
		carouselState.api = event.detail;
		setApi(carouselState.api);

		carouselState.scrollSnaps = carouselState.api.scrollSnapList();
		carouselState.api.on("select", onSelect);
		onSelect();
	}

	$effect(() => {
		return () => {
			carouselState.api?.off("select", onSelect);
		};
	});
</script>

<div
	bind:this={ref}
	data-slot="carousel"
	class={cn("relative", className)}
	role="region"
	aria-roledescription="carousel"
	{...restProps}
>
	{@render children?.()}
</div>
