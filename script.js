        // Simple script to highlight nav links on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll Reveal Animation Observer
        const revealElements = document.querySelectorAll('.reveal');

        const revealCallback = function(entries, observer) {
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
                img: 'images/expenses tracker.png',
                tech: ['Python', 'Flask', 'SQLite', 'HTML/CSS', 'JavaScript'],
                github: 'https://github.com/luckyyyroyyy'
            },
            'skill-swap': {
                title: 'Skill Swap Pro',
                desc: 'An innovative platform where users can connect to swap and mutually learn new skills. Features include user profiles, skill matching algorithms, real-time messaging, and review systems.',
                img: 'images/skillswap.png',
                tech: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
                github: 'https://github.com/luckyyyroyyy'
            },
            'student-management': {
                title: 'Student Management System',
                desc: 'A robust web application built for educational institutions to manage student records, track attendance, handle grading, and generate academic reports seamlessly.',
                img: 'images/stumangsys.png',
                tech: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'Bootstrap'],
                github: 'https://github.com/luckyyyroyyy'
            },
            'weather-app': {
                title: 'Weather App',
                desc: 'A dynamic weather application that provides real-time atmospheric data, forecasts, and interactive weather maps by integrating with external RESTful weather APIs.',
                img: 'images/weather.png',
                tech: ['Python', 'Flask', 'OpenWeatherMap API', 'JavaScript', 'CSS'],
                github: 'https://github.com/luckyyyroyyy'
            },
            'calculator': {
                title: 'Calculator Dashboard',
                desc: 'A highly functional and responsive calculator utility application designed for quick mathematical operations with advanced features and a modern OLED-inspired user interface.',
                img: 'images/calculator.png',
                tech: ['HTML', 'CSS', 'JavaScript', 'Python (Backend utility)'],
                github: 'https://github.com/luckyyyroyyy'
            },
            'herbal-basket': {
                title: 'The Herbal Basket',
                desc: 'A full-featured e-commerce platform for herbal and organic products. Includes a shopping cart, secure checkout process integrated with Stripe API, and an admin dashboard.',
                img: 'images/herbal.png',
                tech: ['Python', 'Flask', 'SQLite', 'Stripe API', 'HTML/CSS/JS'],
                github: 'https://github.com/luckyyyroyyy'
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
            if(detailBtn) {
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