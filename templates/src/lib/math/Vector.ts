/**
 * Represents a 2 dimensional Vector.
 */
export default class Vector {

    /**
     * @param x The x component.
     * @param y The y component.
     */
    constructor (public x: number = 0, public y: number = 0) {}

    /**
     * Return a copy of this Vector.
     */
    get clone () {
        return new Vector(this.x, this.y);
    }

    /**
     * Round the x and y components to the nearest whole number.
     */
    get round () {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }

    /**
     * Returns the magnitude squared. Use this over magnitude if possible to avoid the square root operation.
     */
    get magnitudeSquared () {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    /**
     * Returns the magnitude. Use magnitudeSquared over this if possible to avoid the square root operation.
     */
    get magnitude () {
        return Math.sqrt(this.magnitudeSquared);
    }

    /**
     * Returns the unit vector of this vector.
     */
    get unit () {
        let magnitude = this.magnitude;
        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    /**
     * Returns the angle of the vector in degrees treating right as 0 and rotating counter clockwise.
     */
    get degrees () {
        if (this.x === 0) {
            return this.y > 0 ? 180 : 0;
        }
        return Math.atan(this.y / this.x) * 180 / Math.PI + (this.x > 0 ? 90 : -90);
    }

    /**
     * Returns the angle of the vector in radians.
     */
    get radians () {
        if (this.x === 0) {
            return this.y > 0 ? Math.PI : 0;
        }
        return Math.atan(this.y / this.x) + (this.x > 0 ? Math.PI / 2 : Math.PI / -2);
    }

    /**
     * Add a vector. The result is returned
     */
    plus (other: Vector): Vector;
    plus (x: number, y: number): Vector;
    plus (a: Vector|number, b?: number) {
        let other = a instanceof Vector ? a : new Vector(a, b);
        return new Vector(this.x + other.x, this.y + other.y);
    }


    /**
     * Subtract a vector. The result is returned
     */
    minus (other: Vector): Vector;
    minus (x: number, y: number): Vector;
    minus (a: Vector|number, b?: number) {
        let other = a instanceof Vector ? a : new Vector(a, b);
        return new Vector(this.x - other.x, this.y - other.y);
    }

    scaledBy (scalar: number) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
}

/**
 * A helper for constructing a Vector.
 */
export function vec (x: number, y: number) {
    return new Vector(x, y);
}
