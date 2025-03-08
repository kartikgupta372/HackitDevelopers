USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE Users (
    UserID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    DateOfBirth DATE,
    PregnancyDueDate DATE,
    PostpartumDate DATE,
    Weight FLOAT,
    Height FLOAT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);