const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS orders (
    ID  SERIAL PRIMARY KEY,
    offerer text NOT NULL,
    data jsonb NOT NULL,
    type text NOT NULL
  );
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE orders;
  `);

  await client.release(true);
  next();
};
