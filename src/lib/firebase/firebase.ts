import { initializeApp, getApps, getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

/**
 * Firebase Configuration
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,

  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,

  projectId: process.env.FIREBASE_PROJECT_ID!,

  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,

  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,

  appId: process.env.FIREBASE_APP_ID!,

  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

/**
 * Prevent multiple Firebase app instances during hot reload.
 */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Firestore Database
 */
export const db = getFirestore(app);

/**
 * Firebase Authentication
 */
export const auth = getAuth(app);

export default app;
