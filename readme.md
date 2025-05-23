# Gerenciador de Tarefas

Este é um sistema simples de gerenciamento de tarefas desenvolvido com Node.js utilizando o padrão arquitetural MVC (Model-View-Controller). O objetivo é permitir a criação, leitura, atualização e remoção de tarefas.

## ✅ Funcionalidades

- Cadastrar novas tarefas  
- Listar tarefas existentes  
- Marcar tarefas como concluídas  
- Editar e deletar tarefas  

---

## 📁 Estrutura de Pastas

```plaintext
gerenciador-tarefas/
├── assets/                    # Arquivos públicos como ícones e imagens
│   └── favicon.ico
├── config/                    # Configuração do banco de dados
│   └── db.js
├── controllers/              # Lógica das requisições HTTP
│   ├── taskController.js
│   └── userController.js
├── documentos/               # Documentação do projeto
│   ├── modelo_relacional.png # Diagrama relacional do banco
│   ├── modelo.sql            # Script SQL para criação do banco
│   └── wad.md                # Documento WAD com introdução e diagrama
├── models/                   # Modelos que representam as tabelas
│   ├── task.js
│   └── user.js
├── node_modules/             # Dependências instaladas
├── routes/                   # Definição das rotas
│   ├── tasks.js
│   └── users.js
├── scripts/                  # Scripts utilitários
│   ├── init.sql
│   └── runSQLScript.js
├── services/                 # Regras de negócio
│   └── userService.js
├── tests/                    # Testes automatizados
│   ├── userController.test.js
│   ├── userModel.test.js
│   ├── userRoutes.test.js
│   └── userService.test.js
├── views/                    # Views para renderização
│   ├── components/           # Componentes reutilizáveis
│   ├── css/                  # Arquivos de estilo
│   ├── layout/               # Layout base
│   └── tasks/                # Páginas da aplicação
|      └── index.ejs
├── .env                      # Variáveis de ambiente
├── .gitattributes            # Configurações de versionamento Git
├── .gitignore                # Ignorar arquivos no Git
├── jest.config.js            # Configuração do Jest
├── package-lock.json         # Lockfile do NPM
├── package.json              # Configurações e dependências do projeto
├── readme.md                 # Documentação do projeto
├── rest.http                 # Teste de requisições HTTP
└── app.js                 # Inicialização do servidor
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

### 2. Instale as dependências:

```bash
npm install express dotenv pg 
```

### 3. Configure o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=gerenciador_tarefas
DB_PORT=porta_databasa
```

### 4. Configure o banco de dados:

Execute o script SQL localizado em `documentos/modelo.sql` no seu PostgreSQL (via Supabase, por exemplo).

### 5. Inicie o servidor:

```bash
npm run init-db
npm start
```

Acesse: [http://localhost:3000/tasks](http://localhost:3000/tasks)

---

## 🧩 Modelo Físico e Relacional do Banco

- O modelo físico está no arquivo: `documentos/modelo.sql`
- O diagrama relacional está em: `documentos/modelo_relacional.png`

---

## 🧠 Arquitetura

O projeto adota a arquitetura MVC, separando responsabilidades em **Model** (acesso a dados), **View** (interface do usuário) e **Controller** (lógica de negócio e rotas). Isso facilita a manutenção e escalabilidade do sistema.

---

## 📄 Licença

Este projeto é de uso acadêmico. Sinta-se à vontade para utilizá-lo como base para estudos.
