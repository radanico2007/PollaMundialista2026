async function cargarLider(){

const r =
await fetch(
"http://localhost:3000/api/ranking"
);

const datos =
await r.json();

if(datos.length>0){

document.getElementById(
"liderActual"
).innerHTML=

`🏆 Líder actual: ${datos[0].nombre} (${datos[0].puntos} pts)`;

}

}

cargarLider();