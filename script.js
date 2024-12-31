window.onload = function() { // Execute the code below when the page finishes loading
    const newTaskForm = document.getElementById('new-task-form'); // Select the task addition form
    const taskList = document.getElementById('task-list'); // Select the task list

    // Add submit event to the form
    newTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskName = document.getElementById('task-name').value; // Select the value of the task name input
        const taskLabel = document.getElementById('task-label').value; // Select the value of the task label input

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskTitle = document.createElement('h2');
        taskTitle.textContent = taskName;

        const taskLabelElement = document.createElement('h1');
        taskLabelElement.className = 'label';
        taskLabelElement.textContent = taskLabel;

        // Add creation date
        const taskDate = document.createElement('p');
        taskDate.appendChild(taskLabelElement);
        taskDate.appendChild(document.createTextNode(` Created on: ${new Date().toLocaleDateString()}`));

        // Add conclusion button
        const concludeBtn = document.createElement('button');
        concludeBtn.className = 'conclude-btn';
        concludeBtn.textContent = 'Conclude';

        // Add elements to the screen
        taskDetails.appendChild(taskTitle);
        taskDetails.appendChild(taskDate);
        taskItem.appendChild(taskDetails);
        taskItem.appendChild(concludeBtn);

        taskList.appendChild(taskItem); // Add the task to the task list

        document.getElementById('task-name').value = ''; // Clear the task name input
        document.getElementById('task-label').value = ''; // Clear the task label input

        // Add conclusion event
        concludeBtn.addEventListener('click', function() {
            taskItem.classList.add('concluded');
            taskTitle.classList.add('concluded');
            concludeBtn.remove(); // Remove the conclusion button

            const concludedIcon = document.createElement('h1');
            concludedIcon.className = 'concluded-icon';
            concludedIcon.textContent = '✔';
            taskItem.appendChild(concludedIcon);

            updateConcludedTasksCount();
        });

        updateConcludedTasksCount();
    });

    // Function to update the count of concluded tasks
    function updateConcludedTasksCount() {
        const concludedTasks = document.querySelectorAll('.task-item.concluded'); // Select all concluded tasks
        document.getElementById('concluded-tasks-count').textContent = `${concludedTasks.length} task${concludedTasks.length > 1 ? 's' : ''} concluded`;
    }
};
