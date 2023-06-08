CREATE TABLE `access.access` (
	`id` integer PRIMARY KEY NOT NULL,
	`ipid` integer NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`ipid`) REFERENCES `access.ips`(`id`)
);

CREATE TABLE `access.ips` (
	`id` integer PRIMARY KEY NOT NULL,
	`ip` text(45) NOT NULL,
	`type` text NOT NULL
);

CREATE UNIQUE INDEX `idx_unique_ip` ON `access.ips` (`ip`);