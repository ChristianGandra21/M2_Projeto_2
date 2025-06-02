document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const due_date = document.getElementById('due_date').value;
      const user_id = document.getElementById('user_id').value;

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, due_date, user_id })
      });

      if (response.ok) {
        alert('Tarefa criada com sucesso!');
        window.location.href = '/';
      }
    });
  }
});
