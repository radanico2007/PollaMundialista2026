async function cargar(){

const r =
await fetch(
"https://pollamundialista2026.onrender.com/api/ranking"
);

const datos =
await r.json();

const tbody =
document.querySelector(
"#tabla tbody"
);

tbody.innerHTML="";

datos.forEach((j,i)=>{

let medalla="";
let clase="";

if(i===0){

medalla="🥇";

clase="oro";

}
else if(i===1){

medalla="🥈";

clase="plata";

}
else if(i===2){

medalla="🥉";

clase="bronce";

}

tbody.innerHTML+=`

<tr class="${clase}">

<td>
${medalla}
${i+1}
</td>

<td>
${j.nombre}
</td>

<td>
${j.apodo}
</td>

<td>
${j.puntos}
</td>

</tr>

`;

});

}

cargar();

setInterval(
cargar,
5000
);
