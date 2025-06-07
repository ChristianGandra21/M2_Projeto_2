const db = require("../config/db");

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO tasks (title, description, due_date, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      data.title,
      data.description,
      data.due_date,
      data.user_id || null,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, tasks.completed, tasks.due_date, tasks.user_id, users.name AS user
      FROM tasks
      LEFT JOIN users ON tasks.user_id = users.id
      ORDER BY tasks.id ASC
    `;
    const result = await db.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, tasks.completed, tasks.due_date, tasks.user_id, users.name AS user
      FROM tasks
      LEFT JOIN users ON tasks.user_id = users.id
      WHERE tasks.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async findByUser(user_id) {
    const result = await db.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY title ASC",
      [user_id]
    );
    return result.rows;
  },

  async update(id, data) {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, completed = $3, due_date = $4, user_id = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      data.title,
      data.description,
      data.completed || false,
      data.due_date || null,
      data.user_id || null,
      id,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    return db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },
};
