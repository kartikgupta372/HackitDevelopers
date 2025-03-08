USE nutrimom_db; -- Make sure the database is selected
CREATE TABLE NutritionLog (
    LogID INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNSIGNED,
    LogDate DATE,
    MealType VARCHAR(50),
    FoodName VARCHAR(255),
    Quantity FLOAT,
    Unit VARCHAR(50),
    Calories FLOAT,
    Protein FLOAT,
    Carbohydrates FLOAT,
    Fats FLOAT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);