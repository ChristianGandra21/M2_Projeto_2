const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// GET todos os usuários
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// POST novo usuário
router.post('/', async (req, res) => {
  try {
    const novo = await User.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar usuário' });
  }
});

// DELETE usuário
router.delete('/:id', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao deletar usuário' });
  }
});

module.exports = router;
