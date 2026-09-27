<script lang="ts">
	import { RelatedPosts, type NewsPost } from '$lib/components/news';
	import { m } from '$lib/paraglide/messages.js';

	let { posts }: { posts: NewsPost[] } = $props();
</script>

<RelatedPosts {posts} title={m.project_news_title()} />
