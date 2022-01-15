import {
    doc,
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc,
    query, where, getDocs,
    orderBy, serverTimestamp,
    updateDoc,
    setDoc,
    getDoc,
    Timestamp,
} from 'firebase/firestore';

import { db, initializeFirebase } from '$lib/client/firebase';
import TodoStore from '$lib/stores/todoStore';


export async function get({ params }) {
    // console.log("Before setting");
    // console.log(TodoStore.get());

    initializeFirebase();
    const { slug } = params;
    // console.log({ slug });
    // console.log({ db });

    let todos = [];

    const querySnapshot = await getDocs(collection(db, "todos", slug, "list"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
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

export const post = async ({ params, body }) => {
    const { slug } = params;

    let colRef = collection(db, "todos", slug, "list")
    await addDoc(colRef,
        { "text": body, completed: false, created_at: Timestamp.now() });

    return {
        status: 200,
        body: 'OK'
    }

}

export const del = async ({ params }) => {
    const { slug } = params;
    console.log({ slug });

    return {
        status: 200,
        body: 'OK'
    }
}