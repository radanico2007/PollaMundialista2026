function entrarAdmin(){

const pass =
document.getElementById(
"passwordAdmin"
).value;

if(pass!=="Mundial2026"){

alert("Contraseña incorrecta");
return;

}

document.getElementById(
"loginAdmin"
).style.display="none";

document.getElementById(
"contenidoAdmin"
).style.display="block";

}

const grupos={

A:["No definido","México","Sudáfrica","Corea del Sur","Chequia"],
B:["No definido","Canadá","Bosnia y Herzegovina","Catar","Suiza"],
C:["No definido","Brasil","Marruecos","Haití","Escocia"],
D:["No definido","Estados Unidos","Paraguay","Australia","Turquía"],
E:["No definido","Alemania","Curazao","Costa de Marfil","Ecuador"],
F:["No definido","Países Bajos","Japón","Suecia","Túnez"],
G:["No definido","Bélgica","Egipto","Irán","Nueva Zelanda"],
H:["No definido","España","Cabo Verde","Arabia Saudita","Uruguay"],
I:["No definido","Francia","Senegal","Irak","Noruega"],
J:["No definido","Argentina","Argelia","Austria","Jordania"],
K:["No definido","Portugal","RD Congo","Uzbekistán","Colombia"],
L:["No definido","Inglaterra","Croacia","Ghana","Panamá"]

};

const contenedor =
document.getElementById(
"adminResultados"
);

function selectHTML(id,lista){

let html=`<select id="${id}">`;

lista.forEach(e=>{

html+=`
<option value="${e}">
${e}
</option>
`;

});

html+="</select>";

return html;

}

Object.keys(grupos).forEach(g=>{

contenedor.innerHTML+=`

<div class="grupoCard">

<h2>Grupo ${g}</h2>

<label>1° Oficial</label>

${selectHTML(`grupo${g}1`,grupos[g])}

<label>2° Oficial</label>

${selectHTML(`grupo${g}2`,grupos[g])}

</div>

`;

});

function agregar(id,titulo){

contenedor.innerHTML+=`

<label>${titulo}</label>

<input id="${id}" value="No definido">

`;

}

agregar("campeon","Campeón");
agregar("subcampeon","Subcampeón");
agregar("tercero","Tercero");
agregar("cuarto","Cuarto");

agregar("balonoro","Balón de Oro");
agregar("botaoro","Bota de Oro");
agregar("guanteoro","Guante de Oro");

async function guardarResultado(clave,valor){

await fetch(
"https://pollamundialista2026-api.onrender.com/api/admin/resultado",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
clave,
valor
})
}
);

}

async function guardarResultados(){

const letras=[
"A","B","C","D",
"E","F","G","H",
"I","J","K","L"
];

for(const g of letras){

await guardarResultado(
`grupo${g}1`,
document.getElementById(`grupo${g}1`).value
);

await guardarResultado(
`grupo${g}2`,
document.getElementById(`grupo${g}2`).value
);

}

const finales=[
"campeon",
"subcampeon",
"tercero",
"cuarto",
"balonoro",
"botaoro",
"guanteoro"
];

for(const c of finales){

await guardarResultado(
c,
document.getElementById(c).value
);

}

await fetch(
"https://pollamundialista2026-api.onrender.com/api/admin/recalcular",
{
method:"POST"
}
);

alert("Resultados guardados y ranking actualizado");

}