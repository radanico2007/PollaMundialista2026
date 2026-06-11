async function cargarLider(){

const r = await fetch(`${window.API_BASE}/api/ranking`);
const datos = await r.json();

if(datos.length>0){
document.getElementById("liderActual").innerHTML =
`🏆 Líder: ${datos[0].nombre} (${datos[0].puntos})`;
}

}

cargarLider();