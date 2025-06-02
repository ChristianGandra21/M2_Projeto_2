const Task = require('../../models/task');

// API: Buscar todas as tarefas
exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// API: Criar nova tarefa
exports.create = async (req, res) => {
  const { titulo, descricao } = req.body;
  try {
    const nova = await Task.create({ titulo, descricao });
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// API: Deletar tarefa
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.remove(id);
    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
};
