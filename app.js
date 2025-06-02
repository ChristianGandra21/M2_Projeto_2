const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/', indexRoutes);         // páginas EJS
app.use('/api', taskRoutes);       // API de tarefas
app.use('/api', userRoutes);       // API de usuários

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
