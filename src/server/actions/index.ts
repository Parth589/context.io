"use server";

import {eq} from "drizzle-orm";
import {z} from "zod";
import {db} from "~/server/db"
import {posts} from "~/server/db/schema"

const formSchema = z.object({
	content: z.string().min(2).max(50),
	expireTime: z.enum(["10", "20", "30", "60", "120"])
})
export const createContext = async (values: z.infer<typeof formSchema>) => {
	const res = await db.insert(posts).values({
		content: values.content,
		expireTime: Number(values.expireTime),
		createdAt: new Date()
	}).returning();
	return res;
}

export const getContext = async (id: number) => {
	const res = await db.select().from(posts).where(eq(posts.id, id));
	return res;
}