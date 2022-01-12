import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where, getDocs,
    orderBy, serverTimestamp,
    updateDoc,
    setDoc,
    getDoc
} from 'firebase/firestore';

import { app, db, initializeFirebase } from '$lib/client/firebase';
import { getAuth } from "firebase/auth";


export async function get({ params }) {
    initializeFirebase();
    const { slug } = params;
    console.log({ slug });
    // const auth = getAuth(app);
    // const user = auth.currentUser;

    console.log({ db });

    const docRef = doc(db, "counter", slug);
    const docSnap = await getDoc(docRef);

    let count;
    if (docSnap.exists()) {
        count = docSnap.data().count;
        console.log("Document data:", docSnap.data());
    } else {
        count = -1;
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    return {
        status: 200,
        body: JSON.stringify({ count })
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