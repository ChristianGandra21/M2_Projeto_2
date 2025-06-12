/**
 * MODEL DE TAREFAS - CAMADA DE DADOS
 *
 * Este módulo implementa a camada Model do padrão MVC para a entidade Task.
 * Responsável por todas as operações de banco de dados relacionadas às tarefas,
 * incluindo operações CRUD (Create, Read, Update, Delete).
 *
 * Funcionalidades:
 * - Criação de novas tarefas
 * - Busca de tarefas (todas, por ID, por usuário)
 * - Atualização de tarefas existentes
 * - Exclusão de tarefas
 * - Relacionamento com usuários via JOIN
 */

// Importação da configuração de conexão com o banco de dados
const db = require("../config/db");

// Exportação do objeto com todos os métodos do modelo Task
module.exports = {
  /**
   * Cria uma nova tarefa no banco de dados
   * @param {Object} data - Dados da tarefa (title, description, due_date, user_id)
   * @returns {Promise<Object>} - Tarefa criada com ID gerado
   */
  async create(data) {
    // Query SQL para inserção com RETURNING para obter a tarefa criada
    const query = `
      INSERT INTO tasks (title, description, due_date, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    // Preparação dos valores para prepared statement (prevenção SQL injection)
    const values = [
      data.title, // Título da tarefa (obrigatório)
      data.description, // Descrição da tarefa (opcional)
      data.due_date, // Data de vencimento (opcional)
      data.user_id || null, // ID do usuário responsável (opcional)
    ];

    // Execução da query e retorno da primeira linha (tarefa criada)
    const result = await db.query(query, values);
    return result.rows[0];
  },

  /**
   * Busca todas as tarefas com informações do usuário responsável
   * @returns {Promise<Array>} - Array com todas as tarefas
   */
  async findAll() {
    // Query com LEFT JOIN para incluir nome do usuário responsável
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, tasks.completed,
             tasks.due_date, tasks.user_id, users.name AS user
      FROM tasks
      LEFT JOIN users ON tasks.user_id = users.id
      ORDER BY tasks.id ASC
    `;

    // Execução da query e retorno de todas as linhas
    const result = await db.query(query);
    return result.rows;
  },

  /**
   * Busca uma tarefa específica por ID com informações do usuário
   * @param {number} id - ID da tarefa a ser buscada
   * @returns {Promise<Object>} - Tarefa encontrada ou undefined
   */
  async findById(id) {
    // Query com LEFT JOIN para incluir dados do usuário responsável
    const query = `
      SELECT tasks.id, tasks.title, tasks.description, tasks.completed,
             tasks.due_date, tasks.user_id, users.name AS user
      FROM tasks
      LEFT JOIN users ON tasks.user_id = users.id
      WHERE tasks.id = $1
    `;

    // Execução da query com ID como parâmetro
    const result = await db.query(query, [id]);
    return result.rows[0]; // Retorna primeira linha ou undefined se não encontrar
  },

  /**
   * Busca todas as tarefas de um usuário específico
   * @param {string} user_id - UUID do usuário
   * @returns {Promise<Array>} - Array com tarefas do usuário
   */
  async findByUser(user_id) {
    // Query simples para buscar tarefas por usuário, ordenadas por título
    const result = await db.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY title ASC",
      [user_id]
    );
    return result.rows;
  },

  /**
   * Atualiza uma tarefa existente no banco de dados
   * @param {number} id - ID da tarefa a ser atualizada
   * @param {Object} data - Novos dados da tarefa
   * @returns {Promise<Object>} - Tarefa atualizada
   */
  async update(id, data) {
    // Query de atualização com RETURNING para obter tarefa atualizada
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, completed = $3, due_date = $4, user_id = $5
      WHERE id = $6
      RETURNING *
    `;

    // Preparação dos valores com valores padrão para campos opcionais
    const values = [
      data.title, // Título da tarefa (obrigatório)
      data.description, // Descrição da tarefa (opcional)
      data.completed || false, // Status de conclusão (padrão: false)
      data.due_date || null, // Data de vencimento (opcional)
      data.user_id || null, // ID do usuário responsável (opcional)
      id, // ID da tarefa a ser atualizada
    ];

    // Execução da query e retorno da tarefa atualizada
    const result = await db.query(query, values);
    return result.rows[0];
  },

  /**
   * Exclui uma tarefa do banco de dados
   * @param {number} id - ID da tarefa a ser excluída
   * @returns {Promise} - Resultado da operação de exclusão
   */
  async delete(id) {
    // Query simples de exclusão por ID
    return db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },
};
