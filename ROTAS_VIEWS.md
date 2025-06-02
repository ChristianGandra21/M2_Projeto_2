# 📋 Sistema de Views EJS - Documentação das Rotas

## **🎯 Objetivo**
Este sistema implementa páginas visuais usando EJS (Embedded JavaScript) organizadas na pasta `views/` e conectadas a rotas do servidor Express, seguindo o padrão MVC.

## **🏗️ Arquitetura Implementada**

### **Como Funciona:**
1. **Controller** busca os dados do banco usando o **Modelo**
2. **Rota** (routes/*.js) chama o **Controller**
3. **View** é renderizada com os dados do controller (com `res.render()` no caso do EJS)

```javascript
// Exemplo: rota com EJS
app.get('/tarefas', async (req, res) => {
  const tarefas = await Tarefa.findAll(); // Dados vêm do banco via modelo
  res.render('tarefas.ejs', { tarefas });  // View renderizada com dados
});
```

---

## **📁 Estrutura de Arquivos**

```
views/
├── tasks/
│   ├── interativo.ejs    # Página principal - Lista de tarefas
│   ├── new.ejs          # Formulário para nova tarefa
│   └── edit.ejs         # Formulário para editar tarefa
├── users/
│   ├── index.ejs        # Página principal - Lista de usuários
│   └── new.ejs          # Formulário para novo usuário
└── css/
    └── style.css        # Estilos específicos para views
```

---

## **🚀 Rotas Implementadas**

### **📋 TAREFAS**

#### **Views (Renderização de páginas EJS):**
- `GET /tasks` → **Lista de tarefas** (dados vêm do banco)
- `GET /tasks/new` → **Formulário para nova tarefa**
- `GET /tasks/edit/:id` → **Formulário para editar tarefa**

#### **Actions (Processamento de formulários):**
- `POST /tasks` → **Criar nova tarefa** (redireciona para lista)
- `POST /tasks/edit/:id` → **Atualizar tarefa** (redireciona para lista)
- `POST /tasks/toggle/:id` → **Alternar status** (concluída/pendente)
- `POST /tasks/delete/:id` → **Excluir tarefa** (redireciona para lista)

### **👤 USUÁRIOS**

#### **Views (Renderização de páginas EJS):**
- `GET /users` → **Lista de usuários** (dados vêm do banco)
- `GET /users/new` → **Formulário para novo usuário**
- `GET /users/edit/:id` → **Formulário para editar usuário**

#### **Actions (Processamento de formulários):**
- `POST /users` → **Criar novo usuário** (redireciona para lista)
- `POST /users/edit/:id` → **Atualizar usuário** (redireciona para lista)
- `POST /users/delete/:id` → **Excluir usuário** (redireciona para lista)

---

## **💾 Fluxo de Dados**

### **1. Página Principal (Lista):**
```javascript
// Controller busca dados do banco
exports.index = async (req, res) => {
  const tasks = await Task.findAll(); // Dados do banco via modelo
  const users = await User.findAll(); // Usuários para dropdown
  res.render('tasks/interativo', {    // Renderiza view com dados
    tasks,
    users,
    title: 'Lista de Tarefas'
  });
};
```

### **2. Formulário (Criação/Edição):**
```javascript
// Controller renderiza formulário
exports.new = async (req, res) => {
  const users = await User.findAll(); // Usuários para dropdown
  res.render('tasks/new', {
    users,
    title: 'Nova Tarefa'
  });
};

// Controller processa formulário
exports.create = async (req, res) => {
  const { title, description, due_date, user_id } = req.body;
  await Task.create({ title, description, due_date, user_id });
  res.redirect('/tasks'); // Redireciona após criar
};
```

---

## **🎨 Funcionalidades das Views**

### **📋 Lista de Tarefas (`/tasks`):**
- ✅ **Exibe tarefas em cards visuais**
- ✅ **Dados vêm diretamente do banco de dados**
- ✅ **Status visual** (Concluída/Pendente/Atrasada)
- ✅ **Informações do responsável**
- ✅ **Data de vencimento formatada**
- ✅ **Ações**: Editar, Concluir/Reabrir, Excluir
- ✅ **Estatísticas**: Total, Concluídas, Pendentes
- ✅ **Navegação** para outras páginas

### **➕ Nova Tarefa (`/tasks/new`):**
- ✅ **Formulário completo** para criação
- ✅ **Dropdown de usuários** (dados do banco)
- ✅ **Campos**: Título, Descrição, Responsável, Data
- ✅ **Validação** de campos obrigatórios
- ✅ **Dicas** para preenchimento
- ✅ **Navegação** de volta para lista

### **✏️ Editar Tarefa (`/tasks/edit/:id`):**
- ✅ **Formulário pré-preenchido** com dados atuais
- ✅ **Informações da tarefa** (ID, status, data criação)
- ✅ **Checkbox** para marcar como concluída
- ✅ **Ações rápidas**: Concluir/Reabrir, Excluir
- ✅ **Validação** de dados

### **👥 Lista de Usuários (`/users`):**
- ✅ **Cards visuais** para cada usuário
- ✅ **Avatar** com inicial do nome
- ✅ **Informações**: Nome, Email, ID, Data cadastro
- ✅ **Ações**: Editar, Ver Tarefas, Excluir
- ✅ **Estatísticas** de usuários
- ✅ **Layout responsivo**

### **👤 Novo Usuário (`/users/new`):**
- ✅ **Formulário simples** e intuitivo
- ✅ **Campos**: Nome completo, Email
- ✅ **Validação** de email
- ✅ **Informações** sobre preenchimento

---

## **🎨 Design e UX**

### **Características Visuais:**
- ✅ **Design moderno** com gradientes e sombras
- ✅ **Cards com hover effects**
- ✅ **Cores semânticas** (verde=sucesso, vermelho=perigo)
- ✅ **Tipografia clara** e hierárquica
- ✅ **Ícones** para melhor identificação
- ✅ **Layout responsivo** para mobile

### **Navegação:**
- ✅ **Menu de navegação** em todas as páginas
- ✅ **Breadcrumbs** visuais
- ✅ **Botões de ação** bem posicionados
- ✅ **Links contextuais** entre páginas

---

## **🔧 Tecnologias Utilizadas**

- **EJS** - Template engine para renderização
- **Express** - Framework web para rotas
- **CSS3** - Estilos modernos com flexbox/grid
- **JavaScript** - Interatividade no frontend
- **Node.js** - Backend com controllers MVC

---

## **✅ Conformidade com Requisitos**

### **✅ Página principal:**
- Lista de tarefas com dados do banco ✅
- Design visual atrativo ✅
- Navegação intuitiva ✅

### **✅ Página de formulário:**
- Formulários para cadastrar/editar ✅
- Validação de dados ✅
- Redirecionamento após ações ✅

### **✅ Dados do banco:**
- Todos os dados vêm do banco via backend ✅
- Controllers buscam dados usando modelos ✅
- Views renderizadas com res.render() ✅

### **✅ Organização:**
- Views organizadas na pasta views/ ✅
- Rotas conectadas aos controllers ✅
- Separação clara de responsabilidades ✅

---

## **🚀 Como Testar**

1. **Iniciar servidor**: `npm start`
2. **Acessar páginas**:
   - Lista de tarefas: http://localhost:3000/tasks
   - Nova tarefa: http://localhost:3000/tasks/new
   - Lista de usuários: http://localhost:3000/users
   - Novo usuário: http://localhost:3000/users/new

3. **Testar funcionalidades**:
   - Criar tarefas e usuários
   - Editar informações
   - Marcar tarefas como concluídas
   - Navegar entre páginas

**🎯 Sistema completo implementado seguindo exatamente os requisitos solicitados!**
