import {
    collection,
    query,
    getDocs,
    orderBy
} from 'firebase/firestore';

import { db, initializeFirebase } from '$lib/client/firebase';
import TodoStore from '$lib/stores/todoStore';


export async function get({ params }) {
    initializeFirebase();
    const { slug } = params;
    let todos = [];
    let colRef = collection(db, "todos", slug, "list");
    const q = query(colRef, orderBy("created_at", "asc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let thisDoc = doc.data();
        thisDoc.id = doc.id;
        todos.push(thisDoc);
    });

    TodoStore.set(todos);

    return {
        status: 200,
        body: JSON.stringify({ todos })
    }
}