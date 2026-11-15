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
      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = '删除';
      delBtn.addEventListener('click', () => deleteTask(task.id));
      const title = document.createElement('span');
      title.textContent = task.title;
      card.appendChild(title);
      card.appendChild(delBtn);
      list.appendChild(card);
    });
  });
}

// ===== 功能：创建任务 =====
document.getElementById('task-form').addEventListener('submit', e => {
  e.preventDefault();
  const titleInput = document.getElementById('task-title');
  const statusSelect = document.getElementById('task-status');
  const title = titleInput.value.trim();
  if (!title) return;
  tasks.push({ id: Date.now(), title: title, status: statusSelect.value });
  saveTasks();
  render();
  titleInput.value = '';
});

// ===== 功能：删除任务 =====
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

render();
