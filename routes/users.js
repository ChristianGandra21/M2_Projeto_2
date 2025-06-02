const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API REST de usuários
router.post('/users', userController.create);

module.exports = router;
