import { writable, get } from 'svelte/store';
import {
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore';
// import admin from 'firebase-admin';

import { session } from '$app/stores';
import { db, initializeFirebase } from '$lib/client/firebase';

const TodoStore = {
    ...writable([]),
    get: () => get(TodoStore),
    add: (element: any) => {
        initializeFirebase();
        let userId = get(session).id;
        console.log({ userId })
        TodoStore.update((n) => [...get(TodoStore), element])
    },
    flipComplete: (currentTodo) => {
        let store = get(TodoStore);
        let todo = store.filter((n) => n === currentTodo)[0];
        todo.completed = !todo.completed;
        TodoStore.update((n) => n = store);
    }
};

export default TodoStore;