<script lang="ts">
	export let game = new Game();
	export let backgroundColor: number = null;
	export let backgroundAlpha = 1;
	export let classList = '';
	export let start: (game: Game) => void;

	import Game from '../core/Game';
    import {onMount} from 'svelte';
	import type {Application} from 'pixi.js';

    let container: HTMLElement;

	onMount(async () => {
		if (!game.app) {
			const Pixi = await import('pixi.js');
			let resolution = window.devicePixelRatio || 1;
			game.app = new Pixi.Application({backgroundColor, backgroundAlpha, autoDensity: true, resolution, resizeTo: container});
		}
		container.appendChild(game.app.view);
		await Promise.resolve(start(game));
	});
</script>

<!-- svelte-ignore missing-declaration -->
<div bind:this={container} class={classList}> </div>
