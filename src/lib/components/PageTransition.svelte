<!-- PageTransition.svelte -->
<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
	let width = 500;
	let speed = 300;
</script>

{#key refresh}
	<div
		in:fly={{ x: -width, duration: speed, delay: speed }}
		out:fly={{ x: width, duration: speed }}
	>
		<slot />
	</div>
{/key}
