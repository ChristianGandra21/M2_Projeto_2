const db = require('../config/db');

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO tasks (title, description, due_date, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [data.title, data.description, data.due_date, data.user_id || null];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, tasks.completed, tasks.due_date, users.name AS user
      FROM tasks
      LEFT JOIN users ON tasks.user_id = users.id
      ORDER BY tasks.id ASC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  async findByUser(user_id) {
    const result = await db.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY title ASC',
      [user_id]
    );
    return result.rows;
  },

  async update(id, data) {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, completed = $3
      WHERE id = $4
    `;
    const values = [data.title, data.description, data.completed, id];
    return db.query(query, values);
  },

  async delete(id) {
    return db.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
};
