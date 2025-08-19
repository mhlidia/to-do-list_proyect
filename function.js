// Referencias a elementos del DOM
const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");

// Modal para ver tarea
const viewModal = new bootstrap.Modal(document.getElementById("viewTaskModal"));
const viewTitle = document.getElementById("viewTaskTitle");
const viewDescription = document.getElementById("viewTaskDescription");

// Modal para editar tarea
const editModal = new bootstrap.Modal(document.getElementById("editTaskModal"));
const editTitle = document.getElementById("editTaskTitle");
const editDescription = document.getElementById("editTaskDescription");
let editIndex = null;

// Obtener tareas desde localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Guardar tareas en localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mostrar las tareas en la lista
function renderTasks() {
  const tasks = getTasks();
  tasksList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
    taskItem.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onclick="toggleComplete(${index})">
        <strong>${task.title}</strong> - <small>${task.description}</small>
      </div>
      <div>
        <button class="btn btn-info btn-sm me-2" onclick="viewTask(${index})">Ver</button>
        <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Eliminar</button>
      </div>`
    ;
    tasksList.appendChild(taskItem);
  });
}

// Agregar tarea
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const tasks = getTasks();
  tasks.push({ title, description, completed: false });
  saveTasks(tasks);
  taskForm.reset();
  renderTasks();
});

// Ver tarea en modal
function viewTask(index) {
  const tasks = getTasks();
  const task = tasks[index];
  viewTitle.textContent = task.title;
  viewDescription.textContent = task.description;
  viewModal.show();
}

// Editar tarea en modal
function editTask(index) {
  const tasks = getTasks();
  const task = tasks[index];
  editTitle.value = task.title;
  editDescription.value = task.description;
  editIndex = index;
  editModal.show();
}

// Guardar cambios de tarea editada
function saveEdit() {
  const tasks = getTasks();
  tasks[editIndex].title = editTitle.value;
  tasks[editIndex].description = editDescription.value;
  saveTasks(tasks);
  editModal.hide();
  renderTasks();
}

// Marcar como completada
function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// Inicializar
renderTasks();