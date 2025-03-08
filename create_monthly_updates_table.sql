USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE MonthlyUpdates (
    UpdateID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    UpdateDate DATE,
    Weight FLOAT,
    BodyChanges TEXT,
    EnergyLevels INT,
    Mood TEXT,
    FetalDevelopment TEXT,
    BabyPrep TEXT,
    DoctorVisitSummary TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);