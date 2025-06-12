/**
 * JAVASCRIPT FRONTEND - INTERATIVIDADE DA APLICAÇÃO
 *
 * Este arquivo implementa a interatividade do lado cliente (frontend)
 * da aplicação de gerenciamento de tarefas. Utiliza JavaScript vanilla
 * para comunicação assíncrona com o backend via Fetch API.
 *
 * Funcionalidades:
 * - Interceptação de formulários para envio via fetch()
 * - Botões de ação para operações CRUD
 * - Confirmações de segurança para ações destrutivas
 * - Redirecionamentos após operações bem-sucedidas
 *
 * Padrão utilizado:
 * - Event delegation para performance
 * - Async/await para operações assíncronas
 * - Fetch API para comunicação com backend
 */

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // ========== FORMULÁRIOS DE CRIAÇÃO ==========

  /**
   * Intercepta o formulário de nova tarefa para envio via fetch()
   * Evita recarregamento da página e permite melhor controle da resposta
   */
  const newTaskForm = document.querySelector("#new-task-form");
  if (newTaskForm) {
    newTaskForm.addEventListener("submit", async (e) => {
      // Previne o comportamento padrão do formulário (recarregar página)
      e.preventDefault();

      // Extrai dados do formulário usando FormData API
      const formData = new FormData(newTaskForm);
      // Converte FormData para objeto JavaScript
      const data = Object.fromEntries(formData.entries());

      // Envia dados para o backend via fetch POST
      const res = await fetch("/tasks", {
        method: "POST", // Método HTTP POST
        headers: { "Content-Type": "application/json" }, // Tipo de conteúdo JSON
        body: JSON.stringify(data), // Dados convertidos para JSON
      });

      // Verifica se o servidor retornou um redirecionamento
      if (res.redirected) {
        // Redireciona para a URL retornada pelo servidor
        window.location.href = res.url;
      } else {
        // Exibe alerta em caso de erro
        alert("Erro ao criar tarefa.");
      }
    });
  }

  /**
   * Intercepta o formulário de novo usuário para envio via fetch()
   * Funcionalidade similar ao formulário de tarefas
   */
  const newUserForm = document.querySelector("#new-user-form");
  if (newUserForm) {
    newUserForm.addEventListener("submit", async (e) => {
      // Previne comportamento padrão do formulário
      e.preventDefault();

      // Extrai e converte dados do formulário
      const formData = new FormData(newUserForm);
      const data = Object.fromEntries(formData.entries());

      // Envia dados para endpoint de usuários
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Trata resposta do servidor
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        alert("Erro ao criar usuário.");
      }
    });
  }

  // ========== BOTÕES DE AÇÃO (Event Delegation) ==========

  /**
   * Utiliza event delegation no body para capturar cliques em botões de ação
   * Vantagens: Performance melhor, funciona com elementos criados dinamicamente
   */
  document.body.addEventListener("click", async (e) => {
    // Busca o botão mais próximo com atributo data-action
    const btn = e.target.closest("button[data-action]");
    if (!btn) return; // Se não encontrou botão de ação, ignora o evento

    // Extrai dados dos atributos do botão
    const action = btn.dataset.action; // Tipo de ação (toggle-task, delete-task, etc.)
    const id = btn.dataset.id; // ID do item a ser manipulado

    /**
     * Alternar status da tarefa (concluída/pendente)
     * Envia requisição POST para endpoint de toggle
     */
    if (action === "toggle-task") {
      const res = await fetch(`/tasks/toggle/${id}`, { method: "POST" });
      // Redireciona se operação foi bem-sucedida
      if (res.redirected) window.location.href = res.url;
    }

    /**
     * Excluir tarefa com confirmação de segurança
     * Exibe popup de confirmação antes de executar exclusão
     */
    if (action === "delete-task") {
      // Confirmação de segurança para evitar exclusões acidentais
      if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

      // Envia requisição de exclusão
      const res = await fetch(`/tasks/delete/${id}`, { method: "POST" });
      if (res.redirected) window.location.href = res.url;
    }

    /**
     * Excluir usuário com confirmação de segurança
     * Similar à exclusão de tarefa, mas para usuários
     */
    if (action === "delete-user") {
      // Confirmação de segurança
      if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

      // Envia requisição de exclusão
      const res = await fetch(`/users/delete/${id}`, { method: "POST" });
      if (res.redirected) window.location.href = res.url;
    }
  });
});
