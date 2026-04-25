import { db } from "../index.js";
import { ExistingUser, NewUser, users } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createUser(user: NewUser) {
    const [row] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return row;
}

export async function updateUser(
    user: Pick<ExistingUser, "id" | "email" | "hashedPassword">,
) {
    const [row] = await db
        .update(users)
        .set({ hashedPassword: user.hashedPassword, email: user.email })
        .where(eq(users.id, user.id))
        .returning();
    return row;
}

export async function getUserByEmail(email: string) {
    const [result] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    return result;
}

export async function reset() {
    await db.delete(users);
}

export async function upgradeChirpyRed(id: string) {
    const [row] = await db
        .update(users)
        .set({ isChirpyRed: true })
        .where(eq(users.id, id))
        .returning();
    return row;
}
