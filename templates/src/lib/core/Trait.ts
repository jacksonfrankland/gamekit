import type Actor from './Actor';

export default interface Trait {
    /**
     * All initial setup.
     */
    setup? (actor: Actor): void;

    /**
     * Called on every frame.
     */
    update? (actor: Actor, delta: number): void;

    /**
     * Called every 50ms.
     */
    fixedUpdate? (actor: Actor, fixedDelta: number): void;

    /**
     * Called after initial setup and when the window is resized
     */
    draw? (actor: Actor): void;
}
