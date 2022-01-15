<script context="module" lang="ts">
	export async function load({ params, fetch, session, stuff }) {
		const url = `api/todo/${session.user.uid}.json`;
		const res = await fetch(url);

		if (res.ok) {
			console.log('res ok');
			return {
				props: {
					todoReturn: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import ToDo from '$lib/components/todo/ToDo.svelte';
	import TodoStore from '$lib/stores/todoStore';

	export let todoReturn: { todos: [] };
	$TodoStore = todoReturn.todos;
	// $TodoStore.sort(function (a, b) {
	// 	return a.completed ? 1 : -1;
	// });
	$: console.log({ $TodoStore });
</script>

<section>
	<Card --min-height="200px">
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
			margin-bottom: 15px;
		}
	}
</style>
