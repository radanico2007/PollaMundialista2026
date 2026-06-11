async function cargarEstadisticas(){

const r = await fetch(`${window.API_BASE}/api/predicciones`);
const datos = await r.json();

document.getElementById("estadisticas").innerHTML =
`📊 Participantes: ${datos.length}`;

}

cargarEstadisticas();