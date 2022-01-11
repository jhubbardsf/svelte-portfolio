<script lang="ts">
	import '@fontsource/roboto';
</script>

<div class="google-login">
	<div class="icon">
		<img src="google-icon.svg" alt="google-icon" />
	</div>
	<p>Sign in with Google</p>
</div>

<style lang="scss">
	.google-login {
		cursor: pointer;
		display: flex;
		margin: 18px auto 0 auto;
		width: 70%;
		border: 2px solid black;
		border-radius: 5px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		p {
			color: #555555;
			font-family: 'Roboto';
			font-weight: bold;
			margin: auto;
			padding: 0;
		}
		.icon {
			display: flex;
			flex-direction: row;
			padding: 5px;
			border-right: 2px solid black;
			width: fit-content;
		}
	}
</style>
