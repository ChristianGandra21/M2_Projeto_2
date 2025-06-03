document.addEventListener('DOMContentLoaded', () => {
  // Criar tarefa via Fetch POST
  const newTaskForm = document.querySelector('#new-task-form');
  if (newTaskForm) {
    newTaskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(newTaskForm);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.redirected) {
        window.location.href = res.url;
      } else {
        alert('Erro ao criar tarefa.');
      }
    });
  }

  // Criar usuário via Fetch POST
  const newUserForm = document.querySelector('#new-user-form');
  if (newUserForm) {
    newUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(newUserForm);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.redirected) {
        window.location.href = res.url;
      } else {
        alert('Erro ao criar usuário.');
      }
    });
  }

  // Botões de ação: toggle, delete task/user
  document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'toggle-task') {
      const res = await fetch(`/tasks/toggle/${id}`, { method: 'POST' });
      if (res.redirected) window.location.href = res.url;
    }

    if (action === 'delete-task') {
      if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
      const res = await fetch(`/tasks/delete/${id}`, { method: 'POST' });
      if (res.redirected) window.location.href = res.url;
    }

    if (action === 'delete-user') {
      if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
      const res = await fetch(`/users/delete/${id}`, { method: 'POST' });
      if (res.redirected) window.location.href = res.url;
    }
  });
});
