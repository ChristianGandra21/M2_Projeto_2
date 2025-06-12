/**
 * SERVIDOR PRINCIPAL - SISTEMA GERENCIADOR DE TAREFAS MVC
 *
 * Este arquivo configura e inicializa o servidor Express.js que serve
 * a aplicação web de gerenciamento de tarefas seguindo o padrão MVC.
 *
 * Funcionalidades:
 * - Configuração do servidor Express
 * - Definição de middlewares
 * - Configuração do template engine EJS
 * - Roteamento para views e APIs
 */

// Importação das dependências principais
const express = require("express"); // Framework web para Node.js
const path = require("path"); // Utilitário para trabalhar com caminhos de arquivos
const bodyParser = require("body-parser"); // Middleware para parsing de dados HTTP

// Criação da instância da aplicação Express
const app = express();

// Importação dos módulos de rotas (seguindo padrão MVC)
const indexRoutes = require("./routes/index"); // Rota principal (redirecionamento)
const taskRoutes = require("./routes/tasks"); // Rotas para operações com tarefas
const userRoutes = require("./routes/users"); // Rotas para operações com usuários

// ========== CONFIGURAÇÕES DO SERVIDOR ==========

// Configuração do template engine EJS para renderização dinâmica de páginas
app.set("view engine", "ejs"); // Define EJS como engine de templates
app.set("views", path.join(__dirname, "views")); // Define diretório das views

// Configuração de middlewares para processamento de requisições
app.use(express.static(path.join(__dirname, "public"))); // Serve arquivos estáticos (CSS, JS, imagens)
app.use(bodyParser.json()); // Parser para dados JSON nas requisições
app.use(bodyParser.urlencoded({ extended: true })); // Parser para dados de formulários HTML

// ========== CONFIGURAÇÃO DE ROTAS ==========

// Rotas para Views EJS (renderização de páginas HTML)
// Estas rotas retornam páginas completas renderizadas com EJS
app.use("/", indexRoutes); // Rota raiz - redireciona para página principal
app.use("/tasks", taskRoutes); // Rotas de tarefas - /tasks, /tasks/new, /tasks/edit/:id
app.use("/users", userRoutes); // Rotas de usuários - /users, /users/new, /users/edit/:id

// Rotas para API (comunicação via fetch() - retornam JSON)
// Estas rotas são usadas para operações assíncronas via JavaScript
app.use("/api/tasks", taskRoutes); // API de tarefas - endpoints JSON para CRUD
app.use("/api/users", userRoutes); // API de usuários - endpoints JSON para CRUD

// ========== INICIALIZAÇÃO DO SERVIDOR ==========

// Definição da porta do servidor (usa variável de ambiente ou 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Inicialização do servidor HTTP
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 Sistema Gerenciador de Tarefas MVC iniciado com sucesso!`);
});
