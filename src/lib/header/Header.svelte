<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { Tab } from '$lib/types';
	import { page } from '$app/stores';
	import Title from '$lib/utils/Title.svelte';

	const tabs = [
		{ href: '/', title: 'Home' },
		{ href: '/about', title: 'About' },
		{ href: '/todos', title: 'Todos' },
		{ href: '/counter', title: 'Counter' },
		{ href: '/logout', title: 'Logout' }
	];

	$: title = tabs.find((tab) => tab.href == $page.url.pathname).title;
</script>

<Title {title} />

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src="robot.svg" alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<ul>
			{#each tabs as tab}
				<li class:active={$page.url.pathname === tab.href}>
					<a sveltekit:prefetch href={tab.href}>{tab.title}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: rgba(255, 255, 255, 1);
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		/* border-top: var(--size) solid var(--accent-color); */
		border-top: var(--size) solid black;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
