CREATE TABLE `todos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`text` text,
	`done` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `todo_table`;