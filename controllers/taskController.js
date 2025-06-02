const Task = require("../models/task");
const User = require("../models/user");

// ========== VIEWS (Renderização de páginas EJS) ==========

// Página principal - Lista de tarefas (dados vêm do banco via modelo)
exports.index = async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Busca dados do banco via modelo
    const users = await User.findAll(); // Busca usuários para dropdown
    res.render("tasks/interativo", {
      // Renderiza view com dados do controller
      tasks,
      users,
      title: "Lista de Tarefas",
    });
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).send("Erro ao carregar tarefas");
  }
};

// Página de formulário para nova tarefa
exports.new = async (req, res) => {
  try {
    const users = await User.findAll(); // Busca usuários para dropdown
    res.render("tasks/new", {
      users,
      title: "Nova Tarefa",
    });
  } catch (error) {
    console.error("Erro ao carregar formulário:", error);
    res.status(500).send("Erro ao carregar formulário");
  }
};

// Página de formulário para editar tarefa
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const users = await User.findAll();

    if (!task) {
      return res.status(404).send("Tarefa não encontrada");
    }

    res.render("tasks/edit", {
      task,
      users,
      title: "Editar Tarefa",
    });
  } catch (error) {
    console.error("Erro ao carregar tarefa:", error);
    res.status(500).send("Erro ao carregar tarefa");
  }
};

// ========== ACTIONS (Processamento de formulários) ==========

// Criar nova tarefa (POST do formulário)
exports.create = async (req, res) => {
  try {
    const { title, description, due_date, user_id } = req.body;
    await Task.create({ title, description, due_date, user_id });
    res.redirect("/tasks"); // Redireciona para lista após criar
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).send("Erro ao criar tarefa");
  }
};

// Atualizar tarefa (POST do formulário de edição)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, user_id, completed } = req.body;
    await Task.update(id, {
      title,
      description,
      due_date,
      user_id,
      completed: completed === "true" || completed === true,
    });
    res.redirect("/tasks"); // Redireciona para lista após atualizar
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).send("Erro ao atualizar tarefa");
  }
};

// Alternar status da tarefa (concluída/pendente)
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

// Excluir tarefa
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.delete(id);
    res.redirect("/tasks"); // Redireciona para lista após excluir
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).send("Erro ao excluir tarefa");
  }
};

// ========== API METHODS (retornam JSON para fetch()) ==========

// API - Listar todas as tarefas
exports.apiIndex = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

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

// API - Alternar status da tarefa
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
