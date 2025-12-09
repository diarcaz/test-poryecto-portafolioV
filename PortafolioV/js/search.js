/**
 * Search JavaScript - Project search functionality
 */

// DOM Elements
const searchInput = document.getElementById('projectSearch');
const clearSearchBtn = document.getElementById('clearSearch');
const searchResultsDiv = document.getElementById('searchResults');

// State
let currentSearchTerm = '';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});

function initSearch() {
    if (!searchInput) return;

    // Search input event
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        handleSearch();

        // Show/hide clear button
        if (currentSearchTerm) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
    });

    // Clear button event
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchTerm = '';
        clearSearchBtn.style.display = 'none';
        handleSearch();
        searchInput.focus();
    });

    // Focus search on Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// ========== SEARCH LOGIC ==========
function handleSearch() {
    if (!window.portfolioData || !window.portfolioData.projects) return;

    const projects = window.portfolioData.projects;

    // If no search term, show all projects (respecting category filter)
    if (!currentSearchTerm) {
        searchResultsDiv.style.display = 'none';
        // Re-render with current category filter
        const activeFilter = document.querySelector('.filter-btn.active');
        const category = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        if (window.renderProjects) {
            window.renderProjects(category);
        }
        return;
    }

    // Search in projects
    const searchLower = currentSearchTerm.toLowerCase();
    const filteredProjects = projects.filter(project => {
        // Search in title
        if (project.title.toLowerCase().includes(searchLower)) return true;

        // Search in description
        if (project.description.toLowerCase().includes(searchLower)) return true;

        // Search in full description
        if (project.fullDescription && project.fullDescription.toLowerCase().includes(searchLower)) return true;

        // Search in tags
        if (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchLower))) return true;

        // Search in tools
        if (project.tools && project.tools.some(tool => tool.toLowerCase().includes(searchLower))) return true;

        // Search in client
        if (project.client && project.client.toLowerCase().includes(searchLower)) return true;

        // Search in highlights
        if (project.highlights && project.highlights.some(h => h.toLowerCase().includes(searchLower))) return true;

        return false;
    });

    // Show results count
    searchResultsDiv.style.display = 'block';
    searchResultsDiv.innerHTML = `
    <span style="font-weight: var(--font-medium);">${filteredProjects.length}</span> 
    ${filteredProjects.length === 1 ? 'proyecto encontrado' : 'proyectos encontrados'}
    ${currentSearchTerm ? `para "<strong>${escapeHtml(currentSearchTerm)}</strong>"` : ''}
  `;

    // Render filtered projects
    renderSearchResults(filteredProjects);
}

// ========== RENDER SEARCH RESULTS ==========
function renderSearchResults(filteredProjects) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
      <div class="col-span-3 text-center" style="padding: var(--space-12); color: var(--text-secondary);">
        <div style="font-size: 64px; margin-bottom: var(--space-4); opacity: 0.5;">🔍</div>
        <p style="font-size: var(--text-lg); margin-bottom: var(--space-2);">
          No se encontraron proyectos
        </p>
        <p style="font-size: var(--text-base); color: var(--text-tertiary);">
          Intenta con otros términos de búsqueda
        </p>
      </div>
    `;
        return;
    }

    let html = '';

    filteredProjects.forEach((project, index) => {
        // Highlight search term in title and description
        const highlightedTitle = highlightSearchTerm(project.title, currentSearchTerm);
        const highlightedDesc = highlightSearchTerm(project.description, currentSearchTerm);

        html += `
      <div class="card project-card reveal reveal-delay-${Math.min(index + 1, 5)}" data-project-id="${project.id}">
        <div class="project-card-image-wrapper" style="position: relative; margin-bottom: var(--space-4);">
          ${createProjectImage(project)}
          <div class="project-card-overlay">
            ${project.tags.slice(0, 2).map(tag => `<span class="tag tag-primary">${tag}</span>`).join('')}
          </div>
        </div>
        
        <div class="card-header">
          <h3 class="card-title">${highlightedTitle}</h3>
          <p class="card-subtitle">${project.client} • ${formatDate(project.date)}</p>
        </div>
        
        <div class="card-content">
          <p>${highlightedDesc}</p>
        </div>
        
        <div class="card-footer">
          <div class="flex items-center justify-between">
            <div class="flex gap-2 flex-wrap">
              ${project.tools.slice(0, 3).map(tool => `
                <span class="tag">${tool}</span>
              `).join('')}
            </div>
            <button class="btn btn-sm btn-primary view-project-btn" data-project-id="${project.id}">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    `;
    });

    projectsGrid.innerHTML = html;

    // Re-attach click handlers
    if (window.addProjectClickHandlers) {
        window.addProjectClickHandlers();
    }
}

// ========== HIGHLIGHT SEARCH TERM ==========
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--color-accent-200); color: var(--text-primary); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// ========== UTILITY FUNCTIONS ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper functions from projects.js (if not available globally)
function createProjectImage(project) {
    const icons = {
        'design': '📐',
        'analysis': '📊',
        'manufacturing': '⚙️'
    };

    const icon = icons[project.category] || '🔧';

    return `
    <div class="project-card-image" style="
      background: linear-gradient(135deg, var(--color-primary-200), var(--color-accent-200));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 80px;
      border: 1px solid var(--border-color);
    ">
      ${icon}
    </div>
  `;
}

function formatDate(dateString) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const [year, month] = dateString.split('-');
    return `${months[parseInt(month) - 1]} ${year}`;
}

// Export search term for use in filters
window.getCurrentSearchTerm = () => currentSearchTerm;
window.performSearch = handleSearch;
