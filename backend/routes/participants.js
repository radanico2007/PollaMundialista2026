const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.post("/register", async (req,res)=>{

try{

const {
nombre,
apodo,
predicciones
}=req.body;

const existe =
await db.query(
`
SELECT id
FROM participants
WHERE nombre=$1
`,
[nombre]
);

if(existe.rows.length){

return res.status(400).json({
error:"Ya registrado"
});

}

await db.query(
`
INSERT INTO participants
(nombre,apodo,predicciones,puntos)
VALUES($1,$2,$3,0)
`,
[
nombre,
apodo,
JSON.stringify(predicciones)
]
);

res.json({
ok:true
});

}catch(err){

res.status(500).json(err);

}

});

router.get("/predicciones", async(req,res)=>{

try{

const datos =
await db.query(
`
SELECT *
FROM participants
ORDER BY nombre
`
);

res.json(datos.rows);

}catch(err){

res.status(500).json(err);

}

});

router.get("/ranking", async(req,res)=>{

try{

const datos =
await db.query(
`
SELECT *
FROM participants
ORDER BY puntos DESC
`
);

res.json(datos.rows);

}catch(err){

res.status(500).json(err);

}

});

router.get("/total", async(req,res)=>{

try{

const datos =
await db.query(
`
SELECT COUNT(*) as total
FROM participants
`
);

res.json(datos.rows[0]);

}catch(err){

res.status(500).json(err);

}

});

module.exports = router;