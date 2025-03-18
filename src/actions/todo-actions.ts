"use server";

import { db } from "../db/index";
import { todo } from "../db/schema";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getTodos = async () => {
	return await db.select().from(todo).orderBy(todo.createdAt);
};

export const addTodo = async (
	title: string,
	text: string | null,
	dueDate: Date,
) => {
	const formattedDueDate = new Date(dueDate);
	await db.insert(todo).values({
		title,
		text: text ?? "",
		done: false,
		dueDate: formattedDueDate,
	});
	revalidatePath("/");
};

export const deleteTodo = async (id: number) => {
	await db.delete(todo).where(eq(todo.id, id));
	revalidatePath("/");
};

export const editTodo = async (id: number, text: string | null) => {
	await db
		.update(todo)
		.set({ text: text ?? "" })
		.where(eq(todo.id, id));
	revalidatePath("/");
};

export const toggleTodo = async (id: number) => {
	await db
		.update(todo)
		.set({ done: not(todo.done) })
		.where(eq(todo.id, id));
	revalidatePath("/");
};
