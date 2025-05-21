Table jogador {
  id int [pk, increment]
  nome varchar
  idade int
  posicao varchar
  nacionalidade varchar
}

Table tecnico {
  id int [pk, increment]
  nome varchar
  idade int
  funcao varchar
}

Table partida {
  id int [pk, increment]
  data date
  adversario varchar
  local varchar
  resultado varchar
}

Table treino {
  id int [pk, increment]
  data date
  local varchar
  tipo varchar
}
