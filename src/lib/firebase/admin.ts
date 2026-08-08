import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore | null = null;

/**
 * Lazily initialize the Firebase Admin app so a missing/malformed credential
 * surfaces as a normal thrown error inside a route handler's try/catch
 * (-> proper JSON 500) instead of crashing module evaluation itself
 * (-> opaque non-JSON 500 from the platform, seen when this used to
 * initialize at import time).
 */
export function getDb(): Firestore {
  if (!db) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    console.log("Original:");
    console.log(process.env.FIREBASE_PRIVATE_KEY);
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\n/g, "\n");
    console.log("After process:");
    console.log(privateKey);

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "Missing Firebase Admin credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.",
      );
    }

    const app =
      getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
    db = getFirestore(app);
  }
  return db;
}
