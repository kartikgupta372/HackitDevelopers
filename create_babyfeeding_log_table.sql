USE nutrimom_db; -- Make sure the database is selected
Create the BabyFeedingLog Table (After Users)
CREATE TABLE BabyFeedingLog (
    FeedingID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    LogDate DATE,
    StartTime TIME,
    EndTime TIME,
    FeedingType VARCHAR(50),
    Amount FLOAT,
    Unit VARCHAR(50),
    Notes TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);