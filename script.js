
let tasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();

    if (taskName === "") return;

    const task = {
        id: Date.now(),
        name: taskName,
        addedAt: new Date().toLocaleString(),
        completedAt: null,
    };

    tasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function completeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    const task = tasks.splice(taskIndex, 1)[0];
    task.completedAt = new Date().toLocaleString();
    completedTasks.push(task);
    renderTasks();
}

function deleteTask(id, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== id);
    } else {
        tasks = tasks.filter(task => task.id !== id);
    }
    renderTasks();
}

function editTask(id) {
    const newTaskName = prompt("Edit task name:");
    if (newTaskName === null || newTaskName.trim() === "") return;

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].name = newTaskName;
    } else {
        const completedTaskIndex = completedTasks.findIndex(task => task.id === id);
        if (completedTaskIndex !== -1) {
            completedTasks[completedTaskIndex].name = newTaskName;
        }
    }
    renderTasks();
}

function renderTasks() {
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");

    // Clear current task lists
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    // Render Pending Tasks
    tasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = `
            <span>${task.name} (Added: ${task.addedAt})</span>
            <div>
                <button class="complete" onclick="completeTask(${task.id})">Complete</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id}, false)">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(taskElement);
    });

    // Render Completed Tasks
    completedTasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.classList.add("completed");
        taskElement.innerHTML = `
            <span>${task.name} (Completed: ${task.completedAt})</span>
            <div>
                <button class="delete" onclick="deleteTask(${task.id}, true)">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(taskElement);
    });
}
