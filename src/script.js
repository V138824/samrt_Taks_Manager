// 1. Page load zalya var purvi che tasks load kara
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let categoryInput = document.getElementById("categoryInput");

    let taskValue = taskInput.value.trim();
    let categoryValue = categoryInput.value;

    if (taskValue === '') {
        alert("Please enter a task!");
        return;
    }

    // Task object tayar kara
    const task = {
        id: Date.now(),
        text: taskValue,
        category: categoryValue
    };

    // Tasks local storage madhe save kara
    saveTask(task);

    // UI update kara
    renderTasks();

    // Input clean kara
    taskInput.value = "";
}

// Data local storage madhe save karnyathi function
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    tasks.push(task);
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Screen var sagle tasks dakhvanyasathi function
function renderTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

    taskList.innerHTML = ""; // List pahile saaf kara

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text} <small class="category-tag">(${task.category})</small></span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Remove</button>
        `;
        taskList.appendChild(li);
    });
}

// Task delete karnyathi function
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    renderTasks();
}