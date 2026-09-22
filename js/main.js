/* =========================================================
   PROJECT HAIL MARY — main.js
   ---------------------------------------------------------
   Indice:
   1. Menu movil (hamburguesa)
   2. Menu desplegable "Archivo de la mision"
   3. Acordeon (tarjetas "Leer mas" y sinopsis del Hero)
   4. Formulario de contacto (validacion)
   5. Galeria: lightbox con zoom y pinch-to-zoom
   6. Widget del afiche + carrusel de posters (solo Inicio)
   7. Estrellas titilantes (fondo global)
   8. Carruseles de galeria (mobile/tablet < 1024px)

   Todas las funciones empiezan con un "if (!elemento) return;"
   porque el mismo main.js se carga en todas las paginas del
   sitio, pero no todas tienen, por ejemplo, un formulario de
   contacto. Ese chequeo evita errores en las paginas que no
   usan esa parte del codigo.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDropdown();

  initAccordions();
  initContactForm();
  initGallery();
  initPosterWidget();
  initPosterCarousel();
  initTwinkleStars();
  initGalleryCarousels();
});


/* ==========================================================
   1. MENÚ MÓVIL
   ========================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cerrar el menú apenas se toca un link: mejora la
  // navegación en mobile, porque si no el panel se queda
  // abierto tapando el contenido de la nueva página.
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMobileMenu(toggle, nav));
  });

  // Cerrar con la tecla Escape (accesibilidad de teclado).
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu(toggle, nav);
  });

  // Cerrar si se hace click en cualquier parte fuera del header.
  document.addEventListener('click', (event) => {
    const clickedInsideHeader = event.target.closest('.site-header');
    if (!clickedInsideHeader) closeMobileMenu(toggle, nav);
  });
}

function closeMobileMenu(toggle, nav) {
  nav.classList.remove('is-open');
  toggle.classList.remove('is-active');
  toggle.setAttribute('aria-expanded', 'false');

  // Si el submenú "Archivo de la misión" había quedado abierto,
  // lo cerramos también para que la próxima vez que se abra el
  // menú móvil, arranque siempre limpio.
  const dropdownItem = nav.querySelector('.nav-item--dropdown');
  const dropdownTrigger = document.getElementById('dropdown-toggle');
  if (dropdownItem && dropdownTrigger) {
    dropdownItem.classList.remove('is-open');
    dropdownTrigger.setAttribute('aria-expanded', 'false');
  }
}


/* ==========================================================
   2. MENÚ DESPLEGABLE "ARCHIVO DE LA MISIÓN"
   Funciona igual en mobile y en desktop: un click en el botón
   agrega/quita la clase "is-open" en el <li>, y todo lo visual
   (mostrar/ocultar, la flechita que gira) lo resuelve el CSS
   a partir de esa clase.
   ========================================================== */
function initDropdown() {
  const item = document.querySelector('.nav-item--dropdown');
  const trigger = document.getElementById('dropdown-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  if (!item || !trigger) return;

  trigger.addEventListener('click', (event) => {
    // En desktop el hover del CSS se encarga del dropdown.
    // Solo usamos el click cuando el menú móvil está visible (hamburguesa activa).
    const isMobileMenuOpen = menuToggle && menuToggle.classList.contains('is-active');
    if (!isMobileMenuOpen) return;

    event.stopPropagation();
    const isOpen = item.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!item.contains(event.target)) {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}


/* ==========================================================
   3. ACORDEONES (tarjetas "Leer mas" y sinopsis del Hero)
   Maneja la expansion/colapso de las tarjetas de personajes
   (.profile-card) y la sinopsis extendida del Hero. Al expandir
   una tarjeta, congela la altura de las demas para que flex
   no las estire.
   ========================================================== */

function initAccordions() {
  // Personajes / Reparto: <article class="profile-card" data-expanded="false">
  document.querySelectorAll('.profile-card__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.profile-card');
      const grid = card.closest('.profile-grid');
      const willBeOpen = card.getAttribute('data-expanded') !== 'true';

      if (willBeOpen) {
        // Antes de expandir: congelar la altura actual de TODAS las tarjetas
        // (incluyendo la que se va a expandir — así sus vecinas no se estiran)
        if (grid) {
          grid.querySelectorAll('.profile-card').forEach((c) => {
            c.style.minHeight = c.offsetHeight + 'px';
            c.style.alignSelf  = 'flex-start';
          });
        }
      } else {
        // Al colapsar: limpiar estilos inline de TODAS las tarjetas
        // para que flex stretch vuelva a igualarlas
        if (grid) {
          grid.querySelectorAll('.profile-card').forEach((c) => {
            c.style.minHeight = '';
            c.style.alignSelf  = '';
          });
        }
      }

      toggleOpenState(card, btn, 'data-expanded');
    });
  });

  // Sinopsis extendida dentro del Hero: <div class="hero__synopsis" data-expanded="false">
  document.querySelectorAll('.hero__synopsis-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.hero__synopsis');
      toggleOpenState(wrap, btn, 'data-expanded');
    });
  });
}

function toggleOpenState(container, trigger, attrName) {
  const wasOpen = container.getAttribute(attrName) === 'true';
  const willBeOpen = !wasOpen;

  container.setAttribute(attrName, String(willBeOpen));
  trigger.setAttribute('aria-expanded', String(willBeOpen));

  // Si el botón tiene un texto tipo "Leer más" / "Leer menos",
  // lo actualizamos usando los data-* que trae el HTML.
  const label = trigger.querySelector('.js-toggle-label');
  if (label) {
    label.textContent = willBeOpen ? label.dataset.openText : label.dataset.closedText;
  }
}


/* ==========================================================
   4. FORMULARIO DE CONTACTO
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', (event) => {
    // Frenamos el envío nativo del navegador: nosotros hacemos
    // nuestra propia validación antes de dejar pasar el envío.
    event.preventDefault();

    const campos = [
      { input: form.querySelector('#nombre'), esValido: validarRequerido },
      { input: form.querySelector('#email'), esValido: validarEmail },
      { input: form.querySelector('#asunto'), esValido: validarRequerido },
      { input: form.querySelector('#mensaje'), esValido: validarRequerido },
    ];

    let formularioValido = true;

    campos.forEach(({ input, esValido }) => {
      const campoValido = esValido(input.value);
      marcarValidez(input, campoValido);
      if (!campoValido) formularioValido = false;
    });

    // El checkbox de términos se valida aparte porque no es un
    // campo de texto: lo que importa es si está tildado o no.
    const terminos = form.querySelector('#terminos');
    const terminosRow = terminos.closest('.form__row');
    if (!terminos.checked) {
      terminosRow.classList.add('form__row--invalid');
      formularioValido = false;
    } else {
      terminosRow.classList.remove('form__row--invalid');
    }

    if (!formularioValido) {
      mostrarEstado(status, 'error', 'Revisá los campos marcados: falta completar o corregir algo.');
      return;
    }

    // -----------------------------------------------------
    // ACÁ es donde, el día de mañana, se conectaría un backend
    // real (por ejemplo con fetch() a tu propia API, o a un
    // servicio de formularios como Formspree). Como todavía no
    // hay ningún servidor conectado, por ahora solo mostramos
    // Si llegamos hasta acá, no hubo errores
    // y podemos mostrar el estado de éxito simulado
    // -----------------------------------------------------
    mostrarEstado(
      status,
      'success',
      '¡Listo! Tu mensaje ha sido enviado correctamente.'
    );
    form.reset();
    campos.forEach(({ input }) => marcarValidez(input, true));
    terminosRow.classList.remove('form__row--invalid');
  });

  // Además de validar al enviar, revalidamos cada campo apenas
  // la persona sale de él (evento "blur"), para dar feedback
  // más temprano en vez de esperar al envío del formulario.
  form.querySelectorAll('.form__input, .form__textarea').forEach((input) => {
    input.addEventListener('blur', () => {
      if (!input.hasAttribute('required')) return;
      const esValido = input.type === 'email' ? validarEmail(input.value) : validarRequerido(input.value);
      marcarValidez(input, esValido);
    });
  });
}

function validarRequerido(valor) {
  return valor.trim().length > 0;
}

function validarEmail(valor) {
  // Patrón simple (texto@texto.texto), suficiente para una
  // validación de front-end. La validación "de verdad" siempre
  // debe reforzarse también del lado del servidor.
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patronEmail.test(valor.trim());
}

function marcarValidez(input, esValido) {
  const row = input.closest('.form__row');
  row.classList.toggle('form__row--invalid', !esValido);
}

function mostrarEstado(elementoEstado, tipo, mensaje) {
  elementoEstado.textContent = mensaje;
  elementoEstado.className = `form__status is-visible form__status--${tipo}`;
}


/* ==========================================================
   5. GALERIA + LIGHTBOX
   Ventana modal a pantalla completa que muestra una version
   ampliada de la imagen clickeada. Navega entre todas las
   imagenes de la pagina con flechas o teclas. Soporta zoom
   por click (desktop), doble-tap (movil) y pinch-to-zoom
   con dos dedos. El paneo con un dedo permite recorrer la
   imagen cuando esta ampliada.
   ========================================================== */
function initGallery() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  let ultimoElementoEnfocado = null;

  // Todas las imágenes con lightbox de ESTA página, en el orden
  // en que aparecen en el HTML.
  const botones = Array.from(document.querySelectorAll('.gallery-item__button'));
  let indiceActual = 0;

  // --- Estado de zoom ---
  let currentScale = 1;
  let currentX = 0;
  let currentY = 0;
  let initialPinchDist = 0;
  let initialPinchScale = 1;
  let lastTap = 0;

  function resetZoom() {
    currentScale = 1;
    currentX = 0;
    currentY = 0;
    applyTransform();
  }

  function applyTransform() {
    lightboxImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
    lightboxImg.style.cursor = currentScale > 1 ? 'grab' : 'zoom-in';
  }

  function mostrarImagen(indice) {
    indiceActual = (indice + botones.length) % botones.length;
    const btn = botones[indiceActual];
    lightboxImg.src = btn.dataset.fullImage;
    lightboxImg.alt = btn.dataset.caption;
    lightboxCaption.textContent = btn.dataset.caption;
    resetZoom();
  }

  // --- Logica compartida de zoom focal ---
  function zoomToPoint(clientX, clientY) {
    if (currentScale > 1) {
      resetZoom();
    } else {
      currentScale = 2.5;
      const rect = lightboxImg.getBoundingClientRect();
      const originX = ((clientX - rect.left) / rect.width - 0.5) * rect.width;
      const originY = ((clientY - rect.top) / rect.height - 0.5) * rect.height;
      currentX = -originX * (currentScale - 1);
      currentY = -originY * (currentScale - 1);
      applyTransform();
    }
  }

  // --- Zoom por click (desktop) ---
  lightboxImg.addEventListener('click', (e) => {
    // Ignorar si es touch (manejado aparte con doble-tap)
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    zoomToPoint(e.clientX, e.clientY);
  });

  // --- Finalización de touch (incluye doble-tap) ---
  lightboxImg.addEventListener('touchend', (e) => {
    // Resetear estados de paneo/pinch
    if (e.touches.length < 2) isPinching = false;
    if (e.touches.length === 0) isPanning = false;

    // Lógica de doble-tap
    if (e.touches.length > 0) return; // Si aún hay dedos, no es un tap limpio
    const now = Date.now();
    if (now - lastTap < 300) {
      e.preventDefault();
      const touch = e.changedTouches[0];
      zoomToPoint(touch.clientX, touch.clientY);
    }
    lastTap = now;
  });

  // --- Pinch-to-zoom (dos dedos) ---
  let isPinching = false;
  let panStartX = 0;
  let panStartY = 0;
  let isPanning = false;

  function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  lightboxImg.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      isPinching = true;
      isPanning = false;
      initialPinchDist = getDistance(e.touches[0], e.touches[1]);
      initialPinchScale = currentScale;
      e.preventDefault();
    } else if (e.touches.length === 1 && currentScale > 1) {
      // Paneo con un dedo cuando hay zoom
      isPanning = true;
      panStartX = e.touches[0].clientX - currentX;
      panStartY = e.touches[0].clientY - currentY;
    }
  }, { passive: false });

  lightboxImg.addEventListener('touchmove', (e) => {
    if (isPinching && e.touches.length === 2) {
      e.preventDefault();
      const newDist = getDistance(e.touches[0], e.touches[1]);
      currentScale = Math.max(1, Math.min(5, initialPinchScale * (newDist / initialPinchDist)));
      if (currentScale <= 1.05) {
        currentScale = 1;
        currentX = 0;
        currentY = 0;
      }
      applyTransform();
    } else if (isPanning && e.touches.length === 1 && currentScale > 1) {
      e.preventDefault();
      currentX = e.touches[0].clientX - panStartX;
      currentY = e.touches[0].clientY - panStartY;
      applyTransform();
    }
  }, { passive: false });

  botones.forEach((btn, indice) => {
    btn.addEventListener('click', () => {
      ultimoElementoEnfocado = btn;
      mostrarImagen(indice);
      abrirLightbox(lightbox, closeBtn);
    });
  });

  // Las flechas solo tienen sentido si hay más de una imagen.
  if (botones.length > 1 && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => mostrarImagen(indiceActual - 1));
    nextBtn.addEventListener('click', () => mostrarImagen(indiceActual + 1));
  } else {
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
  }

  closeBtn.addEventListener('click', () => {
    resetZoom();
    cerrarLightbox(lightbox, ultimoElementoEnfocado);
  });

  // Cerrar al hacer click en el fondo oscuro (pero no si el
  // click fue dentro de la imagen o el texto).
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      resetZoom();
      cerrarLightbox(lightbox, ultimoElementoEnfocado);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      resetZoom();
      cerrarLightbox(lightbox, ultimoElementoEnfocado);
    }
    if (event.key === 'ArrowLeft' && botones.length > 1) mostrarImagen(indiceActual - 1);
    if (event.key === 'ArrowRight' && botones.length > 1) mostrarImagen(indiceActual + 1);
  });
}

function abrirLightbox(lightbox, closeBtn) {
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // evita el scroll del fondo
  closeBtn.focus(); // mueve el foco de teclado al botón de cerrar
}

function cerrarLightbox(lightbox, ultimoElementoEnfocado) {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  if (ultimoElementoEnfocado) ultimoElementoEnfocado.focus(); // devuelve el foco a donde estaba
}


/* ==========================================================
   13. WIDGET DEL AFICHE (solo Inicio): panel de info + carrusel
   ========================================================== */
function initPosterWidget() {
  const widget = document.getElementById('poster-widget');
  if (!widget) return;

  const handle = widget.querySelector('.poster-widget__handle');

  handle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = widget.classList.toggle('is-open');
    handle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!widget.contains(event.target)) {
      widget.classList.remove('is-open');
      handle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      widget.classList.remove('is-open');
      handle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initPosterCarousel() {
  const carousel = document.getElementById('poster-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.poster-carousel__slide');
  if (slides.length < 2) return; // nada para rotar con una sola imagen

  let actual = 0;

  // setInterval repite esta función cada 5000ms (5 segundos) para
  // siempre: le saca la clase "is-active" a la slide actual, pasa
  // al índice siguiente (o vuelve a 0 al llegar al final, gracias
  // al operador %) y se la agrega a la nueva.
  setInterval(() => {
    slides[actual].classList.remove('is-active');
    actual = (actual + 1) % slides.length;
    slides[actual].classList.add('is-active');
  }, 5000);
}


/* ==========================================================
   14. ESTRELLAS TITILANTES ("twinkle")
   Genera un puñado de <span> dentro de cada sección con la
   clase .starfield, cada uno con tamaño, posición, duración y
   demora al azar. Es lo que permite que titilen en momentos
   distintos entre sí â€” algo que un solo background-image (como
   el que ya tenía .starfield::before) no puede lograr.
   ========================================================== */
function initTwinkleStars() {
  // 1. Crear el fondo global
  const globalStarfield = document.createElement('div');
  globalStarfield.className = 'starfield global-starfield';
  globalStarfield.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(globalStarfield, document.body.firstChild);

  // 2. Quitar .starfield de otras secciones para evitar duplicados y errores de z-index
  document.querySelectorAll('.starfield').forEach(el => {
    if (el !== globalStarfield) {
      el.classList.remove('starfield');
    }
  });

  // 3. Agregar las estrellas titilantes al fondo global
  const CANTIDAD_TOTAL = 60; // Más estrellas porque ahora cubren toda la pantalla

  for (let i = 0; i < CANTIDAD_TOTAL; i++) {
    const estrella = document.createElement('span');
    estrella.className = 'twinkle-star';
    estrella.setAttribute('aria-hidden', 'true');

    // Todas las estrellas tienen resplandor rojo y tamaño sutil (Punto 1)
    estrella.classList.add('twinkle-star--glow', 'twinkle-star--petrova');
    
    // Tamaño mucho más sutil y pequeño (Punto 1)
    const size = 1.5 + Math.random() * 2.5; 

    estrella.style.width = `${size}px`;
    estrella.style.height = `${size}px`;
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 100}%`;
    estrella.style.setProperty('--duracion', `${3 + Math.random() * 5}s`);
    estrella.style.setProperty('--demora', `${Math.random() * 5}s`);

    globalStarfield.appendChild(estrella);
  }
}


/* ==========================================================
   8. CARRUSELES DE GALERÍA (solo mobile/tablet < 1024px)
   Genera un carrusel swipeable por cada .gallery-group
   a partir de las imágenes de su .gallery-grid.
   En desktop el carrusel se oculta por CSS y la grilla se muestra.
   ========================================================== */
function initGalleryCarousels() {
  const groups = document.querySelectorAll('.gallery-group, .dossier-gallery');
  if (!groups.length) return;

  groups.forEach((group) => {
    const grid = group.querySelector('.gallery-grid');
    if (!grid) return;

    const items = grid.querySelectorAll('.gallery-item');
    if (!items.length) return;

    // --- Construir HTML del carrusel ---
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-carousel';

    // Flechas
    const prevBtn = document.createElement('button');
    prevBtn.className = 'gallery-carousel__nav gallery-carousel__nav--prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Imagen anterior');
    prevBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'gallery-carousel__nav gallery-carousel__nav--next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Imagen siguiente');
    nextBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    // Track con slides
    const track = document.createElement('div');
    track.className = 'gallery-carousel__track';

    items.forEach((item) => {
      const slide = document.createElement('figure');
      slide.className = 'gallery-carousel__slide';

      const originalBtn = item.querySelector('.gallery-item__button');
      const img = item.querySelector('.gallery-item__img');
      const caption = item.querySelector('.gallery-item__caption');

      if (img) {
        const imgClone = document.createElement('img');
        imgClone.src = img.src;
        imgClone.alt = img.alt;
        imgClone.loading = 'lazy';
        imgClone.style.cursor = 'zoom-in';

        // Al tocar la imagen, abrir el lightbox usando el botón original del grid
        // (initGallery() ya tiene bindeados esos botones)
        let tapStartX = 0;
        let tapStartY = 0;
        imgClone.addEventListener('touchstart', (e) => {
          tapStartX = e.changedTouches[0].screenX;
          tapStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        imgClone.addEventListener('touchend', (e) => {
          const dx = Math.abs(e.changedTouches[0].screenX - tapStartX);
          const dy = Math.abs(e.changedTouches[0].screenY - tapStartY);
          // Solo abrir si fue un tap (no un swipe)
          if (dx < 15 && dy < 15 && originalBtn) {
            e.preventDefault(); // Evita el click sintético posterior
            originalBtn.click();
          }
        }, { passive: false });

        // Click normal (mouse)
        imgClone.addEventListener('click', (e) => {
          if (originalBtn) originalBtn.click();
        });

        slide.appendChild(imgClone);
      }
      if (caption) {
        const cap = document.createElement('figcaption');
        cap.textContent = caption.textContent;
        slide.appendChild(cap);
      }

      track.appendChild(slide);
    });

    // Dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'gallery-carousel__dots';

    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-carousel__dot' + (i === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
      dotsContainer.appendChild(dot);
    });

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);
    wrapper.appendChild(track);
    wrapper.appendChild(dotsContainer);

    // Insertar el carrusel justo después de la grilla
    grid.insertAdjacentElement('afterend', wrapper);

    // --- Lógica del carrusel ---
    let currentIndex = 0;
    const totalSlides = items.length;
    const dots = dotsContainer.querySelectorAll('.gallery-carousel__dot');

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      
      // El track mide exactamente el ancho de 1 slide (por CSS).
      // Por tanto, trasladar el 100% de su ancho equivale a mover 1 slide.
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // --- Touch swipe ---
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);  // Swipe izquierda → siguiente
        } else {
          goToSlide(currentIndex - 1);  // Swipe derecha → anterior
        }
      }
    }, { passive: true });
  });
}
