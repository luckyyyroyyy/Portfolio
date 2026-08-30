# 🌐 Personal Portfolio Website

This is my personal portfolio website created to showcase my projects, technical skills, certifications, and contact information. The portfolio highlights my journey and work as a BCA Graduate and Full-Stack Developer specializing in Python, Flask, cloud computing, and modern web applications.

## 🚀 Features

- Responsive portfolio design with a custom tubelight floating navigation bar
- About me section detailing background, education, and career focus
- Skills and technologies section with animated progress bars and interactive categories
- Projects showcase (Expense Tracker Pro, Skill Swap Pro, Student Management System, Weather App, etc.)
- Certifications & achievements modal viewer (supporting interactive PDFs and images)
- Integrated Web3Forms contact section with real-time field validation
- **AI-Bot Integration:** Custom Gemini-powered AI chatbot assistant capable of answering questions about my background, skills, and projects in real-time.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Hosted on **Netlify**

### Backend (AI Chatbot)
- Python 3
- Flask
- Google Generative AI SDK (Gemini Flash)
- Hosted on **Render.com**

## 📂 Project Structure

```
portfolio/
│
├── index.html        # Main portfolio page with chatbot UI
├── style.css         # Styling for the portfolio and chatbot
├── script.js         # Frontend logic and API calls to the backend
├── resume.pdf        # Downloadable resume
├── images/           # Image assets
├── .gitignore        # Git ignore rules for security
├── backend/          # Python Flask Server for the Chatbot
│   ├── app.py        # Main server script handling Gemini API
│   └── requirements.txt # Python dependencies
└── README.md
```

## 💻 How to Run the Project Locally

To run the full project, including the AI chatbot, you need to start the backend server and open the frontend page.

### 1. Clone the repository
```bash
git clone https://github.com/luckyyyroyyy/portfolio.git
cd portfolio
```

### 2. Set up the Backend (Chatbot API)
The backend is required for the chatbot to work locally.
```bash
# Navigate to the backend directory
cd backend

# Install the required dependencies
pip install -r requirements.txt

# Create a .env file and add your Gemini API Key
echo "GEMINI_API_KEY=your_actual_api_key_here" > .env

# Run the Flask server
python app.py
```
The server will start running on `http://127.0.0.1:5000`.

### 3. Start the Frontend
- Open the main `portfolio` folder.
- Ensure the API URL in `script.js` is set to point to `http://127.0.0.1:5000/api/chat` for local testing (remember to change it back to the live Render URL for production).
- Open `index.html` in your browser.

## 📸 Portfolio Preview

Add screenshots of your portfolio here.

## 📬 Contact

If you want to connect with me:

- Email: luckyyyroyyy@gmail.com
- GitHub: https://github.com/luckyyyroyyy

---

⭐ If you like this project, feel free to star the repository.
