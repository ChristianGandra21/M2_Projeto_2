const express = require('express');
const router = express.Router();
const Tarefa = require('../../models/task');

// GET todas as tarefas
router.get('/', async (req, res) => {
  const tarefas = await Tarefa.findAll();
  res.json(tarefas);
});

// POST nova tarefa
router.post('/', async (req, res) => {
  try {
    const nova = await Tarefa.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar tarefa' });
  }
});

// DELETE tarefa
router.delete('/:id', async (req, res) => {
  try {
    await Tarefa.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao deletar tarefa' });
  }
});

module.exports = router;
