export function clone<T> (source: T): T {
    return Array.isArray(source)
        ? source.map(item => clone(item))
        : source instanceof Date
            ? new Date(source.getTime())
            : source && typeof source === 'object'
                ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
                    Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
                    o[prop] = clone(source[prop]);
                    return o;
                }, Object.create(Object.getPrototypeOf(source)))
                : source as T;
}

export function unique<T> (items: T[]): T[] {
    return [...(new Set(items))];
}
