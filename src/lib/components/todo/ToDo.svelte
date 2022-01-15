<script lang="ts">
	import TodoStore from '$lib/stores/todoStore';
	import ToDoItem from './ToDoItem.svelte';
	import { session } from '$app/stores';
	import type { Todo } from '$lib/types';
	import { addTodo } from '$lib/client/firebase';
	import { v4 as uuidv4 } from 'uuid';
	import { Timestamp } from 'firebase/firestore';
	import Card from '../Card.svelte';

	console.log('todo component $todostore');
	$: console.log($TodoStore);

	let newToDo: any;
	let i = 1;
	const handleSubmit = async () => {
		let uuid = await addTodo(newToDo, $session.user.uid);

		console.log('ToDo', { uuid });
		console.log({ newToDo });
		$TodoStore = [
			...$TodoStore,
			{
				created_at: Timestamp.now(),
				completed: false,
				text: newToDo,
				id: uuid
			}
		];
		newToDo = '';
		// $TodoStore = $TodoStore;
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="add-container">
		<input type="string" id="newToDo" placeholder="New to do item" bind:value={newToDo} />
		<button>Add</button>
	</div>
</form>
<div class="todos">
	<!-- <div class="todos" bind:this={list}> -->
	<div class="todo-item2">
		{#each $TodoStore.filter((todo) => !todo.completed) as todo (todo.id)}
			<div class="todo-item">
				<ToDoItem {todo} />
			</div>
		{/each}
	</div>
	<div class="todo-item3">
		{#each $TodoStore.filter((todo) => todo.completed) as todo (todo.id)}
			<div class="todo-item">
				<ToDoItem {todo} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	form {
		.add-container {
			width: 100%;
			text-align: center;
			padding-bottom: 15px;
			border-bottom: 1px solid black;
			margin-bottom: 15px;
			input {
				width: 80%;
				border-radius: 5px;
				border-width: 1px;
				padding: 4px;
			}
			button {
				display: none;
			}
		}
	}
	.todos {
		display: grid;
		.todo-item2 {
			grid-row: 1;
			grid-column: 1;
		}
		.todo-item3 {
			grid-row: 2;
			grid-column: 1;
		}
	}
</style>
