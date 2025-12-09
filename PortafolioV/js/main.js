/**
 * Main JavaScript - Core functionality
 */

// ========== STATE MANAGEMENT ==========
window.portfolioData = null;
let activeFilter = 'all';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', async () => {
  // Load portfolio data
  await loadPortfolioData();

  // Initialize components
  initNavigation();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();

  // Populate content
  populateTimeline();
  populateSkills();
  populateCertifications();

  // Trigger project rendering after data is loaded
  if (window.portfolioData && window.portfolioData.projects && typeof renderProjects === 'function') {
    renderProjects('all');
  }
});

// ========== LOAD DATA ==========
async function loadPortfolioData() {
  try {
    const response = await fetch('data/projects.json');
    window.portfolioData = await response.json();
    console.log('Portfolio data loaded successfully', window.portfolioData);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Fallback to empty data
    window.portfolioData = {
      projects: [],
      skills: [],
      experience: [],
      education: [],
      certifications: []
    };
  }
}

// ========== NAVIGATION ==========
function initNavigation() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll header effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== SCROLL REVEAL ANIMATION ==========
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };

  // Initial check
  revealOnScroll();

  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
}

// ========== POPULATE TIMELINE ==========
function populateTimeline() {
  if (!window.portfolioData) return;

  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const allExperience = [
    ...window.portfolioData.experience.map(exp => ({ ...exp, type: 'work' })),
    ...window.portfolioData.education.map(edu => ({ ...edu, type: 'education' }))
  ];

  let html = '';

  // Work experience
  window.portfolioData.experience.forEach((exp, index) => {
    html += `
      <div class="timeline-item reveal reveal-delay-${Math.min(index + 1, 5)}">
        <div class="timeline-date">${exp.period}</div>
        <div class="timeline-title">${exp.position}</div>
        <div class="timeline-company">${exp.company} - ${exp.location}</div>
        <div class="timeline-description">
          <p>${exp.description}</p>
          ${exp.achievements ? `
            <ul style="margin-top: var(--space-3); padding-left: var(--space-5); list-style: disc; color: var(--text-secondary);">
              ${exp.achievements.map(achievement => `<li style="margin-bottom: var(--space-2);">${achievement}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
    `;
  });

  // Education
  window.portfolioData.education.forEach((edu, index) => {
    const delay = Math.min(window.portfolioData.experience.length + index + 1, 5);
    html += `
      <div class="timeline-item reveal reveal-delay-${delay}">
        <div class="timeline-date">${edu.period}</div>
        <div class="timeline-title">${edu.degree}</div>
        <div class="timeline-company">${edu.institution} - ${edu.location}</div>
        <div class="timeline-description">
          ${edu.honors ? `<p><strong>${edu.honors}</strong></p>` : ''}
          ${edu.gpa ? `<p>Promedio: ${edu.gpa}</p>` : ''}
        </div>
      </div>
    `;
  });

  timeline.innerHTML = html;
}

// ========== POPULATE SKILLS ==========
function populateSkills() {
  if (!window.portfolioData || !window.portfolioData.skills) return;

  const container = document.getElementById('skillsContainer');
  if (!container) return;

  let html = '';

  window.portfolioData.skills.forEach((category, catIndex) => {
    html += `
      <div class="reveal reveal-delay-${Math.min(catIndex + 1, 5)}">
        <h3 class="font-semibold mb-6" style="font-size: var(--text-xl); color: var(--color-primary-600);">
          ${category.category}
        </h3>
        ${category.items.map(skill => `
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" data-level="${skill.level}" style="width: 0%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  });

  container.innerHTML = html;

  // Animate skill bars when they come into view
  animateSkillBars();
}

// Animate skill progress bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level');

        setTimeout(() => {
          bar.style.width = `${level}%`;
        }, 200);

        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

// ========== POPULATE CERTIFICATIONS ==========
function populateCertifications() {
  if (!window.portfolioData || !window.portfolioData.certifications) return;

  const container = document.getElementById('certificationsContainer');
  if (!container) return;

  let html = '';

  window.portfolioData.certifications.forEach((cert, index) => {
    html += `
      <div class="card reveal reveal-delay-${Math.min(index + 1, 5)}">
        <div style="display: flex; align-items: flex-start; gap: var(--space-4);">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-500)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: var(--text-3xl); flex-shrink: 0;">
            🏆
          </div>
          <div style="flex: 1;">
            <h3 class="card-title">${cert.name}</h3>
            <p class="card-subtitle">${cert.issuer}</p>
            <div class="flex items-center gap-4 mt-3" style="font-size: var(--text-sm); color: var(--text-tertiary);">
              <span>📅 ${cert.date}</span>
              <span style="font-family: var(--font-mono);">${cert.credential}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);

    // Show success message (in a real app, this would be after successful server response)
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    form.reset();
  });
}

// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
