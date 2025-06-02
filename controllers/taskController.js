const Task = require('../models/task');

exports.index = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.render('index', { tasks });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).send('Erro ao carregar tarefas');
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, due_date, user_id } = req.body;
    await Task.create({ title, description, due_date, user_id });
    res.status(201).json({ message: 'Tarefa criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const { id } = req.params;
    await Task.update(id, { title, description, completed });
    res.status(200).json({ message: 'Tarefa atualizada!' });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.status(200).json({ message: 'Tarefa excluída!' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
