const db = require("../config/db");

module.exports = {
  async findAll() {
    const result = await db.query("SELECT * FROM users ORDER BY name ASC");
    return result.rows;
  },

  async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async create(name, email) {
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const result = await db.query(query, [name, email]);
    return result.rows[0];
  },

  async update(id, data) {
    const { name, email } = data;
    const query =
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
    const result = await db.query(query, [name, email, id]);
    return result.rows[0];
  },

  async delete(id) {
    try {
      const query = "DELETE FROM users WHERE id = $1 RETURNING *";
      const result = await db.query(query, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  },
};
