/**
 * ROTAS DE TAREFAS - CAMADA DE ROTEAMENTO
 *
 * Este módulo define todas as rotas relacionadas às tarefas no sistema.
 * Implementa tanto rotas para renderização de páginas EJS quanto APIs RESTful
 * para comunicação via fetch() JavaScript.
 *
 * Padrão MVC:
 * - Rotas recebem requisições HTTP
 * - Delegam processamento para controllers
 * - Controllers interagem com models
 * - Retornam views renderizadas ou dados JSON
 *
 * Tipos de rotas:
 * - Views: Renderizam páginas EJS completas
 * - Actions: Processam formulários HTML (POST)
 * - APIs: Retornam dados JSON para fetch()
 */

// Importação das dependências
const express = require("express"); // Framework web
const router = express.Router(); // Router do Express para modularização
const taskController = require("../controllers/taskController"); // Controller de tarefas

// ========== ROTAS PARA VIEWS (renderização de páginas EJS) ==========
// Estas rotas renderizam páginas HTML completas usando EJS
// Fluxo: Rota → Controller → Model → Controller → View (EJS)

/**
 * GET /tasks - Página principal com lista de tarefas
 * Renderiza a view principal com todas as tarefas e usuários
 */
router.get("/", taskController.index);

/**
 * GET /tasks/new - Formulário para nova tarefa
 * Renderiza o formulário de criação de tarefa com lista de usuários
 */
router.get("/new", taskController.new);

/**
 * GET /tasks/edit/:id - Formulário para editar tarefa
 * Renderiza o formulário de edição com dados da tarefa pré-preenchidos
 */
router.get("/edit/:id", taskController.edit);

// ========== ACTIONS (processamento de formulários HTML) ==========
// Estas rotas processam dados de formulários e redirecionam
// Fluxo: Formulário → Rota → Controller → Model → Redirect

/**
 * POST /tasks - Criar nova tarefa
 * Processa formulário de criação e redireciona para lista
 */
router.post("/", taskController.create);

/**
 * POST /tasks/edit/:id - Atualizar tarefa existente
 * Processa formulário de edição e redireciona para lista
 */
router.post("/edit/:id", taskController.update);

/**
 * POST /tasks/toggle/:id - Alternar status da tarefa
 * Marca tarefa como concluída/pendente e redireciona
 */
router.post("/toggle/:id", taskController.toggle);

/**
 * POST /tasks/delete/:id - Excluir tarefa
 * Remove tarefa do banco e redireciona para lista
 */
router.post("/delete/:id", taskController.destroy);

// ========== ROTAS DE API (retornam JSON para fetch()) ==========
// Estas rotas são usadas para comunicação assíncrona via JavaScript
// Fluxo: fetch() → Rota → Controller → Model → JSON Response

/**
 * GET /tasks/api - Listar todas as tarefas (JSON)
 * Retorna array com todas as tarefas em formato JSON
 */
router.get("/api", taskController.apiIndex);

/**
 * GET /tasks/api/:id - Buscar tarefa específica (JSON)
 * Retorna dados de uma tarefa específica em formato JSON
 */
router.get("/api/:id", taskController.apiShow);

/**
 * POST /tasks/api - Criar nova tarefa (JSON)
 * Cria tarefa via API e retorna dados da tarefa criada
 */
router.post("/api", taskController.apiCreate);

/**
 * PUT /tasks/api/:id - Atualizar tarefa (JSON)
 * Atualiza tarefa via API e retorna dados atualizados
 */
router.put("/api/:id", taskController.apiUpdate);

/**
 * PATCH /tasks/api/:id/toggle - Alternar status (JSON)
 * Alterna status da tarefa via API e retorna novo status
 */
router.patch("/api/:id/toggle", taskController.apiToggle);

/**
 * DELETE /tasks/api/:id - Excluir tarefa (JSON)
 * Remove tarefa via API e retorna confirmação
 */
router.delete("/api/:id", taskController.apiDestroy);

// Exportação do router para uso no app.js
module.exports = router;
