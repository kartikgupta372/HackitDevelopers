USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE HydrationLog (
    HydrationID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    LogDate DATE,
    Amount FLOAT,
    Unit VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);