let tasklist = [];
const taskInput = document.getElementById("taskInput");
const taskUl = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromStorage();
    displayTask();
    updateDeleteButtonState();
});

addTaskBtn.addEventListener("click", addTask);
deleteTaskBtn.addEventListener("click", deleteCompletedTasks);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        const newTask = { 
            title: taskName, 
            status: false, 
            date: new Date(),
            id: Date.now() // unique ID for each task
        };
        tasklist.push(newTask);
        displayTask();
        saveTasksToStorage();
        updateDeleteButtonState();
        taskInput.value = "";
        
        // Focus back to input for better UX
        taskInput.focus();
        
        // Add subtle feedback
        addTaskBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addTaskBtn.style.transform = '';
        }, 100);
    } else {
        // Simple alert for empty input
        alert('Please enter a task!');
    }
}

function deleteCompletedTasks() {
    const completedCount = tasklist.filter(task => task.status).length;
    if (completedCount === 0) return;
    
    if (confirm(`Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
        tasklist = tasklist.filter(task => !task.status);
        displayTask();
        saveTasksToStorage();
        updateDeleteButtonState();
    }
}

function switchTask(index) {
    tasklist[index].status = !tasklist[index].status;
    displayTask();
    saveTasksToStorage();
    updateDeleteButtonState();
}

function displayTask() {
    taskUl.innerHTML = "";
    
    if (tasklist.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No tasks yet. Add one above!";
        taskUl.appendChild(emptyMessage);
        return;
    }
    
    tasklist.forEach((myTask, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${myTask.status ? 'completed' : ''}`;

        // Checkbox for better UX
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = myTask.status;
        checkbox.className = "task-checkbox";
        checkbox.addEventListener("change", () => switchTask(index));

        // Task content container
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        // Task title
        const titleSpan = document.createElement("span");
        titleSpan.textContent = myTask.title;
        titleSpan.className = "task-title";

        // Date
        const dateSpan = document.createElement("span");
        dateSpan.textContent = `Added: ${myTask.date.toLocaleDateString()}`;
        dateSpan.className = "task-date";

        taskContent.appendChild(titleSpan);
        taskContent.appendChild(dateSpan);

        // Action buttons container
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "task-actions";

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.className = "delete-btn";
        delBtn.title = "Delete task";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteSingleTask(index);
        });

        actionsContainer.appendChild(delBtn);

        li.appendChild(checkbox);
        li.appendChild(taskContent);
        li.appendChild(actionsContainer);
        taskUl.appendChild(li);
    });
}



// Add this function
function deleteSingleTask(index) {
    const task = tasklist[index];
    if (confirm(`Delete "${task.title}"?`)) {
        tasklist.splice(index, 1);
        displayTask();
        saveTasksToStorage();
        updateDeleteButtonState();
    }
}

// Local storage functions
function saveTasksToStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(tasklist));
}

function loadTasksFromStorage() {
    const saved = localStorage.getItem('todoTasks');
    if (saved) {
        tasklist = JSON.parse(saved).map(task => ({
            ...task,
            date: new Date(task.date) // Convert back to Date object
        }));
    }
}

// Update delete button state
function updateDeleteButtonState() {
    const completedCount = tasklist.filter(task => task.status).length;
    deleteTaskBtn.disabled = completedCount === 0;
    deleteTaskBtn.textContent = completedCount > 0 
        ? `Clear Completed (${completedCount})` 
        : 'Clear Completed';
}