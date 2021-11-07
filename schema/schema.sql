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


-- -----------------------------------------------------
-- PROCEDURES
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Procedure `add_artwork`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_artwork`(IN artwork_id VARCHAR(50), title TEXT, creation_date TEXT, `medium` VARCHAR(500), credit_line TEXT, date_acquired TEXT, item_width DOUBLE, item_height DOUBLE, item_depth DOUBLE, item_diameter DOUBLE, provenance_text TEXT, classification VARCHAR(50), location_id INT)
BEGIN

INSERT INTO artwork VALUES (
	artwork_id, 
    title, 
    creation_date,
    `medium`,
    credit_line,
    date_acquired,
    item_width,
    item_height,
    item_depth,
    item_diameter,
    provenance_text,
    classification,
    location_id
);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `add_artwork_and_artist`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_artwork_and_creator`(IN artwork_id VARCHAR(100), creator_id INT)
BEGIN

INSERT INTO artwork_has_creator VALUES (artwork_id, creator_id);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `add_creator`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_creator`(creator_id INT, full_name TEXT, cited_name TEXT, `role` TEXT, nationality VARCHAR(150), birth_date TEXT, death_date TEXT, birth_place TEXT, death_place TEXT)
BEGIN

INSERT INTO creator VALUES (
	creator_id,
    full_name,
    cited_name,
    `role`,
    nationality,
    birth_date,
    death_date,
    birth_place,
    death_place
);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `add_location`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_location`(IN department VARCHAR(50), physical_location VARCHAR(50))
BEGIN

INSERT INTO location VALUES (NULL, department, physical_location);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `add_to_tour`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_to_tour`(IN tour_id INT, artwork_id VARCHAR(50))
BEGIN

INSERT INTO tour_has_artwork VALUES (tour_id, artwork_id);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `create_tour`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `create_tour`(IN email VARCHAR(100), tour_name VARCHAR(100))
BEGIN

INSERT INTO tour VALUES (NULL, tour_name, email);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `delete_from_tour`
-- ----------------------------------------------------- 
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_from_tour`(IN tour_id INT)
BEGIN

DELETE FROM tour_has_artwork t WHERE t.tour_id = tour_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `delete_tour`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_tour`(IN tour_id INT)
BEGIN

DELETE FROM tour t WHERE t.tour_id = tour_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `delete_user`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(IN email VARCHAR(100))
BEGIN

DELETE FROM `user` u WHERE u.email = email;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `favorite_artwork`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `favorite_artwork`(IN email VARCHAR(100), artwork_id VARCHAR(50))
BEGIN

INSERT INTO consumer_favorites_artwork VALUES (email, artwork_id);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `favorite_creator`
-- ----------------------------------------------------- 
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `favorite_creator`(IN email VARCHAR(100), creator_id INT)
BEGIN

INSERT INTO consumer_favorites_creator VALUES (email, creator_id);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `favorite_tour`
-- ----------------------------------------------------- 
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `favorite_tour`(IN email VARCHAR(100), tour_id INT)
BEGIN

INSERT INTO consumer_favorites_tour VALUES (email, tour_id);

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `remove_artwork`
-- ----------------------------------------------------- 
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_artwork`(IN artwork_id VARCHAR(50))
BEGIN

DELETE FROM artwork a WHERE a.artwork_id = artwork_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `remove_creator`
-- ----------------------------------------------------- 
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_creator`(IN creator_id INT)
BEGIN

DELETE FROM creator c WHERE c.creator_id = creator_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `remove_favorite_artwork`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_favorite_artwork`(IN email VARCHAR(100), artwork_id VARCHAR(50))
BEGIN

DELETE FROM consumer_favorites_artwork c WHERE c.email = email AND c.artwork_id = artwork_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `remove_favorite_creator`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_favorite_creator`(IN email VARCHAR(100), creator_id INT)
BEGIN

DELETE FROM consumer_favorites_creator c WHERE c.email = email AND c.creator_id = creator_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `remove_favorite_tour`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_favorite_tour`(IN email VARCHAR(100), tour_id INT)
BEGIN

DELETE FROM consumer_favorites_tour c WHERE c.email = email AND c.tour_id = tour_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `remove_location`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_location`(IN location_id INT)
BEGIN

UPDATE artwork a SET a.location_id = 
	(SELECT l.location_id FROM location l WHERE l.department = 'Unknown' AND l.physical_location = 'Unknown') 
WHERE a.location_id = location_id;

DELETE FROM location l WHERE l.location_id = location_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `update_artwork`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_artwork`(IN artwork_id VARCHAR(50), title TEXT, creation_date TEXT, `medium` VARCHAR(500), credit_line TEXT, date_acquired TEXT, item_width DOUBLE, item_height DOUBLE, item_depth DOUBLE, item_diameter DOUBLE, provenance_text TEXT, classification VARCHAR(50), location_id INT)
BEGIN

UPDATE artwork a SET
    a.title = title, 
    a.creation_date = creation_date,
    a.`medium` = `medium`,
    a.credit_line = credit_line,
    a.date_acquired = date_acquired,
    a.item_width = item_width,
    a.item_height = item_height,
    a.item_depth = item_depth,
    a.item_diameter = item_diameter,
    a.provenance_text = provenance_text,
    a.classification = classification,
    a.location_id = location_id
WHERE a.artwork_id = artwork_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `update_creator`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_creator`(creator_id INT, full_name TEXT, cited_name TEXT, `role` TEXT, nationality VARCHAR(150), birth_date TEXT, death_date TEXT, birth_place TEXT, death_place TEXT)
BEGIN

UPDATE creator c SET 
    c.full_name = full_name,
    c.cited_name = cited_name,
    c.`role` = `role`,
    c.nationality = nationality,
    c.birth_date = birth_date,
    c.death_date = death_date,
    c.birth_place = birth_place,
    c.death_place = death_place
WHERE c.creator_id = creator_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `update_location`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_location`(IN location_id INT, department VARCHAR(50), physical_location VARCHAR(50))
BEGIN

UPDATE location l SET l.department = department, l.physical_location = physical_location WHERE l.location_id = location_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `update_tour`
-- ----------------------------------------------------- 
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_tour`(IN tour_id INT, tour_name VARCHAR(100))
BEGIN

UPDATE tour t SET t.tour_name = tour_name WHERE t.tour_id = tour_id;

END

DELIMITER ;


-- -----------------------------------------------------
-- Procedure `update_user`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user`(IN email VARCHAR(100), fname VARCHAR(45), lname VARCHAR(45), `password` VARCHAR(100))
BEGIN

UPDATE `user` u SET 
	u.fname = fname,
    u.lname = lname,
    u.`password` = `password`
WHERE u.email = email;

END

DELIMITER ;


-- -----------------------------------------------------
-- FUNCTIONS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Function `login`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` FUNCTION `login`(email VARCHAR(100), `password` VARCHAR(100)) RETURNS int
    DETERMINISTIC
BEGIN

DECLARE user_exists INT;

SET user_exists = (SELECT COUNT(*) FROM `user` u WHERE u.email = email AND u.`password` = `password`);

IF user_exists = 0 THEN
	RETURN 0;
ELSE 
	RETURN 1;
END IF;

END

DELIMITER ;


-- -----------------------------------------------------
-- Function `register`
-- -----------------------------------------------------
DELIMITER //

CREATE DEFINER=`root`@`localhost` FUNCTION `register`(email VARCHAR(100), fname VARCHAR(45), lname VARCHAR(45), `password` VARCHAR(100)) RETURNS int
    DETERMINISTIC
BEGIN

DECLARE user_exists INT;

SET user_exists = (SELECT COUNT(*) FROM `user` u WHERE u.email = email);

IF user_exists = 0 THEN
	INSERT INTO user VALUES (email, fname, lname, `password`);
    RETURN 1;
ELSE
	RETURN 0;
END IF;

END

DELIMITER ;


-- -----------------------------------------------------
-- QUERIES
-- -----------------------------------------------------

-- Retrieve a specified number of artworks, creator, location (collection) with a specified column
SELECT 
	* 
FROM 
	artwork a NATURAL JOIN artwork_has_creator ac NATURAL JOIN creator c NATURAL JOIN location l
WHERE a.`medium` = 'glass'
LIMIT 500;


-- Retrieve tour(s) for specified user 
SELECT 
	*
FROM
	tour t NATURAL JOIN tour_has_artwork ta
WHERE
	ta.email = 'example@email.dmain';

-- -----------------------------------------------------
-- REPORTS
-- -----------------------------------------------------

-- Retrieve a specified number of artworks, creator, location (collection)

SELECT 
	* 
FROM 
	artwork a NATURAL JOIN artwork_has_creator ac NATURAL JOIN creator c NATURAL JOIN location l
LIMIT 500;
