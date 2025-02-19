USE csc648db;




-- Increase like trigger
DELIMITER //
CREATE TRIGGER increment_like_count AFTER INSERT ON csc648db.UserLikes
FOR EACH ROW
BEGIN
    UPDATE csc648db.Post SET LikesCount = LikesCount + 1 WHERE PostID = NEW.PostID;
END; //
DELIMITER ;


-- Decrease like trigger
DELIMITER //
CREATE TRIGGER decrement_like_count AFTER DELETE ON csc648db.UserLikes
FOR EACH ROW
BEGIN
    UPDATE csc648db.Post SET LikesCount = LikesCount - 1 WHERE PostID = OLD.PostID;
END; //
DELIMITER ;