"use strict";
let tasks = [];
let taskId = 0;
function addTask(taskListElement, newTaskInput) {
    const taskText = newTaskInput.value.trim();
    if (taskText === "")
        return;
    const newTask = {
        id: taskId++,
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    newTaskInput.value = '';
    displayTasks(taskListElement);
}
function displayTasks(taskListElement) {
    taskListElement.innerHTML = '';
    tasks.forEach((task) => {
        var _a, _b;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">Delete</button>
        `;
        li.className = task.completed ? 'completed' : '';
        (_a = li.querySelector('span')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            toggleTaskCompletion(task.id);
            displayTasks(taskListElement);
        });
        (_b = li.querySelector('button.delete')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            deleteTask(task.id);
            displayTasks(taskListElement);
        });
        taskListElement.appendChild(li);
    });
}
function toggleTaskCompletion(task_id) {
    const taskArray = tasks.filter((t) => t.id == task_id);
    const task = taskArray.length > 0 ? taskArray[0] : undefined;
    if (task) {
        task.completed = !task.completed;
    }
}
function deleteTask(task_id) {
    tasks = tasks.filter((t) => t.id !== task_id);
}
document.addEventListener('DOMContentLoaded', () => {
    const taskListElement = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    addTaskButton.addEventListener('click', () => addTask(taskListElement, newTaskInput));
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter')
            addTask(taskListElement, newTaskInput);
    });
});
