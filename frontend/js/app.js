async function guardar(){

const nombre = document.getElementById("nombre").value.trim();
const apodo = document.getElementById("apodo").value.trim();

const r = await fetch(`${window.API_BASE}/api/register`, {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ nombre, apodo, predicciones:{} })
});

location.reload();
}