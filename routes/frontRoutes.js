const express = require('express');
const router = express.Router();
const path = require('path');

// Defina os caminhos uma vez no início do arquivo
const viewsPath = path.join(__dirname, '../views');

router.get('/', (req, res) => {
  try {
    res.render('main', { // Assume que 'main' está configurado como seu layout
      pageTitle: 'Página Inicial',
      content: 'pages/page1' // Caminho relativo à pasta de views
    });
  } catch (error) {
    console.error('Erro ao renderizar:', error);
    res.status(500).send('Erro ao carregar a página');
  }
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page2')
  });
});

// Adicione outras rotas conforme necessário

module.exports = router;
