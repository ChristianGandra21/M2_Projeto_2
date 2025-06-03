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

// ========== ACTIONS ==========

// Criar novo usuário
exports.create = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.create(name, email);
    res.redirect("/novoUsuario");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro ao criar usuário");
  }
};

// Atualizar usuário
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await User.update(id, { name, email });
    res.redirect("/usuarios");
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
    res.redirect("/usuarios");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).send("Erro ao excluir usuário");
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
    await User.delete(id);
    res.json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
};
