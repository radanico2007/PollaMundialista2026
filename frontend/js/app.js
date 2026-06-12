document.addEventListener("DOMContentLoaded", () => {

const grupos = {

A:["México","Sudáfrica","Corea del Sur","Chequia"],
B:["Canadá","Bosnia y Herzegovina","Catar","Suiza"],
C:["Brasil","Marruecos","Haití","Escocia"],
D:["Estados Unidos","Paraguay","Australia","Turquía"],
E:["Alemania","Curazao","Costa de Marfil","Ecuador"],
F:["Países Bajos","Japón","Suecia","Túnez"],
G:["Bélgica","Egipto","Irán","Nueva Zelanda"],
H:["España","Cabo Verde","Arabia Saudita","Uruguay"],
I:["Francia","Senegal","Irak","Noruega"],
J:["Argentina","Argelia","Austria","Jordania"],
K:["Portugal","RD Congo","Uzbekistán","Colombia"],
L:["Inglaterra","Croacia","Ghana","Panamá"]

};

const gruposDiv = document.getElementById("grupos");

const letras = Object.keys(grupos);

let todosEquipos = [];

/* 🔥 CREAR GRUPOS EN PÁGINA */
letras.forEach(g => {

grupos[g].forEach(e => todosEquipos.push(e));

gruposDiv.innerHTML += `
<div class="grupoCard">

<h2>Grupo ${g}</h2>

<div class="equiposGrupo">
${grupos[g].join("<br>")}
</div>

<label>🥇 Primero</label>
${crearSelect(`grupo${g}1`, grupos[g])}

<label>🥈 Segundo</label>
${crearSelect(`grupo${g}2`, grupos[g])}

</div>
`;

});

function crearSelect(id, lista){

let html = `<select id="${id}">`;

lista.forEach(e => {
html += `<option value="${e}">${e}</option>`;
});

html += `</select>`;
return html;

}

/* 🔥 COMPLETAR FASE FINAL */
["campeon","subcampeon","tercero","cuarto","balonoro","botaoro","guanteoro"]
.forEach(id => {

const select = document.getElementById(id);

if(select){
todosEquipos.forEach(e => {
const op = document.createElement("option");
op.value = e;
op.text = e;
select.appendChild(op);
});
}

});

/* 🔥 GUARDAR */
window.guardar = async function() {

const nombre = document.getElementById("nombre").value.trim();
const apodo = document.getElementById("apodo").value.trim();

const predicciones = {};

for(const g of letras){

const p1 = document.getElementById(`grupo${g}1`).value;
const p2 = document.getElementById(`grupo${g}2`).value;

predicciones[`grupo${g}1`] = p1;
predicciones[`grupo${g}2`] = p2;

}

predicciones.campeon = document.getElementById("campeon").value;
predicciones.subcampeon = document.getElementById("subcampeon").value;
predicciones.tercero = document.getElementById("tercero").value;
predicciones.cuarto = document.getElementById("cuarto").value;

predicciones.balonoro = document.getElementById("balonoro").value;
predicciones.botaoro = document.getElementById("botaoro").value;
predicciones.guanteoro = document.getElementById("guanteoro").value;

const data = { nombre, apodo, predicciones };

await fetch(`${window.API_BASE}/api/register`, {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify(data)
});

alert("Guardado correctamente");
location.reload();

};

});