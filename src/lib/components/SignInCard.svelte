<script lang="ts">
	import Card from './Card.svelte';
	import EmailLogin from './forms/EmailLogin.svelte';
	import GoogleLogin from './buttons/GoogleLoginButton.svelte';
	import RegisterButton from './buttons/RegisterButton.svelte';
</script>

<Card>
	<h1>Login to Play</h1>
	<EmailLogin />
	<RegisterButton />
	<GoogleLogin />
</Card>

<style>
	h1 {
		margin-block-start: 0em;
	}
</style>
