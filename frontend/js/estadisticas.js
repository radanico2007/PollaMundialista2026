const API_BASE = "https://pollamundialista2026-api.onrender.com";

async function cargarEstadisticas(){

try{

const r = await fetch(`${API_BASE}/api/predicciones`);
const datos = await r.json();

let campeones={};

datos.forEach(j=>{

const p = typeof j.predicciones === "string"
? JSON.parse(j.predicciones)
: j.predicciones;

if(!campeones[p.campeon]){
campeones[p.campeon]=0;
}

campeones[p.campeon]++;

});

let favorito="";
let votos=0;

for(const equipo in campeones){
if(campeones[equipo]>votos){
votos=campeones[equipo];
favorito=equipo;
}
}

document.getElementById("estadisticas").innerHTML=`
📊 Participantes: ${datos.length}
<br><br>
🏆 Favorito al título: ${favorito || "Sin datos"}
<br>
(${votos} votos)
`;

}catch(err){

console.error(err);

document.getElementById("estadisticas").innerHTML=
"❌ Error cargando estadísticas";

}

}

cargarEstadisticas();