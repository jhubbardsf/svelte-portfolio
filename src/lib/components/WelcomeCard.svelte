<script lang="ts">
	import { session } from '$app/stores';
	import Card from './Card.svelte';
</script>

<Card>
	<h1>{`Hello ${$session.user?.name || ''}`}</h1>
	<p>
		This is an app that will demonstrate some of the cool features of Svelte and SvelteKit. You can
		play around with some of the examples and come back anytime. More features will be added. You
		can look at the GitHub repo at
		<a href="https://github.com/jhubbardsf/svelte-portfolio" target="_blank">Svelte-Profile Repo</a>
	</p>

	<p>
		The app is built in with Svelte and SvelteKit using a FireBase backend with SSR authentication.
		As more examples grow I'll continue to update the github repo's README and this notice. I will
		also continually be DRYing up the code and trying to bring good SvelteKit practices to light.
	</p>

	<p>-Josh</p>
</Card>

<style>
	h1 {
		margin-block-start: 0em;
	}
	p:last-child {
		text-align: right;
		margin-right: 50px;
	}
</style>
