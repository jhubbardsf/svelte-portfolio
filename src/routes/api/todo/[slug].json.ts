import {
    doc,
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc,
    query, where, getDocs,
    orderBy, serverTimestamp,
    updateDoc,
    setDoc,
    getDoc
} from 'firebase/firestore';

import { db, initializeFirebase } from '$lib/client/firebase';

export async function get({ params }) {
    initializeFirebase();
    const { slug } = params;
    console.log({ slug });
    console.log({ db });

    let todos = [];

    const querySnapshot = await getDocs(collection(db, "todos", slug, "list"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        todos.push(doc.data());
    });

    return {
        status: 200,
        body: JSON.stringify({ todos })
    }
}

export const post = async ({ params, body }) => {

    const { slug } = params;
    console.log({ slug });
    console.log(slug);
    console.log(body);

    await setDoc(doc(db, "counter", slug), { "count": parseInt(body) });

    return {
        status: 200,
        body: 'OK'
    }

}