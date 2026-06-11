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

const p = u.predicciones; // 👈 FIX IMPORTANTE (YA ES JSONB)

let puntos=0;

const grupos=["A","B","C","D","E","F","G","H","I","J","K","L"];

grupos.forEach(g=>{

if(p[`grupo${g}1`]===oficial[`grupo${g}1`]) puntos+=10;
if(p[`grupo${g}2`]===oficial[`grupo${g}2`]) puntos+=10;

});

if(p.campeon===oficial.campeon) puntos+=50;
if(p.subcampeon===oficial.subcampeon) puntos+=35;
if(p.tercero===oficial.tercero) puntos+=25;
if(p.cuarto===oficial.cuarto) puntos+=20;

if(p.balonoro===oficial.balonoro) puntos+=15;
if(p.botaoro===oficial.botaoro) puntos+=15;
if(p.guanteoro===oficial.guanteoro) puntos+=15;

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

module.exports = router;