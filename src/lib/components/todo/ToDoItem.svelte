<script>
	import { session } from '$app/stores';
	import { deleteTodo } from '$lib/client/firebase';
	import TodoStore from '$lib/stores/todoStore';

	export let todo;

	const completedChange = (currentTodo) => {
		TodoStore.flipComplete(currentTodo);
		$TodoStore = $TodoStore;
	};

	async function remove(todo) {
		let res = deleteTodo(todo.id, $session.user.uid);

		console.log({ res });

		if (res) {
			$TodoStore = $TodoStore.filter((t) => t !== todo);
		}
	}
</script>

<div class="grid">
	<div class="check-container" on:click>
		<img
			src={todo.completed ? 'check-mark.png' : 'circle.png'}
			alt="to do item"
			on:click={() => completedChange(todo)}
		/>
	</div>
	<div class="todo-text">
		<p>{todo.text}</p>
	</div>
	<div class="delete-container">
		<img class="delete" src="delete.png" alt="delete" on:click={() => remove(todo)} />
	</div>
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		border-radius: 10px;
		gap: 5px;
		border: 1px solid black;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

		// border: 1px solid black;
		height: fit-content;
		margin-bottom: 10px;
		.check-container {
			cursor: pointer;
			margin: auto;
			height: 17px;
			grid-column: 1/2;
			img {
				height: 100%;
			}
		}
		.todo-text {
			width: 100%;
			grid-column: 2/12;
			p {
				// margin: 0px 17px 0px 20px;
				margin: 5px 0px;
				padding-left: 0px;
				text-align: left;
				overflow-x: hidden;
			}
		}
		.delete-container {
			cursor: pointer;
			opacity: 0;
			transition: opacity 0.2s;
			margin: auto;
			grid-column: 12/13;
			img {
				height: 17px;
			}
		}

		&:hover {
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

			.delete-container {
				display: flex;
				opacity: 1;
			}
		}
	}
</style>
