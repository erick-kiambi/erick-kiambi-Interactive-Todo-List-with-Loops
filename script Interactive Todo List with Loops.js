script.js
let tasks = [];

// Add a task
function addTask() {

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    displayTasks();
}

// Delete task
function deleteTask(id) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }

    }

    displayTasks();

}

// Toggle completed
function toggleComplete(id) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks[i].completed = !tasks[i].completed;
            break;

        }

    }

    displayTasks();

}

// Display tasks
function displayTasks() {

    const taskList = document.getElementById("tasksList");
    const stats = document.getElementById("stats");

    if (tasks.length === 0) {

        taskList.innerHTML =
            '<p class="empty-message">No tasks yet. Add one above!</p>';

        stats.innerHTML =
            "<p>Total Tasks: <strong>0</strong></p>";

        return;
    }

    let html = "";

    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {
            completed++;
        }

        html += `
        <div class="task-item">

            <div class="task-left">

                <input
                    type="checkbox"
                    ${tasks[i].completed ? "checked" : ""}
                    onclick="toggleComplete(${tasks[i].id})"
                >

                <span class="${tasks[i].completed ? "completed" : ""}">
                    ${i + 1}. ${tasks[i].text}
                </span>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${tasks[i].id})">
                Delete
            </button>

        </div>
        `;
    }

    taskList.innerHTML = html;

    const remaining = tasks.length - completed;

    stats.innerHTML = `
        <p>Total Tasks: <strong>${tasks.length}</strong></p>
        <p>Completed: <strong>${completed}</strong></p>
        <p>Remaining: <strong>${remaining}</strong></p>
    `;
}

// Clear all
function clearAll() {

    if (tasks.length === 0) {
        return;
    }

    if (confirm("Delete all tasks?")) {

        tasks = [];
        displayTasks();

    }

}