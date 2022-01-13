<script lang="ts">
	import { session } from '$app/stores';
	import { emailSignIn } from '$lib/client/emailAuthentication';

	let username: string;
	let password: string;

	const submitLogin = (e) => {
		console.log('Clicked login form');
		emailSignIn(username, password);
	};
</script>

<form>
	<div class="form-field">
		<label for="email">Email</label>
		<input type="string" id="email" autocomplete="username" bind:value={username} />
		<div class="error" />
	</div>
	<div class="form-field">
		<label for="password">Password</label>
		<input type="password" id="password" autocomplete="current-password" bind:value={password} />
		<div class="error" />
	</div>
	<div class="form-field center">
		<button on:click|preventDefault={submitLogin}>Login</button>
	</div>
</form>

<style lang="scss">
	form {
		text-align: center;
		padding-bottom: 18px;
		border-bottom: 2px solid rgba(0, 0, 0, 1);
		.form-field {
			margin: 10px auto 0 auto;
			label {
				width: 100%;
				text-align: left;
			}
			input {
				margin-top: 5px;
				width: 95%;
			}
			button {
				border: 0;
				cursor: pointer;
				border-radius: 6px;
				padding: 8px 12px;
				font-weight: bold;
				box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
			}
			.error {
				font-weight: bold;
				font-size: 12px;
				color: #d91b42;
			}
			&.center {
				width: 100%;
				text-align: center;
			}
		}
	}
</style>
