<div class="card">
	<slot />
</div>

<style lang="scss">
	.card {
		font-family: 'Roboto';
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		width: 80%;
		padding: 20px;
		&:hover {
			box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
		}
	}

	@media screen and (min-width: 800px) {
		.card {
			font-family: 'Roboto';
			background-color: rgba(255, 255, 255, 1);
			border-radius: 10px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			transition: 0.3s;
			width: 40%;
			padding: 20px;
			&:hover {
				box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
			}
		}
	}
</style>
