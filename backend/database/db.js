const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/polla.db");

db.serialize(() => {

db.run(`
CREATE TABLE IF NOT EXISTS participants (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT UNIQUE,
apodo TEXT,
predicciones TEXT,
puntos INTEGER DEFAULT 0,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS resultados (
id INTEGER PRIMARY KEY AUTOINCREMENT,
clave TEXT UNIQUE,
valor TEXT
)
`);

});

module.exports = db;