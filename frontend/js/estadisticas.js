async function cargarEstadisticas(){

try{

const r = await fetch(`${window.API_BASE}/api/predicciones`);
const datos = await r.json();

let campeones = {};

datos.forEach(j=>{

const p = typeof j.predicciones === "string"
? JSON.parse(j.predicciones)
: j.predicciones;

if(!p.campeon) return;

campeones[p.campeon] = (campeones[p.campeon] || 0) + 1;

});

let favorito = "";
let votos = 0;

for(const k in campeones){
if(campeones[k] > votos){
votos = campeones[k];
favorito = k;
}
}

document.getElementById("estadisticas").innerHTML =
`📊 Participantes: ${datos.length}<br>🏆 Favorito: ${favorito || "Sin datos"} (${votos})`;

}catch(e){
console.log(e);
}

}

cargarEstadisticas();