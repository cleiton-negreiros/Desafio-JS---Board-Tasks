window.onload = function() { // Waits for the page to load before running the script
    const newTaskForm = document.getElementById('new-task-form');
    const taskList = document.getElementById('task-list');

    // Add submit event to the form
    newTaskForm.addEventListener('submit', handleFormSubmit);

    // Handles the form submit event
    function handleFormSubmit(event) {
        event.preventDefault();

        const taskName = getTaskName();
        const taskLabel = getTaskLabel();

        const taskItem = createTaskItem(taskName, taskLabel);
        appendTaskItem(taskItem);

        clearForm();
        updateConcludedTasksCount();
    }

    // Gets the task name from the input
    function getTaskName() {
        return document.getElementById('task-name').value;
    }

    // Gets the task label from the input
    function getTaskLabel() {
        return document.getElementById('task-label').value;
    }

    // Creates a new task item
    function createTaskItem(taskName, taskLabel) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskDetails = createTaskDetails(taskName, taskLabel);
        const concludeBtn = createConcludeButton();

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(concludeBtn);

        addConcludeButtonListener(concludeBtn, taskItem, taskDetails);

        return taskItem;
    }

    // Creates the task details
    function createTaskDetails(taskName, taskLabel) {
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskTitle = createTaskTitle(taskName);
        const taskDate = createTaskDate(taskLabel);

        taskDetails.appendChild(taskTitle);
        taskDetails.appendChild(taskDate);

        return taskDetails;
    }

    // Creates the task title
    function createTaskTitle(taskName) {
        const taskTitle = document.createElement('h2');
        taskTitle.textContent = taskName;
        return taskTitle;
    }

    // Creates the task date
    function createTaskDate(taskLabel) {
        const taskLabelElement = createTaskLabel(taskLabel);
        const taskDate = document.createElement('p');
        taskDate.appendChild(taskLabelElement);
        taskDate.appendChild(document.createTextNode(` Criado em: ${new Date().toLocaleDateString()}`));
        return taskDate;
    }

    // Creates the task label
    function createTaskLabel(taskLabel) {
        const taskLabelElement = document.createElement('h1');
        taskLabelElement.className = 'label';
        taskLabelElement.textContent = taskLabel;
        return taskLabelElement;
    }

    // Creates the conclude button
    function createConcludeButton() {
        const concludeBtn = document.createElement('button');
        concludeBtn.className = 'conclude-btn';
        concludeBtn.textContent = 'Concluir';
        return concludeBtn;
    }

    // Adds the click event to the conclude button
    function addConcludeButtonListener(concludeBtn, taskItem, taskDetails) {
        concludeBtn.addEventListener('click', function() {
            markTaskAsConcluded(taskItem, taskDetails);
            updateConcludedTasksCount();
        });
    }

    // Marks the task as concluded
    function markTaskAsConcluded(taskItem, taskDetails) {
        taskItem.classList.add('concluded');
        taskDetails.querySelector('h2').classList.add('concluded');
        concludeBtn.remove();

        const concludedIcon = createConcludedIcon();
        taskItem.appendChild(concludedIcon);
    }

    // Creates the concluded icon
    function createConcludedIcon() {
        const concludedIcon = document.createElement('h1');
        concludedIcon.className = 'concluded-icon';
        concludedIcon.textContent = '✔';
        return concludedIcon;
    }

    // Appends the task item to the task list
    function appendTaskItem(taskItem) {
        taskList.appendChild(taskItem);
    }

    // Clears the form fields
    function clearForm() {
        document.getElementById('task-name').value = '';
        document.getElementById('task-label').value = '';
    }

    // Updates the count of concluded tasks
    function updateConcludedTasksCount() {
        const concludedTasks = document.querySelectorAll('.task-item.concluded');
        document.getElementById('concluded-tasks-count').textContent = `${concludedTasks.length} tarefas${concludedTasks.length > 1 ? 's' : ''} concluídas`;
    }
};
