<script lang="ts">
	import { RelatedPosts, newsPosts } from '$lib/components/news';
	import type { ProjectId } from '../projects';
	import { m } from '$lib/paraglide/messages.js';

	let { projectId }: { projectId: ProjectId } = $props();

	const posts = $derived(newsPosts.filter((post) => post.project === projectId).slice(0, 3));
</script>

<RelatedPosts {posts} title={m.project_news_title()} />
