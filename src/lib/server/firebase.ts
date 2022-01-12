import admin from 'firebase-admin';
import { browser } from '$app/env';
// import { initializeApp } from 'firebase-admin/app';
import { initializeApp } from 'firebase-admin/app';

if (browser) {
    // Just in case. I want to know if this file spills into the client ASAP.
    throw Error('Cannot load server constants on the client (server/config.ts)');
}

export let FIREBASE_SERVER_CONFIG = '';

if (process && process.env && process.env['VITE_FIREBASE_CLIENT_CONFIG']) {
    FIREBASE_SERVER_CONFIG = process.env['VITE_FIREBASE_SERVER_CONFIG'] || '';
} else {
    FIREBASE_SERVER_CONFIG = (import.meta.env.VITE_FIREBASE_SERVER_CONFIG || '').toString();
}

function initializeFirebase() {
    console.log("server initialize firebase");
    if (!admin.apps.length) {
        console.log("admin.apps.length", admin.apps.length);
        const serviceAccount = JSON.parse(FIREBASE_SERVER_CONFIG);
        console.log("serviceAccount", serviceAccount);
        initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
        });
    }
}

export async function decodeToken(token: string) {
    console.log("decodeToken Function (token)", token);
    if (!token || token === 'null' || token === 'undefined') return null;
    try {
        initializeFirebase();
        const isVerified = await admin.auth().verifyIdToken(token);
        console.log("isVerified", isVerified);
        return isVerified;
    } catch (err) {
        console.log("err", err);
        return null;
    }
}