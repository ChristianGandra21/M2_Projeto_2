const Task = require('../models/task');
const User = require('../models/user');

// View principal
exports.index = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    const users = await User.findAll();
    res.render('tasks/index', { tasks, users });
  } catch (err) {
    res.status(500).send('Erro ao buscar tarefas');
  }
};

// API - Buscar todas as tarefas
exports.apiIndex = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// Criar tarefa via form
exports.store = async (req, res) => {
  try {
    await Task.create(req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send('Erro ao criar tarefa');
  }
};

// Criar tarefa via fetch API
exports.apiStore = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar tarefa' });
  }
};

// Atualizar tarefa
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.update(id, req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send('Erro ao atualizar tarefa');
  }
};

// Deletar tarefa
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).send('Erro ao excluir tarefa');
  }
};

// API - buscar tarefas por usuário
exports.byUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const tasks = await Task.findByUser(user_id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar por usuário' });
  }
};
