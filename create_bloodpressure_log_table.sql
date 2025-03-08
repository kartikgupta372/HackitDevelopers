USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE BloodPressureLog (
    BloodPressureID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    LogDate DATE,
    Time TIME,
    Systolic INT,
    Diastolic INT,
    Pulse INT,
    Notes TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
