# 📋 Sistema Gerenciador de Tarefas MVC

> **Aplicação web completa para gerenciamento de tarefas e usuários, desenvolvida com arquitetura MVC**

## 🎯 Sobre o Projeto

O Sistema Gerenciador de Tarefas MVC é uma aplicação web robusta desenvolvida para auxiliar no controle e organização de atividades diárias. O sistema implementa um CRUD completo tanto para tarefas quanto para usuários, seguindo rigorosamente o padrão arquitetural MVC (Model-View-Controller).

### ✨ Funcionalidades Principais

**🔧 Gestão de Tarefas:**
- ✅ Criar, visualizar, editar e excluir tarefas
- ✅ Marcar/desmarcar como concluídas
- ✅ Associar responsáveis (usuários)
- ✅ Definir datas de vencimento
- ✅ Validações robustas de formulário

**👥 Gestão de Usuários:**
- ✅ Cadastrar, visualizar, editar e excluir usuários
- ✅ Validação de email único
- ✅ Proteção contra exclusões inválidas
- ✅ Verificação de integridade referencial

**🎨 Interface e Experiência:**
- ✅ Design responsivo (desktop, tablet, mobile)
- ✅ Notificações inteligentes de sucesso/erro
- ✅ Confirmações de segurança para ações destrutivas
- ✅ Loading states durante operações
- ✅ Navegação intuitiva e fluida

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **pg** - Driver PostgreSQL para Node.js

### Frontend
- **EJS** - Template engine para renderização dinâmica
- **CSS Customizado** - Estilização responsiva
- **JavaScript Vanilla** - Interatividade sem dependências
- **Fetch API** - Comunicação assíncrona com backend

### Arquitetura
- **MVC Pattern** - Separação clara de responsabilidades
- **RESTful APIs** - Endpoints padronizados
- **SQL Nativo** - Controle direto sobre queries

## 📁 Estrutura do Projeto

```
mvc-boilerplate/
├── app.js                 # Servidor principal Express
├── package.json           # Dependências e scripts
├── config/
│   └── db.js             # Configuração do PostgreSQL
├── controllers/
│   ├── taskController.js # Lógica de negócio - tarefas
│   └── userController.js # Lógica de negócio - usuários
├── models/
│   ├── task.js          # Modelo de dados - tarefas
│   └── user.js          # Modelo de dados - usuários
├── routes/
│   ├── tasks.js         # Rotas de tarefas
│   └── users.js         # Rotas de usuários
├── views/
│   ├── tasks/           # Views de tarefas
│   │   ├── index.ejs    # Lista de tarefas
│   │   └── new.ejs      # Formulário nova tarefa
│   ├── users/           # Views de usuários
│   │   ├── usuarios.ejs # Lista de usuários
│   │   └── new.ejs      # Formulário novo usuário
│   └── editar.ejs       # Formulário de edição universal
├── public/
│   ├── css/
│   │   └── style.css    # Estilos customizados
│   └── js/
│       └── app.js       # JavaScript frontend
├── scripts/
│   └── init.sql         # Script de inicialização do BD
└── documentos/
    └── wad.md           # Documentação completa
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd mvc-boilerplate
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```bash
# Crie um banco PostgreSQL
createdb task_manager

# Execute o script de inicialização
psql -d task_manager -f scripts/init.sql
```

### 4. Configure as variáveis de ambiente
```bash
# Crie um arquivo .env (opcional)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
PORT=3000
```

### 5. Execute a aplicação
```bash
npm start
```

### 6. Acesse no navegador
```
http://localhost:3000
```

## 📊 Banco de Dados

### Modelo Relacional
O sistema utiliza duas tabelas principais:

**users** (Usuários)
- `id` (UUID) - Identificador único
- `name` (VARCHAR) - Nome completo
- `email` (VARCHAR) - Email único

**tasks** (Tarefas)
- `id` (SERIAL) - Identificador único
- `title` (TEXT) - Título da tarefa
- `description` (TEXT) - Descrição detalhada
- `completed` (BOOLEAN) - Status de conclusão
- `due_date` (DATE) - Data de vencimento
- `user_id` (UUID) - Referência ao usuário responsável

### Relacionamentos
- Um usuário pode ter múltiplas tarefas (1:N)
- Uma tarefa pode ter um usuário responsável (opcional)
- Integridade referencial: ON DELETE SET NULL

## 🌐 Endpoints da API

### Tarefas
- `GET /tasks` - Lista de tarefas (página)
- `GET /tasks/new` - Formulário nova tarefa
- `GET /tasks/edit/:id` - Formulário editar tarefa
- `POST /tasks` - Criar tarefa
- `POST /tasks/edit/:id` - Atualizar tarefa
- `POST /tasks/toggle/:id` - Alternar status
- `POST /tasks/delete/:id` - Excluir tarefa
- `GET /api/tasks/api` - Listar tarefas (JSON)

### Usuários
- `GET /users` - Lista de usuários (página)
- `GET /users/new` - Formulário novo usuário
- `GET /users/edit/:id` - Formulário editar usuário
- `POST /users` - Criar usuário
- `POST /users/edit/:id` - Atualizar usuário
- `POST /users/delete/:id` - Excluir usuário
- `GET /api/users/api` - Listar usuários (JSON)

## 🎨 Características da Interface

### Design Responsivo
- **Desktop**: Layout completo com navegação lateral
- **Tablet**: Adaptação de grid e espaçamentos
- **Mobile**: Layout vertical otimizado para touch

### Componentes Interativos
- **Notificações**: Mensagens automáticas com auto-remoção
- **Confirmações**: Popups inteligentes para ações destrutivas
- **Loading States**: Feedback visual durante operações
- **Validações**: Feedback em tempo real nos formulários

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia o servidor
npm run dev        # Modo desenvolvimento (com nodemon)
npm test           # Executa testes (se configurados)
```

## 📄 Documentação

Para documentação completa do projeto, consulte:
- **Documentação Técnica**: `documentos/wad.md`
- **Script do Banco**: `scripts/init.sql`
- **Estrutura MVC**: Organização em `models/`, `views/`, `controllers/`

## 👨‍💻 Autor

**Christian Vinícius Gandra dos Santos**
- Projeto Individual - Módulo 2 - Inteli

---

⭐ **Sistema completo de gerenciamento de tarefas com arquitetura MVC robusta!**
