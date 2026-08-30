# 🌐 Lucky Roy M - Personal Portfolio Website

This is my personal portfolio website created to showcase my professional work experience, software engineering projects, technical skills, academic background, certifications, and contact information. The portfolio highlights my journey and work as a **Web Developer & Graphic Designer** and **Full-Stack Developer** specializing in React.js, Python, Flask, responsive web design, performance optimization, and modern digital solutions.

## 🚀 Features

- **Responsive Modern UI:** Sleek dark-mode aesthetic with custom tubelight floating navigation bar and glowing ambient effects.
- **About & Strengths:** Professional summary, core strengths, and career highlights.
- **Experience Timeline:** Detailed breakdown of professional roles (Web Developer & Graphic Designer at PM Techno Solutions) and internships (Web Development Intern at VM Technology and Financial Services - VMTFS).
- **Technical Skills:** Categorized skills with interactive progress bars (Languages, Frontend, Backend & APIs, Databases, Tools & Deployment, Libraries & Specializations).
- **Featured Projects:** In-depth showcases with interactive modals for **SkillSwap Pro** (real-time chat with SocketIO & gamification), **ExpenseOrbit** (PWA personal finance with Tesseract OCR receipt scanning), **The Herbal Basket**, and more.
- **Education Section:** Highlights of BCA from Sir M Visvesvaraya Degree College (CGPA: 8.94 / SGPA: 8.98) and PUC from Samruddhi PU & Degree College (76%).
- **Certifications Viewer:** Interactive modal viewer supporting PDF certificates (AWS Certification, DevOps, Deloitte Cyber Security, Software Engineering & IT, Internship).
- **Integrated Contact Form:** Web3Forms integration with real-time field validation, direct phone link (+91 6360164066), email, and social profiles.
- **AI-Bot Integration:** Gemini-powered AI chatbot assistant capable of answering questions about Lucky's experience, skills, projects, and contact info in real-time.

## 🛠️ Technologies Used

### Frontend
- HTML5 & CSS3 (Vanilla CSS with custom design tokens)
- Vanilla JavaScript (ES6+)
- FontAwesome Icons & Google Fonts (Poppins)
- Hosted on **Netlify** / GitHub Pages

### Backend (AI Chatbot)
- Python 3 & Flask
- Flask-CORS & python-dotenv
- Google Generative AI SDK (Gemini Flash)
- Hosted on **Render.com**

## 📂 Project Structure

```
portfolio/
│
├── index.html        # Main portfolio page with all sections and chatbot UI
├── style.css         # Styling for the portfolio, animations, and chatbot
├── script.js         # Frontend logic, modal handlers, and chatbot API client
├── resume.pdf        # Downloadable resume
├── images/           # Image and PDF certificate assets
├── backend/          # Python Flask Server for the Chatbot
│   ├── app.py        # Server script handling Gemini API requests
│   ├── system_prompt.txt # Comprehensive context for the AI assistant
│   └── requirements.txt  # Python dependencies
└── README.md
```

## 💻 How to Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/luckyyyroyyy/portfolio.git
cd portfolio
```

### 2. Set up the Backend (Chatbot API)
```bash
cd backend
pip install -r requirements.txt

# Create a .env file and add your Gemini API Key
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Run the Flask server
python app.py
```
The server will start running on `http://127.0.0.1:5000`.

### 3. Open the Frontend
- Open `index.html` in your web browser (or use VS Code Live Server).

## 📬 Contact

- **Email:** luckyyyroyyy@gmail.com
- **Phone:** +91 6360164066
- **Location:** Bangalore, Karnataka, India
- **LinkedIn:** [linkedin.com/in/luckyyyroyyy](https://www.linkedin.com/in/luckyyyroyyy/)
- **GitHub:** [github.com/luckyyyroyyy](https://github.com/luckyyyroyyy)
- **Portfolio:** [https://luckyyyroyyy.github.io/](https://luckyyyroyyy.github.io/)

---

⭐ Feel free to star the repository if you found this project helpful!
