const db = require('../config/db');

module.exports = {
  async findAll() {
    const result = await db.query('SELECT * FROM users ORDER BY name ASC');
    return result.rows;
  },

  async create(name, email) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const result = await db.query(query, [name, email]);
    return result.rows[0];
  }
};
