-- Below are the user and other related tables.
-- Yet to fine-tune it to my needs and put into production
-- what we have are skeletons populated with dummy data

-- DROP TABLE IF EXISTS `book-store-dev`.`role`;

-- use only once before production
-- DROP TABLE IF EXISTS `book-store-dev`.`users`;
--
-- CREATE TABLE IF NOT EXISTS `book-store-dev`.`users` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `firstname` VARCHAR(25) NOT NULL,
--     `lastname` VARCHAR(45) NOT NULL,
--     `username` VARCHAR(25) NOT NULL,
--     `email` VARCHAR(45) NOT NULL,
--     `password` VARCHAR(120) NOT NULL,
--
--     `enabled` BOOLEAN NOT NULL,
--     PRIMARY KEY (`id`));
--
-- DROP TABLE IF EXISTS `book-store-dev`.`authorities`;
--
CREATE TABLE IF NOT EXISTS `book-store-dev`.`authorities` (
	 `id` INT NOT NULL AUTO_INCREMENT,
	 `username` VARCHAR(45) NULL,
	 `authority` VARCHAR(45) NULL,
	 PRIMARY KEY (`id`));
