<!-- PageTransition.svelte -->
<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
	let width = 500;
	let speed = 300;
</script>

<div class="outer-div">
	{#key refresh}
		<div
			in:fly={{ x: -width, duration: speed, delay: speed }}
			out:fly={{ x: width, duration: speed }}
			class="inner-div"
		>
			<slot />
		</div>
	{/key}
</div>

<style lang="scss">
	.outer-div {
		display: grid;
		.inner-div {
			grid-area: 1/1/2/2;
		}
	}
</style>
