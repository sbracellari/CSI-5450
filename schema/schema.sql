-- -----------------------------------------------------
-- Schema art_tour_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `art_tour_db` ;

-- -----------------------------------------------------
-- Schema art_tour_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `art_tour_db` DEFAULT CHARACTER SET utf8 ;
USE `art_tour_db` ;

-- -----------------------------------------------------
-- Table `art_tour_db`.`creator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`creator` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`creator` (
  `creator_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` TEXT NOT NULL,
  `cited_name` TEXT NOT NULL,
  `role` TEXT NULL,
  `nationality` VARCHAR(150) NOT NULL DEFAULT 'Unknown',
  `birth_date` TEXT NULL,
  `death_date` TEXT NULL,
  `birth_place` TEXT NULL,
  `death_place` TEXT NULL,
  PRIMARY KEY (`creator_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `art_tour_db`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`location` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(50) NULL,
  `physical_location` VARCHAR(50) NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `art_tour_db`.`artwork`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`artwork` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`artwork` (
  `artwork_id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(500) NOT NULL DEFAULT 'Unknown',
  `creation_date` TEXT NULL,
  `medium` VARCHAR(500) NULL,
  `credit_line` TEXT NOT NULL,
  `date_acquired` TEXT NOT NULL,
  `item_width` DOUBLE NULL,
  `item_height` DOUBLE NULL,
  `item_depth` DOUBLE NULL,
  `item_diameter` DOUBLE NULL,
  `provenance_text` TEXT NULL,
  `classification` VARCHAR(50) NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`artwork_id`),
  CONSTRAINT `fk_artwork_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `art_tour_db`.`location` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_artwork_location1_idx` ON `art_tour_db`.`artwork` (`location_id` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`user` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`user` (
  `email` VARCHAR(100) NOT NULL,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `art_tour_db`.`consumer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`consumer` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`consumer` (
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`email`),
  CONSTRAINT `fk_consumer_user1`
    FOREIGN KEY (`email`)
    REFERENCES `art_tour_db`.`user` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_consumer_user1_idx` ON `art_tour_db`.`consumer` (`email` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`tour`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`tour` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`tour` (
  `tour_id` INT NOT NULL AUTO_INCREMENT,
  `tour_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`tour_id`),
  CONSTRAINT `fk_tour_consumer1`
    FOREIGN KEY (`email`)
    REFERENCES `art_tour_db`.`consumer` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_tour_consumer1_idx` ON `art_tour_db`.`tour` (`email` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`artwork_has_creator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`artwork_has_creator` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`artwork_has_creator` (
  `artwork_id` VARCHAR(50) NOT NULL,
  `creator_id` INT NOT NULL,
  PRIMARY KEY (`artwork_id`, `creator_id`),
  CONSTRAINT `fk_artwork_has_creator_artwork`
    FOREIGN KEY (`artwork_id`)
    REFERENCES `art_tour_db`.`artwork` (`artwork_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_artwork_has_creator_creator1`
    FOREIGN KEY (`creator_id`)
    REFERENCES `art_tour_db`.`creator` (`creator_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_artwork_has_creator_creator1_idx` ON `art_tour_db`.`artwork_has_creator` (`creator_id` ASC);
CREATE INDEX `fk_artwork_has_creator_artwork_idx` ON `art_tour_db`.`artwork_has_creator` (`artwork_id` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`tour_has_artwork`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`tour_has_artwork` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`tour_has_artwork` (
  `tour_id` INT NOT NULL,
  `artwork_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`tour_id`, `artwork_id`),
  CONSTRAINT `fk_tour_has_artwork_tour1`
    FOREIGN KEY (`tour_id`)
    REFERENCES `art_tour_db`.`tour` (`tour_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tour_has_artwork_artwork1`
    FOREIGN KEY (`artwork_id`)
    REFERENCES `art_tour_db`.`artwork` (`artwork_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_tour_has_artwork_artwork1_idx` ON `art_tour_db`.`tour_has_artwork` (`artwork_id` ASC);
CREATE INDEX `fk_tour_has_artwork_tour1_idx` ON `art_tour_db`.`tour_has_artwork` (`tour_id` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`admin` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`admin` (
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`email`),
  CONSTRAINT `fk_admin_user1`
    FOREIGN KEY (`email`)
    REFERENCES `art_tour_db`.`user` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_admin_user1_idx` ON `art_tour_db`.`admin` (`email` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`consumer_favorites_artwork`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`consumer_favorites_artwork` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`consumer_favorites_artwork` (
  `email` VARCHAR(100) NOT NULL,
  `artwork_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`email`, `artwork_id`),
  CONSTRAINT `fk_consumer_has_artwork_consumer1`
    FOREIGN KEY (`email`)
    REFERENCES `art_tour_db`.`consumer` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_consumer_has_artwork_artwork1`
    FOREIGN KEY (`artwork_id`)
    REFERENCES `art_tour_db`.`artwork` (`artwork_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_consumer_has_artwork_artwork1_idx` ON `art_tour_db`.`consumer_favorites_artwork` (`artwork_id` ASC);
CREATE INDEX `fk_consumer_has_artwork_consumer1_idx` ON `art_tour_db`.`consumer_favorites_artwork` (`email` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`consumer_favorites_tour`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`consumer_favorites_tour` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`consumer_favorites_tour` (
  `email` VARCHAR(100) NOT NULL,
  `tour_id` INT NOT NULL,
  PRIMARY KEY (`email`, `tour_id`),
  CONSTRAINT `fk_consumer_has_tour_consumer1`
    FOREIGN KEY (`email`)
    REFERENCES `art_tour_db`.`consumer` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_consumer_has_tour_tour1`
    FOREIGN KEY (`tour_id`)
    REFERENCES `art_tour_db`.`tour` (`tour_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_consumer_has_tour_tour1_idx` ON `art_tour_db`.`consumer_favorites_tour` (`tour_id` ASC);
CREATE INDEX `fk_consumer_has_tour_consumer1_idx` ON `art_tour_db`.`consumer_favorites_tour` (`email` ASC);


-- -----------------------------------------------------
-- Table `art_tour_db`.`consumer_favorites_creator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `art_tour_db`.`consumer_favorites_creator` ;

CREATE TABLE IF NOT EXISTS `art_tour_db`.`consumer_favorites_creator` (
  `email` VARCHAR(100) NOT NULL,
  `creator_id` INT NOT NULL,
  PRIMARY KEY (`email`, `creator_id`),
  CONSTRAINT `fk_consumer_has_creator_consumer1`
    FOREIGN KEY (`email`)
    REFERENCES `art_tour_db`.`consumer` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_consumer_has_creator_creator1`
    FOREIGN KEY (`creator_id`)
    REFERENCES `art_tour_db`.`creator` (`creator_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_consumer_has_creator_creator1_idx` ON `art_tour_db`.`consumer_favorites_creator` (`creator_id` ASC);
CREATE INDEX `fk_consumer_has_creator_consumer1_idx` ON `art_tour_db`.`consumer_favorites_creator` (`email` ASC);
