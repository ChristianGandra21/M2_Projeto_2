const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

// Página inicial (lista de tarefas)
router.get('/', taskController.index);

// Página de usuários
router.get('/usuarios', userController.index);

module.exports = router;
