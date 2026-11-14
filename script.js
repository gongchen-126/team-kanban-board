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

render();
