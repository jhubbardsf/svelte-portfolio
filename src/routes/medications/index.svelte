<script>
	const handleNotification = async () => {
		let res = await fetch('https://ktzcwkt3bf.execute-api.eu-central-1.amazonaws.com/dev/', {
			method: 'POST',
			headers: {
				'X-api-key': 'aX8ZqP2g1W5WVQOrAVlro4jmfhZi1BFJ6ws8FHGS',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				title: 'Your awesome site title',
				body: 'A Must Read New Post',
				topicId: 'UpAbV3JthuxYALm45UUk',
				destinationUrl: 'https://example.com/permalink-to-awesome-post'
			})
		});
	};
</script>

<h1>Testing Medications Page</h1>

<button on:click={handleNotification}>Send notification</button>
