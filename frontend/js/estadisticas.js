async function cargarEstadisticas(){

try{

const r = await fetch(`${window.API_BASE}/api/predicciones`);
const datos = await r.json();

let campeones={};

datos.forEach(j=>{

const p = typeof j.predicciones === "string"
? JSON.parse(j.predicciones)
: j.predicciones;

if(!campeones[p.campeon]) campeones[p.campeon]=0;
campeones[p.campeon]++;

});

let favorito="";
let votos=0;

for(const e in campeones){
if(campeones[e]>votos){
votos=campeones[e];
favorito=e;
}
}

document.getElementById("estadisticas").innerHTML =
`📊 Participantes: ${datos.length}<br>
🏆 Favorito: ${favorito || "Sin datos"} (${votos})`;

}catch(err){
console.error(err);
}

}

cargarEstadisticas();