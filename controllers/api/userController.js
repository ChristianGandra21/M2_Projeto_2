const User = require('../../models/user');

// API: Criar novo usuário
exports.create = async (req, res) => {
  const { nome, email } = req.body;
  try {
    const novo = await User.create({ nome, email });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// (Opcional) API: Listar usuários
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
