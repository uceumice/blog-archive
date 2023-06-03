ALTER TABLE `emails` RENAME COLUMN `addedat` TO `timestamp`;
ALTER TABLE emails ADD `token` text(21) NOT NULL;