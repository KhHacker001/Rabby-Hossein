// ===== DOM Elements =====
const themeToggle = document.getElementById('theme-switch');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const skillsContainer = document.getElementById('skills-container');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectFilterButtons = document.querySelectorAll('.project-filter-btn');
const currentYear = document.getElementById('currentYear');
const formMessage = document.getElementById('form-message');

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== Mobile Navigation =====
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== Back to Top Button =====
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Load Skills from JSON =====
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skillsData = await response.json();
        displaySkills(skillsData.skills);
        initSkillFilters(skillsData.skills);
    } catch (error) {
        console.error('Error loading skills:', error);
        skillsContainer.innerHTML = '<p class="error">Failed to load skills. Please try again later.</p>';
    }
}

function displaySkills(skills) {
    skillsContainer.innerHTML = '';
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = `skill-card fade-in-up`;
        skillCard.dataset.category = skill.category;
        
        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div>
                    <h3 class="skill-name">${skill.name}</h3>
                    <span class="skill-category">${skill.category}</span>
                </div>
            </div>
            <div class="skill-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${skill.proficiency}%"></div>
                </div>
                <div class="progress-text">
                    <span>Proficiency</span>
                    <span>${skill.proficiency}%</span>
                </div>
            </div>
        `;
        
        skillsContainer.appendChild(skillCard);
    });
    
    // Animate progress bars after they're in the DOM
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 300);
}

function initSkillFilters(skills) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter skills
            document.querySelectorAll('.skill-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Load Projects from JSON =====
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projectsData = await response.json();
        displayProjects(projectsData.projects);
        initProjectFilters(projectsData.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

function displayProjects(projects) {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in-up';
        projectCard.dataset.tech = project.tech.join(' ');
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.live}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                    <a href="${project.github}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

function initProjectFilters(projects) {
    projectFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            projectFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter projects
            document.querySelectorAll('.project-card').forEach(card => {
                if (filter === 'all' || card.dataset.tech.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Form Handling =====
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Sending message...', 'success');
        
        // In a real application, you would send data to a server here
        setTimeout(() => {
            console.log('Form submitted:', { name, email, message });
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }, 1500);
    });
}

function initNewsletterForm() {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email || !isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate subscription
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to my newsletter!');
        emailInput.value = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.style.opacity = '1';
        }, 500);
    }, 5000);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.skill-card, .project-card, .detail-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== Set Current Year =====
function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initBackToTop();
    loadSkills();
    loadProjects();
    initContactForm();
    initNewsletterForm();
    initScrollAnimations();
    setCurrentYear();
    
    // Add scroll event for navbar background
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'var(--bg-secondary)';
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        if (document.body.classList.contains('dark-theme')) {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
            }
        }
    });
});