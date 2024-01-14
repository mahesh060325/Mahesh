let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {
        const task = {
            id: Date.now(),
            text: taskInput.value,
            completed: false,
            timestamp: new Date().toISOString()
        };

        tasks.push(task);
        updateTaskList();
        updateTaskCounters();

        taskInput.value = "";
    }
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task ${task.completed ? 'completed' : ''}">
                ${task.text}<br>
                <span class="date">${formatDateTime(task.timestamp)}</span>
            </span>
            <button class="complete" onclick="toggleComplete(${task.id})"><i class="fas fa-check"></i>${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete" onclick="confirmDelete(${task.id})"><i class="fas fa-trash"></i>Delete</button>
            <button class="edit" onclick="editTask(${task.id})"><i class="fas fa-edit"></i>Edit</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        updateTaskList();
        updateTaskCounters();
        // Add reward points and special tasks logic here
    }
}

function confirmDelete(id) {
    const result = confirm("Are you sure you want to delete this task?");
    if (result) {
        deleteTask(id);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
    updateTaskCounters();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    updateTaskList();
    updateTaskCounters();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null) {
            task.text = newText;
            updateTaskList();
        }
    }
}

function updateTaskCounters() {
    const totalTasksCounter = document.getElementById("totalTasks");
    const completedTasksCounter = document.getElementById("completedTasks");

    totalTasksCounter.textContent = tasks.length;
    completedTasksCounter.textContent = tasks.filter(task => task.completed).length;
}

function formatDateTime(timestamp) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
    return formattedDate;
}

// Initial update of counters when the page loads
updateTaskCounters();
