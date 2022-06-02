const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create(offerer, data,  type) {
    await db.query(sql`
    INSERT INTO orders (offerer, data, type)
      VALUES (${offerer}, ${data}, ${type});
    `);
    return;
  },
  async findByOfferer(offerer) {
    const {rows} = await db.query(`
    SELECT * FROM orders WHERE offerer Ilike $1
    `, [`%${offerer}%`]);
    if (rows.length < 1) {
      return null;
    }

    //const {data: data} = rows[0];
    return rows;
  },
  async findByType(type) {
    const {rows} = await db.query(`
    SELECT * FROM orders WHERE type Ilike $1
    `, [`%${type}%`]);
    if (rows.length < 1) {
      return null;
    }

    //const {data: data} = rows[0];
    return rows;
  },
  async getAll(limit) {
    const {rows} = await db.query(sql`
    SELECT * FROM orders LIMIT ${limit ? limit : 20};
    `);
    if (rows.length < 1) {
      return null;
    }

    //const {data: data} = rows[0];
    return rows;
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM orders WHERE id = ${id};
    `);
  },
  async deleteByOfferer(offerer) {
    await db.query(sql`
    DELETE FROM orders WHERE offerer = ${offerer};
    `);
  }
};
