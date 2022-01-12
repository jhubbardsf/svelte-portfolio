<script lang="ts">
	import { session } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import EmailLogin from '$lib/components/EmailLogin.svelte';
	import GoogleLogin from '$lib/components/GoogleLogin.svelte';
	import RegisterButton from '$lib/components/RegisterButton.svelte';

	$: console.log('Index session', $session);
</script>

<section>
	<Card>
		<h1>Login to Play</h1>
		<EmailLogin />
		<RegisterButton />
		<GoogleLogin />
	</Card>
</section>

<style lang="scss">
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
