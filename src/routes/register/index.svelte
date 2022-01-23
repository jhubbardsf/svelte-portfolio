<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { registerAccount } from '$lib/client/emailAuthentication';

	let user = {
		// firstname: { value: null, error: null },
		// lastname: { value: null, error: null },
		email: { value: null, error: null },
		password: { value: null, error: null },
		password_confirmation: { value: null, error: null }
	};

	const registerUser = () => {
		console.log('Submitted registration form');
		console.log({ user });
		registerAccount(user.email.value, user.password.value);
	};
</script>

<section>
	<Card>
		<h1>Registration</h1>
		<form>
			<!-- <div class="two-fields">
				<div class="form-field">
					<label for="firstname">First Name</label>
					<input type="string" id="firstname" bind:value={user.firstname.value} />
					<div class="error" />
				</div>

				<div class="form-field">
					<label for="lastname">Last Name</label>
					<input type="string" id="lastname" bind:value={user.lastname.value} />
					<div class="error" />
				</div>
			</div> -->

			<div class="form-field">
				<label for="email">Email</label>
				<input type="string" id="email" autocomplete="username" bind:value={user.email.value} />
				<div class="error" />
			</div>

			<div class="form-field">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					autocomplete="new-password"
					bind:value={user.password.value}
				/>
				<div class="error" />
			</div>

			<div class="form-field">
				<label for="passwordconfirmation">Password Confirmation</label>
				<input
					type="password"
					id="passwordconfirmation"
					autocomplete="new-password"
					bind:value={user.password_confirmation.value}
				/>
				<div class="error" />
			</div>

			<div class="form-field center">
				<button on:click|preventDefault={() => registerUser()}>Register</button>
			</div>
		</form>
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
			width: 100%;
		}
		form {
			text-align: left;
			padding-bottom: 18px;
			// .two-fields {
			// 	display: grid;
			// 	grid-template-columns: 1fr 1fr;
			// 	gap: 10px;
			// 	text-align: left;
			// }
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
	}
</style>
