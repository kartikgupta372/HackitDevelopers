import pandas as pd
import numpy as np

# Load the clustered dataset from Step 3
clustered_filename = "clustered_health_data.csv"

# Check if the file exists before proceeding
try:
    df = pd.read_csv(clustered_filename)
except FileNotFoundError:
    print(f"❌ Error: {clustered_filename} not found! Ensure clustering (Step 3) is completed.")
    exit()

# ✅ 1️⃣ Define Recommendation Rules Based on Cluster Insights
recommendations = {}

for cluster in df["Cluster"].unique():
    cluster_data = df[df["Cluster"] == cluster]

    # Example Recommendation Logic:
    if cluster == 0:  # Example: Users in early pregnancy (1-3 months)
        recommendations[cluster] = {
            "Diet": "Increase folic acid intake (e.g., spinach, oranges, lentils).",
            "Exercise": "Mild stretching and walking recommended.",
            "Hydration": "Drink at least 8 glasses of water daily."
        }
    elif cluster == 1:  # Example: Mid-pregnancy (4-6 months)
        recommendations[cluster] = {
            "Diet": "Increase iron-rich foods (e.g., beans, fish, fortified cereals).",
            "Exercise": "Light yoga can improve flexibility and reduce stress.",
            "Hydration": "Coconut water can help maintain electrolyte balance."
        }
    elif cluster == 2:  # Example: Late pregnancy (7-9 months)
        recommendations[cluster] = {
            "Diet": "High-protein diet (e.g., eggs, dairy, lean meat) to support fetal growth.",
            "Exercise": "Gentle pelvic exercises help in labor preparation.",
            "Hydration": "Maintain hydration to avoid constipation issues."
        }
    else:  # Default case
        recommendations[cluster] = {
            "Diet": "Balanced diet with proper macros (carbs, proteins, fats).",
            "Exercise": "Consult a doctor before exercising.",
            "Hydration": "Drink at least 3 liters of water daily."
        }

# ✅ 2️⃣ Assign Recommendations to Users
df["Diet Recommendation"] = df["Cluster"].apply(lambda x: recommendations[x]["Diet"])
df["Exercise Recommendation"] = df["Cluster"].apply(lambda x: recommendations[x]["Exercise"])
df["Hydration Recommendation"] = df["Cluster"].apply(lambda x: recommendations[x]["Hydration"])

# ✅ 3️⃣ Save the Final Recommendations File
final_filename = "personalized_recommendations.csv"
df.to_csv(final_filename, index=False)

print(f"\n✅ Recommendations Generated Successfully! Saved as: {final_filename}")
