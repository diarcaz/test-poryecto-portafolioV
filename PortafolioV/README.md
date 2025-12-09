# Portafolio Profesional - Ingeniero Mecánico

Un portafolio web moderno y profesional diseñado específicamente para ingenieros mecánicos, con enfoque en diseño industrial, análisis FEA/CFD y manufactura.

## 🎯 Características

### ✅ Implementadas
- **Diseño Industrial Metálico** - Paleta de colores profesional con azules metálicos y acentos naranjas
- **Modo Oscuro/Claro** - Toggle automático con persistencia en localStorage
- **Secciones Completas**:
  - Hero con presentación impactante
  - Sobre Mí con estadísticas rápidas
  - Timeline interactivo de experiencia profesional
  - Habilidades técnicas con barras de progreso animadas
  - Galería de proyectos con filtros por categoría
  - Certificaciones profesionales
  - Formulario de contacto
- **Características Avanzadas**:
  - **Visualizador PDF Integrado**: Visualización directa de documentos técnicos sin salir del sitio (usando PDF.js)
  - **Búsqueda Inteligente**: Filtrado de proyectos en tiempo real por título, descripción, tags y herramientas
  - **Filtros por Categoría**: Navegación rápida entre Diseño, Análisis y Manufactura
- **Galería de Proyectos Detallada**:
  - Diseño de tarjetas de alto contraste y visibilidad
  - Modal expandible con información completa
  - Sistema de tags y herramientas
- **Animaciones Suaves** - Scroll reveal mejorado, hover effects de alta visibilidad

## 📁 Estructura del Proyecto

```
mechanical-portfolio/
├── index.html                      # Página principal
├── css/
│   ├── variables.css              # Sistema de diseño (colores, tipografía)
│   ├── reset.css                  # Reset de estilos
│   ├── layout.css                 # Grid y layouts
│   ├── components.css             # Componentes reutilizables
│   └── animations.css             # Animaciones y transiciones
├── js/
│   ├── main.js                    # Lógica principal
│   ├── projects.js                # Gestión de proyectos y renderizado
│   ├── search.js                  # Sistema de búsqueda
│   ├── pdf-viewer.js              # Visualizador PDF integrado
│   ├── filters.js                 # Sistema de filtros
│   └── theme-switcher.js          # Modo oscuro/claro
├── assets/
│   ├── images/                    # Imágenes del sitio
│   ├── projects/                  # Imágenes de proyectos
│   ├── documents/                 # PDFs y documentos
│   └── icons/                     # Íconos personalizados
├── data/
│   └── projects.json              # Base de datos de proyectos
└── README.md                      # Este archivo
```

## 🚀 Inicio Rápido

### Opción 1: Abrir Directamente
1. Navega a la carpeta del proyecto
2. Abre `index.html` en tu navegador web

### Opción 2: Servidor Local
```powershell
# Con Python 3
cd C:\Users\artur\.gemini\antigravity\scratch\mechanical-portfolio
python -m http.server 8000

# Luego abre http://localhost:8000 en tu navegador
```

### Opción 3: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html` → "Open with Live Server"

## 🎨 Personalización

### 1. Datos Personales
Edita `data/projects.json` para actualizar:
- Proyectos (agrega tus proyectos reales)
- Habilidades y niveles de experiencia
- Experiencia laboral
- Educación
- Certificaciones

### 2. Información de Contacto
Edita `index.html` en la sección de contacto para actualizar:
- Email
- Teléfono
- Ubicación
- Enlaces a LinkedIn y redes sociales

### 3. Colores y Estilo
Edita `css/variables.css` para cambiar:
- Paleta de colores (primarios, acentos)
- Tipografía
- Espaciados
- Breakpoints responsive

### 4. Imágenes
Reemplaza los placeholders con tus imágenes reales:
- **Foto de perfil**: Actualiza el div `#profilePhoto` en `index.html`
- **Imagen "Sobre Mí"**: Actualiza el div `#aboutImage` en `index.html`
- **Imágenes de proyectos**: Agrega tus imágenes en `assets/projects/` y actualiza referencias en `projects.json`
- **Documentos PDF**: Coloca tus PDFs en `assets/documents/` y actualiza referencias

## 📊 Datos de Ejemplo

El portafolio incluye contenido de ejemplo listo para usar:
- **4 proyectos** de ingeniería mecánica (diseño, análisis, manufactura)
- **4 categorías de habilidades** con software común de ingeniería
- **3 experiencias laborales** realistas
- **1 educación** universitaria
- **4 certificaciones** profesionales comunes

## 🎯 Características Técnicas

### Tecnologías Utilizadas
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Variables CSS, Grid, Flexbox, animaciones
- **Vanilla JavaScript** - Sin dependencias externas
- **Google Fonts** - Roboto y Roboto Mono

### Optimizaciones
- ✅ Responsive design (mobile-first)
- ✅ Smooth scrolling
- ✅ Lazy loading de animaciones
- ✅ localStorage para preferencias de tema
- ✅ Accesibilidad (ARIA labels, contraste de colores)
- ✅ SEO básico (meta tags, estructura semántica)

### Compatibilidad
- ✅ Chrome / Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Navegadores móviles

## 📝 Próximas Mejoras Sugeridas

### Funcionalidad
- [ ] Filtros múltiples simultáneos
- [ ] Animaciones de carga de página
- [ ] Integración con servicio de email para formulario de contacto
- [ ] Versión en inglés (i18n)
- [ ] Animaciones de carga de página
- [ ] Integración con servicio de email para formulario de contacto
- [ ] Versión en inglés (i18n)

### Optimizaciones
- [ ] Lazy loading de imágenes
- [ ] Minificación de CSS/JS para producción
- [ ] Service Worker para modo offline
- [ ] Optimización de Core Web Vitals

## 🔧 Solución de Problemas

### Los proyectos no se muestran
- Verifica que `data/projects.json` esté en la ubicación correcta
- Abre la consola del navegador (F12) para ver errores
- Confirma que el servidor web esté sirviendo JSON correctamente

### Las animaciones no funcionan
- Verifica que JavaScript esté habilitado en tu navegador
- Confirma que todos los archivos JS estén cargando correctamente
- Algunos navegadores bloquean JavaScript en archivos locales - usa un servidor local

### El modo oscuro no persiste
- Verifica que localStorage esté habilitado en tu navegador
- Algunos navegadores en modo incógnito no permiten localStorage

## 📧 Soporte

Para preguntas o sugerencias sobre este portafolio:
- Revisa el código fuente (está bien documentado)
- Consulta `implementation_plan.md` para detalles técnicos
- Modifica según tus necesidades específicas

## 📄 Licencia

Este portafolio es de uso personal. Siéntete libre de personalizarlo y usarlo para tu propio portafolio profesional.

---

**Última actualización**: Diciembre 2024

¡Éxito en tu búsqueda profesional! 🚀⚙️
