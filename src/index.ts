interface Task {
    id:number;
    text:string;
    completed:boolean;
}

let tasks : Task[] = [];
let taskId = 0;

function addTask (taskListElement : HTMLElement, newTaskInput : HTMLInputElement) : void {
    const taskText = newTaskInput.value.trim();
    if(taskText==="") return ;

    const newTask : Task = {
        id : taskId++,
        text : taskText,
        completed : false
    }

    tasks.push(newTask);
    newTaskInput.value='';
    
    displayTasks(taskListElement);
}

function displayTasks(taskListElement : HTMLElement) : void{
    taskListElement.innerHTML = '';
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">Delete</button>
        `
        li.className = task.completed ? 'completed' : '';

        li.querySelector('span')?.addEventListener('click', () => {
            toggleTaskCompletion(task.id);
            displayTasks(taskListElement);
        })

        li.querySelector('button.delete')?.addEventListener('click', () => {
            deleteTask(task.id);
            displayTasks(taskListElement);
        })

        taskListElement.appendChild(li);
    })
}

function toggleTaskCompletion(task_id:number):void{
    const taskArray = tasks.filter((t) => t.id == task_id);
    const task = taskArray.length > 0 ? taskArray[0] : undefined;
    if(task){
        task.completed = !task.completed;
    }
}

function deleteTask(task_id:number) : void{
    tasks = tasks.filter((t) => t.id!==task_id);
}


document.addEventListener('DOMContentLoaded', () => {
    const taskListElement = document.getElementById('task-list') as HTMLElement;
    const newTaskInput = document.getElementById('new-task') as HTMLInputElement;
    const addTaskButton = document.getElementById('add-task') as HTMLButtonElement;

    addTaskButton.addEventListener('click', () => addTask(taskListElement, newTaskInput));
    newTaskInput.addEventListener('keypress', (e) => {
        if(e.key==='Enter') addTask(taskListElement, newTaskInput);
    });
});