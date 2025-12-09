/**
 * PDF Viewer - Integrated PDF viewing with PDF.js
 */

// PDF.js configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// State
let pdfState = {
  pdfDoc: null,
  currentPage: 1,
  totalPages: 0,
  scale: 1.5,
  currentPdfUrl: ''
};

// DOM Elements
const pdfViewerModal = document.getElementById('pdfViewerModal');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfModalClose = document.getElementById('pdfModalClose');
const pdfCanvas = document.getElementById('pdfCanvas');
const pdfCanvasContainer = document.getElementById('pdfCanvasContainer');
const pdfCurrentPageSpan = document.getElementById('pdfCurrentPage');
const pdfTotalPagesSpan = document.getElementById('pdfTotalPages');
const pdfZoomLevelSpan = document.getElementById('pdfZoomLevel');
const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');

// Buttons
const pdfPrevPageBtn = document.getElementById('pdfPrevPage');
const pdfNextPageBtn = document.getElementById('pdfNextPage');
const pdfZoomInBtn = document.getElementById('pdfZoomIn');
const pdfZoomOutBtn = document.getElementById('pdfZoomOut');
const pdfZoomFitBtn = document.getElementById('pdfZoomFit');

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  initPdfViewer();
});

function initPdfViewer() {
  // Close button
  pdfModalClose.addEventListener('click', closePdfViewer);
  
  // Backdrop click
  pdfViewerModal.addEventListener('click', (e) => {
    if (e.target === pdfViewerModal) {
      closePdfViewer();
    }
  });
  
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfViewerModal.classList.contains('active')) {
      closePdfViewer();
    }
  });
  
  // Navigation buttons
  pdfPrevPageBtn.addEventListener('click', () => {
    if (pdfState.currentPage > 1) {
      pdfState.currentPage--;
      renderPdfPage();
    }
  });
  
  pdfNextPageBtn.addEventListener('click', () => {
    if (pdfState.currentPage < pdfState.totalPages) {
      pdfState.currentPage++;
      renderPdfPage();
    }
  });
  
  // Zoom buttons
  pdfZoomInBtn.addEventListener('click', () => {
    pdfState.scale += 0.25;
    renderPdfPage();
    updateZoomDisplay();
  });
  
  pdfZoomOutBtn.addEventListener('click', () => {
    if (pdfState.scale > 0.5) {
      pdfState.scale -= 0.25;
      renderPdfPage();
      updateZoomDisplay();
    }
  });
  
  pdfZoomFitBtn.addEventListener('click', () => {
    pdfState.scale = 1.5;
    renderPdfPage();
    updateZoomDisplay();
  });
}

// ========== OPEN PDF ==========
function openPdfViewer(pdfUrl, pdfName) {
  pdfState.currentPdfUrl = pdfUrl;
  pdfModalTitle.textContent = pdfName || 'Documento PDF';
  pdfDownloadBtn.href = pdfUrl;
  pdfDownloadBtn.download = pdfName || 'documento.pdf';
  
  // Load PDF
  pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    pdfState.pdfDoc = pdf;
    pdfState.totalPages = pdf.numPages;
    pdfState.currentPage = 1;
    
    // Update UI
    pdfTotalPagesSpan.textContent = pdfState.totalPages;
    
    // Render first page
    renderPdfPage();
    
    // Show modal
    pdfViewerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }).catch((error) => {
    console.error('Error loading PDF:', error);
    alert('Error al cargar el PDF. Por favor, intenta nuevamente.');
  });
}

// ========== RENDER PAGE ==========
function renderPdfPage() {
  if (!pdfState.pdfDoc) return;
  
  pdfState.pdfDoc.getPage(pdfState.currentPage).then((page) => {
    const viewport = page.getViewport({ scale: pdfState.scale });
    const canvas = pdfCanvas;
    const context = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    page.render(renderContext).promise.then(() => {
      // Update page number display
      pdfCurrentPageSpan.textContent = pdfState.currentPage;
      
      // Update button states
      pdfPrevPageBtn.disabled = (pdfState.currentPage === 1);
      pdfNextPageBtn.disabled = (pdfState.currentPage === pdfState.totalPages);
    });
  });
}

// ========== CLOSE VIEWER ==========
function closePdfViewer() {
  pdfViewerModal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Reset state
  pdfState.pdfDoc = null;
  pdfState.currentPage = 1;
  pdfState.totalPages = 0;
  pdfState.scale = 1.5;
  
  // Clear canvas
  const context = pdfCanvas.getContext('2d');
  context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
}

// ========== UTILITY FUNCTIONS ==========
function updateZoomDisplay() {
  const zoomPercent = Math.round(pdfState.scale * 100);
  pdfZoomLevelSpan.textContent = `${zoomPercent}%`;
}

// Export for use in other modules
window.openPdfViewer = openPdfViewer;
