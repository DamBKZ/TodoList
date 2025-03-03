ALTER TABLE `todos` MODIFY COLUMN `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `todos` MODIFY COLUMN `done` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `todos` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `todos` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `todos` ADD `due_date` timestamp;