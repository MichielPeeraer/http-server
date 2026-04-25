import { db } from "../index.js";
import { NewChirp, chirps } from "../schema.js";
import { asc, eq } from "drizzle-orm";

export async function createChirp(chirp: NewChirp) {
    const [row] = await db.insert(chirps).values(chirp).returning();
    return row;
}

export async function getChirps(authorId?: string) {
    return db
        .select()
        .from(chirps)
        .where(authorId ? eq(chirps.userId, authorId) : undefined);
}

export async function getChirp(id: string) {
    const [result] = await db.select().from(chirps).where(eq(chirps.id, id));
    return result;
}

export async function deleteChirp(id: string) {
    const rows = await db.delete(chirps).where(eq(chirps.id, id)).returning();
    return rows.length > 0;
}
