const express = require("express");
const router = express.Router();

// Página inicial - redireciona para lista de tarefas
router.get("/", (req, res) => {
  res.redirect("/tasks");
});

module.exports = router;
