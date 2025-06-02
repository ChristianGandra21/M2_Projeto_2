document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (response.ok) {
        alert('Usuário criado com sucesso!');
        window.location.href = '/usuarios';
      }
    });
  }
});
