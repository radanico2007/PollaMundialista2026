const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.post("/register",(req,res)=>{

const {
nombre,
apodo,
predicciones
}=req.body;

db.get(
`
SELECT id
FROM participants
WHERE nombre=?
`,
[nombre],
(err,row)=>{

if(row){

return res
.status(400)
.json({
error:"Ya registrado"
});

}

db.run(
`
INSERT INTO participants
(nombre,apodo,predicciones,puntos)
VALUES(?,?,?,0)
`,
[
nombre,
apodo,
JSON.stringify(predicciones)
],
function(err){

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

}
);

});

router.get("/predicciones",(req,res)=>{

db.all(
`
SELECT *
FROM participants
ORDER BY nombre
`,
[],
(err,rows)=>{

res.json(rows);

}
);

});

router.get("/ranking",(req,res)=>{

db.all(
`
SELECT *
FROM participants
ORDER BY puntos DESC
`,
[],
(err,rows)=>{

res.json(rows);

}
);

});

router.get("/total",(req,res)=>{

db.get(
`
SELECT COUNT(*) as total
FROM participants
`,
[],
(err,row)=>{

res.json(row);

}
);

});

module.exports=router;