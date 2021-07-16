import { writable } from 'svelte/store';

export default function <T> (values: T[]) {

    const { subscribe, update } = writable(values.map((value, key) => ({key, value})));

    return {
        subscribe,
        enqueue (value: T) {
            update (values => [...values, {key: values[values.length - 1].key + 1, value}]);
        },
        dequeue () {
            update(values => values.slice(1));
        }
    }
}
