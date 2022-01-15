<script lang="ts">
	import { session } from '$app/stores';
	import WelcomeCard from '$lib/components/WelcomeCard.svelte';
	import SignInCard from '$lib/components/SignInCard.svelte';

	// $: console.log('Index session', $session);
</script>

<section>
	{#if !$session.user}
		<SignInCard />
	{:else}
		<WelcomeCard />
	{/if}
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
