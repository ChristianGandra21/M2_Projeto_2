-- init.sql

-- Inserção de usuários iniciais
INSERT INTO users (name, email, password) VALUES
('Alice Silva', 'alice@example.com', 'hashed_password_1'),
('Bruno Costa', 'bruno@example.com', 'hashed_password_2');

-- Inserção de categorias padrão
INSERT INTO categories (name, user_id) VALUES
('Trabalho', 1),
('Estudos', 1),
('Lazer', 2);

-- Inserção de tarefas de exemplo
INSERT INTO tasks (title, description, status, due_date, user_id, category_id) VALUES
('Terminar relatório', 'Relatório semanal do projeto X', 'in_progress', '2025-05-10', 1, 1),
('Estudar SQL', 'Revisar comandos básicos e avançados', 'pending', '2025-05-12', 1, 2),
('Assistir série', 'Episódio novo da série preferida', 'pending', '2025-05-09', 2, 3);
