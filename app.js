const express = require('express');
const app = express();
const path = require('path');
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');
const bodyParser = require('body-parser');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
