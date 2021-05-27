import type {Application, DisplayObject} from 'pixi.js';
import type Actor from './Actor';

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
    async addActor (actor: Actor) {
        await actor.setup();
        this.app.stage.addChild(actor.container);
        actor.game = this;
        this.actors.push(actor);
    }

    /**
     * Add children to the application stage.
     */
    addPixiChildren (...children: [DisplayObject]) {
        this.app.stage.addChild(...children);
    }

}
