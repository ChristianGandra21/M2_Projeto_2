# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto:

Sistema Gerenciador de Tarefas MVC

#### Autor do projeto:

Christian Vinícius Gandra dos Santos

## Sumário

1. [Introdução](#c1)
2. [Visão Geral da Aplicação Web](#c2)
3. [Projeto Técnico da Aplicação Web](#c3)
4. [Desenvolvimento da Aplicação Web](#c4)
5. [Referências](#c5)

<br>

## <a name="c1"></a>1. Introdução

O Sistema Gerenciador de Tarefas MVC é uma aplicação web completa desenvolvida para auxiliar usuários no controle e organização de suas atividades diárias. O sistema implementa um CRUD (Create, Read, Update, Delete) completo tanto para tarefas quanto para usuários, seguindo rigorosamente o padrão arquitetural MVC (Model-View-Controller).

### 1.1 Objetivos do Sistema

O sistema tem como objetivo principal proporcionar uma interface simples e intuitiva onde usuários podem:

- **Gerenciar Tarefas**: Criar, visualizar, editar, marcar como concluídas e excluir tarefas
- **Gerenciar Usuários**: Cadastrar, visualizar, editar e excluir usuários do sistema
- **Associar Responsáveis**: Vincular tarefas a usuários específicos para melhor organização
- **Acompanhar Progresso**: Visualizar o status das tarefas e seu progresso

### 1.2 Características Técnicas

O projeto foi desenvolvido com foco em:

- **Arquitetura MVC**: Separação clara entre Model, View e Controller
- **Tecnologias Modernas**: Node.js, Express, EJS, PostgreSQL
- **Interface Responsiva**: CSS customizado com design limpo e intuitivo
- **Validações Robustas**: Tanto no frontend quanto no backend
- **APIs RESTful**: Endpoints para integração e comunicação via fetch()
- **Segurança**: Validações de integridade referencial e tratamento de erros

### 1.3 Funcionalidades Implementadas

**Gestão de Tarefas:**

- ✅ Criar nova tarefa com título, descrição, data de vencimento e responsável
- ✅ Listar todas as tarefas com informações do responsável
- ✅ Editar tarefas existentes
- ✅ Marcar/desmarcar tarefas como concluídas
- ✅ Excluir tarefas com confirmação

**Gestão de Usuários:**

- ✅ Cadastrar novos usuários com nome e email
- ✅ Listar todos os usuários cadastrados
- ✅ Editar informações de usuários
- ✅ Excluir usuários (com verificação de dependências)
- ✅ Validação de email único

**Interface e Experiência:**

- ✅ Design responsivo e intuitivo
- ✅ Notificações de sucesso/erro
- ✅ Confirmações para ações destrutivas
- ✅ Loading states durante operações
- ✅ Navegação fluida entre páginas

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

_(não se aplica)_

### 2.2. User Stories (Semana 01)

_(não se aplica)_

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

#### Modelo Relacional Implementado:

O sistema utiliza um modelo relacional simplificado e eficiente, composto por duas entidades principais que atendem perfeitamente aos requisitos do projeto:

<div align="center">
<sub>Figura 1 - Diagrama relacional do banco de dados implementado</sub>
<img height="100%" width="100%" src="modelo_relacional.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Entidades Implementadas:**

**users:** Armazena informações dos usuários do sistema

- `id` (UUID): Identificador único gerado automaticamente
- `name` (VARCHAR(100)): Nome completo do usuário
- `email` (VARCHAR(100)): Email único para identificação

**tasks:** Representa as tarefas do sistema

- `id` (SERIAL): Identificador único auto-incrementado
- `title` (TEXT): Título da tarefa (obrigatório)
- `description` (TEXT): Descrição detalhada (opcional)
- `completed` (BOOLEAN): Status de conclusão (padrão: false)
- `due_date` (DATE): Data de vencimento (opcional)
- `user_id` (UUID): Referência ao usuário responsável (opcional)

**Relacionamentos:**

- Um usuário pode ter múltiplas tarefas (1:N entre users e tasks)
- Uma tarefa pode ter um usuário responsável ou ser independente
- Integridade referencial: ON DELETE SET NULL para manter tarefas mesmo se usuário for excluído

#### Modelo Físico (Schema SQL Atual):

O modelo físico implementado está no arquivo `scripts/init.sql`:

```sql
-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  due_date DATE,
  user_id UUID,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

**Características do Modelo:**

- ✅ **Simplicidade**: Duas tabelas essenciais que atendem todos os requisitos
- ✅ **Flexibilidade**: Tarefas podem existir com ou sem usuário responsável
- ✅ **Integridade**: Chaves estrangeiras com comportamento adequado
- ✅ **Escalabilidade**: Estrutura permite futuras expansões
- ✅ **Performance**: Índices automáticos em chaves primárias e únicas

### 3.1.1 BD e Models (Semana 5)

O sistema web desenvolvido utiliza o PostgreSQL como banco de dados relacional, estruturado em duas tabelas principais: users e tasks. Essas tabelas são responsáveis por armazenar os dados dos usuários e das tarefas do sistema, respectivamente. A estrutura foi criada manualmente utilizando comandos SQL, sem o uso de ORMs, garantindo controle direto sobre o esquema do banco.

A tabela users armazena informações dos usuários responsáveis pelas tarefas. Cada usuário possui um identificador único gerado automaticamente (id do tipo UUID), além de campos obrigatórios como name (nome completo) e email (endereço de e-mail único). Essa tabela serve como referência para associar um responsável a cada tarefa cadastrada.

A tabela tasks, por sua vez, é responsável por armazenar as tarefas do sistema. Cada tarefa possui um identificador (id do tipo serial), um title (título da tarefa), uma description (descrição opcional), um campo booleano completed que indica se a tarefa está concluída, e um campo due_date (do tipo DATE), que representa a data de vencimento da tarefa. Além disso, existe o campo user_id, que é uma chave estrangeira opcional referenciando a tabela users. Caso o campo user_id não seja preenchido, a tarefa será considerada sem um responsável atribuído.

No código, essas interações com o banco são feitas por meio de arquivos de Model, localizados na pasta models/. Esses arquivos implementam funções assíncronas que executam comandos SQL utilizando o pacote pg. Entre os principais métodos definidos no taskModel.js, estão:

**create(data)**: Insere uma nova tarefa no banco, com ou sem usuário responsável.

**findAll()**: Retorna todas as tarefas cadastradas, incluindo o nome do usuário associado (quando houver).

**findByUser(user_id)**: Filtra as tarefas de um determinado usuário.

**update(id, data)**: Atualiza os dados de uma tarefa existente, incluindo status de conclusão e data de vencimento.

**delete(id)**: Exclui uma tarefa com base no seu ID.

A camada de Models, portanto, representa a base de dados da aplicação, sendo responsável por realizar as operações de leitura, escrita e atualização de forma segura e controlada. Essa arquitetura garante uma separação clara entre a lógica de acesso aos dados e as demais camadas da aplicação, facilitando a manutenção e a escalabilidade do sistema.

### 3.2. Arquitetura (Semana 5)

O diagrama abaixo representa a arquitetura MVC (Model-View-Controller) do sistema de gerenciamento de tarefas.

<div align="center">
<sub>Figura 2 - Diagrama da arquitetura MVC</sub>
<img height="100%" width="100%" src="../assets/arquitetura_mvc.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>
A camada Model define a estrutura dos dados e interage com o banco de dados PostgreSQL, incluindo as tabelas users (com campos como id, name e email) e tasks (com id, title, description, due_date e user_id). A camada Controller centraliza a lógica de negócio por meio dos arquivos taskController.js e userController.js, que recebem as requisições da interface, processam os dados e interagem com o Model. A camada View representa a interface do usuário, exibindo formulários e listas de tarefas, permitindo ações como criar ou editar. O fluxo ocorre da View para o Controller, que consulta ou atualiza o Model, retornando os dados para a View. Esse padrão organiza a aplicação de forma modular e facilita a manutenção.

### 3.3. Wireframes (Semana 03)

_(não se aplica)_

### 3.4. Guia de estilos (Semana 05)

_(não se aplica)_

### 3.5. Protótipo de alta fidelidade (Semana 05)

_(não se aplica)_

### 3.6. WebAPI e endpoints

A aplicação foi estruturada com uma WebAPI completa em Node.js utilizando o framework Express, seguindo os princípios da arquitetura REST. O sistema implementa dois tipos de rotas: **rotas para views** (renderização EJS) e **rotas de API** (retorno JSON), proporcionando flexibilidade total para diferentes tipos de consumo.

#### 3.6.1 Estrutura de Rotas

**Rotas para Views (Renderização EJS):**

- Utilizadas para navegação web tradicional
- Retornam páginas HTML renderizadas com EJS
- Processam formulários via POST

**Rotas de API (JSON):**

- Utilizadas para comunicação via fetch() JavaScript
- Retornam dados em formato JSON
- Seguem padrões RESTful

#### 3.6.2 Endpoints de Tarefas

**Views (Páginas Web):**

- `GET /tasks` → Lista de tarefas (página principal)
- `GET /tasks/new` → Formulário para nova tarefa
- `GET /tasks/edit/:id` → Formulário para editar tarefa
- `POST /tasks` → Criar nova tarefa
- `POST /tasks/edit/:id` → Atualizar tarefa
- `POST /tasks/toggle/:id` → Alternar status (concluída/pendente)
- `POST /tasks/delete/:id` → Excluir tarefa

**API (JSON):**

- `GET /api/tasks/api` → Listar todas as tarefas (JSON)
- `GET /api/tasks/api/:id` → Buscar tarefa por ID (JSON)
- `POST /api/tasks/api` → Criar nova tarefa (JSON)
- `PUT /api/tasks/api/:id` → Atualizar tarefa (JSON)
- `DELETE /api/tasks/api/:id` → Excluir tarefa (JSON)

#### 3.6.3 Endpoints de Usuários

**Views (Páginas Web):**

- `GET /users` → Lista de usuários
- `GET /users/new` → Formulário para novo usuário
- `GET /users/edit/:id` → Formulário para editar usuário
- `POST /users` → Criar novo usuário
- `POST /users/edit/:id` → Atualizar usuário
- `POST /users/delete/:id` → Excluir usuário

**API (JSON):**

- `GET /api/users/api` → Listar todos os usuários (JSON)
- `GET /api/users/api/:id` → Buscar usuário por ID (JSON)
- `POST /api/users/api` → Criar novo usuário (JSON)
- `PUT /api/users/api/:id` → Atualizar usuário (JSON)
- `DELETE /api/users/api/:id` → Excluir usuário (JSON)

#### 3.6.4 Características Técnicas

**Validações Implementadas:**

- ✅ Verificação de campos obrigatórios
- ✅ Validação de email único
- ✅ Verificação de integridade referencial
- ✅ Sanitização de dados de entrada

**Tratamento de Erros:**

- ✅ Códigos HTTP apropriados (200, 201, 400, 404, 500)
- ✅ Mensagens de erro descritivas
- ✅ Logs detalhados para debugging

**Segurança:**

- ✅ Validação de parâmetros
- ✅ Prevenção de SQL injection via prepared statements
- ✅ Verificação de dependências antes de exclusões

### 3.7 Interface e Navegação

O sistema foi desenvolvido com uma interface web moderna e responsiva, utilizando EJS como template engine, CSS customizado e JavaScript para interatividade. A navegação segue padrões intuitivos e oferece feedback visual completo para todas as operações.

#### 3.7.1 Tecnologias Frontend

**Template Engine:**

- ✅ **EJS (Embedded JavaScript)** → Renderização dinâmica de páginas
- ✅ **Partials e Layouts** → Reutilização de componentes
- ✅ **Dados dinâmicos** → Integração com backend via controllers

**Estilização:**

- ✅ **CSS Customizado** → Arquivo `/public/css/style.css` completo
- ✅ **Design Responsivo** → Adaptação para diferentes dispositivos
- ✅ **Sistema de cores** → Paleta consistente e acessível
- ✅ **Componentes reutilizáveis** → Botões, cards, formulários padronizados

**Interatividade:**

- ✅ **JavaScript Vanilla** → Sem dependências externas
- ✅ **Fetch API** → Comunicação assíncrona com backend
- ✅ **Validações em tempo real** → Feedback imediato ao usuário
- ✅ **Confirmações inteligentes** → Prevenção de ações acidentais

#### 3.7.2 Páginas Implementadas

<div align="center">
<sub>Figura 3 - Página inicial do sistema</sub>
<img height="100%" width="100%" src="../assets/pagina_inicial.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Página Principal (`/tasks`):**

- Lista completa de tarefas com informações do responsável
- Botões para criar, editar, marcar como concluída e excluir
- Seção de usuários com ações de gerenciamento
- Notificações de sucesso/erro
- Design em cards responsivos

<div align="center">
<sub>Figura 4 - Página de criação de nova tarefa</sub>
<img height="100%" width="100%" src="../assets/nova_tarefa.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Formulário de Nova Tarefa (`/tasks/new`):**

- Campos: título, descrição, data de vencimento, responsável
- Validações em tempo real
- Dropdown com usuários cadastrados
- Botões de salvar e cancelar

<div align="center">
<sub>Figura 5 - Página de edição de tarefa</sub>
<img height="100%" width="100%" src="../assets/editar_tarefa.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Formulário de Edição (`/tasks/edit/:id` e `/users/edit/:id`):**

- Campos pré-preenchidos com dados atuais
- Validações específicas para cada tipo
- Informações contextuais sobre o item sendo editado
- Navegação clara de volta para lista

<div align="center">
<sub>Figura 6 - Página de exibição de usuários cadastrados</sub>
<img height="100%" width="100%" src="../assets/usuarios.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Lista de Usuários (`/users`):**

- Cards com informações de cada usuário
- Ações de editar e excluir
- Notificações de operações realizadas

<div align="center">
<sub>Figura 7 - Página de criação de novo usuário</sub>
<img height="100%" width="100%" src="../assets/criar_usuario.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Formulário de Novo Usuário (`/users/new`):**

- Campos: nome e email
- Validação de email único
- Feedback visual para campos obrigatórios

#### 3.7.3 Componentes de Interface

**Sistema de Notificações por pop-up:**

- ✅ **Mensagens automáticas** → Aparecem após operações
- ✅ **Auto-remoção** → Desaparecem após 5 segundos
- ✅ **Botão de fechar** → Controle manual pelo usuário
- ✅ **Cores contextuais** → Verde (sucesso), vermelho (erro), amarelo (aviso)

**Confirmações de Ações:**

- ✅ **Exclusão de tarefas** → Popup com nome da tarefa
- ✅ **Exclusão de usuários** → Verificação de dependências
- ✅ **Loading states** → Botões mostram "Processando..." durante operações

**Formulários Inteligentes:**

- ✅ **Validação em tempo real** → Feedback imediato
- ✅ **Campos obrigatórios** → Destaque visual
- ✅ **Contadores de caracteres** → Para campos com limite
- ✅ **Formatação automática** → Datas e emails

#### 3.7.4 Navegação e Fluxo

**Fluxo Principal:**

```
Página Inicial → Lista de Tarefas e Usuários
     ↓
Criar/Editar → Formulários específicos
     ↓
Confirmação → Notificação de sucesso
     ↓
Retorno → Lista atualizada
```

**Navegação Intuitiva:**

- ✅ **Breadcrumbs visuais** → Usuário sempre sabe onde está
- ✅ **Botões contextuais** → Ações relevantes sempre visíveis
- ✅ **Links de retorno** → Fácil navegação entre páginas
- ✅ **Estados visuais** → Hover, active, disabled bem definidos

#### 3.7.5 Responsividade

**Breakpoints Implementados:**

- ✅ **Desktop** → Layout completo com sidebar
- ✅ **Tablet** → Adaptação de grid e espaçamentos
- ✅ **Mobile** → Layout vertical, botões maiores

**Adaptações Mobile:**

- ✅ **Menu responsivo** → Navegação otimizada para touch
- ✅ **Formulários adaptados** → Campos maiores, melhor usabilidade
- ✅ **Cards empilhados** → Layout vertical em telas pequenas

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web

### 4.1 Sistema Implementado

O Sistema Gerenciador de Tarefas MVC foi desenvolvido como uma aplicação web completa, implementando todas as funcionalidades planejadas e seguindo rigorosamente o padrão arquitetural MVC. O sistema oferece uma solução robusta para gerenciamento de tarefas e usuários.

#### 4.1.1 Funcionalidades Entregues

**Gestão Completa de Tarefas:**

- ✅ **CRUD Completo** → Criar, listar, editar e excluir tarefas
- ✅ **Status de Conclusão** → Marcar/desmarcar como concluída
- ✅ **Associação de Responsáveis** → Vincular tarefas a usuários
- ✅ **Datas de Vencimento** → Controle temporal das atividades
- ✅ **Validações Robustas** → Campos obrigatórios e limites de caracteres

**Gestão Completa de Usuários:**

- ✅ **CRUD Completo** → Criar, listar, editar e excluir usuários
- ✅ **Email Único** → Validação de unicidade
- ✅ **Integridade Referencial** → Proteção contra exclusões inválidas
- ✅ **Validações de Formulário** → Nome e email obrigatórios

**Interface e Experiência:**

- ✅ **Design Responsivo** → Funciona em desktop, tablet e mobile
- ✅ **Notificações Inteligentes** → Feedback visual para todas as operações
- ✅ **Confirmações de Segurança** → Prevenção de ações acidentais
- ✅ **Loading States** → Feedback durante processamento

#### 4.1.2 Tecnologias Utilizadas

**Backend:**

- ✅ **Node.js** → Runtime JavaScript
- ✅ **Express.js** → Framework web
- ✅ **PostgreSQL** → Banco de dados relacional
- ✅ **pg** → Driver PostgreSQL para Node.js

**Frontend:**

- ✅ **EJS** → Template engine
- ✅ **CSS Customizado** → Estilização responsiva
- ✅ **JavaScript Vanilla** → Interatividade sem dependências
- ✅ **Fetch API** → Comunicação assíncrona

**Arquitetura:**

- ✅ **MVC Pattern** → Separação clara de responsabilidades
- ✅ **RESTful APIs** → Endpoints padronizados
- ✅ **SQL Nativo** → Controle direto sobre queries

#### 4.1.3 Estrutura do Projeto

```
mvc-boilerplate/
├── app.js                 # Servidor principal
├── config/
│   └── db.js             # Configuração do banco
├── controllers/
│   ├── taskController.js # Lógica de tarefas
│   └── userController.js # Lógica de usuários
├── models/
│   ├── task.js          # Modelo de tarefas
│   └── user.js          # Modelo de usuários
├── routes/
│   ├── tasks.js         # Rotas de tarefas
│   └── users.js         # Rotas de usuários
├── views/
│   ├── tasks/           # Views de tarefas
│   ├── users/           # Views de usuários
│   └── editar.ejs       # Formulário de edição
├── public/
│   ├── css/style.css    # Estilos customizados
│   └── js/app.js        # JavaScript frontend
└── scripts/
    └── init.sql         # Script de inicialização do BD
```

### 4.2 Conclusões e Trabalhos Futuros

O Sistema Gerenciador de Tarefas MVC atingiu plenamente seus objetivos, demonstrando a capacidade de construir uma aplicação web robusta e funcional baseada no padrão arquitetural MVC. O projeto consolidou conhecimentos fundamentais em desenvolvimento web full-stack e proporcionou experiência prática valiosa na implementação de sistemas CRUD completos.

#### 4.2.1 Principais Decisões Técnicas

**Escolha da Arquitetura MVC:** A decisão de implementar rigorosamente o padrão MVC mostrou-se acertada, proporcionando organização clara do código e facilitando a manutenção. A separação entre Models (acesso a dados), Views (apresentação) e Controllers (lógica de negócio) permitiu desenvolvimento modular e escalável.

**PostgreSQL com SQL Nativo:** A opção por utilizar SQL nativo ao invés de ORMs ofereceu controle total sobre as queries e melhor compreensão das operações de banco de dados. Esta abordagem, embora mais trabalhosa inicialmente, resultou em queries otimizadas e maior flexibilidade.

**EJS como Template Engine:** A escolha do EJS facilitou a integração com o backend Node.js, permitindo renderização dinâmica de dados sem complexidade desnecessária. A sintaxe familiar do JavaScript acelerou o desenvolvimento das views.

#### 4.2.2 Desafios Superados

O principal desafio enfrentado foi a **integração harmoniosa entre frontend e backend**, especificamente na sincronização entre as ações do usuário na interface e as operações de banco de dados. A complexidade residiu em garantir que cada interação fosse traduzida corretamente em operações CRUD e que as atualizações fossem refletidas dinamicamente na interface.

**Orquestração de Fluxo:** Desenvolver controllers robustos que pudessem receber requisições das views, processar dados através dos models e retornar respostas adequadas, seja via renderização EJS ou JSON para operações assíncronas.

**Validação em Múltiplas Camadas:** Implementar validações tanto no frontend (feedback imediato) quanto no backend (segurança e integridade), garantindo consistência de dados e experiência de usuário fluida.

**Gerenciamento de Estado:** Manter a interface sempre atualizada após operações CRUD, especialmente em interações assíncronas que evitam recarregamento completo da página.

#### 4.2.3 Pontos que Funcionaram Muito Bem

**Arquitetura MVC Bem Estruturada:** A implementação do padrão MVC proporcionou código organizado, manutenível e facilmente extensível. A separação clara de responsabilidades facilitou o desenvolvimento e debugging, demonstrando a eficácia desta arquitetura para aplicações web.

**Interface Intuitiva e Responsiva:** O design desenvolvido apresenta navegação clara e feedback visual adequado. A responsividade funciona naturalmente em diferentes dispositivos, desde desktops até smartphones, mantendo usabilidade consistente em todas as plataformas.

**Validações Robustas:** O sistema de validações em múltiplas camadas provou ser eficaz na prevenção de erros e garantia da integridade dos dados. As mensagens de erro são claras e orientam o usuário adequadamente.

**Performance Otimizada:** As queries SQL são eficientes, o carregamento das páginas é rápido e as operações respondem de forma ágil. O uso de JavaScript vanilla manteve a aplicação leve e performática.

**Funcionalidade CRUD Completa:** Todas as operações de Create, Read, Update e Delete funcionam de forma consistente e confiável para ambas as entidades (tarefas e usuários), com tratamento adequado de casos especiais como integridade referencial.

#### 4.2.4 Pontos que Ainda Gostaria de Melhorar

**Sistema de Autenticação:** Implementar login/logout com sessões de usuário para tornar o sistema multiusuário real, com controle de acesso e personalização por usuário.

**Testes Automatizados:** Desenvolver suíte completa de testes unitários para models, testes de integração para controllers e testes end-to-end para a interface, garantindo qualidade e facilitando manutenção futura.

**Funcionalidades Avançadas:** Adicionar filtros de busca, categorização de tarefas, notificações de vencimento e dashboard com estatísticas de produtividade.

**Otimizações de Performance:** Implementar cache para queries frequentes, paginação para listas grandes e lazy loading para melhorar a experiência em datasets maiores.

**Melhorias de UX:** Desenvolver drag-and-drop para reordenação de tarefas, modo escuro, atalhos de teclado e melhor feedback visual para ações em andamento.

#### 4.2.5 Aprendizados Fundamentais

**Técnicos:** O projeto consolidou conhecimentos em Node.js/Express, PostgreSQL, arquitetura MVC e desenvolvimento frontend moderno. A experiência com SQL nativo aprofundou a compreensão de banco de dados relacionais e otimização de queries.

**Metodológicos:** A abordagem iterativa de desenvolvimento, com testes contínuos de funcionalidades, mostrou-se fundamental para identificar e corrigir problemas precocemente. A documentação contínua facilitou o desenvolvimento e será valiosa para manutenção futura.

**Arquiteturais:** A implementação prática do padrão MVC demonstrou seus benefícios reais em termos de organização, manutenibilidade e escalabilidade, validando sua eficácia para aplicações web de médio porte.

#### 4.2.6 Trabalhos Futuros

**Curto Prazo:** Implementação de autenticação de usuários, adição de filtros de busca e desenvolvimento de testes automatizados básicos.

**Médio Prazo:** Dashboard com analytics, sistema de notificações, API mobile e melhorias de performance com cache.

**Longo Prazo:** Migração para arquitetura de microserviços, integração com calendários externos e implementação de colaboração em tempo real.

 ---

 O presente Web Application Document (WAD) detalhou exaustivamente o Sistema Gerenciador de Tarefas MVC, um projeto que não apenas atingiu seus objetivos funcionais de fornecer um robusto controle de tarefas e usuários com operações CRUD completas, mas também validou a eficácia do padrão arquitetural MVC em um ambiente de desenvolvimento real.
 
 ---