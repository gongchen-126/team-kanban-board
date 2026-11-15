let tasks = JSON.parse(localStorage.getItem('kanban-tasks') || '[]');

function saveTasks() {
  localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
}

function render() {
  document.querySelectorAll('.column').forEach(col => {
    const status = col.dataset.status;
    const list = col.querySelector('.task-list');
    list.innerHTML = '';
    tasks.filter(t => t.status === status).forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';
      const title = document.createElement('span');
      title.textContent = task.title;
      card.appendChild(title);
      list.appendChild(card);
    });
  });
}

document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  const status = document.getElementById('task-status').value;
  const title = input.value.trim();
  if (!title) return;
  tasks.push({
    id: Date.now(),
    title: title,
    status: status
  });
  saveTasks();
  render();
  input.value = '';
  input.focus();
});

render();
