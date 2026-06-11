async function cargar(){

const r = await fetch(`${window.API_BASE}/api/predicciones`);
const datos = await r.json();

const contenedor = document.getElementById("contenedor");
contenedor.innerHTML="";

datos.forEach(j=>{

const p = typeof j.predicciones === "string"
? JSON.parse(j.predicciones)
: j.predicciones;

let html=`<div class="card">
<h2>${j.nombre}</h2>
<p>${j.apodo}</p>
<p>Puntos: ${j.puntos}</p>
`;

const letras=["A","B","C","D","E","F","G","H","I","J","K","L"];

letras.forEach(g=>{
html+=`<p>Grupo ${g}: ${p[`grupo${g}1`]||"-"} / ${p[`grupo${g}2`]||"-"}</p>`;
});

html+=`</div>`;
contenedor.innerHTML+=html;

});

}

cargar();