CREATE TABLE `todo_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`text` text NOT NULL,
	`done` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `todo_table_id` PRIMARY KEY(`id`)
);
