import type Actor from '../core/Actor';
import type Trait from '../core/Trait';
import {default as Vector, vec} from '../math/Vector';

export default class RigidBody implements Trait {

    private lastUpdate = 0;
    private lastFixedUpdate = 0;
    private fixedDelta: number;

    public velocity: Vector = new Vector();
    public acceleration: Vector = new Vector();
    public visualPosition: Vector;

    constructor (public position = vec(0, 0), private adjustActor = true) {
        this.visualPosition = position.clone;
    }

    fixedUpdate (_: Actor, fixedDelta: number) {
        this.fixedDelta = fixedDelta;
        this.lastFixedUpdate += fixedDelta;
        this.velocity = this.velocity.plus(this.acceleration);
        this.position = this.position.plus(this.velocity);
        this.acceleration = vec(0, 0);
    }

    update (actor: Actor, delta: number) {
        this.lastUpdate += delta;
        let timePassed = Math.min(this.lastUpdate - this.lastFixedUpdate, this.fixedDelta);
        this.visualPosition = timePassed > 0 ? this.position.plus(this.velocity.scaledBy(timePassed / this.fixedDelta)) : this.position.clone;
        if (this.adjustActor) {
            actor.position = this.adjustActor ? this.visualPosition.clone : actor.position;
        }
    }

    addForce (force: Vector) {
        this.acceleration = this.acceleration.plus(force);
    }
}
