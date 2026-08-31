import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

# Load local environment variables (if running locally)
load_dotenv()

app = Flask(__name__)
# Enable CORS so any frontend origin can communicate with the serverless endpoint
CORS(app)

openai_api_key = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key) if openai_api_key else None

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

@app.route('/api/chat', methods=['POST', 'GET'])
def chat():
    if request.method == 'GET':
        return jsonify({
            'status': 'online',
            'message': 'Lucky Roy Portfolio Chatbot API (Vercel Serverless) is running.'
        })

    try:
        if not client:
            return jsonify({'error': 'OPENAI_API_KEY is not configured on the server.'}), 500

        data = request.json or {}
        user_message = data.get('message', '')
        history = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        # Construct conversation messages for OpenAI
        messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
        for msg in history:
            role = 'user' if msg.get('sender') == 'user' else 'assistant'
            messages.append({'role': role, 'content': msg.get('text', '')})

        # Append current user message
        messages.append({'role': 'user', 'content': user_message})

        # Generate response using OpenAI
        completion = client.chat.completions.create(
            model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
            messages=messages,
            temperature=0.7
        )

        reply = completion.choices[0].message.content

        return jsonify({'reply': reply})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'portfolio-chatbot'})

# Local development server support
if __name__ == '__main__':
    app.run(debug=True, port=5000)
