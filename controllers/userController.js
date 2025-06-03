const User = require("../models/user");

// ========== VIEWS ==========

// Página principal - Lista de usuários
exports.index = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("usuarios", {
      users,
      title: "Lista de Usuários",
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro ao carregar usuários");
  }
};

// Página de novo usuário
exports.new = async (req, res) => {
  try {
    res.render("novoUsuario", {
      title: "Novo Usuário",
    });
  } catch (error) {
    console.error("Erro ao carregar formulário:", error);
    res.status(500).send("Erro ao carregar formulário");
  }
};

// Página de edição de usuário
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.render("editar", {
      user,
      title: "Editar Usuário",
    });
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    res.status(500).send("Erro ao carregar usuário");
  }
};

// Página de confirmação para excluir usuário
exports.confirmDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).send("❌ Erro: ID de usuário inválido!");
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("❌ Erro: Usuário não encontrado!");
    }

    // Buscar estatísticas do usuário
    const Task = require("../models/task");
    const userTasks = await Task.findByUser(id);
    const taskStats = {
      total: userTasks ? userTasks.length : 0,
      completed: userTasks
        ? userTasks.filter((task) => task.completed).length
        : 0,
      pending: userTasks
        ? userTasks.filter((task) => !task.completed).length
        : 0,
    };

    res.render("confirmarExclusaoUsuario", {
      user,
      taskStats,
      userTasks: userTasks || [],
      title: `Confirmar Exclusão - ${user.name}`,
    });
  } catch (error) {
    console.error("Erro ao carregar página de confirmação:", error);
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível carregar a página de confirmação."
      );
  }
};

// ========== ACTIONS ==========

// Criar novo usuário
exports.create = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validações básicas
    if (!name || name.trim().length === 0) {
      return res.status(400).send("❌ Erro: O nome do usuário é obrigatório!");
    }

    if (!email || email.trim().length === 0) {
      return res.status(400).send("❌ Erro: O email do usuário é obrigatório!");
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res
        .status(400)
        .send("❌ Erro: Por favor, insira um email válido!");
    }

    // Verificar se o email já está em uso
    const allUsers = await User.findAll();
    const emailInUse = allUsers.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailInUse) {
      return res
        .status(400)
        .send("❌ Erro: Este email já está sendo usado por outro usuário!");
    }

    await User.create(name.trim(), email.trim().toLowerCase());

    // Redirecionar com mensagem de sucesso
    res.redirect(
      "/users?success=user_created&name=" + encodeURIComponent(name.trim())
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível criar o usuário. Tente novamente."
      );
  }
};

// Atualizar usuário
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validações básicas
    if (!name || name.trim().length === 0) {
      return res.status(400).send("❌ Erro: O nome do usuário é obrigatório!");
    }

    if (name.length > 100) {
      return res
        .status(400)
        .send("❌ Erro: O nome deve ter no máximo 100 caracteres!");
    }

    if (!email || email.trim().length === 0) {
      return res.status(400).send("❌ Erro: O email do usuário é obrigatório!");
    }

    if (email.length > 150) {
      return res
        .status(400)
        .send("❌ Erro: O email deve ter no máximo 150 caracteres!");
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res
        .status(400)
        .send("❌ Erro: Por favor, insira um email válido!");
    }

    // Verificar se o usuário existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send("❌ Erro: Usuário não encontrado!");
    }

    // Verificar se o email já está em uso por outro usuário
    const allUsers = await User.findAll();
    const emailInUse = allUsers.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.id !== id
    );

    if (emailInUse) {
      return res
        .status(400)
        .send("❌ Erro: Este email já está sendo usado por outro usuário!");
    }

    // Atualizar usuário
    await User.update(id, {
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    // Redirecionar com mensagem de sucesso
    res.redirect(
      "/users?success=user_updated&name=" + encodeURIComponent(name.trim())
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível atualizar o usuário. Tente novamente."
      );
  }
};

// Excluir usuário
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const { force } = req.query; // Parâmetro para forçar exclusão (admin)

    // Validar ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).send("❌ Erro: ID de usuário inválido!");
    }

    // Verificar se o usuário existe antes de excluir
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send("❌ Erro: Usuário não encontrado!");
    }

    // Verificar se o usuário tem tarefas associadas
    const Task = require("../models/task");
    const userTasks = await Task.findByUser(id);

    if (userTasks && userTasks.length > 0 && force !== "true") {
      // Criar mensagem detalhada com lista de tarefas
      const taskList = userTasks
        .map(
          (task) =>
            `• ${task.title} ${
              task.completed ? "(✅ Concluída)" : "(⏳ Pendente)"
            }`
        )
        .join("\n");

      return res
        .status(400)
        .send(
          `❌ Erro: Não é possível excluir o usuário "${existingUser.name}" porque ele possui ${userTasks.length} tarefa(s) associada(s):\n\n${taskList}\n\n` +
            "Opções disponíveis:\n" +
            "1. Remova todas as tarefas do usuário\n" +
            "2. Reatribua as tarefas para outro usuário\n" +
            "3. Entre em contato com o administrador para exclusão forçada"
        );
    }

    // Salvar dados para logs e mensagem de sucesso
    const userName = existingUser.name;
    const userEmail = existingUser.email;
    const deletionTime = new Date().toISOString();

    // Se force=true, excluir tarefas associadas primeiro
    if (force === "true" && userTasks && userTasks.length > 0) {
      console.log(
        `⚠️ EXCLUSÃO FORÇADA: Removendo ${userTasks.length} tarefa(s) do usuário ${userName} (ID: ${id})`
      );

      for (const task of userTasks) {
        await Task.delete(task.id);
        console.log(`🗑️ Tarefa removida: "${task.title}" (ID: ${task.id})`);
      }
    }

    // Excluir usuário
    const deleted = await User.delete(id);
    if (!deleted) {
      return res
        .status(500)
        .send("❌ Erro: Não foi possível excluir o usuário. Tente novamente.");
    }

    // Log da exclusão para auditoria
    console.log(
      `✅ USUÁRIO EXCLUÍDO: ${userName} (${userEmail}) - ID: ${id} - ${deletionTime}`
    );
    if (force === "true") {
      console.log(`⚠️ EXCLUSÃO FORÇADA realizada em ${deletionTime}`);
    }

    // Redirecionar com mensagem de sucesso
    const successMessage =
      force === "true"
        ? `user_deleted_forced&name=${encodeURIComponent(userName)}&tasks=${
            userTasks ? userTasks.length : 0
          }`
        : `user_deleted&name=${encodeURIComponent(userName)}`;

    res.redirect(`/users?success=${successMessage}`);
  } catch (error) {
    console.error("❌ ERRO AO EXCLUIR USUÁRIO:", error);
    res
      .status(500)
      .send(
        "❌ Erro interno: Não foi possível excluir o usuário. Tente novamente."
      );
  }
};

// Reatribuir tarefas de um usuário para outro
exports.reassignTasks = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body;

    // Validar IDs
    if (
      !fromUserId ||
      !toUserId ||
      isNaN(parseInt(fromUserId)) ||
      isNaN(parseInt(toUserId))
    ) {
      return res.status(400).json({ error: "IDs de usuário inválidos!" });
    }

    if (fromUserId === toUserId) {
      return res
        .status(400)
        .json({ error: "Usuário de origem e destino não podem ser iguais!" });
    }

    // Verificar se ambos os usuários existem
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser) {
      return res
        .status(404)
        .json({ error: "Usuário de origem não encontrado!" });
    }

    if (!toUser) {
      return res
        .status(404)
        .json({ error: "Usuário de destino não encontrado!" });
    }

    // Buscar tarefas do usuário de origem
    const Task = require("../models/task");
    const userTasks = await Task.findByUser(fromUserId);

    if (!userTasks || userTasks.length === 0) {
      return res
        .status(400)
        .json({
          error: `Usuário "${fromUser.name}" não possui tarefas para reatribuir!`,
        });
    }

    // Reatribuir todas as tarefas
    let reassignedCount = 0;
    for (const task of userTasks) {
      await Task.update(task.id, { ...task, user_id: toUserId });
      reassignedCount++;
    }

    // Log da operação
    console.log(
      `📋 TAREFAS REATRIBUÍDAS: ${reassignedCount} tarefa(s) de "${fromUser.name}" para "${toUser.name}"`
    );

    res.json({
      message: `${reassignedCount} tarefa(s) reatribuída(s) com sucesso!`,
      fromUser: { id: fromUser.id, name: fromUser.name },
      toUser: { id: toUser.id, name: toUser.name },
      reassignedCount,
    });
  } catch (error) {
    console.error("Erro ao reatribuir tarefas:", error);
    res.status(500).json({ error: "Erro interno ao reatribuir tarefas" });
  }
};

// ========== API METHODS ==========

// API - Buscar todos os usuários
exports.apiIndex = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// API - Buscar usuário por ID
exports.apiShow = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

// API - Criar usuário
exports.apiCreate = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create(name, email);
    res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// API - Atualizar usuário
exports.apiUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.update(id, { name, email });
    res.json({ message: "Usuário atualizado com sucesso!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// API - Excluir usuário
exports.apiDestroy = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se o usuário existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se o usuário tem tarefas associadas
    const Task = require("../models/task");
    const userTasks = await Task.findByUser(id);

    if (userTasks && userTasks.length > 0) {
      return res.status(400).json({
        error: `Não é possível excluir o usuário "${existingUser.name}" porque ele possui ${userTasks.length} tarefa(s) associada(s).`,
        tasks: userTasks.map((task) => ({ id: task.id, title: task.title })),
      });
    }

    // Excluir usuário
    const deleted = await User.delete(id);
    if (!deleted) {
      return res
        .status(500)
        .json({ error: "Não foi possível excluir o usuário" });
    }

    res.json({
      message: `Usuário "${existingUser.name}" excluído com sucesso!`,
      deletedUser: { id: existingUser.id, name: existingUser.name },
    });
  } catch (error) {
    console.error("Erro ao excluir usuário via API:", error);
    res.status(500).json({ error: "Erro interno ao excluir usuário" });
  }
};
