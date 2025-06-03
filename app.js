const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

// Configurações de view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Necessário para aceitar JSON (fetch API)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas web
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

// Redirecionar root para /tasks
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
