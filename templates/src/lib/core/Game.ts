import type {Application, DisplayObject} from 'pixi.js';
import Actor from './Actor';
import type Trait from './Trait';

/**
 * A high level representation of the game.
 */
export default class Game {

    /**
     * All the actors currently in the game.
     */
    private actors: Actor[] = [];
    private sinceLastFixed = 0;

    /**
     * @param app The pixi.js application instace all actors will be added to.
     */
    constructor (private app: Application) {
        this.app.ticker.add(delta => {
            this.sinceLastFixed += delta;
            if (this.sinceLastFixed >= 50) {
                this.sinceLastFixed -= 50;
                this.actors.forEach(actor => actor.fixedUpdate(50));
            }
            this.actors.forEach(actor => actor.update(delta));
        });
        window.onresize = () => {
            this.actors.forEach(actor => Promise.resolve(actor.draw?.(this.app)).then(() => {}));
        };
    }

    get width () {
        return this.app.screen.width;
    }

    get height () {
        return this.app.screen.height;
    }

    /**
     * Add an actor to the game.
     */
    addActor (actor: Actor) {
        actor.setup();
        Promise.resolve(actor.draw?.(this.app));
        actor.game = this;
        this.actors.push(actor);
    }

    createActor (...traits: Trait[]) {
        this.addActor(new Actor(...traits))
    }

    /**
     * Add children to the application stage.
     */
    addPixiChildren (...children: DisplayObject[]) {
        this.app.stage.addChild(...children);
    }

}
