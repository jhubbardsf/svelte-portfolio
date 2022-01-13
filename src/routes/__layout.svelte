<script context="module" lang="ts">
	import { initializeFirebase } from '$lib/client/firebase';
	import { browser } from '$app/env';
	export async function load({ url, session }) {
		if (browser) {
			console.log('__layout init fb');
			initializeFirebase();
		}
		// if (!session.user) {
		// 	return { redirect: '/', status: 302 };
		// } else {
		return { status: 200 };
		// }
	}
</script>

<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import { session } from '$app/stores';

	console.log('__Layout Load');
	$: console.log('__Layout Session', $session);
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		font-family: 'Roboto';
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		font-family: 'Roboto';
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
