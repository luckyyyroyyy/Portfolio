import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_system_prompt():
    possible_paths = [
        os.path.join(os.path.dirname(__file__), 'system_prompt.txt'),
        os.path.join(os.path.dirname(__file__), '..', 'backend', 'system_prompt.txt'),
        os.path.join(os.path.dirname(__file__), 'backend', 'system_prompt.txt'),
    ]
    for path in possible_paths:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                return f.read()
    return "You are an AI assistant for Lucky Roy's portfolio website. Help visitors understand Lucky's skills and projects."

SYSTEM_PROMPT = get_system_prompt()

@app.route('/api/chat', methods=['POST', 'GET', 'OPTIONS'])
@app.route('/chat', methods=['POST', 'GET', 'OPTIONS'])
@app.route('/', methods=['POST', 'GET', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return ('', 204)

    if request.method == 'GET':
        return jsonify({
            'status': 'online',
            'message': 'Lucky Roy Portfolio Chatbot API (Free Gemini Powered) is running.'
        })

    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return jsonify({'error': 'GEMINI_API_KEY is not configured.'}), 500

        genai.configure(api_key=api_key)

        data = request.json or {}
        user_message = data.get('message', '')
        history = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        formatted_history = []
        for msg in history:
            role = 'user' if msg.get('sender') == 'user' else 'model'
            formatted_history.append({'role': role, 'parts': [msg.get('text', '')]})

        try:
            model = genai.GenerativeModel(
                model_name='gemini-2.5-flash',
                system_instruction=SYSTEM_PROMPT
            )
            chat_session = model.start_chat(history=formatted_history)
            response = chat_session.send_message(user_message)
            return jsonify({'reply': response.text})
        except Exception:
            model = genai.GenerativeModel(
                model_name='gemini-flash-latest',
                system_instruction=SYSTEM_PROMPT
            )
            chat_session = model.start_chat(history=formatted_history)
            response = chat_session.send_message(user_message)
            return jsonify({'reply': response.text})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
