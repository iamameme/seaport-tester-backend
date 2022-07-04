const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create(name, score) {
    await db.query(sql`
    INSERT INTO leaderboard (name, score)
      VALUES (${name}, ${score});
    `);
    return;
  },
  async getAll(limit) {
    const {rows} = await db.query(sql`
    SELECT * FROM leaderboard LIMIT ${limit ? limit : 20};
    `);
    if (rows.length < 1) {
      return null;
    }
    return rows;
  },
  async deleteByName(name) {
    await db.query(sql`
    DELETE FROM leaderboard WHERE name = ${name};
    `);
  }
};
