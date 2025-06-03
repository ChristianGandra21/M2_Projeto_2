const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Importar rotas
const indexRoutes = require("./routes/index");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

// Configurações
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas para Views EJS (renderização de páginas)
app.use("/", indexRoutes); // página inicial
app.use("/tasks", taskRoutes); // páginas de tarefas
app.use("/users", userRoutes); // páginas de usuários

// Rotas para API (fetch() - retornam JSON)
app.use("/api/tasks", taskRoutes); // API de tarefas
app.use("/api/users", userRoutes); // API de usuários

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
