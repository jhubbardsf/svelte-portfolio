import { writable } from 'svelte/store';

const CountStore = writable(0);

export default CountStore;