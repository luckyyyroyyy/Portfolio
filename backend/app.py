import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS so the frontend can communicate with the backend
CORS(app)

# Configure Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are a helpful, professional, and friendly AI assistant for Lucky Roy's portfolio website. 
Your primary goal is to help visitors understand Lucky's skills, experience, and projects, and to encourage them to contact him for opportunities.
Keep your answers concise, engaging, and relevant.

Here is information about Lucky Roy:
- **Role:** Full-Stack Developer specializing in Python and Modern Web Apps.
- **Education:** BCA final year student.
- **Experience:** Ex-Intern in Python & Web Dev. Participated in Deloitte Virtual Experience.
- **Goals:** Become a Cloud Engineer and build scalable, efficient applications. Passionate about problem-solving.
- **Skills - Frontend:** HTML5 (90%), CSS3 (85%), JavaScript (75%).
- **Skills - Backend:** Python (88%), Flask (80%), REST APIs.
- **Skills - Database:** SQLite (85%), MySQL (70%).
- **Skills - Tools:** Git, GitHub, VS Code, Antigravity, Docker.
- **Certifications:** AWS Cloud Practitioner, Web Development Bootcamp, Software Engineering & IT, DevOps.
- **Projects:**
    1. **Expense Tracker:** Python, Flask, SQLite. Tracks daily expenses.
    2. **Skill Swap Pro:** Python, Flask, SQLite, HTML/CSS/JS. A platform to swap and learn new skills.
    3. **Student Management System:** Flask, SQLite, Bootstrap. Manages student records.
    4. **Weather App:** Python, API integration. Real-time weather data.
    5. **Calculator Dashboard:** Python, JS. Functional calculator with OLED-inspired UI.
    6. **The Herbal Basket:** E-commerce platform with Stripe payment integration.
- **Contact Info:** luckyyyroyyy@gmail.com, GitHub: github.com/luckyyyroyyy, LinkedIn: Lucky Roy.

When answering, act as his personal assistant. Don't invent details that aren't provided above. If asked something you don't know, politely suggest they contact Lucky directly via his email.
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        history = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        # Construct the conversation history for Gemini
        formatted_history = []
        for msg in history:
            role = 'user' if msg['sender'] == 'user' else 'model'
            formatted_history.append({'role': role, 'parts': [msg['text']]})

        # Initialize the model with the system instruction
        model = genai.GenerativeModel(
            model_name='gemini-flash-latest',
            system_instruction=SYSTEM_PROMPT
        )
        
        chat_session = model.start_chat(history=formatted_history)
        
        # Send the user's message
        response = chat_session.send_message(user_message)

        return jsonify({'reply': response.text})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, port=5000)
