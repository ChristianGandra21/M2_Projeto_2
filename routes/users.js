const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Corrigido: garantir que está chamando userController.store
router.post('/users', userController.store);

module.exports = router;
