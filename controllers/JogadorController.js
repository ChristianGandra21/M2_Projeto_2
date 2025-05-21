const jogadorModel = require('../models/jogadorModel');

async function listar(req, res) {
  try {
    const jogadores = await jogadorModel.listarJogadores();
    res.json(jogadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogadores' });
  }
}

async function buscarPorId(req, res) {
  try {
    const jogador = await jogadorModel.buscarJogadorPorId(req.params.id);
    if (!jogador) return res.status(404).json({ error: 'Jogador não encontrado' });
    res.json(jogador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogador' });
  }
}

module.exports = { listar, buscarPorId };
