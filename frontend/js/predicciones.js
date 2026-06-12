async function cargar(){

try{

const r = await fetch(`${window.API_BASE}/api/predicciones`);
const datos = await r.json();

const contenedor = document.getElementById("contenedor");
contenedor.innerHTML = "";

datos.forEach(j=>{

const p = typeof j.predicciones === "string"
? JSON.parse(j.predicciones)
: j.predicciones;

let html = `
<div class="card">

<h2>${j.nombre}</h2>
<p><b>Apodo:</b> ${j.apodo}</p>
<p><b>Puntos:</b> ${j.puntos}</p>

<h3>🏆 Fase Final</h3>

<p>Campeón: ${p.campeon || "-"}</p>
<p>Subcampeón: ${p.subcampeon || "-"}</p>
<p>Tercero: ${p.tercero || "-"}</p>
<p>Cuarto: ${p.cuarto || "-"}</p>

<h3>⚽ Goleadores</h3>

<p>⭐ Balón de Oro: ${p.balonoro || "-"}</p>
<p>⚽ Bota de Oro: ${p.botaoro || "-"}</p>
<p>🧤 Guante de Oro: ${p.guanteoro || "-"}</p>

<h3>🌍 Fase de Grupos</h3>
`;

const grupos = ["A","B","C","D","E","F","G","H","I","J","K","L"];

grupos.forEach(g=>{
html += `
<p>
Grupo ${g}:
${p[`grupo${g}1`] || "-"} /
${p[`grupo${g}2`] || "-"}
</p>
`;
});

html += `</div>`;

contenedor.innerHTML += html;

});

}catch(e){
console.log(e);
}

}

cargar();