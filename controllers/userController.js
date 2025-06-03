const User = require('../models/user');

// Criar usuário via formulário
exports.store = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.create(name, email);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send('Erro ao criar usuário');
  }
};

// Criar usuário via API (fetch)
exports.apiStore = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create(name, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário' });
  }
};

// Listar usuários
exports.apiIndex = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// userController.js
exports.store = async (req, res) => {
  const { name, email } = req.body;
  await User.create(name, email);
  res.redirect('/tasks');
};
