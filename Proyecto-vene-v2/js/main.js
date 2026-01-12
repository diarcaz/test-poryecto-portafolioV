// Project Data Configuration
const projects = {
    'Prosthetic Knee': [
        { name: 'Report', path: 'assets/projects/pdf-rodilla/Final Design Report - Group 1.pdf' },
        { name: 'Presentation', path: 'assets/projects/pdf-rodilla/Final Presentation.pdf' },
        { name: 'Poster', path: 'assets/projects/pdf-rodilla/Poster_Team1.pdf' }
    ],
    'Lightsaber': [
        { name: 'Report Proyect', path: 'assets/projects/pdf-Lightsaber/Report Proyect.pdf' }
    ],
    'LED Display Panel': [
        { name: 'Final Report', path: 'assets/projects/pdf-LED_Display_Panel/LED Display Panel.pdf' }
    ],
    'Other Projects': [
        { name: 'Python + Raspberry', path: 'https://drive.google.com/drive/folders/1NWmb2ejQLBPR4ZOGNQrhwC0SVf4ZT-mQ' },
        { name: 'Other Projects', path: 'https://drive.google.com/drive/folders/16gfaRECLYN-B0_Ug-yMQhVtjp57OUbus' }
    ]
};

// Modal Elements
const modal = document.getElementById('pdfModal');
const closeBtn = document.querySelector('.close');
const iframe = document.getElementById('pdfFrame');
const navContainer = document.querySelector('.pdf-nav');

let currentProjectPdfs = [];

// Open Modal logic
function openModal(projectId) {
    const projectData = projects[projectId];

    if (projectData) {
        currentProjectPdfs = projectData;
        modal.style.display = 'block';

        // Compact Mode for Other Projects
        if (projectId === 'Other Projects') {
            modal.classList.add('modal-compact');
        } else {
            modal.classList.remove('modal-compact');
            // Load first PDF by default only for normal projects
            loadPdf(0);
        }

        // Generate Buttons
        renderButtons();
    } else {
        console.log('Project details not implemented for: ' + projectId);
    }
}

// Render Navigation Buttons
function renderButtons() {
    navContainer.innerHTML = ''; // Clear existing buttons

    currentProjectPdfs.forEach((pdf, index) => {
        const btn = document.createElement('button');
        btn.className = 'pdf-btn';
        btn.innerText = pdf.name;
        btn.onclick = () => loadPdf(index);
        navContainer.appendChild(btn);
    });
}

// Close Modal logic
closeBtn.onclick = function () {
    modal.style.display = 'none';
    iframe.src = ''; // Stop loading content
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        iframe.src = '';
    }
}

// Load PDF logic
function loadPdf(index) {
    const pdf = currentProjectPdfs[index];
    if (pdf) {
        // Handle external links (Drive)
        if (pdf.path.startsWith('http') || pdf.path.startsWith('https')) {
            window.open(pdf.path, '_blank');
            return;
        }

        iframe.src = pdf.path;

        // Update active class
        const buttons = navContainer.querySelectorAll('.pdf-btn');
        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Global scope binding for HTML onclick compatibility
window.openModal = openModal;
