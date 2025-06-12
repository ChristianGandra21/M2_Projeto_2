/**
 * CONTROLLER DE TAREFAS - CAMADA DE CONTROLE
 *
 * Este módulo implementa a camada Controller do padrão MVC para a entidade Task.
 * Responsável por processar requisições HTTP, interagir com os models e
 * retornar respostas adequadas (views renderizadas ou dados JSON).
 *
 * Funcionalidades:
 * - Renderização de páginas EJS (views)
 * - Processamento de formulários HTML
 * - APIs RESTful para comunicação via fetch()
 * - Validações de dados de entrada
 * - Tratamento de erros e mensagens de feedback
 */

// Importação dos models necessários
const Task = require("../models/task"); // Model para operações com tarefas
const User = require("../models/user"); // Model para buscar usuários (responsáveis)

// ========== VIEWS (Renderização de páginas EJS) ==========

/**
 * Página principal - Lista de tarefas
 * Renderiza a view principal com todas as tarefas e usuários disponíveis
 */
exports.index = async (req, res) => {
  try {
    // Busca todas as tarefas com informações dos usuários responsáveis
    const tasks = await Task.findAll();
    // Busca todos os usuários para exibir na interface
    const users = await User.findAll();

    // Renderiza a view principal passando os dados
    res.render("tasks/index", {
      tasks, // Lista de tarefas para exibição
      users, // Lista de usuários para gerenciamento
      title: "Lista de Tarefas", // Título da página
    });
  } catch (error) {
    // Log do erro para debugging
    console.error("Erro ao buscar tarefas:", error);
    // Retorna erro 500 com mensagem amigável
    res.status(500).send("Erro ao carregar tarefas");
  }
};

/**
 * Página de formulário para nova tarefa
 * Renderiza o formulário de criação com lista de usuários disponíveis
 */
exports.new = async (req, res) => {
  try {
    // Busca todos os usuários para o dropdown de responsáveis
    const users = await User.findAll();

    // Renderiza o formulário de nova tarefa
    res.render("novaTarefa", {
      users, // Lista de usuários para seleção
      title: "Nova Tarefa", // Título da página
    });
  } catch (error) {
    // Log do erro para debugging
    console.error("Erro ao carregar formulário:", error);
    // Retorna erro 500 com mensagem amigável
    res.status(500).send("Erro ao carregar formulário");
  }
};

/**
 * Página de formulário para editar tarefa
 * Renderiza o formulário de edição com dados da tarefa e lista de usuários
 */
exports.edit = async (req, res) => {
  try {
    // Extrai o ID da tarefa dos parâmetros da URL
    const { id } = req.params;

    // Busca a tarefa específica por ID
    const task = await Task.findById(id);
    // Busca todos os usuários para o dropdown de responsáveis
    const users = await User.findAll();

    // Verifica se a tarefa existe
    if (!task) {
      return res.status(404).send("Tarefa não encontrada");
    }

    // Renderiza o formulário de edição com dados pré-preenchidos
    res.render("editar", {
      task, // Dados da tarefa para pré-preenchimento
      users, // Lista de usuários para seleção
      title: "Editar Tarefa", // Título da página
    });
  } catch (error) {
    // Log do erro para debugging
    console.error("Erro ao carregar tarefa:", error);
    // Retorna erro 500 com mensagem amigável
    res.status(500).send("Erro ao carregar tarefa");
  }
};

// ========== APIs JSON (para comunicação via fetch()) ==========

/**
 * API - Buscar todas as tarefas
 * Retorna lista de tarefas em formato JSON para uso via fetch()
 */
exports.apiIndex = async (req, res) => {
  try {
    // Busca todas as tarefas
    const tasks = await Task.findAll();
    // Retorna dados em formato JSON
    res.json(tasks);
  } catch (err) {
    // Retorna erro em formato JSON
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

// ========== PROCESSAMENTO DE FORMULÁRIOS ==========

/**
 * Criar nova tarefa (POST do formulário HTML)
 * Processa dados do formulário e cria nova tarefa no banco
 */
exports.create = async (req, res) => {
  try {
    // Extrai dados do corpo da requisição (formulário)
    const { title, description, due_date, user_id } = req.body;

    // Validação obrigatória: título não pode estar vazio
    if (!title || title.trim().length === 0) {
      return res.status(400).send("❌ Erro: O título da tarefa é obrigatório!");
    }

    // Cria nova tarefa no banco de dados
    const newTask = await Task.create({
      title: title.trim(), // Remove espaços extras
      description: description ? description.trim() : null, // Opcional, remove espaços
      due_date, // Data de vencimento (opcional)
      user_id, // ID do usuário responsável (opcional)
    });

    // Redireciona para página principal com mensagem de sucesso
    // Passa título da tarefa na URL para exibir notificação
    res.redirect(
      "/tasks?success=task_created&title=" + encodeURIComponent(title.trim())
    );
  } catch (err) {
    // Log do erro para debugging
    console.error("Erro ao criar tarefa:", err);
    // Retorna erro 500 com mensagem amigável
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível criar a tarefa. Tente novamente."
      );
  }
};

// Criar tarefa via fetch API
exports.apiStore = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar tarefa" });
  }
};

// Atualizar tarefa
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, user_id, completed } = req.body;

    // Validações básicas
    if (!title || title.trim().length === 0) {
      return res.status(400).send("❌ Erro: O título da tarefa é obrigatório!");
    }

    if (title.length > 100) {
      return res
        .status(400)
        .send("❌ Erro: O título deve ter no máximo 100 caracteres!");
    }

    if (description && description.length > 500) {
      return res
        .status(400)
        .send("❌ Erro: A descrição deve ter no máximo 500 caracteres!");
    }

    // Verificar se a tarefa existe
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).send("❌ Erro: Tarefa não encontrada!");
    }

    // Atualizar tarefa
    const updatedTask = await Task.update(id, {
      title: title.trim(),
      description: description ? description.trim() : null,
      due_date: due_date || null,
      user_id: user_id || null,
      completed:
        completed === "true" || completed === true || completed === "on",
    });

    // Redirecionar com mensagem de sucesso
    res.redirect(
      "/tasks?success=task_updated&title=" + encodeURIComponent(title.trim())
    );
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível atualizar a tarefa. Tente novamente."
      );
  }
};

// Alternar status da tarefa
exports.toggle = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Tarefa não encontrada");
    }
    await Task.update(id, { completed: !task.completed });
    res.redirect("/tasks");
  } catch (error) {
    console.error("Erro ao alternar status:", error);
    res.status(500).send("Erro ao alternar status");
  }
};

// Deletar tarefa
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a tarefa existe antes de excluir
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).send("❌ Erro: Tarefa não encontrada!");
    }

    // Salvar título para mensagem de sucesso
    const taskTitle = existingTask.title;

    // Excluir tarefa
    const deleted = await Task.delete(id);
    if (!deleted) {
      return res
        .status(500)
        .send("❌ Erro: Não foi possível excluir a tarefa. Tente novamente.");
    }

    // Redirecionar com mensagem de sucesso
    res.redirect(
      "/tasks?success=task_deleted&title=" + encodeURIComponent(taskTitle)
    );
  } catch (err) {
    console.error("Erro ao excluir tarefa:", err);
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível excluir a tarefa. Tente novamente."
      );
  }
};

// API - buscar tarefas por usuário
exports.byUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const tasks = await Task.findByUser(user_id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar por usuário" });
  }
};

// ========== API METHODS ==========

// API - Buscar tarefa por ID
exports.apiShow = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
};

// API - Criar nova tarefa
exports.apiCreate = async (req, res) => {
  try {
    const { title, description, due_date, user_id } = req.body;
    const newTask = await Task.create({
      title,
      description,
      due_date,
      user_id,
    });
    res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: newTask,
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

// API - Atualizar tarefa
exports.apiUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, user_id, completed } = req.body;
    const updatedTask = await Task.update(id, {
      title,
      description,
      due_date,
      user_id,
      completed: completed === true || completed === "true",
    });
    res.json({
      message: "Tarefa atualizada com sucesso!",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

// API - Alternar status
exports.apiToggle = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    const updatedTask = await Task.update(id, {
      ...task,
      completed: !task.completed,
    });

    res.json({
      message: `Tarefa ${
        updatedTask.completed ? "concluída" : "reaberta"
      } com sucesso!`,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Erro ao alternar status:", error);
    res.status(500).json({ error: "Erro ao alternar status" });
  }
};

// API - Excluir tarefa
exports.apiDestroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.json({ message: "Tarefa excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
};
