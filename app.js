// Defining UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Function to load all all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear all tasks
    clearBtn.addEventListener('click', clearTask);
    // Filter tasks
    filter.addEventListener('keyup', filterTask);
}

// DOM load content
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        // Create a link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link); 

        // Add li to tasklist
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add task');
    }

    // Add task to list
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link); 

    // Add li to tasklist
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLS(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

// Store task
function storeTaskInLS(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove task
function removeTask(e){
     if(e.target.parentElement.classList.contains('delete-item')){
         if (confirm('Confirm to delete task.')){
         e.target.parentElement.parentElement.remove();

         // remove from local storage
         removeTaskFromLS(e.target.parentElement.parentElement);
     }
    }
}

// Remove task from local storage
function removeTaskFromLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTask(){
     while (taskList.firstChild){
         taskList.removeChild(taskList.firstChild);
     }

     clearTaskFromLS();
}

// Clear task from local storage
function clearTaskFromLS(){
    localStorage.clear();
}

// Filter tasks
function filterTask(e){
     const text = e.target.value.toLowerCase();

     document.querySelectorAll('.collection-item').forEach(function(task){
         const item = task.firstChild.textContent;
         if (item.toLowerCase().indexOf(text) != -1){
             task.style.display = 'block';
         }
         else{
             task.style.display = 'none';
         }
     });
}