let tasks = JSON.parse(localStorage.getItem('kanban-tasks')) || [];

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
      card.draggable = true;
      card.dataset.id = task.id;

      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = '删除';
      delBtn.addEventListener('click', () => deleteTask(task.id));

      const title = document.createElement('div');
      title.textContent = task.title;

      card.appendChild(title);
      card.appendChild(delBtn);
      list.appendChild(card);
    });
  });
}

// === 创建任务 ===
document.getElementById('task-form').addEventListener('submit', e => {
  e.preventDefault();
  const titleInput = document.getElementById('task-title');
  const title = titleInput.value.trim();
  if (!title) return;
  tasks.push({ id: Date.now(), title, status: 'todo' });
  saveTasks();
  render();
  titleInput.value = '';
});

// === 删除任务 ===
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// === 拖拽卡片更新状态 ===
document.querySelectorAll('.task-list').forEach(list => {
  list.addEventListener('dragover', e => {
    e.preventDefault();
    list.classList.add('drag-over');
  });
  list.addEventListener('dragleave', () => {
    list.classList.remove('drag-over');
  });
  list.addEventListener('drop', e => {
    e.preventDefault();
    list.classList.remove('drag-over');
    const id = Number(e.dataTransfer.getData('text'));
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.status = list.parentElement.dataset.status;
      saveTasks();
      render();
    }
  });
});

// 拖拽开始，记录卡片id
document.addEventListener('dragstart', e => {
  const card = e.target.closest('.task-card');
  if (card) e.dataTransfer.setData('text', card.dataset.id);
});

render();