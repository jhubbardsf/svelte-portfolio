<script context="module" lang="ts">
	import { initializeFirebase } from '$lib/client/firebase';
	import { browser } from '$app/env';
	export async function load({ url }) {
		if (browser) {
			console.log('__layout init fb');
			initializeFirebase();
		}

		console.log({ url });
		return {
			props: {
				key: url.pathname
			}
		};
		// }
	}
</script>

<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import { session } from '$app/stores';
	import { fly } from 'svelte/transition';

	console.log('__Layout Load');
	import PageTransition from '$lib/components/PageTransition.svelte';
	export let key: string;
</script>

<Header />

<PageTransition refresh={key}>
	<main>
		<slot />
	</main>
</PageTransition>

<footer>
	<!-- <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p> -->
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
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	/* footer a {
		font-weight: bold;
	} */

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
