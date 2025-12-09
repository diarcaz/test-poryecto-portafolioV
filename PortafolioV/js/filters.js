/**
 * Filters JavaScript - Project filtering functionality
 */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
});

// ========== INITIALIZE FILTERS ==========
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline');
            });

            btn.classList.add('active');
            btn.classList.add('btn-primary');
            btn.classList.remove('btn-outline');

            // Apply filter
            applyFilter(filter);
        });
    });
}

// ========== APPLY FILTER ==========
function applyFilter(category) {
    window.activeFilter = category;

    // Add fade out animation
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.style.opacity = '0';
    projectsGrid.style.transform = 'translateY(20px)';

    // Re-render projects after animation
    setTimeout(() => {
        if (typeof renderProjects === 'function') {
            renderProjects(category);
        }

        // Fade back in
        setTimeout(() => {
            projectsGrid.style.transition = 'all 0.4s ease-out';
            projectsGrid.style.opacity = '1';
            projectsGrid.style.transform = 'translateY(0)';
        }, 50);
    }, 200);
}

// ========== SEARCH FUNCTIONALITY (Optional Enhancement) ==========
function initProjectSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounceSearch);
}

function debounceSearch(e) {
    clearTimeout(window.searchTimeout);

    window.searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        filterProjectsBySearch(searchTerm);
    }, 300);
}

function filterProjectsBySearch(searchTerm) {
    if (!window.portfolioData) return;

    const projects = window.portfolioData.projects;
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid) return;

    // Filter by current category AND search term
    let filteredProjects = window.activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === window.activeFilter);

    if (searchTerm) {
        filteredProjects = filteredProjects.filter(project => {
            return (
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                project.tools.some(tool => tool.toLowerCase().includes(searchTerm))
            );
        });
    }

    renderFilteredProjects(filteredProjects);
}

function renderFilteredProjects(projects) {
    // This would be similar to renderProjects but with the filtered array
    console.log('Rendering filtered projects:', projects);
}
