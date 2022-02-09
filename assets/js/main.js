const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');


function createLi(){
    const li = document.createElement('li');
    return li;
}
btnTask.addEventListener('click', function(e){
    if(!inputTask.value) return;
    createTask(inputTask.value);
});
inputTask.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTask.value)return;
        createTask(inputTask.value);
    }
});

function createTask(textInput){
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    clearInput();
    createDeleteBtn(li);
}
function clearInput(){
    inputTask.value = '';
    inputTask.focus();
}
function createDeleteBtn(li){
    li.innerText += ' '; 
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Delete';
    btnDelete.setAttribute('class', 'delete');
    li.appendChild(btnDelete);
}
document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('delete')){
        el.parentElement.remove();
    }
    saveTasks();
});
function saveTasks(){
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for(let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        taskList.push(taskText);
    }
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
}
function addSavedTasks(){
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);

    for (let task of taskList){
        createTask(task);
    }
}
addSavedTasks();