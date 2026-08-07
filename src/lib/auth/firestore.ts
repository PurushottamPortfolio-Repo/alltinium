import { Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase/admin";
import { FIRESTORE_COLLECTIONS } from "./constants";

export interface OTPDocument {
  email: string;
  otpHash: string;
  expiresAt: Date | string;
  verified: boolean;
  resendCount: number;
  requestCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Firestore Admin SDK returns Date fields as `Timestamp` instances, not `Date`.
 * `new Date(timestamp)` does not convert them correctly, so this must go through `.toDate()`.
 */
function toDate(value: Date | string | Timestamp): Date {
  if (value instanceof Timestamp) {
    return value.toDate();
  }
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}

/**
 * Save or update an OTP document in Firestore
 */
export async function saveOTPDocument(email: string, data: OTPDocument): Promise<void> {
  try {
    const docRef = getDb().collection(FIRESTORE_COLLECTIONS.OTP).doc(email);

    // Ensure Date objects are stored consistently (Firestore converts these to Timestamps)
    const dataToStore = {
      ...data,
      expiresAt: toDate(data.expiresAt),
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };

    await docRef.set(dataToStore, { merge: false });
    console.log(`OTP document saved for email: ${email}`);
  } catch (error) {
    console.error(`Failed to save OTP document for ${email}:`, error);
    throw new Error(
      `Failed to save OTP: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Get an OTP document from Firestore
 */
export async function getOTPDocument(email: string): Promise<OTPDocument | null> {
  try {
    const docRef = getDb().collection(FIRESTORE_COLLECTIONS.OTP).doc(email);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data() as OTPDocument;
    return {
      ...data,
      expiresAt: toDate(data.expiresAt),
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  } catch (error) {
    console.error(`Failed to get OTP document for ${email}:`, error);
    throw new Error(
      `Failed to retrieve OTP: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Delete an OTP document from Firestore
 */
export async function deleteOTPDocument(email: string): Promise<void> {
  try {
    const docRef = getDb().collection(FIRESTORE_COLLECTIONS.OTP).doc(email);
    await docRef.delete();
    console.log(`OTP document deleted for email: ${email}`);
  } catch (error) {
    console.error(`Failed to delete OTP document for ${email}:`, error);
    throw new Error(
      `Failed to delete OTP: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Clean up expired OTP documents (run this periodically via cron job)
 */
export async function cleanupExpiredOTPs(): Promise<number> {
  try {
    const now = new Date();
    const collectionRef = getDb().collection(FIRESTORE_COLLECTIONS.OTP);
    const snapshot = await collectionRef.where("expiresAt", "<", now).get();

    let deletedCount = 0;
    const batch = getDb().batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      deletedCount++;
    });

    await batch.commit();
    console.log(`Cleaned up ${deletedCount} expired OTP documents`);
    return deletedCount;
  } catch (error) {
    console.error("Failed to cleanup expired OTPs:", error);
    return 0;
  }
}
