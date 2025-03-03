import {
	mysqlTable,
	serial,
	text,
	boolean,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";

export const todo = mysqlTable("todos", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	text: text("text"),
	done: boolean("done").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
	dueDate: timestamp("due_date"),
});
