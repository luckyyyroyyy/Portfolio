// --- Tubelight Navbar Logic ---
const navItems = document.querySelectorAll('.nav-item');
const navLamp = document.getElementById('navLamp');
const sections = document.querySelectorAll('section');

function updateLampPosition(activeItem) {
    if (!activeItem || !navLamp) return;
    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = activeItem.parentElement.getBoundingClientRect();

    // Calculate relative position within the container
    const left = itemRect.left - containerRect.left;
    const width = itemRect.width;

    navLamp.style.width = `${width}px`;
    navLamp.style.transform = `translateX(${left}px)`; // Using transform for smoother animation than left
}

// Initialize lamp position on load
window.addEventListener('load', () => {
    const initialActive = document.querySelector('.nav-item.active') || navItems[0];
    updateLampPosition(initialActive);
});

// Handle window resize dynamically to snap lamp
window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.nav-item.active');
    updateLampPosition(activeItem);
});

// Handle click events (for smooth scroll, the href handles navigation, we just update UI)
navItems.forEach(item => {
    item.addEventListener('click', function (e) {
        // Remove active from all
        navItems.forEach(n => n.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
        updateLampPosition(this);
    });
});

// Update active nav link and lamp position strictly on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Add an offset so it triggers slightly before hitting the exact top
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === current) {
            item.classList.add('active');
            updateLampPosition(item);
        }
    });
});

// Scroll Reveal Animation Observer
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once it's revealed
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// --- Project Modals Logic ---
const projectsData = {
    'expense-tracker': {
        title: 'Expense Tracker Web App',
        desc: 'A comprehensive web application designed to help users track their daily expenses and manage personal finances efficiently. It features a clean dashboard, expense categorization, and detailed reporting.',
        img: 'images/expenses tracker.webp',
        tech: ['Python', 'Flask', 'SQLite', 'HTML/CSS', 'JavaScript'],
        github: 'https://github.com/luckyyyroyyy/Expense-tracker-pro.git'
    },
    'skill-swap': {
        title: 'Skill Swap Pro',
        desc: 'An innovative platform where users can connect to swap and mutually learn new skills. Features include user profiles, skill matching algorithms, real-time messaging, and review systems.',
        img: 'images/skillswap.webp',
        tech: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/luckyyyroyyy/Skill-Swap.git'
    },
    'student-management': {
        title: 'Student Management System',
        desc: 'A robust web application built for educational institutions to manage student records, track attendance, handle grading, and generate academic reports seamlessly.',
        img: 'images/stumangsys.webp',
        tech: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'Bootstrap'],
        github: 'https://github.com/luckyyyroyyy/Student-management-system.git'
    },
    'weather-app': {
        title: 'Weather App',
        desc: 'A dynamic weather application that provides real-time atmospheric data, forecasts, and interactive weather maps by integrating with external RESTful weather APIs.',
        img: 'images/weather.webp',
        tech: ['Python', 'Flask', 'OpenWeatherMap API', 'JavaScript', 'CSS'],
        github: 'https://github.com/luckyyyroyyy/weather-app-api.git'
    },
    'calculator': {
        title: 'Calculator Dashboard',
        desc: 'A highly functional and responsive calculator utility application designed for quick mathematical operations with advanced features and a modern OLED-inspired user interface.',
        img: 'images/calculator.webp',
        tech: ['HTML', 'CSS', 'JavaScript', 'Python (Backend utility)'],
        github: 'https://github.com/luckyyyroyyy/Calculator--python.git'
    },
    'herbal-basket': {
        title: 'The Herbal Basket',
        desc: 'A full-featured e-commerce platform for herbal and organic products. Includes a shopping cart, secure checkout process integrated with Stripe API, and an admin dashboard.',
        img: 'images/herbal.webp',
        tech: ['Python', 'Flask', 'SQLite', 'Stripe API', 'HTML/CSS/JS'],
        github: 'https://github.com/luckyyyroyyy?tab=repositories'
    }
};

const modalOverlay = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalGithub = document.getElementById('modal-github');
const projectCards = document.querySelectorAll('.project-card');

// Open Modal
projectCards.forEach(card => {
    const detailBtn = card.querySelector('.btn-details');
    if (detailBtn) {
        detailBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default if it's an anchor tag converted
            const projectId = card.getAttribute('data-id');
            const data = projectsData[projectId];

            if (data) {
                modalImg.src = data.img;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;

                // Populate tech stack
                modalTech.innerHTML = '';
                // Determine colors for specific techs
                const techColors = {
                    'Python': '#FFD43B',
                    'Flask': '#ffffff',
                    'SQLite': '#54a6db',
                    'HTML': '#E34F26',
                    'CSS': '#1572B6',
                    'JavaScript': '#F7DF1E',
                    'Stripe API': '#635bff'
                };

                data.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tech-pill';
                    span.textContent = tech;
                    // Find base color key or default white
                    let color = '#ddd';
                    for (const key in techColors) {
                        if (tech.includes(key)) color = techColors[key];
                    }
                    span.style.color = color;
                    modalTech.appendChild(span);
                });

                modalGithub.href = data.github;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    }
});

// Close Modal via Button
closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close Modal via clicking outside content
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// --- View Resume Button Logic ---
const viewResumeBtn = document.getElementById('viewResumeBtn');
if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
        // Update the resumeUrl to your resume file path or external link
        const resumeUrl = 'resume.pdf'; // Change this to your resume path or URL
        window.open(resumeUrl, '_blank');
    });
}

// --- Back to Top Button Logic ---
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Certificate Modals Logic ---
const certModal = document.getElementById('cert-modal');
const closeCertBtn = document.querySelector('.close-cert');
const certModalContentArea = document.getElementById('cert-modal-content-area');
const certModalTitle = document.getElementById('cert-modal-title');
const certBadges = document.querySelectorAll('.cert-badge.clickable-badge');

certBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        const fileSrc = badge.getAttribute('data-cert-img');
        const title = badge.getAttribute('data-cert-title');

        // Clear previous content
        certModalContentArea.innerHTML = '';

        if (fileSrc.toLowerCase().endsWith('.pdf')) {
            const iframe = document.createElement('iframe');
            iframe.src = fileSrc;
            iframe.style.width = '100%';
            iframe.style.height = '68vh';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '5px';
            certModalContentArea.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = fileSrc;
            img.style.maxHeight = '68vh';
            img.style.maxWidth = '100%';
            img.style.width = 'auto';
            img.style.objectFit = 'contain';
            img.style.borderRadius = '5px';
            certModalContentArea.appendChild(img);
        }

        certModalTitle.textContent = title;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (closeCertBtn && certModal) {
    closeCertBtn.addEventListener('click', () => {
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// --- Contact Form Validation ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    
    if (nameInput) {
        // Prevent numbers from being entered
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }
}

// --- Chatbot Logic ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatBtn = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat');
const chatbotMessages = document.getElementById('chatbot-messages');

let chatHistory = [];

// Toggle Chat Window
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });
}

// Close Chat Window
if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });
}

// Append Message to UI
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else if (sender === 'model') {
        messageDiv.classList.add('bot-message');
    } else {
        messageDiv.classList.add('typing-indicator'); // For typing indicator
    }
    
    // Convert basic markdown (like bolding **) to HTML
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert newlines to <br>
    formattedText = formattedText.replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = formattedText;
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return messageDiv;
}

// Show/Hide Typing Indicator
function showTypingIndicator() {
    return appendMessage('typing', 'AI-Bot is typing...');
}

// Send Message
async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message to UI and history
    appendMessage('user', text);
    chatHistory.push({ sender: 'user', text: text });
    chatInput.value = '';

    const typingIndicator = showTypingIndicator();

    try {
        // Send request to Flask backend
        const response = await fetch('https://lucky-portfolio-backend.onrender.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                history: chatHistory.slice(0, -1) // Send history excluding the current message
            })
        });

        // Remove typing indicator
        typingIndicator.remove();

        if (response.ok) {
            const data = await response.json();
            appendMessage('model', data.reply);
            chatHistory.push({ sender: 'model', text: data.reply });
        } else {
            const errData = await response.json();
            appendMessage('model', `Error: ${errData.error || 'Failed to connect to backend.'}`);
        }
    } catch (error) {
        typingIndicator.remove();
        console.error('Chat API Error:', error);
        appendMessage('model', 'Sorry, I am having trouble connecting to my server right now. Make sure the Flask backend is running!');
    }
}

// Event Listeners for sending message
if (sendChatBtn) {
    sendChatBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}