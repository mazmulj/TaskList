// Defining UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Function to load all all event listeners
loadEventListeners();

function loadEventListeners() {
    // Add task
    form.addEventListener('submit', addTask);
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
    taskInput.value = '';

    e.preventDefault();
}

