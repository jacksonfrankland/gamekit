<script lang="ts">
	export let backgroundColor: number = null;
	export let backgroundAlpha = 1;
	export let classList = '';
	export let start: (game: Game) => void;

	import Game from '../core/Game';
    import {onMount} from 'svelte';
	import type {Application} from 'pixi.js';

	let application: Application;
    let container: HTMLElement;
	let game: Game;

	onMount(async () => {
		const Pixi = await import('pixi.js');
		let resolution = window.devicePixelRatio || 1;
		application = new Pixi.Application({backgroundColor, backgroundAlpha, autoDensity: true, resolution, resizeTo: container});
		container.appendChild(application.view);
		game = new Game(application);
		start(game);
	});
</script>

<!-- svelte-ignore missing-declaration -->
<div bind:this={container} class={classList}> </div>
