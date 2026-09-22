const curiosidadesData = [
  { tipo: "Película", icono: "fa-film", texto: "Ryan Gosling fue confirmado para interpretar a Grace —y como productor del filme— desde 2020, mucho antes de que empezara el rodaje." },
  { tipo: "Película", icono: "fa-video", texto: "Buena parte de la película se filmó específicamente en formato IMAX, con tramos presentados en la relación de aspecto extendida 1.43:1, exclusiva de esas salas." },
  { tipo: "Película", icono: "fa-hand", texto: "En vez de apoyarse solo en animación digital, Rocky fue interpretado y manipulado físicamente por el artista de teatro y titiritero James Ortiz." },
  { tipo: "Película", icono: "fa-clapperboard", texto: 'La dirección quedó en manos de Phil Lord y Christopher Miller, el mismo dúo detrás de "21/22 Jump Street" y "La Lego Película", esta vez en un tono bastante más dramático que el habitual en su filmografía.' },
  { tipo: "Película", icono: "fa-pen-nib", texto: "El guion es de Drew Goddard, quien también había escrito la adaptación de otra novela de Andy Weir: El Marciano (The Martian)." },
  { tipo: "Película", icono: "fa-id-badge", texto: 'El propio autor de la novela estuvo presente durante el rodaje, recorriendo la nave construida para la película con su credencial de "<strong>Project Hail Mary</strong>" colgada al cuello.' },
  { tipo: "Película", icono: "fa-user-check", texto: "<strong>Andy Weir</strong> participó como productor de la película y estuvo involucrado en cada cambio al guion, algo poco habitual incluso en las adaptaciones más fieles a su fuente original." },
  { tipo: "Libro", icono: "fa-book", texto: "<strong>Project Hail Mary</strong> se publicó el 4 de mayo de 2021, después de <strong>El Marciano</strong> y <strong>Artemis</strong>." },
  { tipo: "Libro", icono: "fa-clock-rotate-left", texto: "La novela alterna entre el presente de la misión, ya en el espacio, y flashbacks que van revelando de a poco cómo <strong>Grace</strong> terminó ahí." },
  { tipo: "Libro", icono: "fa-headphones", texto: "La versión narrada (audiolibro) por <strong>Ray Porter</strong> es muy elogiada por quienes ya leyeron el libro, al punto de recomendarse como una forma alternativa —y muy disfrutable— de conocer la historia." },
  { tipo: "Libro", icono: "fa-book-open", texto: "Como <strong>El Marciano</strong>, esta es la segunda novela de Weir que se convierte en película, algo poco común para un autor todavía relativamente nuevo en el oficio." },
  { tipo: "Libro", icono: "fa-user-slash", texto: "En la película, <strong>Carl</strong> acompaña a <strong>Grace</strong> en gran parte de la historia. En la novela, ese personaje no existe: esas mismas ideas, <strong>Grace</strong> las piensa solo, en su cabeza." },
  { tipo: "Libro", icono: "fa-shuffle", texto: "En las dos versiones, <strong>Rocky</strong> rompe su propia esfera de contención para salvar a <strong>Grace</strong>. Lo que pasa inmediatamente después de eso, no es exactamente igual en el libro y en la película." },
  { tipo: "Libro", icono: "fa-compress", texto: "La novela tiene casi 500 páginas dedicadas a la ciencia detrás de cada decisión. La película, por ritmo narrativo, no tiene tiempo para todo eso: el libro guarda explicaciones y personajes que no llegaron a la pantalla." },
  { tipo: "Libro", icono: "fa-tag", texto: "En la película, <strong>Grace</strong> tiene un rol más protagónico en entender la <strong>línea de Petrova</strong> y bautizar al <strong>Astrophage</strong>. En la novela, ese proceso de investigación está repartido entre más personajes en la <strong>Tierra</strong>." },
  { tipo: "Libro", icono: "fa-bomb", texto: "Para ganar algo de tiempo frente al enfriamiento global provocado por los astrófagos, se detonaron múltiples bombas nucleares bajo la Antártida. Esto liberó metano atrapado en el hielo, creando un fuerte efecto invernadero para mantener el calor." },
  { tipo: "Libro", icono: "fa-solar-panel", texto: "Para conseguir la inmensa cantidad de energía necesaria para alimentar el combustible de la <strong>Hail Mary</strong>, se pavimentó una gran parte del desierto del Sáhara con paneles negros, originando la mayor 'granja de astrófagos' de la Tierra." },
  { tipo: "Libro", icono: "fa-burger", texto: "Durante su estancia en <strong>Erid</strong>, dado que la comida eridiana es tóxica para los humanos, los eridianos consiguen clonar el propio tejido muscular de <strong>Grace</strong> en un laboratorio. Él termina alimentándose diariamente de 'yoburguesas' (hamburguesas de su propia carne)." },
  { tipo: "Libro", icono: "fa-music", texto: "El lenguaje de los eridianos, la especie de <strong>Rocky</strong>, está compuesto enteramente por acordes musicales. Como no tienen ojos y 'ven' mediante ecolocalización, se comunican usando múltiples tonos simultáneos." },
  { tipo: "Libro", icono: "fa-rocket", texto: "Las cuatro pequeñas sondas de la <strong>Hail Mary</strong> (los 'escarabajos') se llaman John, Paul, George y Ringo en honor a los Beatles. El prototipo que se probó en la Tierra fue bautizado 'Pete' por Pete Best, el primer baterista de la banda." },
  { tipo: "Libro", icono: "fa-bed", texto: "Por una cuestión biológica, cuando los eridianos duermen quedan completamente paralizados y vulnerables, por lo que su cultura dicta que siempre debe haber alguien observándolos mientras descansan para protegerlos." },
  { tipo: "Libro", icono: "fa-dna", texto: "Solo 1 de cada 7.000 humanos posee el gen recesivo que permite sobrevivir al coma inducido necesario para el largo viaje espacial, lo cual redujo drásticamente las opciones para formar la tripulación." },
  { tipo: "Libro", icono: "fa-bug", texto: "La solución final al problema de los astrófagos es una ameba alienígena depredadora que <strong>Grace</strong> descubre en otro planeta y bautiza como 'Taumeba'. <strong>Grace</strong> cría selectivamente a estos organismos para que sobrevivan en atmósferas extremas." },
  { tipo: "Libro", icono: "fa-gem", texto: "Los eridianos utilizan un material revolucionario llamado '<strong>xenonita</strong>', forjado a partir de gas xenón. Es transparente, más duro que el diamante y capaz de soportar temperaturas y presiones atmosféricas extremas." },
  { tipo: "Libro", icono: "fa-temperature-high", texto: "La biología de la especie de <strong>Rocky</strong> es en su mayor parte inorgánica: su sangre es mercurio líquido, sus nervios son silicatos y su sistema circulatorio funciona a cientos de grados hirviendo agua, esencialmente moviéndose a vapor." }
];

document.addEventListener('DOMContentLoaded', () => {
  const btnDiscover = document.getElementById('btn-discover-curiosity');
  const cardContainer = document.getElementById('curiosity-card-container');
  const counterText = document.getElementById('curiosity-counter');

  if (!btnDiscover || !cardContainer) return;

  const totalCuriosities = curiosidadesData.length;
  let discoveredCount = 0;
  let remainingIndices = [];

  // Actualizar contador inicial
  if (counterText) {
    counterText.textContent = `0/${totalCuriosities} curiosidades descubiertas`;
  }

  // Barajar array
  function initQueue() {
    remainingIndices = curiosidadesData.map((_, i) => i);
    for (let i = remainingIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingIndices[i], remainingIndices[j]] = [remainingIndices[j], remainingIndices[i]];
    }
  }
  initQueue();

  btnDiscover.addEventListener('click', () => {

    if (remainingIndices.length === 0) {
      initQueue();
    }

    const randomIndex = remainingIndices.pop();
    const curiosidad = curiosidadesData[randomIndex];
    
    if (discoveredCount < totalCuriosities) {
      discoveredCount++;
    }

    if (counterText) {
      counterText.textContent = `${discoveredCount}/${totalCuriosities} curiosidades descubiertas`;
    }

    if (discoveredCount === 1) {
      btnDiscover.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> DESCUBRIR OTRA CURIOSIDAD';
    }

    const oldCard = cardContainer.querySelector('.curiosity-card-dynamic');
    if (oldCard) {
      oldCard.classList.remove('is-entering');
      oldCard.classList.add('is-exiting');
      setTimeout(() => {
        renderNewCard(curiosidad);
      }, 300);
    } else {
      renderNewCard(curiosidad);
    }
  });

  function renderNewCard(data) {
    const colorVar = data.tipo === 'Película' ? 'var(--color-signal)' : 'var(--color-petrova)';
    
    const cardHTML = `
      <article class="curiosity-card-dynamic">
        <div class="curiosity-card-dynamic__glow" style="background-color: ${colorVar}"></div>
        <div class="curiosity-card-dynamic__content">
          <header class="curiosity-card-dynamic__header">
            <span class="curiosity-card-dynamic__badge" style="color: ${colorVar}; border-color: ${colorVar}">
              <i class="fa-solid ${data.icono}" aria-hidden="true"></i> ${data.tipo}
            </span>
          </header>
          <p class="curiosity-card-dynamic__text">${data.texto}</p>
        </div>
      </article>
    `;
    
    cardContainer.innerHTML = cardHTML;
    
    const newCard = cardContainer.querySelector('.curiosity-card-dynamic');
    void newCard.offsetWidth;
    newCard.classList.add('is-entering');
  }
  
  // Mostrar una curiosidad aleatoria automáticamente al cargar
  btnDiscover.click();
});
