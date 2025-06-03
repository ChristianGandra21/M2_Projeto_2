const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ========== ROTAS PARA VIEWS (renderização de páginas EJS) ==========
// O controller busca os dados do banco usando o modelo
// A rota chama o controller
// A view é renderizada com os dados do controller (com res.render() no caso do EJS)

// Página principal - Lista de usuários
router.get("/", userController.index);

// Página de formulário para novo usuário
router.get("/new", userController.new);

// Página de formulário para editar usuário
router.get("/edit/:id", userController.edit);

// Página de confirmação para excluir usuário
router.get("/delete/:id", userController.confirmDelete);

// ========== ACTIONS (processamento de formulários) ==========

// Criar novo usuário (POST do formulário)
router.post("/", userController.create);

// Atualizar usuário (POST do formulário de edição)
router.post("/edit/:id", userController.update);

// Excluir usuário
router.post("/delete/:id", userController.destroy);

// Reatribuir tarefas de um usuário para outro
router.post("/reassign-tasks", userController.reassignTasks);

// ========== ROTAS DE API (retornam JSON para fetch()) ==========

// API - Listar todos os usuários
router.get("/api", userController.apiIndex);

// API - Buscar usuário por ID
router.get("/api/:id", userController.apiShow);

// API - Criar novo usuário
router.post("/api", userController.apiCreate);

// API - Atualizar usuário
router.put("/api/:id", userController.apiUpdate);

// API - Excluir usuário
router.delete("/api/:id", userController.apiDestroy);

module.exports = router;
