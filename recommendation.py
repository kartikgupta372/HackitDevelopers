from gemini_api import get_gemini_recommendation
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

# ✅ 1️⃣ Define AI-Powered Recommendations Based on Cluster Insights
recommendations = {}

for cluster in df["Cluster"].unique():
    cluster_data = df[df["Cluster"] == cluster]
    
    # Generate AI-based suggestions using Gemini API
    user_prompt = f"Suggest a healthy pregnancy diet, exercise, and hydration plan for a woman in month {cluster_data['Pregnancy Month'].iloc[0]}."
    ai_suggestion = get_gemini_recommendation(user_prompt)

    # Store AI-generated recommendations
    recommendations[cluster] = {"AI-Based Suggestion": ai_suggestion}

# ✅ 2️⃣ Assign AI Recommendations to Users
df["AI Recommendation"] = df["Cluster"].apply(lambda x: recommendations[x]["AI-Based Suggestion"])

# ✅ 3️⃣ Save the Final Recommendations File
final_filename = "personalized_recommendations.csv"
df.to_csv(final_filename, index=False)

print(f"\n✅ AI-Based Recommendations Generated Successfully! Saved as: {final_filename}")
