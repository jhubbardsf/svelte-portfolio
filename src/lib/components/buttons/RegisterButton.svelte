<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
</script>

<div class="register-login" on:click={() => goto('/register')}>
	<p>Register with email</p>
</div>

<style lang="scss">
	.register-login {
		cursor: pointer;
		padding: 7px 0;
		display: flex;
		margin: 18px auto 0 auto;
		width: 70%;
		border: 2px solid black;
		border-radius: 5px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		p {
			color: #555555;
			margin: auto;
			font-weight: bold;
			padding: 0;
		}
	}
</style>
