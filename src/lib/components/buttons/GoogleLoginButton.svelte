<script lang="ts">
	import { googleSignIn } from '$lib/client/firebase';
</script>

<div class="google-login" on:click={() => googleSignIn()}>
	<img src="google-icon.svg" alt="google-icon" />
	<p>Sign in with Google</p>
</div>

<style lang="scss">
	.google-login {
		cursor: pointer;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		margin: 18px auto 0 auto;
		width: 70%;
		border: 2px solid black;
		border-radius: 5px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		img {
			// float: left;
			padding: 7px;
			border-right: 2px solid black;
		}
		p {
			grid-column: 2/13;
			display: flex;
			align-items: center;
			margin: 0 auto;
			font-weight: bold;
			color: #555555;
		}
	}
</style>
