/* =========================================================
   PROJECT HAIL MARY — quiz.js
   ---------------------------------------------------------
   Vive separado de main.js a propósito: los datos de las 10
   preguntas y los 7 resultados posibles solo hacen falta acá,
   así que no tiene sentido cargarlos en el resto de las
   páginas del sitio.

   Cómo funciona en criollo:
   1. Cada pregunta tiene 4 opciones, y cada opción suma un
      punto a uno o más personajes (ver el objeto "points").
   2. Cuando se responden las 10, sumamos todos los puntos por
      personaje y el que tenga más puntos gana. Si hay un
      empate, se queda el primero de la lista (ver
      calcularGanador).
   3. Con el nombre del ganador buscamos su info en
      "personajes" y la mostramos en la pantalla de resultado.
   ========================================================= */

// --- Las 10 preguntas ---------------------------------------
const quizPreguntas = [
  {
    prompt: 'Te asignan un proyecto con un tiempo límite imposible. ¿Cómo reaccionás?',
    opciones: [
      { texto: 'Exigís autoridad absoluta y saltás cualquier burocracia para lograrlo.', puntos: ['stratt'] },
      { texto: 'Suspirás, hacés chistes nerviosos y te ponés a hacer cálculos para ver por dónde empezar.', puntos: ['grace'] },
      { texto: 'Trabajás sin descanso, sin dormir, construyendo soluciones con tus propias manos.', puntos: ['rocky'] },
      { texto: 'Tomás el mando inmediato y organizás a tu equipo con disciplina militar.', puntos: ['yao'] },
    ],
  },
  {
    prompt: 'Un equipo crucial falla de repente. ¿Qué hacés?',
    opciones: [
      { texto: 'Me quejo en voz alta y procedo a repararlo con piezas improvisadas.', puntos: ['olesya'] },
      { texto: 'Teorizo sobre por qué falló desde el punto de vista de la física antes de tocarlo.', puntos: ['lokken'] },
      { texto: 'Diseño una herramienta completamente nueva y mejorada en cuestión de horas.', puntos: ['rocky'] },
      { texto: 'Confío en que los especialistas que contraté resuelvan el problema mientras pienso en el cuadro general.', puntos: ['stratt'] },
    ],
  },
  {
    prompt: '¿Cómo preferís comunicarte cuando trabajás en equipo?',
    opciones: [
      { texto: 'Con datos crudos, directos y diagramas. Las palabras a veces sobran.', puntos: ['rocky'] },
      { texto: 'Con entusiasmo, analogías de la cultura pop y mucha paciencia para explicar.', puntos: ['grace'] },
      { texto: 'Órdenes claras, sin rodeos y esperando cumplimiento inmediato.', puntos: ['stratt', 'yao'] },
      { texto: 'Con buen humor, sarcasmo y diciendo siempre lo que pienso, sin filtros.', puntos: ['olesya', 'dimitri'] },
    ],
  },
  {
    prompt: '¿Qué es lo que más valorás en una misión o trabajo importante?',
    opciones: [
      { texto: 'La supervivencia a toda costa y completar el objetivo a cualquier precio.', puntos: ['stratt'] },
      { texto: 'La camaradería y aprender cosas nuevas junto a un buen amigo.', puntos: ['grace', 'rocky'] },
      { texto: 'El honor, el deber y la protección de quienes están a tu cargo.', puntos: ['yao'] },
      { texto: 'Asegurarme de que la infraestructura y los sistemas sean invulnerables.', puntos: ['dimitri'] },
    ],
  },
  {
    prompt: 'Si tuvieras que pasar un largo tiempo aislado, ¿qué te mantendría cuerdo?',
    opciones: [
      { texto: 'El sentido del deber y la convicción de que lo que hago salvará a otros.', puntos: ['yao', 'stratt'] },
      { texto: 'Realizar experimentos científicos y llevar un diario detallado.', puntos: ['grace'] },
      { texto: 'Mantener mis manos ocupadas arreglando y mejorando mi entorno.', puntos: ['rocky'] },
      { texto: 'Algún gusto simple: un buen libro, música bien fuerte o alguna manía personal.', puntos: ['olesya'] },
    ],
  },
  {
    prompt: '¿Cómo tomás decisiones críticas bajo mucha presión?',
    opciones: [
      { texto: 'Evalúo fríamente las estadísticas y elijo la opción menos mala, aunque sea cruel.', puntos: ['stratt'] },
      { texto: 'Intento pensar fuera de la caja y hacer algo arriesgado pero ingenioso.', puntos: ['grace'] },
      { texto: 'Me apego al protocolo y a mi entrenamiento; para eso están.', puntos: ['yao'] },
      { texto: 'Me frustro con la teoría y me enfoco en probar cosas prácticas de inmediato.', puntos: ['lokken', 'olesya'] },
    ],
  },
  {
    prompt: 'Cuando alguien no entiende algo que estás explicando, vos...',
    opciones: [
      { texto: 'Buscás otra forma de explicarlo, tal vez usando dibujos o maquetas.', puntos: ['grace'] },
      { texto: 'Te frustrás un poco porque te parece lógico, pero seguís intentando hasta conectar.', puntos: ['rocky'] },
      { texto: 'Lo despedís mentalmente y le asignás la tarea a alguien que sí entienda.', puntos: ['stratt'] },
      { texto: 'Ignorás la duda y avanzás, confiando en que tu diseño hablará por sí solo.', puntos: ['lokken'] },
    ],
  },
  {
    prompt: 'Si te enfrentás a lo desconocido por primera vez, tu reacción instintiva es:',
    opciones: [
      { texto: 'Fascinación y curiosidad extrema; querés medirlo y clasificarlo.', puntos: ['grace'] },
      { texto: 'Precaución amigable; intentás establecer contacto de forma segura y práctica.', puntos: ['rocky'] },
      { texto: 'Analizar si representa una amenaza táctica para mi misión.', puntos: ['yao'] },
      { texto: 'Contratar a los mejores expertos del mundo para que lo estudien por mí.', puntos: ['stratt'] },
    ],
  },
  {
    prompt: '¿Qué opinás de las reglas y las leyes?',
    opciones: [
      { texto: 'Son obstáculos que deben ignorarse si el fin justifica los medios.', puntos: ['stratt'] },
      { texto: 'Son necesarias para mantener el orden, especialmente en situaciones de crisis.', puntos: ['yao'] },
      { texto: 'Son útiles, pero la ciencia a veces requiere romperlas para innovar.', puntos: ['grace'] },
      { texto: 'Solo importan las leyes de la física y la termodinámica.', puntos: ['lokken', 'dimitri'] },
    ],
  },
  {
    prompt: '¿Cuál de estas frases podría ser tu lema personal?',
    opciones: [
      { texto: '"El fin siempre justifica los medios, no importa a quién moleste."', puntos: ['stratt'] },
      { texto: '"La ciencia es hacer preguntas y jugar hasta encontrar la respuesta."', puntos: ['grace'] },
      { texto: '"¡Pregunta! ¡Respuesta! ¡Solución!"', puntos: ['rocky'] },
      { texto: '"El deber está antes que la propia vida."', puntos: ['yao'] },
    ],
  },
];

// --- Los 7 resultados posibles -------------------------------
const quizPersonajes = {
  grace: {
    nombre: 'Dr. Ryland Grace',
    rol: 'Científico protagonista',
    descripcion: 'Curioso, algo torpe socialmente y capaz de encontrarle la vuelta científica a cualquier problema imposible. Si algo no tiene sentido todavía, para vos es solo una excusa para seguir investigando.',
    imagen: 'img/personajes/grace-user.webp',
  },
  rocky: {
    nombre: 'Rocky',
    rol: 'Ingeniero alienígena',
    descripcion: 'Práctico, incansable y de pocas palabras: preferís mostrar una solución construida con tus propias manos antes que explicarla con un discurso largo.',
    imagen: 'img/personajes/rocky-user.webp',
  },
  stratt: {
    nombre: 'Eva Stratt',
    rol: 'Directora de la operación',
    descripcion: 'Tomás las decisiones difíciles que nadie más quiere tomar, sin pedir permiso ni disculpas. El objetivo primero; lo demás, después.',
    imagen: 'img/personajes/stratt-user.webp',
  },
  yao: {
    nombre: 'Cmdte. Yáo Li-Jie',
    rol: 'Comandante de la tripulación',
    descripcion: 'Disciplinado, confiable y guiado por el deber. En una crisis, sos la persona a la que todos miran para saber qué hacer.',
    imagen: 'img/personajes/yao-user.webp',
  },
  olesya: {
    nombre: 'Olesya Ilyukhina',
    rol: 'Ingeniera principal',
    descripcion: 'Práctica, directa y sin filtros. Tenés un sentido del humor áspero pero sos brillante solucionando problemas técnicos reales.',
    imagen: 'img/personajes/ilyukhina-user.webp',
  },
  dimitri: {
    nombre: 'Dimitri',
    rol: 'Especialista en sistemas e infraestructura',
    descripcion: 'Metódico y confiable con la parte técnica: te preocupás por que todo lo que sostiene a la misión funcione, aunque nadie lo note hasta que falla.',
    imagen: 'img/personajes/dimitri-user.webp',
  },
  lokken: {
    nombre: 'Lokken',
    rol: 'Científica y analista',
    descripcion: 'Confiás en tu propio razonamiento antes que en la opinión ajena, y preferís que los hechos hablen por vos en vez de convencer a nadie con palabras.',
    imagen: 'img/personajes/lokken-user.webp',
  },
};

function initQuiz() {
  const quiz = document.getElementById('quiz');
  if (!quiz) return; // esta página no es quiz.html

  const startBtn = document.getElementById('quiz-start');
  const restartBtn = document.getElementById('quiz-restart');
  const progressEl = document.getElementById('quiz-progress');
  const promptEl = document.getElementById('quiz-prompt');
  const optionsEl = document.getElementById('quiz-options');

  const screens = {
    intro: quiz.querySelector('.quiz__screen--intro'),
    question: quiz.querySelector('.quiz__screen--question'),
    result: quiz.querySelector('.quiz__screen--result'),
  };

  let preguntaActual = 0;
  let puntajes = {}; // ej: { grace: 3, rocky: 1, ... }

  function mostrarPantalla(nombre) {
    Object.entries(screens).forEach(([clave, elemento]) => {
      elemento.hidden = clave !== nombre;
    });
  }

  function empezar() {
    preguntaActual = 0;
    puntajes = {};
    mostrarPregunta();
    mostrarPantalla('question');
  }

  function mostrarPregunta() {
    const pregunta = quizPreguntas[preguntaActual];
    progressEl.textContent = `Pregunta ${preguntaActual + 1} de ${quizPreguntas.length}`;
    promptEl.textContent = pregunta.prompt;

    // Reconstruimos los 4 botones de opciones desde cero en cada
    // pregunta, así no queda ningún listener "pegado" de la
    // pregunta anterior.
    optionsEl.innerHTML = '';
    pregunta.opciones.forEach((opcion) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'quiz__option';
      boton.textContent = opcion.texto;
      boton.addEventListener('click', () => elegirOpcion(opcion));
      optionsEl.appendChild(boton);
    });
  }

  function elegirOpcion(opcion) {
    opcion.puntos.forEach((personajeId) => {
      puntajes[personajeId] = (puntajes[personajeId] || 0) + 1;
    });

    preguntaActual += 1;
    if (preguntaActual < quizPreguntas.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }

  function calcularGanador() {
    let ganador = null;
    let maximo = -1;
    Object.entries(puntajes).forEach(([personajeId, puntos]) => {
      if (puntos > maximo) {
        maximo = puntos;
        ganador = personajeId;
      }
    });
    return ganador;
  }

  function mostrarResultado() {
    const ganadorId = calcularGanador();
    const personaje = quizPersonajes[ganadorId];

    document.getElementById('quiz-result-image').src = personaje.imagen;
    document.getElementById('quiz-result-image').alt = personaje.nombre;
    document.getElementById('quiz-result-name').textContent = personaje.nombre;
    document.getElementById('quiz-result-role').textContent = personaje.rol;
    document.getElementById('quiz-result-desc').textContent = personaje.descripcion;

    mostrarPantalla('result');
  }

  startBtn.addEventListener('click', empezar);
  restartBtn.addEventListener('click', empezar);
}

document.addEventListener('DOMContentLoaded', initQuiz);
