// Function to show the modal
function showModal() {
    const modal = document.getElementById('welcome-modal');
    const modalContent = modal.querySelector('.modal-content');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
        modalContent.classList.add('show');
    }, 10);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('welcome-modal');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('hide');
    setTimeout(() => {
        modal.classList.remove('show');
        modalContent.classList.remove('show', 'hide');
        modal.style.display = 'none';
    }, 300);
}

// Function to set the user's name and close the modal
function setUserName() {
    const userName = document.getElementById('user-name-input').value.trim();
    if (userName !== "") {
        const welcomeTextElement = document.getElementById('welcome-text');
        welcomeTextElement.textContent = `Welcome, ${userName}!`;
        closeModal();
    } else {
        alert("Please enter your name.");
    }
}

// Function to add a new task
function addTask() {
    const taskText = document.getElementById('new-task').value.trim();
    const taskDueDate = document.getElementById('task-due-date').value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const currentTime = new Date();
    const formattedTime = formatTime(currentTime);

    const dueTime = taskDueDate ? formatTime(new Date(taskDueDate)) : "No due time set";

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="icon">⬜</span>
        <div class="task-info">
            <span class="task-text">${taskText}</span>
            <div class="task-time">Created: ${formattedTime} | Due: ${dueTime}</div>
        </div>
        <div class="action-buttons">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    li.onclick = function(e) {
        if (!e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
            moveToOngoing(li);
        }
    };

    document.getElementById('incomplete').appendChild(li);
    document.getElementById('new-task').value = "";
    document.getElementById('task-due-date').value = "";
}

// Function to format the current time and date
function formatTime(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
}

// Function to move task to the Ongoing section
function moveToOngoing(taskElement) {
    taskElement.querySelector('.icon').textContent = '🔄';
    taskElement.onclick = null;
    taskElement.onclick = function(e) {
        if (!e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
            moveToComplete(taskElement);
        }
    };
    document.getElementById('ongoing').appendChild(taskElement);
}

// Function to move task to the Complete section
function moveToComplete(taskElement) {
    taskElement.querySelector('.icon').textContent = '✅';
    taskElement.querySelector('.task-time').style.textDecoration = 'line-through';
    taskElement.onclick = null;
    document.getElementById('complete').appendChild(taskElement);
}

// Function to delete a task
function deleteTask(button) {
    const taskElement = button.closest('li');
    taskElement.remove();
}

// Function to edit a task
function editTask(button) {
    const taskElement = button.closest('li');
    const taskTextElement = taskElement.querySelector('.task-text');
    const newTaskText = prompt("Edit your task:", taskTextElement.textContent);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskTextElement.textContent = newTaskText.trim();
    }
}

// Show the modal when the page loads
window.onload = showModal;
