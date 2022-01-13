<script lang="ts">
	import { FieldValue } from 'firebase/firestore';

	let newToDo: string;

	const addToDo = () => {
		console.log('Adding todo');
	};

	let todos = [
		'Take out garbage',
		'Water plants',
		'Do Dishes',
		'Empty litter',
		'Finish folding laundry',
		"Ask emmy about how she's feeling",
		'This is supposed to be a very long todo to test grid'
	];
</script>

<form>
	<div class="add-container">
		<input type="string" id="newToDo" placeholder="New to do item" />
		<button>Add</button>
	</div>
	<!-- <ul> -->
	{#each todos as todo}
		<div class="grid">
			<!-- <li class="grid"> -->

			<div class="check-container">
				<img src="circle.png" alt="to do item" />
			</div>
			<div class="todo-text">
				<p>{todo}</p>
			</div>
			<div class="delete-container">
				<img class="delete" src="delete.png" alt="delete" />
			</div>
			<!-- </li> -->
		</div>
	{/each}
	<!-- </ul> -->
</form>

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
			.add-container {
				grid-column: 1/13;
				input {
					width: 96%;
					margin: 0 auto;
				}
				button {
					display: none;
				}
			}
			.check-container {
				cursor: pointer;
				margin: auto;
				grid-column: 1/2;
				img {
					height: 17px;
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
	}
</style>
