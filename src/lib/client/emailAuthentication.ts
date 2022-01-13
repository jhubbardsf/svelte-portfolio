import { goto } from "$app/navigation";
import { session } from "$app/stores";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app, setToken, setTokenFlag, setterTokenFlag } from "./firebase";


export const registerAccount = (email: string, password: string) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            // --------------------- //

            // The signed-in user info.
            const token = await user.getIdToken(true);
            // ...
            handleToken(token, user);
            goto('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
};

export const emailSignIn = (email: string, password: string) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            // The signed-in user info.
            const token = await user.getIdToken(true);
            // ...
            handleToken(token, user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

const handleToken = (token, user) => {
    console.log("User signed in (handleToke)", user);
    session.update((oldSession) => {
        console.log("Session before updating: ", oldSession);
        if (oldSession.user) {
            setterTokenFlag(false);
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
}