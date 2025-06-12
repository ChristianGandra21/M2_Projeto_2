/**
 * CONTROLLER DE USUÁRIOS - CAMADA DE CONTROLE
 *
 * Este módulo implementa a camada Controller do padrão MVC para a entidade User.
 * Responsável por processar requisições HTTP relacionadas aos usuários,
 * interagir com o model User e retornar respostas adequadas.
 *
 * Funcionalidades:
 * - Renderização de páginas EJS para usuários
 * - Processamento de formulários de usuários
 * - APIs RESTful para operações com usuários
 * - Validações de dados (nome, email único)
 * - Verificação de integridade referencial (tarefas associadas)
 */

// Importação do model de usuários
const User = require("../models/user");

// ========== VIEWS (Renderização de páginas EJS) ==========

/**
 * Página principal - Lista de usuários
 * Renderiza a view com todos os usuários cadastrados no sistema
 */
exports.index = async (req, res) => {
  try {
    // Busca todos os usuários ordenados por nome
    const users = await User.findAll();

    // Renderiza a página de usuários
    res.render("usuarios", {
      users, // Lista de usuários para exibição
      title: "Lista de Usuários", // Título da página
    });
  } catch (error) {
    // Log do erro para debugging
    console.error("Erro ao buscar usuários:", error);
    // Retorna erro 500 com mensagem amigável
    res.status(500).send("Erro ao carregar usuários");
  }
};

/**
 * Página de formulário para novo usuário
 * Renderiza o formulário de criação de usuário
 */
exports.new = async (req, res) => {
  try {
    // Renderiza o formulário de novo usuário
    res.render("novoUsuario", {
      title: "Novo Usuário", // Título da página
    });
  } catch (error) {
    // Log do erro para debugging
    console.error("Erro ao carregar formulário:", error);
    // Retorna erro 500 com mensagem amigável
    res.status(500).send("Erro ao carregar formulário");
  }
};

/**
 * Página de formulário para editar usuário
 * Renderiza o formulário de edição com dados do usuário pré-preenchidos
 */
exports.edit = async (req, res) => {
  try {
    // Extrai o ID do usuário dos parâmetros da URL
    const { id } = req.params;

    // Busca o usuário específico por ID
    const user = await User.findById(id);

    // Verifica se o usuário existe
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    // Renderiza o formulário de edição com dados pré-preenchidos
    res.render("editar", {
      user, // Dados do usuário para pré-preenchimento
      title: "Editar Usuário", // Título da página
    });
  } catch (error) {
    // Log do erro para debugging
    console.error("Erro ao carregar usuário:", error);
    // Retorna erro 500 com mensagem amigável
    res.status(500).send("Erro ao carregar usuário");
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

    // Verificar se o usuário existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).send("❌ Erro: Usuário não encontrado!");
    }

    // Verificar se o usuário tem tarefas associadas
    const Task = require("../models/task");
    const userTasks = await Task.findByUser(id);

    if (userTasks && userTasks.length > 0) {
      return res
        .status(400)
        .send(
          `❌ Erro: Não é possível excluir o usuário "${existingUser.name}" porque ele possui ${userTasks.length} tarefa(s) associada(s). ` +
            "Remova ou reatribua as tarefas antes de excluir o usuário."
        );
    }

    // Salvar nome para mensagem de sucesso
    const userName = existingUser.name;

    // Excluir usuário
    const deleted = await User.delete(id);
    if (!deleted) {
      return res
        .status(500)
        .send("❌ Erro: Não foi possível excluir o usuário.");
    }

    // Redirecionar com mensagem de sucesso
    res.redirect(
      "/users?success=user_deleted&name=" + encodeURIComponent(userName)
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res
      .status(500)
      .send("❌ Erro interno: Não foi possível excluir o usuário.");
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
      forced: force === "true",
      tasksDeleted: force === "true" ? (userTasks ? userTasks.length : 0) : 0,
    });
  } catch (error) {
    console.error("Erro ao excluir usuário via API:", error);
    res.status(500).json({ error: "Erro interno ao excluir usuário" });
  }
};
