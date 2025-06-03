document.addEventListener('DOMContentLoaded', () => {
  const fetchWithRedirect = async (url, options) => {
    try {
      const res = await fetch(url, options);
      if (res.redirected) {
        window.location.href = res.url;
      } else if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Erro na requisição.');
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Erro inesperado.');
    }
  };

  // Enviar formulário com Fetch POST
  const setupFormSubmission = (formSelector, endpoint) => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      await fetchWithRedirect(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    });
  };

  setupFormSubmission('#new-task-form', '/tasks');
  setupFormSubmission('#new-user-form', '/users');

  // Botões de ação: toggle, delete
  document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const { action, id } = btn.dataset;
    let confirmed = true;

    if (action === 'delete-task') {
      confirmed = confirm('Tem certeza que deseja excluir esta tarefa?');
    } else if (action === 'delete-user') {
      confirmed = confirm('Tem certeza que deseja excluir este usuário?');
    }

    if (!confirmed) return;

    const urlMap = {
      'toggle-task': `/tasks/toggle/${id}`,
      'delete-task': `/tasks/delete/${id}`,
      'delete-user': `/users/delete/${id}`,
    };

    const url = urlMap[action];
    if (url) {
      await fetchWithRedirect(url, { method: 'POST' });
    }
  });
});
