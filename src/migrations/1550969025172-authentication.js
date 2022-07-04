const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS leaderboard (
    ID  SERIAL PRIMARY KEY,
    name text NOT NULL,
    score integer NOT NULL
  );
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE leaderboard;
  `);

  await client.release(true);
  next();
};
