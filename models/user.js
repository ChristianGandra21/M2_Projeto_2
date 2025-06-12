/**
 * MODEL DE USUÁRIOS - CAMADA DE DADOS
 *
 * Este módulo implementa a camada Model do padrão MVC para a entidade User.
 * Responsável por todas as operações de banco de dados relacionadas aos usuários,
 * incluindo operações CRUD (Create, Read, Update, Delete).
 *
 * Funcionalidades:
 * - Criação de novos usuários
 * - Busca de usuários (todos, por ID)
 * - Atualização de usuários existentes
 * - Exclusão de usuários
 * - Validação de integridade referencial
 */

// Importação da configuração de conexão com o banco de dados
const db = require("../config/db");

// Exportação do objeto com todos os métodos do modelo User
module.exports = {
  /**
   * Busca todos os usuários cadastrados no sistema
   * @returns {Promise<Array>} - Array com todos os usuários ordenados por nome
   */
  async findAll() {
    // Query simples para buscar todos os usuários ordenados alfabeticamente
    const result = await db.query("SELECT * FROM users ORDER BY name ASC");
    return result.rows;
  },

  /**
   * Busca um usuário específico por ID
   * @param {string} id - UUID do usuário a ser buscado
   * @returns {Promise<Object>} - Usuário encontrado ou undefined
   */
  async findById(id) {
    // Query para buscar usuário por ID usando prepared statement
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0]; // Retorna primeira linha ou undefined se não encontrar
  },

  /**
   * Cria um novo usuário no banco de dados
   * @param {string} name - Nome completo do usuário
   * @param {string} email - Email único do usuário
   * @returns {Promise<Object>} - Usuário criado com UUID gerado
   */
  async create(name, email) {
    // Query de inserção com RETURNING para obter o usuário criado
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const result = await db.query(query, [name, email]);
    return result.rows[0]; // Retorna o usuário criado com ID gerado
  },

  /**
   * Atualiza um usuário existente no banco de dados
   * @param {string} id - UUID do usuário a ser atualizado
   * @param {Object} data - Novos dados do usuário (name, email)
   * @returns {Promise<Object>} - Usuário atualizado
   */
  async update(id, data) {
    // Desestruturação dos dados recebidos
    const { name, email } = data;

    // Query de atualização com RETURNING para obter usuário atualizado
    const query =
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
    const result = await db.query(query, [name, email, id]);
    return result.rows[0]; // Retorna o usuário atualizado
  },

  /**
   * Exclui um usuário do banco de dados
   * @param {string} id - UUID do usuário a ser excluído
   * @returns {Promise<boolean>} - true se excluído com sucesso, false caso contrário
   */
  async delete(id) {
    try {
      // Query de exclusão com RETURNING para confirmar operação
      const query = "DELETE FROM users WHERE id = $1 RETURNING *";
      const result = await db.query(query, [id]);

      // Retorna true se pelo menos uma linha foi afetada
      return result.rowCount > 0;
    } catch (error) {
      // Log do erro para debugging
      console.error("Erro ao deletar usuário:", error);

      // Re-lança o erro para ser tratado pelo controller
      throw error;
    }
  },
};
