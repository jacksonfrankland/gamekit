import type {Application, Container, DisplayObject} from "pixi.js";
import {default as Vector, vec} from "../math/Vector";
import type Game from "./Game";
import type Trait from "./Trait";

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

    get size () {
        return vec(this.container?.width ?? 0, this.container?.height ?? 0);
    }

    set size (size: Vector) {
        if (!this.container) return;
        this.container.width = size.x;
        this.container.height = size.y;
    }

    get pivot () {
        return vec(this.container?.pivot?.x ?? 0, this.container?.pivot?.y ?? 0);
    }

    set pivot (pivot: Vector) {
        if (!this.container) return;
        this.container.pivot.x = pivot.x;
        this.container.pivot.y = pivot.y;
    }

    /**
     * All initial setup.
     */
    async setup () {
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

    async draw (app: Application) {
        const Pixi = await import('pixi.js');
        this.container?.destroy();
        this.container = new Pixi.Container();
        this.traits.forEach(trait => Promise.resolve(trait.draw?.(this)));
        app.stage.addChild(this.container);
    }

    addPixiChild (child: DisplayObject) {
        this.container.addChild(child);
    }

    trigger (event: string, data?: any) {
        type listener = (data: any) => void;
        this.traits.map(trait => trait[`on${event[0].toUpperCase()}${event.slice(1)}`] as listener).forEach(listener => listener?.(data));
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

    hasTrait <T> (traitType: {new () : T}) {
        return !!this.traits.find(trait => trait instanceof traitType);
    }

}
