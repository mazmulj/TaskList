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
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear all tasks
    clearBtn.addEventListener('click', clearTask);
    // Filter tasks
    filter.addEventListener('keyup', filterTask);
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

// Remove task
function removeTask(e){
     if(e.target.parentElement.classList.contains('delete-item')){
         if (confirm('Confirm to delete task.')){
         e.target.parentElement.parentElement.remove();
     }
    }
}

// Clear tasks
function clearTask(){
     while (taskList.firstChild){
         taskList.removeChild(taskList.firstChild);
     }
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