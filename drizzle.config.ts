import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "mysql",
	dbCredentials: {
		host: process.env.DB_HOST as string,
		port: Number(process.env.DB_PORT),
		user: process.env.DB_USER as string,
		password: process.env.DB_PASSWORD as string,
		database: process.env.DB_NAME as string,
	},
});
