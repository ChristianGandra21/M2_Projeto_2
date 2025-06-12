/**
 * CONFIGURAÇÃO DO BANCO DE DADOS POSTGRESQL
 *
 * Este módulo configura a conexão com o banco de dados PostgreSQL
 * usando o driver 'pg' (node-postgres). Utiliza pool de conexões
 * para otimizar performance e gerenciar múltiplas conexões simultâneas.
 *
 * Funcionalidades:
 * - Pool de conexões PostgreSQL
 * - Configuração via variáveis de ambiente
 * - Suporte a SSL para ambientes de produção
 * - Interface simplificada para queries
 */

// Importação do driver PostgreSQL para Node.js
const { Pool } = require("pg");
// Carregamento das variáveis de ambiente do arquivo .env
require("dotenv").config();

// Verificação se SSL está habilitado via variável de ambiente
const isSSL = process.env.DB_SSL === "true";

// Criação do pool de conexões PostgreSQL
// Pool gerencia múltiplas conexões de forma eficiente
const pool = new Pool({
  user: process.env.DB_USER, // Usuário do banco de dados
  host: process.env.DB_HOST, // Endereço do servidor (localhost para desenvolvimento)
  database: process.env.DB_DATABASE, // Nome do banco de dados
  password: process.env.DB_PASSWORD, // Senha do usuário
  port: process.env.DB_PORT, // Porta do PostgreSQL (padrão: 5432)
  ssl: isSSL ? { rejectUnauthorized: false } : false, // Configuração SSL para produção
});

// Exportação da interface de conexão com o banco
module.exports = {
  /**
   * Executa uma query SQL no banco de dados
   * @param {string} text - Query SQL a ser executada
   * @param {Array} params - Parâmetros para prepared statements (prevenção SQL injection)
   * @returns {Promise} - Resultado da query
   */
  query: (text, params) => pool.query(text, params),

  /**
   * Obtém uma conexão do pool para transações ou operações específicas
   * @returns {Promise} - Conexão do pool
   */
  connect: () => pool.connect(),
};
