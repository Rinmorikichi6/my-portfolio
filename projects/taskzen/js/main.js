let tasks = JSON.parse(localStorage.getItem('taskzen-tasks') || '[]');
let currentFilter = 'all';

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const taskStats = document.getElementById('taskStats');

function save() {
  localStorage.setItem('taskzen-tasks', JSON.stringify(tasks));
}

function filteredTasks() {
  if (currentFilter === 'active') return tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}

function render() {
  const list = filteredTasks();
  const active = tasks.filter(t => !t.completed).length;
  taskStats.textContent = `${tasks.length} tasks · ${active} active`;

  if (!list.length) {
    taskList.innerHTML = '<li class="empty-state">No tasks yet. Add your first task above.</li>';
    return;
  }

  taskList.innerHTML = list.map(t => `
    <li class="task-item ${t.completed ? 'completed' : ''}" data-id="${t.id}">
      <button class="task-check" type="button" aria-label="Toggle">${t.completed ? '✓' : ''}</button>
      <span class="task-text">${escapeHtml(t.text)}</span>
      <span class="priority ${t.priority}">${t.priority}</span>
      <button class="task-delete" type="button" aria-label="Delete">&times;</button>
    </li>
  `).join('');

  taskList.querySelectorAll('.task-check').forEach(btn => {
    btn.addEventListener('click', () => toggleTask(btn.closest('.task-item').dataset.id));
  });
  taskList.querySelectorAll('.task-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteTask(btn.closest('.task-item').dataset.id));
  });
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.unshift({
    id: Date.now().toString(),
    text,
    priority: document.getElementById('taskPriority').value,
    completed: false
  });
  taskInput.value = '';
  save();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

document.getElementById('addTask').addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

document.getElementById('clearCompleted').addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
});

if (!tasks.length) {
  tasks = [
    { id: '1', text: 'Review portfolio project cards', priority: 'high', completed: false },
    { id: '2', text: 'Update resume with latest stack', priority: 'medium', completed: false }
  ];
  save();
}

render();
