# The following takes and stores data from the user and stores it into user_health_data.csv
import csv
import os

# Define CSV filename
CSV_FILE = "user_health_data.csv"

# Function to check and create the file with headers if it doesn’t exist
def create_csv_if_not_exists():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, mode="w", newline="") as file:
            writer = csv.writer(file)
            # Writing the header row
            writer.writerow(["Name", "Age", "Pregnancy Month", "Blood Pressure (BP)", 
                             "Sugar Level (mg/dL)", "Weight (kg)", 
                             "Hydration (glasses of water per day)", "Symptoms"])

# Function to validate numeric input
def get_numeric_input(prompt, min_val=0, max_val=300):
    while True:
        try:
            value = float(input(prompt))
            if min_val <= value <= max_val:
                return value
            else:
                print(f"⚠ Please enter a value between {min_val} and {max_val}.")
        except ValueError:
            print("⚠ Invalid input! Please enter a numeric value.")

# Function to collect user health data
def collect_user_data():
    print("\n🔹 Please enter your health details 🔹\n")

    user_data = [
        input("Enter your name: ").strip(),
        get_numeric_input("Enter your age: ", 15, 50),  # Typical pregnancy age range
        get_numeric_input("Enter your pregnancy month (1-9): ", 1, 9),
        input("Enter your BP (e.g., 120/80): ").strip(),
        get_numeric_input("Enter your sugar level (mg/dL): ", 50, 300),
        get_numeric_input("Enter your weight (kg): ", 40, 120),
        get_numeric_input("Enter your hydration level (glasses/day): ", 0, 20),
        input("Enter any symptoms (e.g., nausea, dizziness, fatigue, etc.): ").strip()
    ]

    return user_data

# Function to save user data to CSV
def save_to_csv(user_data):
    with open(CSV_FILE, mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(user_data)

    print("\n✅ Data successfully saved!\n")

# Main function
def main():
    create_csv_if_not_exists()  # Ensure file is set up
    user_data = collect_user_data()  # Collect user input
    save_to_csv(user_data)  # Store it in CSV file

if __name__ == "__main__":
    main()
