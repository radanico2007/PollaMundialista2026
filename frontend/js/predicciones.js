async function cargar(){

const r = await fetch(
"https://pollamundialista2026.onrender.com/api/predicciones"
);

const datos = await r.json();

const contenedor =
document.getElementById("contenedor");

contenedor.innerHTML="";

datos.forEach(j=>{

const p =
JSON.parse(j.predicciones);

let html=`

<div class="card">

<h2>${j.nombre}</h2>

<p><b>Apodo:</b> ${j.apodo}</p>

<p><b>Puntos:</b> ${j.puntos}</p>

<h3>Fase Final</h3>

<p>🏆 Campeón: ${p.campeon||"-"}</p>

<p>🥈 Subcampeón: ${p.subcampeon||"-"}</p>

<p>🥉 Tercero: ${p.tercero||"-"}</p>

<p>4️⃣ Cuarto: ${p.cuarto||"-"}</p>

<p>⭐ Balón de Oro: ${p.balonoro||"-"}</p>

<p>⚽ Bota de Oro: ${p.botaoro||"-"}</p>

<p>🧤 Guante de Oro: ${p.guanteoro||"-"}</p>

<h3>Fase de Grupos</h3>

`;

const letras=[
"A","B","C","D",
"E","F","G","H",
"I","J","K","L"
];

letras.forEach(g=>{

html+=`
<p>
Grupo ${g}:
${p[`grupo${g}1`]||"-"}
 /
${p[`grupo${g}2`]||"-"}
</p>
`;

});

html+=`</div>`;

contenedor.innerHTML+=html;

});

}

cargar();
