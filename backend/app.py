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

def get_system_prompt():
    prompt_file = os.path.join(os.path.dirname(__file__), 'system_prompt.txt')
    if os.path.exists(prompt_file):
        with open(prompt_file, 'r', encoding='utf-8') as f:
            return f.read()
    return "You are an AI assistant for Lucky Roy's portfolio website. Help visitors understand Lucky's skills and projects."

SYSTEM_PROMPT = get_system_prompt()

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
