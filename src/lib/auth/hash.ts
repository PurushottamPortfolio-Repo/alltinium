import bcrypt from "bcrypt";

/**
 * Compare a plain text value with a bcrypt hash
 */
export function compareHash(value: string, hash: string): boolean {
  try {
    return bcrypt.compareSync(value, hash);
  } catch (error) {
    console.error("Error comparing hash:", error);
    return false;
  }
}

/**
 * Generate a bcrypt hash
 */
export function generateHash(value: string, rounds: number = 10): string {
  try {
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(value, salt);
  } catch (error) {
    console.error("Error generating hash:", error);
    throw new Error("Failed to generate hash");
  }
}
