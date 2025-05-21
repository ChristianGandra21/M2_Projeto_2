const db = require('../config/database.js');

async function listarJogadores() {
  try {
    const res = await db.query('SELECT * FROM jogadores');
    return res.rows;
  } catch (err) {
    console.error('Erro ao listar jogadores:', err);
    throw err;
  }
}

async function buscarJogadorPorId(id) {
  try {
    const res = await db.query('SELECT * FROM jogadores WHERE id = $1', [id]);
    return res.rows[0];
  } catch (err) {
    console.error(`Erro ao buscar jogador com ID ${id}:`, err);
    throw err;
  }
}

module.exports = {
  listarJogadores,
  buscarJogadorPorId,
};
