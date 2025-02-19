DROP DATABASE IF EXISTS csc648db;
CREATE DATABASE IF NOT EXISTS csc648db;
USE csc648db;


-- -----------------------------------------------------
-- Table `csc648db`.`RegisteredUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`RegisteredUser` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(100) NOT NULL,
  `LastName` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `CreatedDate` DATE NULL DEFAULT NULL,
  `Bio` VARCHAR(255) DEFAULT NULL,
  `PathToProfilePicture` BLOB DEFAULT NULL, -- change might need to be revised, would store S3 path 
  `PathToCoverPicture` BLOB DEFAULT NULL, -- might also need to be revised, would store S3 path 
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `Email` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Alumni`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Alumni` (
  `UserID` INT NOT NULL,
  `AlumniID` INT NULL DEFAULT NULL,
  `Major` VARCHAR(100) NOT NULL,
  `Minor` VARCHAR(100) NULL DEFAULT NULL,
  `GraduationDate` DATE NOT NULL,
  PRIMARY KEY (`UserID`),
  CONSTRAINT `Alumni_RegisteredUser_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Collection` (
  `CollectionID` INT NOT NULL AUTO_INCREMENT,
  `CollectionName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CollectionID`),
  UNIQUE INDEX `CollectionID_UNIQUE` (`CollectionID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Post` (
  `PostID` INT NOT NULL AUTO_INCREMENT,
  `AuthorID` INT NULL DEFAULT NULL,
  `CreatedDate` DATE NULL DEFAULT NULL,
  `EditDate` DATE NULL DEFAULT NULL,
  `PostDescription` VARCHAR(255) NULL DEFAULT NULL,
  `LikesCount` INT DEFAULT 0, 
  PRIMARY KEY (`PostID`),
  INDEX `AuthorID` (`AuthorID` ASC) VISIBLE,
  CONSTRAINT `Post_RegisteredUser_UserID`
    FOREIGN KEY (`AuthorID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `csc648db`.`CollectionOfPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`CollectionOfPost` (
  `PostID` INT NOT NULL,
  `CollectionID` INT NOT NULL,
  PRIMARY KEY (`PostID`, `CollectionID`),
  INDEX `CollectionID` (`CollectionID` ASC) VISIBLE,
  CONSTRAINT `CollectionOfPost_Post_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `csc648db`.`Post` (`PostID`)
    ON DELETE CASCADE,
  CONSTRAINT `CollectionOfPost_Collection_CollectionID`
    FOREIGN KEY (`CollectionID`)
    REFERENCES `csc648db`.`Collection` (`CollectionID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Comment` (
  `CommentID` INT NOT NULL AUTO_INCREMENT,
  `AuthorID` INT NULL DEFAULT NULL,
  `CreatedDate` DATE NULL DEFAULT NULL,
  `PostID` INT NULL DEFAULT NULL,
  `EditDate` DATE NULL DEFAULT NULL,
  `Comment` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CommentID`),
  INDEX `AuthorID` (`AuthorID` ASC) VISIBLE,
  INDEX `PostID` (`PostID` ASC) VISIBLE,
  CONSTRAINT `Comment_RegisteredUser_AuthorID`
    FOREIGN KEY (`AuthorID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE,
  CONSTRAINT `Comment_Post_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `csc648db`.`Post` (`PostID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Picture` (
    `PictureID` INT AUTO_INCREMENT PRIMARY KEY,
    `PostID` INT NOT NULL,
    `S3_PATH` TEXT NOT NULL,
    `FileName` VARCHAR(255) NOT NULL,
    `UploadDate` DATE NOT NULL,
    FOREIGN KEY (`PostID`) REFERENCES `Post`(`PostID`) ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `csc648db`.`Staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Staff` (
  `UserID` INT NOT NULL,
  `StaffID` INT NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `StaffID` (`StaffID` ASC) VISIBLE,
  CONSTRAINT `Staff_RegisteredUser_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Student` (
  `UserID` INT NOT NULL,
  `StudentID` INT NULL DEFAULT NULL,
  `Major` VARCHAR(100) NULL DEFAULT NULL,
  `Minor` VARCHAR(100) NULL DEFAULT NULL,
  `ExpectedGraduation` DATE NULL DEFAULT NULL,
  `BeginDate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `StudentID` (`StudentID` ASC) VISIBLE,
  CONSTRAINT `Student_RegisteredUser_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Tag` (
  `TagID` INT NOT NULL AUTO_INCREMENT,
  `TagDescription` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`TagID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`TagsFromPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`TagsFromPost` (
  `PostID` INT NOT NULL,
  `TagID` INT NOT NULL,
  PRIMARY KEY (`PostID`, `TagID`),
  INDEX `TagID` (`TagID` ASC) VISIBLE,
  CONSTRAINT `TagsFromPost_Post_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `csc648db`.`Post` (`PostID`)
    ON DELETE CASCADE,
  CONSTRAINT `TagsFromPost_Tag_TagID`
    FOREIGN KEY (`TagID`)
    REFERENCES `csc648db`.`Tag` (`TagID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`Video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Video` (
  `VideoID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NULL NOT NULL,
  `S3_PATH` VARCHAR(512) NOT NULL,
  `FileName` VARCHAR(255) NOT NULL,
  `UploadDate` DATE NOT NULL,
  PRIMARY KEY (`VideoID`),
  INDEX `PostID` (`PostID` ASC) VISIBLE,
  CONSTRAINT `Video_Post_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `csc648db`.`Post` (`PostID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `csc648db`.`Friendship`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`Friendship` (
  `User1ID` INT NOT NULL,
  `User2ID` INT NOT NULL,
  `Status` ENUM('Pending', 'Accepted', 'Declined') NOT NULL DEFAULT 'Pending',
  `RequestedDate` DATE NULL DEFAULT NULL,
  `AcceptedDate` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`User1ID`, `User2ID`),
  CONSTRAINT `Friendship_RegisteredUser_User1ID`
    FOREIGN KEY (`User1ID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE,
  CONSTRAINT `Friendship_RegisteredUser_User2ID`
    FOREIGN KEY (`User2ID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `csc648db`.`UserLikes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csc648db`.`UserLikes` (
  `LikeID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `PostID` INT NOT NULL,
  `LikedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- notifcations?
  PRIMARY KEY (`LikeID`),
  UNIQUE INDEX `User_Post_Unique` (`UserID`, `PostID` ASC) VISIBLE,
  CONSTRAINT `UserLikes_Post`
    FOREIGN KEY (`PostID`)
    REFERENCES `csc648db`.`Post` (`PostID`)
    ON DELETE CASCADE,
  CONSTRAINT `UserLikes_User`
    FOREIGN KEY (`UserID`)
    REFERENCES `csc648db`.`RegisteredUser` (`UserID`)
    ON DELETE CASCADE
) ENGINE = InnoDB;


-- continue adding later
-- -----------------------------------------------------
-- Table `csc648db`.`Messages`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `csc648db`.`Messages` (
   `MessagesID` INT NOT NULL UNIQUE,
   `UserID1` INT NOT NULL,
   `UserID2` INT NOT NULL,
	`message_text` VARCHAR(255) NOT NULL

   
 ) ENGINE = InnoDB;
 








SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;






