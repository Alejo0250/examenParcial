

document.addEventListener("DOMContentLoaded", function () {
  // --- Menú hamburguesa ---
  const menuIcon = document.getElementById("menu-icon");
  const menu = document.getElementById("menu");
  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // --- Elementos del DOM ---
  const cat = document.getElementById("categoriaFiltro");
  const fecha = document.getElementById("rangoFechas");
  const grid = document.querySelector(".event-grid");

  // --- Función para mostrar eventos ---
  function mostrarEventos(lista) {
    if (!lista.length) {
      grid.innerHTML = `<p style="text-align:center;font-weight:bold;">NO HAY EVENTO</p>`;
      return;
    }

    grid.innerHTML = lista.map(ev => `
      <div class="event-item">
        ${ev.soldOut ? `<div class="sold-out">SOLD OUT</div>` : ""}
        <img src="${ev.imagen}" alt="${ev.title}" />
        <div class="event-info">
          <h3>${ev.title}</h3>
          <div class="event-details">
            <span>${ev.ciudad}</span>
            <span>${ev.fecha}</span>
            <span>${ev.categoria}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // --- Función de filtrado ---
  function filtrar() {
    const c = cat.value;
    const f = fecha.value;
    const filtrados = eventos.filter(ev => 
      (c === "todas" || ev.categoria === c) &&
      (f === "todas" || ev.fecha === f)
    );
    mostrarEventos(filtrados);
  }

  // --- Listeners de filtros ---
  cat.addEventListener("change", filtrar);
  fecha.addEventListener("change", filtrar);

  // --- Mostrar todos al inicio ---
  mostrarEventos(eventos);
});
