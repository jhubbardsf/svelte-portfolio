import { writable, get } from 'svelte/store';

const myCustomStore = {
    ...writable(0),
    // get: () => get(myCustomStore),
    yeah: () => { return "yeah"; },
    increment: () => { myCustomStore.update((n) => n + 1) }
};

export default myCustomStore;