const API_BASE = "https://pollamundialista2026-api.onrender.com";

async function cargarLider(){

const r = await fetch(`${API_BASE}/api/ranking`);
const datos = await r.json();

if(datos.length>0){
document.getElementById("liderActual").innerHTML =
`🏆 Líder actual: ${datos[0].nombre} (${datos[0].puntos} pts)`;
}

}

cargarLider();