const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.post("/resultado",(req,res)=>{

const {clave,valor}=req.body;

db.run(
`
INSERT OR REPLACE INTO resultados
(clave,valor)
VALUES(?,?)
`,
[clave,valor],
(err)=>{

if(err){

return res
.status(500)
.json(err);

}

res.json({
ok:true
});

}
);

});

router.get("/resultados",(req,res)=>{

db.all(
"SELECT * FROM resultados",
[],
(err,rows)=>{

res.json(rows);

}
);

});

router.post("/recalcular",(req,res)=>{

db.all(
`
SELECT *
FROM resultados
`,
[],
(err,resultados)=>{

const oficial={};

resultados.forEach(r=>{

oficial[r.clave]=r.valor;

});

db.all(
`
SELECT *
FROM participants
`,
[],
(err,usuarios)=>{

usuarios.forEach(u=>{

const p =
JSON.parse(
u.predicciones
);

let puntos=0;

const grupos=[
"A","B","C","D",
"E","F","G","H",
"I","J","K","L"
];

grupos.forEach(g=>{

if(
p[`grupo${g}1`]===
oficial[`grupo${g}1`]
){

puntos+=10;

}

if(
p[`grupo${g}2`]===
oficial[`grupo${g}2`]
){

puntos+=10;

}

});

if(
p.campeon===
oficial.campeon
){

puntos+=50;

}

if(
p.subcampeon===
oficial.subcampeon
){

puntos+=35;

}

if(
p.tercero===
oficial.tercero
){

puntos+=25;

}

if(
p.cuarto===
oficial.cuarto
){

puntos+=20;

}

if(
p.balonoro===
oficial.balonoro
){

puntos+=15;

}

if(
p.botaoro===
oficial.botaoro
){

puntos+=15;

}

if(
p.guanteoro===
oficial.guanteoro
){

puntos+=15;

}

db.run(
`
UPDATE participants
SET puntos=?
WHERE id=?
`,
[
puntos,
u.id
]
);

});

res.json({
ok:true
});

}
);

}
);

});

module.exports = router;