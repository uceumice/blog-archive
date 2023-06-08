CREATE TABLE `emails` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text(320) NOT NULL,
	`token` text(21) NOT NULL,
	`timestamp` integer NOT NULL
);

CREATE UNIQUE INDEX `idx_unique_token` ON `emails` (`token`);
CREATE UNIQUE INDEX `idx_unique_email` ON `emails` (`email`);