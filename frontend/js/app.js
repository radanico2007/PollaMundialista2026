const grupos = {

A:[
"México",
"Sudáfrica",
"Corea del Sur",
"Chequia"
],

B:[
"Canadá",
"Bosnia y Herzegovina",
"Catar",
"Suiza"
],

C:[
"Brasil",
"Marruecos",
"Haití",
"Escocia"
],

D:[
"Estados Unidos",
"Paraguay",
"Australia",
"Turquía"
],

E:[
"Alemania",
"Curazao",
"Costa de Marfil",
"Ecuador"
],

F:[
"Países Bajos",
"Japón",
"Suecia",
"Túnez"
],

G:[
"Bélgica",
"Egipto",
"Irán",
"Nueva Zelanda"
],

H:[
"España",
"Cabo Verde",
"Arabia Saudita",
"Uruguay"
],

I:[
"Francia",
"Senegal",
"Irak",
"Noruega"
],

J:[
"Argentina",
"Argelia",
"Austria",
"Jordania"
],

K:[
"Portugal",
"RD Congo",
"Uzbekistán",
"Colombia"
],

L:[
"Inglaterra",
"Croacia",
"Ghana",
"Panamá"
]

};

const gruposDiv =
document.getElementById("grupos");

const letras =
Object.keys(grupos);

let todosEquipos=[];

Object.values(grupos).forEach(g=>{

g.forEach(e=>{

todosEquipos.push(e);

});

});

function crearSelect(id,equipos){

let html=`<select id="${id}">`;

equipos.forEach(e=>{

html+=`
<option value="${e}">
${e}
</option>
`;

});

html+=`</select>`;

return html;

}

letras.forEach(g=>{

gruposDiv.innerHTML+=`

<div class="grupoCard">

<h2>Grupo ${g}</h2>

<div class="equiposGrupo">

${grupos[g].join("<br>")}

</div>

<label>🥇 Primer Clasificado</label>

${crearSelect(`grupo${g}1`,grupos[g])}

<label>🥈 Segundo Clasificado</label>

${crearSelect(`grupo${g}2`,grupos[g])}

</div>

`;

});

[
"campeon",
"subcampeon",
"tercero",
"cuarto"
].forEach(id=>{

const select =
document.getElementById(id);

todosEquipos.forEach(e=>{

const op =
document.createElement("option");

op.value=e;
op.text=e;

select.appendChild(op);

});

});

async function guardar(){

const nombre =
document.getElementById("nombre").value.trim();

const apodo =
document.getElementById("apodo").value.trim();

if(nombre.length<3){

alert(
"El nombre debe tener al menos 3 caracteres"
);

return;

}

if(apodo.length<2){

alert(
"Debe ingresar un apodo"
);

return;

}

const predicciones={};

for(const g of letras){

const primero =
document.getElementById(`grupo${g}1`).value;

const segundo =
document.getElementById(`grupo${g}2`).value;

if(primero===segundo){

alert(
`Grupo ${g}: no puedes elegir el mismo equipo dos veces`
);

return;

}

predicciones[`grupo${g}1`] =
primero;

predicciones[`grupo${g}2`] =
segundo;

}

predicciones.campeon =
document.getElementById("campeon").value;

predicciones.subcampeon =
document.getElementById("subcampeon").value;

predicciones.tercero =
document.getElementById("tercero").value;

predicciones.cuarto =
document.getElementById("cuarto").value;

predicciones.balonoro =
document.getElementById("balonoro").value;

predicciones.botaoro =
document.getElementById("botaoro").value;

predicciones.guanteoro =
document.getElementById("guanteoro").value;

const data={

nombre,
apodo,
predicciones

};

if(
!confirm(
"¿Seguro que deseas guardar tus predicciones? Después no podrán modificarse."
)
){
return;
}

const r = await fetch(
"https://pollamundialista2026-api.onrender.com/api/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
}
);

if(r.ok){

alert(
"Predicciones registradas correctamente"
);

location.reload();

}else{

alert(
"Este participante ya registró predicciones"
);

}

}

window.onbeforeunload=function(){

return true;

};

function actualizarProgreso(){

const selects=
document.querySelectorAll(
"select"
);

let completados=0;

selects.forEach(s=>{

if(s.value){

completados++;

}

});

const porcentaje=
Math.round(
(completados/selects.length)*100
);

const barra=
document.getElementById(
"progreso"
);

if(barra){

barra.innerHTML=
`Completado: ${porcentaje}%`;

}

}

setInterval(
actualizarProgreso,
1000
);
