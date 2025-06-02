const db = require("../config/db");

module.exports = {
  async findAll() {
    const result = await db.query("SELECT * FROM users ORDER BY name ASC");
    return result.rows;
  },

  async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(name, email) {
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const result = await db.query(query, [name, email]);
    return result.rows[0];
  },

  async update(id, data) {
    const query =
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
    const result = await db.query(query, [data.name, data.email, id]);
    return result.rows[0];
  },

  async delete(id) {
    return db.query("DELETE FROM users WHERE id = $1", [id]);
  },
};
