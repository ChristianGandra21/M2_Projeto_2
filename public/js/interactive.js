// ========== SISTEMA INTERATIVO COM FETCH() ==========
// Comunicação assíncrona com o servidor usando fetch()

// ========== UTILITÁRIOS ==========

// Função para mostrar alertas
function showAlert(message, type = "info") {
  const alertContainer = document.getElementById("alertContainer");
  if (!alertContainer) return;

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 1.2rem; cursor: pointer;">&times;</button>
  `;

  alertContainer.appendChild(alertDiv);

  // Remove automaticamente após 5 segundos
  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.remove();
    }
  }, 5000);
}

// Função para mostrar loading
function showLoading(button) {
  const originalText = button.innerHTML;
  button.innerHTML = '<span class="loading-spinner"></span> Carregando...';
  button.disabled = true;
  return originalText;
}

// Função para esconder loading
function hideLoading(button, originalText) {
  button.innerHTML = originalText;
  button.disabled = false;
}

// ========== FUNÇÕES PARA TAREFAS ==========

// Buscar todas as tarefas
async function loadTasks() {
  try {
    const response = await fetch("/api/tasks/api");
    if (!response.ok) throw new Error("Erro ao buscar tarefas");

    const tasks = await response.json();
    displayTasks(tasks);
    updateTaskStats(tasks);
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao carregar tarefas. Tente novamente.", "error");
  }
}

// Exibir tarefas na tela
function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML =
      '<div class="alert alert-info">Nenhuma tarefa encontrada.</div>';
    return;
  }

  taskList.innerHTML = tasks
    .map(
      (task) => `
    <div class="task-card ${task.completed ? "completed" : ""}" data-task-id="${
        task.id
      }">
      <div class="task-header">
        <h3 class="task-title">${task.title}</h3>
        <span class="task-status ${
          task.completed ? "status-completed" : "status-pending"
        }">
          ${task.completed ? "✅ Concluída" : "⏳ Pendente"}
        </span>
      </div>
      
      <div class="task-body">
        <p class="task-description">${task.description || "Sem descrição"}</p>
        <div class="task-meta">
          <span>👤 ${task.user || "Sem responsável"}</span>
          ${
            task.due_date
              ? `<span>📅 ${new Date(task.due_date).toLocaleDateString(
                  "pt-BR"
                )}</span>`
              : ""
          }
        </div>
      </div>
      
      <div class="task-actions">
        <button class="btn btn-sm btn-secondary" onclick="editTaskModal(${
          task.id
        })">✏️ Editar</button>
        <button class="btn btn-sm ${
          task.completed ? "btn-warning" : "btn-success"
        }" onclick="toggleTask(${task.id})">
          ${task.completed ? "↩️ Reabrir" : "✅ Concluir"}
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${
          task.id
        })">🗑️ Excluir</button>
      </div>
    </div>
  `
    )
    .join("");
}

// Criar nova tarefa
async function createTask(formData) {
  try {
    const response = await fetch("/api/tasks/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao criar tarefa");

    const result = await response.json();
    showAlert(result.message, "success");
    loadTasks(); // Recarrega a lista
    return result;
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao criar tarefa. Tente novamente.", "error");
    throw error;
  }
}

// Atualizar tarefa
async function updateTask(id, formData) {
  try {
    const response = await fetch(`/api/tasks/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao atualizar tarefa");

    const result = await response.json();
    showAlert(result.message, "success");
    loadTasks(); // Recarrega a lista
    return result;
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao atualizar tarefa. Tente novamente.", "error");
    throw error;
  }
}

// Alternar status da tarefa
async function toggleTask(id) {
  try {
    const response = await fetch(`/api/tasks/api/${id}/toggle`, {
      method: "PATCH",
    });

    if (!response.ok) throw new Error("Erro ao alternar status");

    const result = await response.json();
    showAlert(result.message, "success");
    loadTasks(); // Recarrega a lista
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao alternar status. Tente novamente.", "error");
  }
}

// Excluir tarefa
async function deleteTask(id) {
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) {
    return;
  }

  try {
    const response = await fetch(`/api/tasks/api/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir tarefa");

    const result = await response.json();
    showAlert(result.message, "success");
    loadTasks(); // Recarrega a lista
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao excluir tarefa. Tente novamente.", "error");
  }
}

// ========== FUNÇÕES PARA USUÁRIOS ==========

// Buscar todos os usuários
async function loadUsers() {
  try {
    const response = await fetch("/api/users/api");
    if (!response.ok) throw new Error("Erro ao buscar usuários");

    const users = await response.json();
    displayUsers(users);
    updateUserStats(users);
    updateUserDropdowns(users);
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao carregar usuários. Tente novamente.", "error");
  }
}

// Exibir usuários na tela
function displayUsers(users) {
  const userList = document.getElementById("userList");
  if (!userList) return;

  if (users.length === 0) {
    userList.innerHTML =
      '<div class="alert alert-info">Nenhum usuário encontrado.</div>';
    return;
  }

  userList.innerHTML = users
    .map(
      (user) => `
    <div class="user-card" data-user-id="${user.id}">
      <div class="user-avatar">
        <span class="avatar-text">${user.name.charAt(0).toUpperCase()}</span>
      </div>
      
      <div class="user-info">
        <h3 class="user-name">${user.name}</h3>
        <p class="user-email">📧 ${user.email}</p>
        <p class="user-id">🆔 ID: ${user.id}</p>
        ${
          user.created_at
            ? `<p class="user-date">📅 ${new Date(
                user.created_at
              ).toLocaleDateString("pt-BR")}</p>`
            : ""
        }
      </div>
      
      <div class="user-actions">
        <button class="btn btn-sm btn-secondary" onclick="editUserModal(${
          user.id
        })">✏️ Editar</button>
        <button class="btn btn-sm btn-primary" onclick="viewUserTasks(${
          user.id
        })">📋 Tarefas</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${
          user.id
        })">🗑️ Excluir</button>
      </div>
    </div>
  `
    )
    .join("");
}

// Criar novo usuário
async function createUser(formData) {
  try {
    const response = await fetch("/api/users/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao criar usuário");

    const result = await response.json();
    showAlert(result.message, "success");
    loadUsers(); // Recarrega a lista
    return result;
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao criar usuário. Tente novamente.", "error");
    throw error;
  }
}

// Atualizar usuário
async function updateUser(id, formData) {
  try {
    const response = await fetch(`/api/users/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao atualizar usuário");

    const result = await response.json();
    showAlert(result.message, "success");
    loadUsers(); // Recarrega a lista
    return result;
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao atualizar usuário. Tente novamente.", "error");
    throw error;
  }
}

// Excluir usuário
async function deleteUser(id) {
  if (
    !confirm(
      "Tem certeza que deseja excluir este usuário? Isso pode afetar as tarefas associadas."
    )
  ) {
    return;
  }

  try {
    const response = await fetch(`/api/users/api/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Erro ao excluir usuário");

    const result = await response.json();
    showAlert(result.message, "success");
    loadUsers(); // Recarrega a lista
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao excluir usuário. Tente novamente.", "error");
  }
}

// ========== FUNÇÕES AUXILIARES ==========

// Atualizar estatísticas de tarefas
function updateTaskStats(tasks) {
  const totalTasks = document.getElementById("totalTasks");
  const completedTasks = document.getElementById("completedTasks");
  const pendingTasks = document.getElementById("pendingTasks");

  if (totalTasks) totalTasks.textContent = tasks.length;
  if (completedTasks)
    completedTasks.textContent = tasks.filter((t) => t.completed).length;
  if (pendingTasks)
    pendingTasks.textContent = tasks.filter((t) => !t.completed).length;
}

// Atualizar estatísticas de usuários
function updateUserStats(users) {
  const totalUsers = document.getElementById("totalUsers");
  const newUsers = document.getElementById("newUsers");
  const validEmails = document.getElementById("validEmails");

  if (totalUsers) totalUsers.textContent = users.length;
  if (newUsers) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    newUsers.textContent = users.filter(
      (u) => u.created_at && new Date(u.created_at) > thirtyDaysAgo
    ).length;
  }
  if (validEmails)
    validEmails.textContent = users.filter(
      (u) => u.email && u.email.includes("@")
    ).length;
}

// Atualizar dropdowns de usuários
function updateUserDropdowns(users) {
  const userSelects = document.querySelectorAll('select[name="user_id"]');
  userSelects.forEach((select) => {
    const currentValue = select.value;
    select.innerHTML = '<option value="">Selecione um usuário</option>';
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      if (user.id == currentValue) option.selected = true;
      select.appendChild(option);
    });
  });
}

// ========== MANIPULAÇÃO DE FORMULÁRIOS ==========

// Interceptar envio de formulários para usar fetch()
function setupFormInterceptors() {
  // Formulário de nova tarefa
  const taskForm = document.getElementById("taskForm");
  if (taskForm) {
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = taskForm.querySelector('button[type="submit"]');
      const originalText = showLoading(button);

      try {
        const formData = new FormData(taskForm);
        const data = Object.fromEntries(formData.entries());

        await createTask(data);
        taskForm.reset();
      } catch (error) {
        // Erro já tratado na função createTask
      } finally {
        hideLoading(button, originalText);
      }
    });
  }

  // Formulário de novo usuário
  const userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = userForm.querySelector('button[type="submit"]');
      const originalText = showLoading(button);

      try {
        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData.entries());

        await createUser(data);
        userForm.reset();
      } catch (error) {
        // Erro já tratado na função createUser
      } finally {
        hideLoading(button, originalText);
      }
    });
  }
}

// ========== MODAIS PARA EDIÇÃO ==========

// Modal para editar tarefa
async function editTaskModal(id) {
  try {
    const response = await fetch(`/api/tasks/api/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar tarefa");

    const task = await response.json();

    // Criar modal
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>✏️ Editar Tarefa</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>

        <form id="editTaskForm">
          <div class="form-group">
            <label for="editTitle">Título</label>
            <input type="text" id="editTitle" name="title" class="form-control" value="${
              task.title
            }" required>
          </div>

          <div class="form-group">
            <label for="editDescription">Descrição</label>
            <textarea id="editDescription" name="description" class="form-control" rows="3">${
              task.description || ""
            }</textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="editUserId">Responsável</label>
              <select id="editUserId" name="user_id" class="form-control">
                <option value="">Selecione um usuário</option>
              </select>
            </div>

            <div class="form-group">
              <label for="editDueDate">Data de Vencimento</label>
              <input type="date" id="editDueDate" name="due_date" class="form-control"
                     value="${
                       task.due_date ? task.due_date.split("T")[0] : ""
                     }">
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" name="completed" ${
                task.completed ? "checked" : ""
              }>
              <span class="checkmark"></span>
              Tarefa concluída
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">💾 Salvar</button>
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">❌ Cancelar</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Carregar usuários no dropdown
    const users = await fetch("/api/users/api").then((r) => r.json());
    const userSelect = modal.querySelector("#editUserId");
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      if (user.id == task.user_id) option.selected = true;
      userSelect.appendChild(option);
    });

    // Interceptar envio do formulário
    modal
      .querySelector("#editTaskForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const originalText = showLoading(button);

        try {
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          data.completed = formData.has("completed");

          await updateTask(id, data);
          modal.remove();
        } catch (error) {
          // Erro já tratado na função updateTask
        } finally {
          hideLoading(button, originalText);
        }
      });
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao carregar dados da tarefa.", "error");
  }
}

// Modal para editar usuário
async function editUserModal(id) {
  try {
    const response = await fetch(`/api/users/api/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar usuário");

    const user = await response.json();

    // Criar modal
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>✏️ Editar Usuário</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        </div>

        <form id="editUserForm">
          <div class="form-group">
            <label for="editUserName">Nome</label>
            <input type="text" id="editUserName" name="name" class="form-control" value="${user.name}" required>
          </div>

          <div class="form-group">
            <label for="editUserEmail">Email</label>
            <input type="email" id="editUserEmail" name="email" class="form-control" value="${user.email}" required>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">💾 Salvar</button>
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">❌ Cancelar</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Interceptar envio do formulário
    modal
      .querySelector("#editUserForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const originalText = showLoading(button);

        try {
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());

          await updateUser(id, data);
          modal.remove();
        } catch (error) {
          // Erro já tratado na função updateUser
        } finally {
          hideLoading(button, originalText);
        }
      });
  } catch (error) {
    console.error("Erro:", error);
    showAlert("Erro ao carregar dados do usuário.", "error");
  }
}

// Ver tarefas de um usuário
function viewUserTasks(userId) {
  window.location.href = `/tasks/user/${userId}`;
}

// ========== INICIALIZAÇÃO ==========

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  // Configurar interceptadores de formulários
  setupFormInterceptors();

  // Carregar dados iniciais baseado na página atual
  const currentPath = window.location.pathname;

  if (currentPath.includes("/tasks")) {
    loadTasks();
    loadUsers(); // Para dropdowns
  } else if (currentPath.includes("/users")) {
    loadUsers();
  }

  // Atualizar dados a cada 30 segundos
  setInterval(() => {
    if (currentPath.includes("/tasks")) {
      loadTasks();
    } else if (currentPath.includes("/users")) {
      loadUsers();
    }
  }, 30000);
});

// ========== ESTILOS PARA MODAIS ==========

// Adicionar estilos CSS para modais
const modalStyles = `
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.modal-close:hover {
  color: #333;
}

.loading-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML("beforeend", modalStyles);
