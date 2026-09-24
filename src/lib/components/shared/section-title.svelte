<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import wave from '$lib/assets/icons/wave.svg';
	import waveMobile from '$lib/assets/icons/wave-mobile.svg';

	let {
		children,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> & { children: Snippet } = $props();
</script>

<h2
	class={cn(
		'pb-[13px] text-[28px] leading-9 font-black text-foreground lg:pb-0 lg:text-center lg:text-[42px] lg:leading-[70px]',
		className
	)}
	{...restProps}
>
	<span class="relative inline-block">
		<img
			src={waveMobile}
			alt=""
			width="206.438"
			height="7.41854"
			class="absolute top-[26px] left-3 max-w-none -scale-y-100 lg:hidden"
		/>
		<img
			src={wave}
			alt=""
			width="363.412"
			height="18.8394"
			class="absolute top-[44px] left-1/2 hidden max-w-none -translate-x-1/2 -scale-y-100 lg:block"
		/>
		<span class="relative">{@render children()}</span>
	</span>
</h2>
