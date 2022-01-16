<script>
	const handleNotification = async () => {
		console.log('Try Notifications');
	};
</script>

<h1>Testing Medications Page</h1>

<section>
	<button on:click={handleNotification}>Send notification</button>
</section>

<style lang="scss">
	section {
		text-align: center;

		button {
			border: 2px solid black;
			border-radius: 5px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			width: 25%;
			border-radius: 5px;
			background: white;
			&:hover {
				cursor: pointer;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>
