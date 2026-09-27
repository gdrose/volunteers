<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import underline from '$lib/assets/hero/underline.svg';
	import underlineMobile from '$lib/assets/hero/underline-mobile.svg';
</script>

<h1 class="text-center text-display text-foreground lg:pb-3.5 lg:text-left">
	{m.hero_title()}
	<br class="hidden lg:inline" />
	<span class="relative inline-block text-primary italic">
		{m.hero_title_highlight()}
		<img
			src={underlineMobile}
			alt=""
			width="240.5"
			height="11.8023"
			class="absolute top-[calc(100%-4.3px)] left-1/2 max-w-none -translate-x-1/2 lg:hidden"
		/>
		<img
			src={underline}
			alt=""
			width="339.385"
			height="12.9927"
			class="absolute top-[calc(100%-5.5px)] left-0 hidden max-w-none lg:block"
		/>
	</span>
</h1>
