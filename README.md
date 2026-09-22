# Project Hail Mary — Sitio Tributo 🚀

Un sitio web tributo no oficial (fan-made) dedicado a la novela de ciencia ficción **Project Hail Mary** escrita por Andy Weir y su adaptación cinematográfica (2026). Este proyecto es una experiencia inmersiva diseñada para explorar la tripulación, la ciencia, las naves y los secretos detrás de esta increíble historia de supervivencia interestelar.

## 🌟 Características Principales y Funcionalidades

El proyecto fue desarrollado centrándose en el rendimiento, la accesibilidad y el diseño responsivo (Mobile First), utilizando tecnologías web nativas sin depender de frameworks pesados.

* **Diseño 100% Responsivo:** Interfaz fluida que se adapta perfectamente a dispositivos móviles, tablets y monitores grandes utilizando funciones avanzadas de CSS (Grid, Flexbox y tipografía fluida con `clamp()`). *Nota técnica: El efecto visual de desenfoque (blur) se desactiva en la versión móvil para garantizar una experiencia de usuario fluida y evitar caídas de fotogramas.*
* **Formulario de Contacto Funcional:** Validación personalizada del lado del cliente mediante Vanilla JavaScript y envío real de correos de forma asíncrona (sin recargar la página) integrado con la API de **Formspree**.
* **Galería Interactiva (Lightbox & Carrusel):** Sistema de visualización de imágenes personalizado desarrollado en JavaScript puro. Incluye navegación por flechas, cierre con teclado (Escape) y un sistema de zoom dinámico.
* **Componentes Interactivos:** 
  * "Quiz" interactivo (*¿Qué personaje sos?*).
  * Widget de afiche plegable en la página de inicio.
  * Tarjetas de curiosidades revelables.
* **Optimización SEO y Semántica:** Estructura de etiquetas HTML5 (H1, H2, H3) correctamente jerarquizada en cada página para facilitar la lectura de motores de búsqueda.
* **Animaciones y Estilos Personalizados:** Uso de tipografías a medida (*Hail Mary Sans*), gráficos SVG vectoriales integrados y efectos visuales de resplandor mediante CSS puro (animación de la señal láser, brillos de botones).

## 🗺️ Secciones del Sitio

El sitio está compuesto por múltiples páginas estáticas que organizan la información en un formato enciclopédico/cinematográfico:

1. **Inicio (`index.html`):** Portada principal con el titular de la misión ("Grace Rocky Saves Stars"), sinopsis, visualizador rotativo de afiches de la película y el tráiler oficial incrustado.
2. **Archivo de la Misión:**
   * **Personajes (`personajes.html`):** Perfiles detallados de Ryland Grace, Rocky y el resto del equipo.
   * **Reparto (`reparto.html`):** Información sobre los actores que dan vida a los personajes en la película.
   * **Curiosidades (`curiosidades.html`):** Datos ocultos, anécdotas de filmación y curiosidades del libro original.
   * **Quiz (`quiz.html`):** Un minijuego interactivo para descubrir qué rol tomarías en la misión.
3. **Naves y Ciencia:**
   * **Nave Hail Mary (`nave.html`):** Especificaciones técnicas de la nave humana.
   * **Blip-A (`blip-a.html`):** Detalles sobre la nave alienígena de Erid.
   * **Astrófagos (`astrofagos.html`):** Explicación científica de la amenaza que devora las estrellas.
4. **Galería (`galeria.html`):** Colección de arte conceptual, detrás de escena y capturas de pantalla de alta calidad.
5. **Contacto (`contacto.html`):** Canal directo de comunicación.
6. **Error 404 (`404.html`):** Página personalizada para rutas no encontradas.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Marcado semántico y estructura.
* **CSS3:** Variables nativas, animaciones `@keyframes`, funciones matemáticas (`calc`, `clamp`), Flexbox y CSS Grid (utilizado intensivamente para los mosaicos de imágenes).
* **JavaScript (Vanilla JS):** Interactividad del DOM, validación de formularios y consumo de la API Fetch.
* **Galería Custom (Vanilla JS Lightbox):** En lugar de depender de librerías externas pesadas (como Swiper o Fancybox), la galería y el visualizador de imágenes fueron desarrollados 100% desde cero. Incluye:
  * Modal tipo "Lightbox" dinámico.
  * Navegación por botones y soporte para eventos de teclado (Escape, Flechas).
  * Soporte táctil y sistema matemático de *Pan & Zoom* (pellizcar para acercar o arrastrar imágenes ampliadas).
* **Formspree:** Backend Serverless (Form-as-a-Service) para procesar las peticiones del formulario de contacto directamente a un email.
* **FontAwesome:** Iconografía vectorial estandarizada (redes sociales y miniaturas).
