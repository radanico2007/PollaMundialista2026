const express = require("express");
const cors = require("cors");

require("./database/db");

const participants = require("./routes/participants");
const admin = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", participants);
app.use("/api/admin", admin);

app.listen(3000, () => {
console.log("Servidor iniciado en puerto 3000");
});