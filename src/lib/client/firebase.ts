import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { goto } from '$app/navigation';
import { session } from '$app/stores';
import { browser } from '$app/env';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB92RJx79Lv4FOgAO_vE4W3TYlU-DoyvV8",
    authDomain: "svelte-portfolio-b054f.firebaseapp.com",
    projectId: "svelte-portfolio-b054f",
    storageBucket: "svelte-portfolio-b054f.appspot.com",
    messagingSenderId: "631534815199",
    appId: "1:631534815199:web:01f90f9aad2fb9d970266a",
    measurementId: "G-CBVNG62KGM"
};

console.log("Initializing firebase");
const provider = new GoogleAuthProvider();

export let app;
export let db;
export function initializeFirebase() {
    if (!app) {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        // startWatcher();
    }
}

export const setterTokenFlag = (set: boolean) => {
    setTokenFlag = !setTokenFlag;
}

// const startWatcher = () => {
//     console.log("watcher started");
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/firebase.User
//             const uid = user.uid;
//             console.log("user logged in");
//             // ...
//         } else {
//             // User is signed out
//             // ...
//             console.log("user not logged in");
//         }
//     });
// }

export const googleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log({ credential });
            // The signed-in user info.
            const user = result.user;
            const token = await user.getIdToken(true);
            // ...

            // await setToken(token);
            console.log("User signed in", user);
            session.update((oldSession) => {
                console.log("Session before updating: ", oldSession);
                if (oldSession.user) {
                    setTokenFlag = false;
                }
                oldSession.user = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid
                };
                console.log("Session after updating: ", oldSession);
                return oldSession;
            });

            console.log({ setTokenFlag });
            setToken(token);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorMessage);
        });
};

export const googleSignOut = () => {
    console.log("googleSignOut Function Call");
    const auth = getAuth();
    signOut(auth).then(async () => {
        await setToken('');
        session.set({});
        goto('/');
    }).catch((error) => {
        console.log(error);
    });
};

export let setTokenFlag = true;
// export const watchStateChange = () => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, async (user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/firebase.User
//             const uid = user.uid;
//             // ...
//             console.log("User signed in (stateChange)", user);
//             session.update((oldSession) => {
//                 console.log("Session before updating: ", oldSession);
//                 if (oldSession.user) {
//                     setTokenFlag = false;
//                 }
//                 oldSession.user = {
//                     name: user.displayName,
//                     email: user.email,
//                     uid: user.uid
//                 };
//                 console.log("Session after updating: ", oldSession);
//                 return oldSession;
//             });

//             console.log({ setTokenFlag });
//             const token = await user.getIdToken();
//             setToken(token);
//         } else {
//             // User is signed out
//             // ...
//             console.log("User not signed in yet (stateChange)");
//         }
//     });
// }

export async function setToken(token: string) {
    if (setTokenFlag) {
        console.log("setToken");
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token })
        };
        let res = await fetch('/api/login.json', options);
    }
}