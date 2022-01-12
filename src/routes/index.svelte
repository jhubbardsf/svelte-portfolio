<script lang="ts">
	import '@fontsource/roboto';
	import { session } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import EmailLogin from '$lib/components/EmailLogin.svelte';
	import GoogleLogin from '$lib/components/GoogleLogin.svelte';
	import RegisterButton from '$lib/components/RegisterButton.svelte';

	$: console.log('Index session', $session);
</script>

<section>
	{#if !$session.user}
	<Card>
		<h1>Login to Play</h1>
		<EmailLogin />
		<RegisterButton />
		<GoogleLogin />
	</Card>
	{:else}
	<Card>
		<h1>{`Hello ${$session.user.name}`}</h1>
		<p>This is an app that will demonstrate some of the cool features of Svelte and SvelteKit. 
			You can play around with some of the examples and come back anytime. More features will 
			be added. You can look at the GitHub repo at
			 <a href="https://github.com/jhubbardsf/svelte-portfolio" target="_blank">Svelte-Profile Repo</a></p>

		<p>The app is built in with Svelte and SvelteKit using a FireBase backend with SSR authentication. 
			As more examples grow I'll continue to update the github repo's README and this notice. 
			I will also continually be DRYing up the code and trying to bring good SvelteKit practices to light.
		</p>

		<p>-Josh</p>
	</Card>
	{/if}
</section>

<style lang="scss">
	p {
		font-family: 'Roboto';
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		h1 {
			margin-block-start: 0em;
		}
	}
</style>
