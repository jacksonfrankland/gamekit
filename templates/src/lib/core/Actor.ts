import type {Container} from "pixi.js";
import {default as Vector, vec} from "../math/Vector";
import Game from "./Game";
import Trait from "./Trait";

/**
 * Represents anything to be shown in the game.
 */
export default class Actor {

    private traits: Trait[];

    /**
     * Will be used by traits for rendering
     */
    public container: Container;

    /**
     * A high level representation of the game.
     */
    public game: Game;

    /**
     * @param traits The traits this actor has.
     */
    constructor (...traits: Trait[]) {
        this.traits = traits;
    }

    get position () {
        return vec(this.container?.x ?? 0, this.container?.y ?? 0);
    }

    set position (position: Vector) {
        if (!this.container) return;
        this.container.x = position.x;
        this.container.y = position.y;
    }

    /**
     * All initial setup.
     */
    async setup () {
        const Pixi = await import('pixi.js');
        this.container = new Pixi.Container();
        this.traits.forEach(trait => trait.setup?.(this));
    }

    /**
     * Called on every frame.
     */
    update (delta: number) {
        this.traits.forEach(trait => trait.update?.(this, delta));
    }

    fixedUpdate (fixedDelta: number) {
        this.traits.forEach(trait => trait.fixedUpdate?.(this, fixedDelta));
    }

    getTrait <T> (traitType: {new (): T}, createIfNeeded = true): T {
        let trait = this.traits.find(trait => trait instanceof traitType);
        if (!trait && createIfNeeded) {
            trait = new traitType();
            trait.setup?.(this);
            this.traits.push(trait);
        }
        return trait as T;
    }

}
