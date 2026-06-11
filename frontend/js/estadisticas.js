async function cargarEstadisticas(){

const r =
await fetch(
"https://pollamundialista2026-api.onrender.com/api/estadisticas"
);

const datos =
await r.json();

let campeones={};

datos.forEach(j=>{

const p =
JSON.parse(j.predicciones);

if(!campeones[p.campeon]){

campeones[p.campeon]=0;

}

campeones[p.campeon]++;

});

let favorito="";
let votos=0;

for(const equipo in campeones){

if(campeones[equipo]>votos){

votos=
campeones[equipo];

favorito=
equipo;

}

}

document.getElementById(
"estadisticas"
).innerHTML=

`
📊 Participantes: ${datos.length}
<br><br>
🏆 Favorito al título:
${favorito || "Sin datos"}
<br>
(${votos} votos)
`;

}

cargarEstadisticas();
