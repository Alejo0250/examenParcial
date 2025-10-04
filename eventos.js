let eventosData = [];

async function cargarEventos() {
  const response = await fetch("eventosdb.json");
  eventosData = await response.json();
  mostrarEventos(eventosData);
}

function mostrarEventos(eventos) {
  const eventGrid = document.querySelector(".event-grid");
  eventGrid.innerHTML = "";
  eventos.forEach((evento) => {
    const eventItem = document.createElement("div");
    eventItem.className = "event-item";
    eventItem.style.cursor = "pointer";
    eventItem.setAttribute("data-event-id", evento.id);

    const soldOutTag = evento.soldOut
      ? '<span class="sold-out">Sold Out</span>'
      : '';

    eventItem.innerHTML = `
      <img src="imagenes/${evento.imagen}" alt="${evento.title}" />
      ${soldOutTag}
      <div class="event-info">
        <h3>${evento.title}</h3>
        <p>${evento.ciudad}</p>
        <div class="event-details">
          <span class="categoria">${evento.categoria}</span>
          <span class="artistas"> ${evento.artistas.join(", ")}</span>
          <span class="fecha"> ${evento.fecha}</span>
          <span class="hora"> ${evento.hora}</span>
          <span class="lugar"> ${evento.lugar}</span>
          <span class="precios"> ${evento.precios}</span>
          <span class="moneda"> ${evento.moneda}</span>
        </div>
      </div>
    `;

    eventItem.addEventListener("click", () => {
      mostrarDetallesEvento(evento.id);
    });

    eventGrid.appendChild(eventItem);
  });
}

function mostrarDetallesEvento(eventoId) {
  const evento = eventosData.find((e) => e.id === eventoId);
  document.getElementById("modalImage").src = "imagenes/" + evento.imagen;
  document.getElementById("modalImage").alt = evento.title;

  // Rellenar el modal con los datos del evento
  document.getElementById("modalCiudad").textContent = evento.ciudad;
  document.getElementById("modalCategoria").textContent = evento.categoria;
  document.getElementById("modalLugar").textContent = evento.lugar;
  document.getElementById("modalFecha").textContent = evento.fecha;
  document.getElementById("modalHora").textContent = evento.hora;
  document.getElementById("modalPopularidad").textContent = evento.popularidad;
  document.getElementById("modalEdad").textContent = evento.politicas.edad;
  document.getElementById("modalReembolso").textContent = evento.politicas.reembolso;
  document.getElementById("modalDescripcion").textContent = evento.descripcion;
  document.getElementById("modalMapa").innerHTML = evento.mapa;

  // Mostrar los artistas
  const castContainer = document.getElementById("modalArtistas");
  castContainer.innerHTML = "";
  evento.artistas.forEach((artista) => {
    const castSpan = document.createElement("span");
    castSpan.className = "cast-member";
    castSpan.textContent = artista;
    castContainer.appendChild(castSpan);
  });

  // Mostrar el modal
  document.getElementById("movieModal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevenir scroll del body
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById("movieModal").classList.add("hidden");
  document.body.style.overflow = "auto"; // Restaurar scroll del body
}

document.addEventListener("DOMContentLoaded", function () {
  // Cargar eventos
  cargarEventos();

  // Evento para cerrar el modal al hacer clic en el botón de cerrar
  document.querySelector(".close-btn").addEventListener("click", cerrarModal);

  // Opcional: cerrar el modal al hacer clic fuera del contenido
  document.getElementById("movieModal").addEventListener("click", function (e) {
    if (e.target === this) {
      cerrarModal();
    }
  });

  // Evento para filtrar por Categoría
  document.getElementById("categoriaFiltro").addEventListener("change", function () {
    const seleccion = this.value;
    if (seleccion === "todas") {
      mostrarEventos(eventosData);
    } else {
      const filtrados = eventosData.filter(e => e.categoria === seleccion);
      mostrarEventos(filtrados);
    }
  });
  // Evento para filtrar por Rango de Fechas
  document.getElementById("rangoFechas").addEventListener("change", function () {
    const seleccion = this.value;
    if (seleccion === "todas") {
      mostrarEventos(eventosData);
    } else {
      const filtrados = eventosData.filter(e => e.fecha === seleccion);
      mostrarEventos(filtrados);
    }
  });
});

// Alternar entre vista de lista y vista de cuadrícula
document.getElementById("toggleVista").addEventListener("click", function () {
  const eventGrid = document.querySelector(".event-grid");
  if (eventGrid.classList.contains("list-view")) {
    eventGrid.classList.remove("list-view");
    this.textContent = "Vista Lista";
  } else {
    eventGrid.classList.add("list-view");
    this.textContent = "Vista Cuadrícula";
  }
});

// Estilos para la vista de lista
const style = document.createElement('style');
style.innerHTML = `
  .event-grid.list-view {
    display: block;
  }
  .event-grid.list-view .event-item {
    display: flex;
    margin-bottom: 20px;
  }
  .event-grid.list-view .event-item img {
    width: 150px;
    height: auto;
    margin-right: 20px;
  }
`;
document.head.appendChild(style);