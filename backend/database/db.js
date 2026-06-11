const { Pool } = require("pg");

const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: {
rejectUnauthorized: false
}
});

async function iniciar() {

await pool.query(`
CREATE TABLE IF NOT EXISTS participants (
id BIGSERIAL PRIMARY KEY,
nombre TEXT UNIQUE,
apodo TEXT,
predicciones JSONB,
puntos INTEGER DEFAULT 0,
fecha TIMESTAMP DEFAULT NOW()
);
`);

await pool.query(`
CREATE TABLE IF NOT EXISTS resultados (
id BIGSERIAL PRIMARY KEY,
clave TEXT UNIQUE,
valor TEXT
);
`);

console.log("PostgreSQL conectado correctamente");

}

iniciar();

module.exports = pool;