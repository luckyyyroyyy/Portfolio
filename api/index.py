import os
import json
import urllib.request
import urllib.error
from flask import Flask, request, jsonify
from flask_cors import CORS
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
            'message': 'Lucky Roy Portfolio Chatbot API (Fast Gemini 2.5 Flash) is running.'
        })

    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return jsonify({'error': 'GEMINI_API_KEY is not configured.'}), 500

        data = request.json or {}
        user_message = data.get('message', '')
        history = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        contents = []
        for msg in history[-6:]:
            role = 'user' if msg.get('sender') == 'user' else 'model'
            contents.append({'role': role, 'parts': [{'text': msg.get('text', '')}]})

        contents.append({'role': 'user', 'parts': [{'text': user_message}]})

        payload = {
            'systemInstruction': {'parts': [{'text': SYSTEM_PROMPT}]},
            'contents': contents,
            'generationConfig': {
                'temperature': 0.6,
                'maxOutputTokens': 260,
                'thinkingConfig': {'thinkingBudget': 0}
            }
        }

        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}'
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )

        with urllib.request.urlopen(req, timeout=12) as response:
            res_json = json.loads(response.read().decode('utf-8'))
            candidates = res_json.get('candidates', [])
            if candidates:
                reply = candidates[0]['content']['parts'][0]['text']
                return jsonify({'reply': reply})
            else:
                return jsonify({'reply': "I'm here to help! Feel free to ask me anything about Lucky Roy's skills or projects."})

    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        print(f"Gemini API Error {e.code}: {err_body}")
        return jsonify({'error': f"Gemini API error: {e.code}"}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
