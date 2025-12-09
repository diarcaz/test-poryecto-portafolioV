/**
 * Projects JavaScript - Project gallery and modal functionality
 */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  // Wait for data to load, then render projects
  const checkDataInterval = setInterval(() => {
    if (window.portfolioData && window.portfolioData.projects) {
      clearInterval(checkDataInterval);
      renderProjects('all');
      initProjectModal();
    }
  }, 50);  // Check more frequently

  // Fallback: render after 2 seconds even if data isn't ready
  setTimeout(() => {
    clearInterval(checkDataInterval);
    if (window.portfolioData) {
      renderProjects('all');
    }
  }, 2000);
});

// ========== RENDER PROJECTS ==========
function renderProjects(filterCategory = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid || !window.portfolioData) return;

  const projects = window.portfolioData.projects;

  // Filter projects
  const filteredProjects = filterCategory === 'all'
    ? projects
    : projects.filter(project => project.category === filterCategory);

  // Update button active states
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.category === filterCategory) {
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      // Add thick border to selected button
      btn.style.border = '3px solid #000000';
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
      if (!btn.innerText.includes('✓')) {
        btn.innerText = `✓ ${btn.innerText}`;
      }
    } else {
      btn.classList.add('btn-outline');
      btn.classList.remove('btn-primary');
      btn.style.border = '1px solid #e5e7eb';
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = 'none';
      btn.innerText = btn.innerText.replace('✓ ', '');
    }
  });

  if (filteredProjects.length === 0) {
    projectsGrid.innerHTML = `
      <div class="col-span-3 text-center" style="padding: var(--space-12); color: var(--text-secondary);">
        <p style="font-size: var(--text-lg);">No se encontraron proyectos en esta categoría.</p>
      </div>
    `;
    return;
  }

  let html = '';

  filteredProjects.forEach((project, index) => {
    html += `
      <div class="card project-card" data-project-id="${project.id}" style="
        cursor: pointer;
        transition: all 0.3s ease;
        border: 4px solid #000000 !important;
        background-color: #FFFFFF !important;
        padding: 0 !important;
        overflow: hidden;
        min-height: 480px; /* Ensure height */
        opacity: 1 !important; /* Force visibility */
        visibility: visible !important;
      "
      onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)'; this.style.borderColor='#1E88E5';"
      onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; this.style.borderColor='#000000';">
        <div class="project-card-image-wrapper" style="position: relative;">
          ${createProjectImage(project)}
          <div class="project-card-overlay">
            ${project.tags.slice(0, 2).map(tag => `<span class="tag tag-primary">${tag}</span>`).join('')}
          </div>
        </div>
        
        <div style="padding: 24px; background-color: #FFFFFF;">
          <div class="card-header" style="margin-bottom: 16px;">
            <h3 class="card-title" style="color: #000000; font-size: 20px; font-weight: bold; margin-bottom: 8px;">${project.title}</h3>
            <p class="card-subtitle" style="color: #666666; font-size: 14px;">${project.client} • ${formatDate(project.date)}</p>
          </div>
          
          <div class="card-content" style="margin-bottom: 16px;">
            <p style="color: #333333;">${project.description}</p>
          </div>
          
          <div class="card-footer" style="border-top: 2px solid #E0E0E0; padding-top: 16px; margin-top: 16px;">
            <div class="flex items-center justify-between">
              <div class="flex gap-2 flex-wrap">
                ${project.tools.slice(0, 3).map(tool => `
                  <span class="tag">${tool}</span>
                `).join('')}
              </div>
              <button class="btn btn-sm btn-primary view-project-btn" data-project-id="${project.id}" style="
                background-color: #1E88E5;
                color: #FFFFFF;
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
              ">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  projectsGrid.innerHTML = html;

  // Add click handlers
  addProjectClickHandlers();
}

// ========== CREATE PROJECT IMAGE ==========
function createProjectImage(project) {
  // Ultra simple, highly visible card design with solid colors
  const designs = {
    'design': {
      color: '#1E88E5',  // Bright blue
      icon: '📐',
      label: 'DISEÑO CAD',
      textColor: '#ffffff'
    },
    'analysis': {
      color: '#FF6F00',  // Bright orange
      icon: '📊',
      label: 'ANÁLISIS FEA/CFD',
      textColor: '#ffffff'
    },
    'manufacturing': {
      color: '#00897B',  // Bright teal
      icon: '⚙️',
      label: 'MANUFACTURA',
      textColor: '#ffffff'
    }
  };

  const design = designs[project.category] || designs['design'];

  return `
    <div style="
      width: 100%;
      min-height: 320px;
      background-color: ${design.color};
      border: 5px solid #000000;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px;
      gap: 24px;
      box-sizing: border-box;
    ">
      <!-- Icono grande -->
      <div style="
        font-size: 140px;
        line-height: 1;
        margin: 0;
        padding: 0;
      ">
        ${design.icon}
      </div>
      
      <!-- Etiqueta de categoría -->
      <div style="
        background-color: #FFFFFF;
        color: #000000;
        padding: 16px 32px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        border: 3px solid #000000;
        letter-spacing: 1.5px;
      ">
        ${design.label}
      </div>
      
      <!-- Título del proyecto -->
      <div style="
        background-color: rgba(255, 255, 255, 0.95);
        color: #000000;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        max-width: 90%;
        border: 2px solid rgba(0, 0, 0, 0.2);
      ">
        ${project.title}
      </div>
      
      <!-- Botón "Ver Proyecto" -->
      <div style="
        background-color: #000000;
        color: #FFFFFF;
        padding: 12px 28px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        border: 3px solid #FFFFFF;
        cursor: pointer;
      ">
        👁️ VER PROYECTO
      </div>
    </div>
  `;
}

// ========== PROJECT MODAL ==========
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');

  if (!modal || !closeBtn) return;

  // Close modal on close button click
  closeBtn.addEventListener('click', closeModal);

  // Close modal on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = window.portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modal || !modalTitle || !modalBody) return;

  // Set title
  modalTitle.textContent = project.title;

  // Set body content
  modalBody.innerHTML = `
    <div class="grid grid-cols-1 gap-6">
      <!-- Project Info -->
      <div>
        <div class="flex items-center gap-4 mb-4">
          <span class="tag tag-accent" style="font-size: var(--text-sm);">
            ${getCategoryName(project.category)}
          </span>
          <span style="color: var(--text-secondary);">${project.client}</span>
          <span style="color: var(--text-tertiary);">•</span>
          <span style="color: var(--text-secondary);">${formatDate(project.date)}</span>
        </div>
        
        <p style="color: var(--text-secondary); line-height: var(--leading-relaxed); font-size: var(--text-lg);">
          ${project.fullDescription}
        </p>
      </div>
      
      <!-- Highlights -->
      ${project.highlights && project.highlights.length > 0 ? `
        <div>
          <h4 class="font-semibold mb-4" style="font-size: var(--text-xl); color: var(--color-primary-600);">
            Logros Destacados
          </h4>
          <div class="grid grid-cols-2 gap-3">
            ${project.highlights.map(highlight => `
              <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
                <span style="color: var(--color-accent-500); font-size: var(--text-xl);">✓</span>
                <span style="color: var(--text-secondary);">${highlight}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <!-- Tools Used -->
      <div>
        <h4 class="font-semibold mb-4" style="font-size: var(--text-xl); color: var(--color-primary-600);">
          Herramientas Utilizadas
        </h4>
        <div class="flex gap-2 flex-wrap">
          ${project.tools.map(tool => `
            <span class="tag tag-primary">${tool}</span>
          `).join('')}
        </div>
      </div>
      
      <!-- Tags -->
      ${project.tags && project.tags.length > 0 ? `
        <div>
          <h4 class="font-semibold mb-4" style="font-size: var(--text-xl); color: var(--color-primary-600);">
            Etiquetas Técnicas
          </h4>
          <div class="flex gap-2 flex-wrap">
            ${project.tags.map(tag => `
              <span class="tag">${tag}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <!-- Placeholder for images -->
      <div>
        <h4 class="font-semibold mb-4" style="font-size: var(--text-xl); color: var(--color-primary-600);">
          Galería de Imágenes
        </h4>
        <div class="grid grid-cols-3 gap-4">
          ${['📐', '📊', '⚙️'].map(icon => `
            <div style="
              aspect-ratio: 16/9;
              background: linear-gradient(135deg, var(--color-primary-100), var(--color-accent-100));
              border-radius: var(--radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 48px;
              border: 1px solid var(--border-color);
            ">
              ${icon}
            </div>
          `).join('')}
        </div>
        <p style="margin-top: var(--space-4); color: var(--text-tertiary); font-size: var(--text-sm); text-align: center;">
          💡 Imagen de ejemplo - Reemplaza con imágenes reales del proyecto
        </p>
      </div>
      
      <!-- Placeholder for documents -->
      ${project.documents && project.documents.length > 0 ? `
        <div>
          <h4 class="font-semibold mb-4" style="font-size: var(--text-xl); color: var(--color-primary-600);">
            Documentos Técnicos
          </h4>
          <div class="flex flex-col gap-3">
            ${project.documents.map(doc => `
              <div class="card" style="
                padding: var(--space-4); 
                display: flex; 
                align-items: center; 
                gap: var(--space-3);
                border: 2px solid var(--border-color);
                transition: all var(--transition-fast);
              " 
              onmouseover="this.style.borderColor='var(--color-primary-400)'; this.style.boxShadow='var(--shadow-md)';"
              onmouseout="this.style.borderColor='var(--border-color)'; this.style.boxShadow='var(--shadow-sm)';">
                <div style="
                  width: 56px;
                  height: 56px;
                  background: linear-gradient(135deg, var(--color-error), #c62828);
                  color: white;
                  border-radius: var(--radius-md);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: var(--text-sm);
                  font-weight: var(--font-bold);
                  box-shadow: var(--shadow-sm);
                ">
                  📄 PDF
                </div>
                <div style="flex: 1;">
                  <div style="font-weight: var(--font-semibold); color: var(--text-primary); font-size: var(--text-base);">${doc}</div>
                  <div style="font-size: var(--text-sm); color: var(--text-secondary); margin-top: 2px;">Documento técnico disponible</div>
                </div>
                <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
                  <button class="btn btn-sm btn-primary view-pdf-btn" data-pdf-url="assets/documents/${doc}" data-pdf-name="${doc}" style="
                    min-width: 110px;
                    font-weight: var(--font-semibold);
                    box-shadow: var(--shadow-sm);
                    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
                  "
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)';"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)';">
                    👁️ Ver PDF
                  </button>
                  <a href="assets/documents/${doc}" download="${doc}" class="btn btn-sm btn-outline" style="
                    text-decoration: none;
                    min-width: 110px;
                    font-weight: var(--font-medium);
                    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
                  "
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)';"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    📥 Descargar
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Attach PDF viewer button handlers
  setTimeout(() => {
    const pdfViewBtns = document.querySelectorAll('.view-pdf-btn');
    pdfViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pdfUrl = btn.getAttribute('data-pdf-url');
        const pdfName = btn.getAttribute('data-pdf-name');
        if (window.openPdfViewer) {
          window.openPdfViewer(pdfUrl, pdfName);
        }
      });
    });
  }, 100);
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ========== EVENT HANDLERS ==========
function addProjectClickHandlers() {
  // Card click
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking the button directly
      if (e.target.classList.contains('view-project-btn')) return;

      const projectId = card.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });

  // Button click
  const viewBtns = document.querySelectorAll('.view-project-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });


}

// ========== UTILITY FUNCTIONS ==========
function getCategoryName(category) {
  const categories = {
    'design': 'Diseño CAD',
    'analysis': 'Análisis FEA/CFD',
    'manufacturing': 'Manufactura'
  };
  return categories[category] || category;
}

function formatDate(dateString) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const [year, month] = dateString.split('-');
  return `${months[parseInt(month) - 1]} ${year}`;
}
