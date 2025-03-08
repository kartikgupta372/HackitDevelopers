USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE WeightLog (
    WeightLogID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    LogDate DATE,
    Weight FLOAT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);