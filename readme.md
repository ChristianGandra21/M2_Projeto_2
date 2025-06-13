# 📋 Sistema Gerenciador de Tarefas MVC

> **Aplicação web completa para gerenciamento de tarefas e usuários, desenvolvida com arquitetura MVC**

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v12+-blue.svg)](https://www.postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.21+-lightgrey.svg)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-v3.1+-orange.svg)](https://ejs.co/)

## 🎯 Sobre o Projeto

O **Sistema Gerenciador de Tarefas MVC** é uma aplicação web completa desenvolvida para auxiliar no controle e organização de atividades diárias. O sistema implementa um **CRUD completo** tanto para tarefas quanto para usuários, seguindo rigorosamente o padrão arquitetural **MVC (Model-View-Controller)**.

### 🎥 Demonstração

> **[📹 Vídeo de Demonstração](https://drive.google.com/file/d/1RN45kyp57xi6jfSkzMDPs_kiChKvLpHQ/view?usp=sharing)**
>
> _Assista ao vídeo completo mostrando todas as funcionalidades do sistema em ação._

### 📸 Interface do Sistema

_Screenshots serão adicionados aqui mostrando:_

- _Tela principal com lista de tarefas_
- _Formulário de criação de tarefa_
- _Gerenciamento de usuários_
- _Interface responsiva em mobile_

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
├── app.js                 # 🚀 Servidor principal Express
├── package.json           # 📦 Dependências e scripts
├── config/
│   └── db.js             # 🔧 Configuração do PostgreSQL
├── controllers/
│   ├── taskController.js # 🎮 Lógica de negócio - tarefas
│   └── userController.js # 🎮 Lógica de negócio - usuários
├── models/
│   ├── task.js          # 📊 Modelo de dados - tarefas
│   └── user.js          # 📊 Modelo de dados - usuários
├── routes/
│   ├── index.js         # 🛣️ Rota principal
│   ├── tasks.js         # 🛣️ Rotas de tarefas
│   └── users.js         # 🛣️ Rotas de usuários
├── views/
│   ├── tasks/           # 🎨 Views de tarefas
│   │   ├── index.ejs    # 📋 Lista de tarefas
│   │   └── new.ejs      # ➕ Formulário nova tarefa
│   ├── users/           # 🎨 Views de usuários
│   │   ├── usuarios.ejs # 👥 Lista de usuários
│   │   └── new.ejs      # ➕ Formulário novo usuário
│   └── editar.ejs       # ✏️ Formulário de edição universal
├── public/
│   ├── css/
│   │   └── style.css    # 🎨 Estilos customizados
│   └── js/
│       └── app.js       # ⚡ JavaScript frontend
├── scripts/
│   └── init.sql         # 🗄️ Script de inicialização do BD
└── documentos/
    └── wad.md           # 📚 Documentação técnica completa
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior) - [Download aqui](https://nodejs.org/)
- **PostgreSQL** (versão 12 ou superior) - [Download aqui](https://www.postgresql.org/download/)
- **npm** (geralmente vem com Node.js)

### Passo 1: Clone o repositório

```bash
git clone <url-do-repositorio>
cd mvc-boilerplate
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configure o banco de dados

#### 3.1 Crie o banco de dados

```bash
# No terminal do PostgreSQL ou pgAdmin
createdb task_manager
```

#### 3.2 Execute o script de inicialização

```bash
# Opção 1: Via psql
psql -d task_manager -f scripts/init.sql

# Opção 2: Via npm script (se configurado)
npm run init-db
```

### Passo 4: Configure variáveis de ambiente (opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# Porta do servidor
PORT=3000
```

### Passo 5: Execute a aplicação

```bash
# Modo produção
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev
```

### Passo 6: Acesse a aplicação

Abra seu navegador e acesse:

```
http://localhost:3000
```

🎉 **Pronto! O sistema está funcionando!**

## 📊 Banco de Dados

### Modelo Relacional

O sistema utiliza duas tabelas principais:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de tarefas
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  due_date DATE,
  user_id UUID,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### Relacionamentos

- **1:N** → Um usuário pode ter múltiplas tarefas
- **Opcional** → Uma tarefa pode ter um usuário responsável ou ser independente
- **Integridade** → ON DELETE SET NULL mantém tarefas mesmo se usuário for excluído

## 🌐 Endpoints da API

### 📋 Tarefas

- `GET /tasks` → Lista de tarefas (página web)
- `GET /tasks/new` → Formulário nova tarefa
- `GET /tasks/edit/:id` → Formulário editar tarefa
- `POST /tasks` → Criar tarefa
- `POST /tasks/edit/:id` → Atualizar tarefa
- `POST /tasks/toggle/:id` → Alternar status (concluída/pendente)
- `POST /tasks/delete/:id` → Excluir tarefa
- `GET /api/tasks/api` → Listar tarefas (JSON)

### 👥 Usuários

- `GET /users` → Lista de usuários (página web)
- `GET /users/new` → Formulário novo usuário
- `GET /users/edit/:id` → Formulário editar usuário
- `POST /users` → Criar usuário
- `POST /users/edit/:id` → Atualizar usuário
- `POST /users/delete/:id` → Excluir usuário
- `GET /api/users/api` → Listar usuários (JSON)

## 🎨 Características da Interface

### Design Responsivo

- **Desktop**: Layout completo com navegação otimizada
- **Tablet**: Adaptação de grid e espaçamentos
- **Mobile**: Layout vertical otimizado para touch

### Componentes Interativos

- **Notificações**: Mensagens automáticas com auto-remoção
- **Confirmações**: Popups inteligentes para ações destrutivas
- **Loading States**: Feedback visual durante operações
- **Validações**: Feedback em tempo real nos formulários

## 📝 Scripts Disponíveis

```bash
npm start          # Inicia o servidor em modo produção
npm run dev        # Inicia em modo desenvolvimento (nodemon)
npm test           # Executa testes (Jest)
npm run test:coverage  # Executa testes com cobertura
npm run init-db    # Inicializa o banco de dados
```

## 📚 Documentação Adicional

- **[📖 Documentação Técnica Completa](documentos/wad.md)** - WAD com decisões técnicas e aprendizados
- **[🗄️ Script do Banco](scripts/init.sql)** - Estrutura completa do banco de dados
- **[🎮 Controllers](controllers/)** - Lógica de negócio detalhada
- **[📊 Models](models/)** - Modelos de dados e queries

## 👨‍💻 Autor

**Christian Vinícius Gandra dos Santos**

- Projeto Individual - Módulo 2 - Inteli

---


🚀 **Sistema completo de gerenciamento de tarefas com arquitetura MVC robusta!**
