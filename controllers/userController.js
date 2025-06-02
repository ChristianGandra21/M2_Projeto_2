const User = require("../models/user");

// ========== VIEWS (Renderização de páginas EJS) ==========

// Página principal - Lista de usuários (dados vêm do banco via modelo)
exports.index = async (req, res) => {
  try {
    const users = await User.findAll(); // Busca dados do banco via modelo
    res.render("users/index", {
      // Renderiza view com dados do controller
      users,
      title: "Lista de Usuários",
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro ao carregar usuários");
  }
};

// Página de formulário para novo usuário
exports.new = async (req, res) => {
  try {
    res.render("users/new", {
      title: "Novo Usuário",
    });
  } catch (error) {
    console.error("Erro ao carregar formulário:", error);
    res.status(500).send("Erro ao carregar formulário");
  }
};

// Página de formulário para editar usuário
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.render("users/edit", {
      user,
      title: "Editar Usuário",
    });
  } catch (error) {
    console.error("Erro ao carregar usuário:", error);
    res.status(500).send("Erro ao carregar usuário");
  }
};

// ========== ACTIONS (Processamento de formulários) ==========

// Criar novo usuário (POST do formulário)
exports.create = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.create(name, email);
    res.redirect("/users"); // Redireciona para lista após criar
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro ao criar usuário");
  }
};

// Atualizar usuário (POST do formulário de edição)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await User.update(id, { name, email });
    res.redirect("/users"); // Redireciona para lista após atualizar
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Erro ao atualizar usuário");
  }
};

// Excluir usuário
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await User.delete(id);
    res.redirect("/users"); // Redireciona para lista após excluir
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).send("Erro ao excluir usuário");
  }
};

// ========== API METHODS (retornam JSON para fetch()) ==========

// API - Listar todos os usuários
exports.apiIndex = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
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
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

// API - Criar novo usuário
exports.apiCreate = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create(name, email);
    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: newUser,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// API - Atualizar usuário
exports.apiUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedUser = await User.update(id, { name, email });
    res.json({
      message: "Usuário atualizado com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// API - Excluir usuário
exports.apiDestroy = async (req, res) => {
  try {
    const { id } = req.params;
    await User.delete(id);
    res.json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
};
