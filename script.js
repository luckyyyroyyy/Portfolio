// --- Tubelight & Side Navigation Logic ---
const navItems = document.querySelectorAll('.nav-item');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const navLamp = document.getElementById('navLamp');
const sections = document.querySelectorAll('section');

const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarNav = document.getElementById('sidebarNav');
const closeSidebar = document.getElementById('closeSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebarDrawer() {
    if (sidebarNav && sidebarOverlay && sidebarToggle) {
        sidebarNav.classList.add('active');
        sidebarOverlay.classList.add('active');
        sidebarToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebarDrawer() {
    if (sidebarNav && sidebarOverlay && sidebarToggle) {
        sidebarNav.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        sidebarToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        if (sidebarNav && sidebarNav.classList.contains('active')) {
            closeSidebarDrawer();
        } else {
            openSidebarDrawer();
        }
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', closeSidebarDrawer);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebarDrawer);
}

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarNav && sidebarNav.classList.contains('active')) {
        closeSidebarDrawer();
    }
});

// Close sidebar on link click
sidebarItems.forEach(item => {
    item.addEventListener('click', function () {
        sidebarItems.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        closeSidebarDrawer();
    });
});

function updateLampPosition(activeItem) {
    if (!activeItem || !navLamp) return;
    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = activeItem.parentElement.getBoundingClientRect();

    // Calculate relative position within the container
    const left = itemRect.left - containerRect.left;
    const width = itemRect.width;

    navLamp.style.width = `${width}px`;
    navLamp.style.transform = `translateX(${left}px)`;
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

// Handle click events for tubelight navbar
navItems.forEach(item => {
    item.addEventListener('click', function (e) {
        navItems.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        updateLampPosition(this);
    });
});

// Update active nav link, sidebar item, and lamp position strictly on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

    sidebarItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === current) {
            item.classList.add('active');
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
    'skill-swap': {
        title: 'SkillSwap Pro',
        desc: 'A full-stack skill-sharing platform connecting users based on skills they offer and want to learn. Features user authentication, profile management, automated skill matching, real-time user communication using Flask-SocketIO, gamification (XP, levels, badges, reputation), and review systems for building trust.',
        img: 'images/skillswap.webp',
        tech: ['Python', 'Flask', 'SQLite', 'Flask-SocketIO', 'JavaScript', 'Tailwind CSS', 'Jinja2'],
        github: 'https://github.com/luckyyyroyyy/Skill-Swap.git'
    },
    'expense-tracker': {
        title: 'ExpenseOrbit',
        desc: 'A full-stack personal finance application for managing expenses, income, budgets, subscriptions, and savings goals. Features automatic merchant-based expense categorization, receipt data extraction with Tesseract OCR, visual spending charts with Matplotlib, PDF exports, and Progressive Web App (PWA) offline support with background sync.',
        img: 'images/expenses tracker.webp',
        tech: ['Python', 'Flask', 'SQLite', 'JavaScript', 'HTML5', 'CSS3', 'PWA', 'Tesseract OCR', 'Matplotlib'],
        github: 'https://github.com/luckyyyroyyy/Expense-tracker-pro.git'
    },
    'herbal-basket': {
        title: 'The Herbal Basket',
        desc: 'A full-featured e-commerce platform for herbal and organic products. Includes a shopping cart, secure checkout process integrated with Stripe API, inventory management, and an admin dashboard.',
        img: 'images/herbal.webp',
        tech: ['Python', 'Flask', 'SQLite', 'Stripe API', 'HTML5', 'CSS3', 'JavaScript'],
        github: 'https://github.com/luckyyyroyyy?tab=repositories'
    },
    'student-management': {
        title: 'Student Management System',
        desc: 'A robust web application built for educational institutions to manage student records, track attendance, handle grading workflows, and generate academic performance reports seamlessly.',
        img: 'images/stumangsys.webp',
        tech: ['Python', 'Flask', 'SQLite', 'HTML5', 'CSS3', 'Bootstrap'],
        github: 'https://github.com/luckyyyroyyy/Student-management-system.git'
    },
    'weather-app': {
        title: 'Weather App',
        desc: 'A dynamic weather application that provides real-time atmospheric data, multi-day forecasts, and interactive weather visualizations by integrating with external RESTful weather APIs.',
        img: 'images/weather.webp',
        tech: ['Python', 'Flask', 'OpenWeatherMap API', 'JavaScript', 'CSS3'],
        github: 'https://github.com/luckyyyroyyy/weather-app-api.git'
    },
    'calculator': {
        title: 'Calculator Dashboard',
        desc: 'A highly functional and responsive calculator utility application designed for quick mathematical operations with advanced features and a modern OLED-inspired user interface.',
        img: 'images/calculator.webp',
        tech: ['JavaScript', 'HTML5', 'CSS3', 'Python (Backend utility)'],
        github: 'https://github.com/luckyyyroyyy/Calculator--python.git'
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
                    'SocketIO': '#54a6db',
                    'Tailwind': '#06B6D4',
                    'Jinja': '#B41717',
                    'Tesseract': '#4CAF50',
                    'Matplotlib': '#11557c',
                    'PWA': '#F7DF1E',
                    'React': '#61DAFB',
                    'HTML': '#E34F26',
                    'CSS': '#1572B6',
                    'JavaScript': '#F7DF1E',
                    'PHP': '#777BB4',
                    'Stripe': '#635bff',
                    'Bootstrap': '#7952B3',
                    'API': '#4FC08D'
                };

                data.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tech-pill';
                    span.textContent = tech;
                    // Find base color key or default white
                    let color = '#ddd';
                    for (const key in techColors) {
                        if (tech.toLowerCase().includes(key.toLowerCase())) {
                            color = techColors[key];
                            break;
                        }
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
const sidebarResumeBtn = document.getElementById('sidebarResumeBtn');

function openResume() {
    const resumeUrl = 'resume.pdf';
    window.open(resumeUrl, '_blank');
}

if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', openResume);
}

if (sidebarResumeBtn) {
    sidebarResumeBtn.addEventListener('click', () => {
        closeSidebarDrawer();
        openResume();
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
// Send Message
async function sendMessage(customText) {
    const text = (typeof customText === 'string' && customText.trim()) ? customText.trim() : chatInput.value.trim();
    if (!text) return;

    // Add user message to UI and history
    appendMessage('user', text);
    chatHistory.push({ sender: 'user', text: text });
    chatInput.value = '';

    const typingIndicator = showTypingIndicator();

    try {
        // Determine API Endpoint:
        // 1. Local development -> Local Flask server (127.0.0.1:5000)
        // 2. Vercel hosted domain -> Relative /api/chat
        // 3. GitHub Pages / External -> Vercel Production Serverless URL
        let apiUrl = '/api/chat';
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            apiUrl = 'http://127.0.0.1:5000/api/chat';
        } else if (window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app')) {
            apiUrl = 'https://portfolio-lucky-dev2.vercel.app/api/chat';
        }

        // Send request to backend
        const response = await fetch(apiUrl, {
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
        appendMessage('model', 'Sorry, I am having trouble connecting to my server right now. Make sure the backend is online!');
    }
}

// Event Listeners for sending message
if (sendChatBtn) {
    sendChatBtn.addEventListener('click', () => sendMessage());
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Suggestion Chip Event Listeners
const suggestionChips = document.querySelectorAll('.suggestion-chip');
suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
        sendMessage(prompt);
    });
});