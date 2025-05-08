# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto:
Sistema Gerenciador de Tasks

#### Autor do projeto:
Christian Vinícius Gandra dos Santos

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)
O sistema desenvolvido será um Gerenciador de Tarefas web, que tem como objetivo auxiliar usuários no controle e organização de suas atividades diárias. Com uma interface simples e intuitiva, o sistema permitirá que usuários possam cadastrar, visualizar, atualizar e excluir tarefas de forma eficiente.

Cada tarefa possuirá atributos como título, descrição, status (pendente, em andamento, concluída) e data de vencimento. A proposta é proporcionar um ambiente onde o usuário possa acompanhar o progresso de suas atividades, priorizar demandas e manter uma rotina mais produtiva.

O sistema será implementado utilizando a arquitetura MVC (Model-View-Controller), com Node.js no backend, JavaScript e HTML/CSS no frontend, e banco de dados relacional para armazenar as informações. As tecnologias escolhidas visam garantir organização do código, manutenibilidade e escalabilidade da aplicação.

Além das funcionalidades básicas de CRUD (Create, Read, Update, Delete), o projeto será estruturado de forma modular, com foco em boas práticas de desenvolvimento e testes automatizados. O sistema também contará com documentação de apoio, scripts para inicialização do banco de dados e testes de requisições HTTP para facilitar o uso e entendimento.

Com isso, o Gerenciador de Tarefas propõe-se não apenas como uma ferramenta funcional para organização pessoal, mas também como um exercício completo de desenvolvimento web, integrando conceitos teóricos à prática. O projeto será uma base sólida para evoluções futuras, permitindo a adição de novas funcionalidades conforme o amadurecimento técnico do time de desenvolvimento.
---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

*Não se aplica ao projeto.*

### 2.2. User Stories (Semana 01)

*Não se aplica ao projeto.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

#### Modelo Relacional:

A seguir está representado o diagrama relacional do banco de dados desenvolvido para o sistema de Gerenciador de Tarefas:

<div align="center">
<sub>Figura 1 - Diagrama relacional do banco de dados</sub>
<img height="100%" width="100%" src="modelo_relacional.png"> </img>
<sup>Fonte: Material produzido pelos autores (2025)</sup>
</div>

**Esse modelo contempla três entidades principais:**

**users:** armazena informações dos usuários, como nome, e-mail e senha.

**tasks:** representa as tarefas criadas pelos usuários, incluindo título, descrição, status, data de vencimento, e referência ao usuário e categoria.

**categories:** organiza as tarefas em categorias definidas pelo próprio usuário.

As principais relações entre essas entidades são:

Um usuário pode criar múltiplas tarefas (1:N entre users e tasks).

Cada tarefa pode pertencer a uma categoria (N:1 entre tasks e categories).

Uma categoria é associada a um usuário específico (1:N entre users e categories).

#### Modelo Físico (Schema SQL):
O modelo físico do banco de dados está implementado no arquivo modelo.sql, que contém os comandos de criação das tabelas com suas chaves primárias e estrangeiras, tipos de dados, restrições e estrutura geral do banco. Contudo, abaixo está representado o código de criação das tabelas do banco de dados

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'done') DEFAULT 'pending',
    due_date DATE,
    user_id INT,
    category_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```
Essa estrutura proporciona uma base sólida e bem normalizada para o funcionamento do sistema, assegurando a integridade dos dados e a escalabilidade do banco. Com as relações bem definidas entre usuários, tarefas e categorias, o modelo permite consultas eficientes e facilita futuras manutenções ou expansões no sistema.

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---