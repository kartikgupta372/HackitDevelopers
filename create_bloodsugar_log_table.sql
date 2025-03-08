USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE BloodSugarLog (
    BloodSugarID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    LogDate DATE,
    Time TIME,
    Reading FLOAT,
    Notes TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
