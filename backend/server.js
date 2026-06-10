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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Servidor iniciado en puerto ${PORT}`);
});