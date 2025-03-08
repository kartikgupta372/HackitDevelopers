import pandas as pd
import os
from sklearn.preprocessing import MinMaxScaler

# Define the filename
filename = "user_health_data.csv"

# Check if the file exists before reading
if os.path.exists(filename):
    df = pd.read_csv(filename)
else:
    print(f"⚠ Error: {filename} not found! Make sure data collection (Step 1) is completed.")
    exit()

#  Handle Missing Values
numerical_columns = ["Age", "Pregnancy Month", "Blood Pressure (BP)", "Sugar Level (mg/dL)", "Weight (kg)", "Hydration (glasses of water per day)"]
df[numerical_columns] = df[numerical_columns].fillna(df[numerical_columns].mean())

# Fill missing categorical values with "None"
df["Symptoms"] = df["Symptoms"].fillna("None")

#  Normalize Numerical Data
scaler = MinMaxScaler()
df[numerical_columns] = scaler.fit_transform(df[numerical_columns])

# Convert Symptoms into Structured Data (One-Hot Encoding)
symptom_list = ["Fatigue", "Nausea", "Dizziness", "Headache", "Vomiting"]
for symptom in symptom_list:
    df[symptom] = df["Symptoms"].apply(lambda x: 1 if symptom.lower() in x.lower() else 0)

# Drop the original Symptoms column
df.drop(columns=["Symptoms"], inplace=True)

#  Save the Cleaned Data
cleaned_filename = "cleaned_health_data.csv"
df.to_csv(cleaned_filename, index=False)

print("\n Data Cleaning Completed! Cleaned file saved as:", cleaned_filename)
