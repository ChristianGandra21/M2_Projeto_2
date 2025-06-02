const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// ========== ROTAS PARA VIEWS (renderização de páginas EJS) ==========
// O controller busca os dados do banco usando o modelo
// A rota chama o controller
// A view é renderizada com os dados do controller (com res.render() no caso do EJS)

// Página principal - Lista de tarefas
router.get("/", taskController.index);

// Página de formulário para nova tarefa
router.get("/new", taskController.new);

// Página de formulário para editar tarefa
router.get("/edit/:id", taskController.edit);

// ========== ACTIONS (processamento de formulários) ==========

// Criar nova tarefa (POST do formulário)
router.post("/", taskController.create);

// Atualizar tarefa (POST do formulário de edição)
router.post("/edit/:id", taskController.update);

// Alternar status da tarefa (concluída/pendente)
router.post("/toggle/:id", taskController.toggle);

// Excluir tarefa
router.post("/delete/:id", taskController.destroy);

// ========== ROTAS DE API (retornam JSON para fetch()) ==========

// API - Listar todas as tarefas
router.get("/api", taskController.apiIndex);

// API - Buscar tarefa por ID
router.get("/api/:id", taskController.apiShow);

// API - Criar nova tarefa
router.post("/api", taskController.apiCreate);

// API - Atualizar tarefa
router.put("/api/:id", taskController.apiUpdate);

// API - Alternar status da tarefa
router.patch("/api/:id/toggle", taskController.apiToggle);

// API - Excluir tarefa
router.delete("/api/:id", taskController.apiDestroy);

module.exports = router;
