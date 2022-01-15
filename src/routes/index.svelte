<script lang="ts">
	import { session } from '$app/stores';
	import WelcomeCard from '$lib/components/WelcomeCard.svelte';
	import SignInCard from '$lib/components/SignInCard.svelte';
	import { fly } from 'svelte/transition';
	let width = 500;
	let speed = 300;
	// $: console.log('Index session', $session);

	$: {
		console.log({ $session });
	}
</script>

{#if !$session.user}
	<section
		in:fly={{ x: -width, duration: speed, delay: speed }}
		out:fly={{ x: width, duration: speed }}
	>
		<SignInCard />
	</section>
{:else}
	<section
		in:fly={{ x: -width, duration: speed, delay: speed }}
		out:fly={{ x: width, duration: speed }}
	>
		<WelcomeCard />
	</section>
{/if}

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
