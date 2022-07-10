const input = document.getElementById('input');
const addTaskBtn = document.getElementById('addTask');
const listTasks = document.getElementById('list-container');
const btnDelete = document.getElementById("btnDelete");

let tasks = [];

recuperarLocalStorage();

addTaskBtn.addEventListener('click', addTasks);

function addTasks() {

  const task = input.value;
  
  if (task === '') {
    showError('La tarea esta vacia');
    return;
  }

  if (tasks.some((item) => task === item.task)) {
    alreadyExist('La tarea ya existe');
    return;
  }

  const taskObj = {
    task: task,
    id: Date.now(),
  };

  tasks = [...tasks, taskObj];
  
  createHTML();

  input.value = ''
}


function createHTML() {
  listTasks.innerHTML = ""

    tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `${task.task}<span data-id='${task.id}'>X</span>`;
    listTasks.appendChild(li);  
  });

  sendLocalStorage();

}
    
  function showError(error) {
    const msgError = document.createElement('p');
    msgError.textContent = error;
    msgError.classList.add('error');
    listTasks.appendChild(msgError);
    setTimeout(() => {
      msgError.remove();
    }, 2000); 
  }

  function alreadyExist(exists) {
    const msgExists = document.createElement('p');
    msgExists.textContent = exists;
    msgExists.classList.add('exists');
    listTasks.appendChild(msgExists);
    setTimeout(() => {
      msgExists.remove();
    }, 2000);
  }
  
  function sendLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function recuperarLocalStorage() {
  document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    createHTML();
    listTasks.addEventListener('click', deleteTask);
  });
}

function deleteTask(e) {
  if (e.target.tagName === 'SPAN') {
    const deleteId = parseInt(e.target.getAttribute('data-id'));
    tasks = tasks.filter((task) => task.id !== deleteId);
    createHTML();
  }
}

btnDelete.addEventListener("click", borrar)

function borrar () {
  tasks = []
  createHTML()
}