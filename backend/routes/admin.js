const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.post("/resultado", async(req,res)=>{

try{

const {clave,valor}=req.body;

await db.query(`
INSERT INTO resultados(clave,valor)
VALUES($1,$2)
ON CONFLICT(clave)
DO UPDATE SET valor=EXCLUDED.valor
`,[clave,valor]);

res.json({ok:true});

}catch(err){
res.status(500).json(err);
}

});

router.get("/resultados", async(req,res)=>{

try{

const datos = await db.query(`
SELECT * FROM resultados
`);

res.json(datos.rows);

}catch(err){
res.status(500).json(err);
}

});

router.post("/recalcular", async(req,res)=>{

try{

const resultados = await db.query(`SELECT * FROM resultados`);

const oficial = {};
resultados.rows.forEach(r=>{
oficial[r.clave]=r.valor;
});

const usuarios = await db.query(`SELECT * FROM participants`);

for(const u of usuarios.rows){

const p = u.predicciones;

let puntos=0;

const grupos=["A","B","C","D","E","F","G","H","I","J","K","L"];

grupos.forEach(g=>{

if(
oficial[`grupo${g}1`] &&
oficial[`grupo${g}1`]!=="No definido" &&
p[`grupo${g}1`]===oficial[`grupo${g}1`]
){
puntos+=10;
}

if(
oficial[`grupo${g}2`] &&
oficial[`grupo${g}2`]!=="No definido" &&
p[`grupo${g}2`]===oficial[`grupo${g}2`]
){
puntos+=10;
}

});

if(oficial.campeon!=="No definido" && p.campeon===oficial.campeon) puntos+=50;
if(oficial.subcampeon!=="No definido" && p.subcampeon===oficial.subcampeon) puntos+=35;
if(oficial.tercero!=="No definido" && p.tercero===oficial.tercero) puntos+=25;
if(oficial.cuarto!=="No definido" && p.cuarto===oficial.cuarto) puntos+=20;

if(oficial.balonoro!=="No definido" && p.balonoro===oficial.balonoro) puntos+=15;
if(oficial.botaoro!=="No definido" && p.botaoro===oficial.botaoro) puntos+=15;
if(oficial.guanteoro!=="No definido" && p.guanteoro===oficial.guanteoro) puntos+=15;

await db.query(`
UPDATE participants
SET puntos=$1
WHERE id=$2
`,[puntos,u.id]);

}

res.json({ok:true});

}catch(err){
res.status(500).json(err);
}

});

/* 🔥 RESET TOTAL */
router.post("/reset", async(req,res)=>{

try{

await db.query(`DELETE FROM participants`);
await db.query(`DELETE FROM resultados`);

res.json({ok:true});

}catch(err){
res.status(500).json(err);
}

});

/* 🟢 NUEVO: EDITAR PARTICIPANTE */
router.post("/editar-participante", async(req,res)=>{

try{

const {id,nombre,apodo} = req.body;

await db.query(`
UPDATE participants
SET nombre=$1,
apodo=$2
WHERE id=$3
`,[nombre,apodo,id]);

res.json({ok:true});

}catch(err){
res.status(500).json(err);
}

});

router.post("/editar-premios", async(req,res)=>{

try{

const {
id,
balonoro,
botaoro,
guanteoro
} = req.body;

const usuario = await db.query(`
SELECT predicciones
FROM participants
WHERE id=$1
`,[id]);

if(usuario.rows.length===0){
return res.status(404).json({
error:"Participante no encontrado"
});
}

const p = usuario.rows[0].predicciones;

p.balonoro = balonoro;
p.botaoro = botaoro;
p.guanteoro = guanteoro;

await db.query(`
UPDATE participants
SET predicciones=$1
WHERE id=$2
`,[
JSON.stringify(p),
id
]);

res.json({ok:true});

}catch(err){
res.status(500).json(err);
}

});

module.exports = router;