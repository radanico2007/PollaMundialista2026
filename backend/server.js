const express = require("express");
const cors = require("cors");
const fs = require("fs");

require("./database/db");

const participants = require("./routes/participants");
const admin = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", participants);
app.use("/api/admin", admin);

setInterval(() => {

try{

fs.copyFileSync(
"./database/polla.db",
`./database/backup-${Date.now()}.db`
);

}catch(e){}

},600000);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(`Servidor iniciado en puerto ${PORT}`);

});