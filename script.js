
let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');

let arrayOfTasks = [];

localStorage.getItem('tasks') ? arrayOfTasks = JSON.parse(localStorage.getItem('tasks')) : arrayOfTasks = [];

getDataFromLocalStorage();

//Add Task
submit.onclick = function () {
  if(input.value !== '') {
    addTaskToArray(input.value);
    input.value = '';
  }
}


tasksDiv.addEventListener('click', (e) => {
  if(e.target.classList.contains('del')) {
    e.target.parentElement.remove();
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute('data-id'));
  }
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
})



function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = '';
  arrayOfTasks.forEach((task) => {
    let div = document.createElement('div');
    div.className = 'task';
    task.completed ? div.className = 'task done' : null;
    div.setAttribute('data-id', task.id);
    div.appendChild(document.createTextNode(task.title));
    
    let span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  })
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}


function getDataFromLocalStorage() {
  let data = window.localStorage.getItem('tasks');
  if(data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}



function deleteTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}



function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed ? arrayOfTasks[i].completed = false : arrayOfTasks[i].completed = true;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}