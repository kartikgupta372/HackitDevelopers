import pandas as pd
import os
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Load the cleaned dataset
cleaned_filename = "cleaned_health_data.csv"

# Check if the file exists before reading
if os.path.exists(cleaned_filename):
    df = pd.read_csv(cleaned_filename)
else:
    print(f"⚠ Error: {cleaned_filename} not found! Make sure data cleaning (Step 2) is completed.")
    exit()

# Remove non-numeric columns before clustering
df_numeric = df.drop(columns=["Name"])  # Name is not needed for clustering

# Normalize data for better clustering performance
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df_numeric)

# 1️⃣ Find the Optimal Number of Clusters Using the Elbow Method
wcss = []  # Within-cluster sum of squares
for k in range(1, 11):  # Checking clusters from 1 to 10
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(df_scaled)
    wcss.append(kmeans.inertia_)

# Plot the Elbow Graph
plt.figure(figsize=(8, 5))
plt.plot(range(1, 11), wcss, marker="o", linestyle="--")
plt.xlabel("Number of Clusters (K)")
plt.ylabel("WCSS (Within-Cluster Sum of Squares)")
plt.title("Elbow Method for Optimal K")
plt.show()

# 2️⃣ Apply K-Means Clustering (Choosing K=3 based on Elbow Method)
optimal_k = 3  # You can change this based on the elbow method graph
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df["Cluster"] = kmeans.fit_predict(df_scaled)  # Assign cluster numbers

# 3️⃣ Save the Clustered Data
clustered_filename = "clustered_health_data.csv"
df.to_csv(clustered_filename, index=False)

print("\n✅ Clustering Completed! Data saved in:", clustered_filename)
print(df.head())  # Show first few rows
