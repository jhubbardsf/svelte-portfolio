<script context="module" lang="ts">
</script>

<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import ToDo from '$lib/components/ToDo.svelte';
	import Title from '$lib/utils/Title.svelte';
</script>

<section>
	<Card --min-height="400px">
		<h1>To Do List</h1>
		<ToDo />
	</Card>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		font-family: 'Roboto';
		h1 {
			margin-block-start: 0em;
		}
	}
</style>
