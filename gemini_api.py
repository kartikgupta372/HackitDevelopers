import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini API with the secure key
genai.configure(api_key=API_KEY)

# Function to get AI-generated recommendations
def get_gemini_recommendation(prompt):
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    return response.text
