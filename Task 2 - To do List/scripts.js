document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                newTaskInput.value = '';
            }
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '✓';
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        const editButton = document.createElement('button');
        editButton.innerHTML = '✎';
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit Task', taskContent.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskContent.textContent = newText;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '✗';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskButtons);

        taskList.appendChild(taskItem);
    }
});
