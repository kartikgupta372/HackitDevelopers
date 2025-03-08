import pandas as pd
import sqlite3
from gemini_api import get_gemini_recommendation

# Load user data
clustered_filename = "clustered_health_data.csv"

try:
    df = pd.read_csv(clustered_filename)
except FileNotFoundError:
    print(f"❌ Error: {clustered_filename} not found! Ensure clustering is completed.")
    exit()

# ✅ Connect to SQLite Database (or create if not exists)
conn = sqlite3.connect("nutrimom_history.db")
cursor = conn.cursor()

# ✅ Create table to store user history
cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER,
        pregnancy_month INTEGER,
        diet_type TEXT,
        symptoms TEXT,
        weight_category TEXT,
        ai_recommendation TEXT
    )
""")
conn.commit()

# ✅ Generate AI Recommendations and Store Data
for _, row in df.iterrows():
    user_prompt = f"""
    A {row['Age']}-year-old woman in her {row['Pregnancy Month']} month of pregnancy.
    She follows a {row['Diet Type']} diet and is experiencing {row['Symptoms']}.
    Suggest a diet, hydration plan, and safe exercises.
    """
    ai_suggestion = get_gemini_recommendation(user_prompt)

    # Store in database
    cursor.execute("""
        INSERT INTO user_history (age, pregnancy_month, diet_type, symptoms, weight_category, ai_recommendation)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (row['Age'], row['Pregnancy Month'], row['Diet Type'], row['Symptoms'], row['Weight Category'], ai_suggestion))

conn.commit()
conn.close()

print("\n✅ User data & AI recommendations stored successfully in 'nutrimom_history.db'!")

def get_past_recommendations(user_age, pregnancy_month):
    conn = sqlite3.connect("nutrimom_history.db")
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT ai_recommendation FROM user_history
        WHERE age = ? AND pregnancy_month = ?
        ORDER BY id DESC LIMIT 1
    """, (user_age, pregnancy_month))
    
    result = cursor.fetchone()
    conn.close()
    
    return result[0] if result else "No past recommendations found."
