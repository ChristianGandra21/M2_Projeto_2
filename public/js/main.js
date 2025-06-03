document.addEventListener('DOMContentLoaded', () => {
  const listaTarefas = document.getElementById('lista-tarefas');

  if (listaTarefas) {
    fetch('/api/tarefas')
      .then(res => res.json())
      .then(tarefas => {
        listaTarefas.innerHTML = '';

        tarefas.forEach(tarefa => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h3>${tarefa.title}</h3>
            <p>${tarefa.description}</p>
            <p>Responsável: ${tarefa.user || 'Sem usuário'}</p>
            <p>Status: ${tarefa.completed ? '✅ Concluída' : '⏳ Pendente'}</p>
            <p>Entrega: ${new Date(tarefa.due_date).toLocaleDateString()}</p>
            <a href="/tarefas/${tarefa.id}/editar">✏️ Editar</a>
            <button onclick="concluirTarefa(${tarefa.id})">✔️ Concluir</button>
            <button onclick="excluirTarefa(${tarefa.id})">🗑️ Excluir</button>
          `;
          listaTarefas.appendChild(li);
        });
      });
  }

  const formNovaTarefa = document.getElementById('form-nova-tarefa');
  if (formNovaTarefa) {
    formNovaTarefa.addEventListener('submit', e => {
      e.preventDefault();

      const dados = {
        title: formNovaTarefa.title.value,
        description: formNovaTarefa.description.value,
        due_date: formNovaTarefa.due_date.value,
        user_id: formNovaTarefa.user_id.value || null
      };

      fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(() => {
        alert('Tarefa criada!');
        window.location.href = '/tarefas';
      });
    });
  }

  const formNovoUsuario = document.getElementById('form-novo-usuario');
  if (formNovoUsuario) {
    formNovoUsuario.addEventListener('submit', e => {
      e.preventDefault();

      const dados = {
        name: formNovoUsuario.name.value,
        email: formNovoUsuario.email.value
      };

      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      .then(res => res.json())
      .then(() => {
        alert('Usuário criado!');
        window.location.href = '/usuarios';
      });
    });
  }
});

function concluirTarefa(id) {
  fetch(`/api/tarefas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  })
  .then(() => location.reload());
}

function excluirTarefa(id) {
  if (confirm('Tem certeza que deseja excluir?')) {
    fetch(`/api/tarefas/${id}`, {
      method: 'DELETE'
    })
    .then(() => location.reload());
  }
}
