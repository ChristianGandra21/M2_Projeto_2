const express = require('express');
const router = express.Router();
const JogadorController = require('../controllers/JogadorController');

router.get('/', JogadorController.listar);
router.get('/:id', JogadorController.buscarPorId);

module.exports = router;
