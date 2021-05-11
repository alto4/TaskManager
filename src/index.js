// Imports
import { Task } from './Task';
import { Project } from './Project';

let projects = [];
if (localStorage.getItem('projects')) {
  let tempProjects = JSON.parse(localStorage.getItem('projects'));
  console.log(projects);

  tempProjects.forEach((project) => {
    let tempTasks = [];
    project.tasks.forEach((task) => {
      let tempTask = new Task(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.notes,
        task.checklist,
        task.complete
      );

      tempTasks.push(tempTask);
    });
    let storedProject = new Project(
      project.title,
      project.description,
      project.dueDate,
      tempTasks
    );

    projects.push(storedProject);
  });
}

let allTasks = [];

let projectsContainer = document.querySelector('#projects');
let tasksContainer = document.querySelector('#tasks');
let addProjectButton = document.querySelector('#project-input-form button');
let addTaskButton = document.querySelector('#task-input-form button');

// displayProjects - renders all projects and associated list of tasks into DOM as project cards
function displayProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));

  // Clear projects container and regenerate each project card
  projectsContainer.innerHTML = '';

  if (projects.length > 0) {
    projects.forEach((project, projectIndex) => {
      let projectDisplay = `
    <div class="project-card">
      <h3>${project.title}<div><button class="btn btn-add-project-task" data-project-id="${projectIndex}"><i class="fa fa-plus"></i></button><button class="btn btn-delete-project" data-project-id="${projectIndex}"><i class="fa fa-trash"></i></button></div></h3>
      <ul>`;

      // If no tasks have been added, inform user, otherwise map over all tasks and render into DOM
      project.tasks.length > 0
        ? (projectDisplay += `${project.tasks
            .map((task, taskIndex) => {
              return `<li><div><button class="btn-complete"  data-project="${projectIndex}" data-id="${taskIndex}">O</button>${
                task.complete ? '<del>' : ''
              }${task.title}${task.complete ? '</del>' : ''}<small>(${
                task.dueDate
              })</small></div><div class="card-buttons"><button class="btn btn-delete" data-project="${projectIndex}" data-id="${taskIndex}"><i class="fa fa-trash"></i></button> <button class="btn btn-edit" data-project="${projectIndex}" data-id="${taskIndex}"><i class="fa fa-edit"></i></button></div></li>`;
            })
            .join('')}`)
        : (projectDisplay += '<li><strong>No tasks to display.</strong></li>');

      projectDisplay += `</ul>
    </div>
    `;

      projectsContainer.innerHTML += projectDisplay;
    });
  }

  // Add all event listeners to DOM element buttons and clear form back to default state
  addProjectEventListeners();
  addTaskEventListeners();
  clearForms();
}

// displayAllTasks - combines all tasks from all projects and creates a meta task list
function displayAllTasks() {
  allTasks = [];
  projects.map((project) => {
    project.tasks.map((task) => {
      allTasks.push(task.title);
    });
  });

  // Show amalgomated task list
  console.log('All tasks as combined array: ' + allTasks);
}

// Create new project - adds project to display using information provided in form upon click of new project button
addProjectButton.addEventListener('click', function (e) {
  e.preventDefault();

  // Get form values
  let title = document.querySelector(
    '#project-input-form input[name=title]'
  ).value;
  let description = document.querySelector(
    '#project-input-form input[name=description]'
  ).value;
  let dueDate = document.querySelector(
    '#project-input-form input[name=dueDate]'
  ).value;
  let tasks = document.querySelector(
    '#project-input-form input[name=tasks]'
  ).value;

  // Create new Project instance and push to overall projects array
  let newProject = new Project(title, description, dueDate, []);
  projects.push(newProject);

  // Add associated event listeners, re-render updated projects in the DOM, then generate a dynamic dropdown
  addProjectEventListeners();
  displayProjects();

  //TODO: Refactor to use show/hide form function
  document.querySelector('#project-input-form').style.display = 'none';
  generateDropdown(projects);
});

// Create new task - adds task to display using information provided in form upon click of new task button
addTaskButton.addEventListener('click', function addTaskEvents(e) {
  e.preventDefault();
  // TODO: Refactor to use display/hide form function
  document.querySelector('#task-input-form').style.display = 'none';
  addNewTask();
});

// addNewTask - Create new task - adds task to display using information provided in form
function addNewTask() {
  let title = document.querySelector(
    '#task-input-form input[name=title]'
  ).value;
  let projectId = document.querySelector(
    '#task-input-form select[name=projectId]'
  ).value;
  let description = document.querySelector(
    '#task-input-form input[name=description]'
  ).value;
  let dueDate = document.querySelector(
    '#task-input-form input[name=dueDate]'
  ).value;
  let checklist = document.querySelector(
    '#task-input-form input[name=checklist]'
  ).value;
  let notes = document.querySelector(
    '#task-input-form input[name=notes]'
  ).value;
  let priority = document.querySelector(
    '#task-input-form input[name=priority]'
  ).value;

  // Generate new task based on input provided
  let newTask = new Task(
    title,
    description,
    dueDate,
    priority,
    notes,
    [],
    false
  );

  // Add task to corresponding project task list based on dropdown selection
  projects[projectId].addTask(newTask);

  // Rerender all tasks and projects to show updated list with new task added
  displayAllTasks();
  displayProjects();
}

// generateDropdown - creates dropdown based on existing projects to associate a task with
function generateDropdown(options) {
  let projectsDropdown = document.querySelector('select[name=projectId]');

  // Clear current options
  projectsDropdown.innerHTML = '';

  if (options.length > 0) {
    // Generate dropdown menu based on all current project titles
    options.forEach((option, index) => {
      let dropdownOption = document.createElement('option');
      dropdownOption.setAttribute('data-id', index);
      dropdownOption.value = index;
      dropdownOption.innerText = option.title;
      projectsDropdown.appendChild(dropdownOption);
      index++;
    });
  }
}

// addTaskEventListeners - adds event listeners for complete/incomplete, edit, and delete buttons for each individual task
function addTaskEventListeners() {
  let deleteTaskButtons = [...document.querySelectorAll(`.btn-delete`)];
  let editTaskButtons = [...document.querySelectorAll('.btn-edit')];
  let completeButtons = [...document.querySelectorAll('.btn-complete')];

  // Complete/Incomplete button events
  completeButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      let projectIndex = e.target.getAttribute('data-project');
      let taskIndex = e.target.getAttribute('data-id');

      // Mark targetted task as complete
      projects[projectIndex].tasks[taskIndex].toggleComplete();

      // Rerender display to show update
      displayAllTasks();
      displayProjects();
    });
  });

  // Delete button events
  deleteTaskButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      let projectIndex = e.target.getAttribute('data-project');
      let taskIndex = e.target.getAttribute('data-id');

      // Remove task targetted from project task list
      projects[projectIndex].removeTask(taskIndex);

      // Rerender display to show update
      displayAllTasks();
      displayProjects();
    });
  });

  // Edit task button events
  editTaskButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Update add button to edit
      let addButton = document.querySelector('.btn-add-task');
      let editButton = document.createElement('button');
      editButton.classList += 'btn btn-edit-task';
      editButton.innerText = 'Edit Task';

      if (addButton) {
        document
          .querySelector('#task-input-form')
          .replaceChild(editButton, addButton);
      }

      let projectIndex = e.target.getAttribute('data-project');
      let taskIndex = e.target.getAttribute('data-id');

      // Populate form values with task details stored in projects array
      document.querySelector('#task-input-form input[name=title]').value =
        projects[projectIndex].tasks[taskIndex].title.toString();
      document.querySelector(
        '#task-input-form select[name=projectId]'
      ).selectedIndex = projectIndex;
      document.querySelector('#task-input-form input[name=description]').value =
        projects[projectIndex].tasks[taskIndex].description.toString();

      document.querySelector('#task-input-form input[name=dueDate]').value =
        projects[projectIndex].tasks[taskIndex].dueDate.toString();
      let checklist = (document.querySelector(
        '#task-input-form input[name=checklist]'
      ).value = projects[projectIndex].tasks[taskIndex].checklist.toString());
      let notes = (document.querySelector(
        '#task-input-form input[name=notes]'
      ).value = projects[projectIndex].tasks[taskIndex].notes.toString());
      let priority = (document.querySelector(
        '#task-input-form input[name=priority]'
      ).value = projects[projectIndex].tasks[taskIndex].priority.toString());

      displayTaskForm();

      // Upon edit button click, update the corresponding task to reflect updated data
      editButton.addEventListener('click', function addEditEvents(e) {
        e.preventDefault();
        projects[projectIndex].tasks[taskIndex].title = document.querySelector(
          '#task-input-form input[name=title]'
        ).value;
        projects[projectIndex].tasks[taskIndex].description =
          document.querySelector(
            '#task-input-form input[name=description]'
          ).value;
        projects[projectIndex].tasks[taskIndex].dueDate =
          document.querySelector('#task-input-form input[name=dueDate]').value;
        projects[projectIndex].tasks[taskIndex].checklist =
          document.querySelector(
            '#task-input-form input[name=checklist]'
          ).value;
        projects[projectIndex].tasks[taskIndex].notes = document.querySelector(
          '#task-input-form input[name=notes]'
        ).value;
        projects[projectIndex].tasks[taskIndex].priority =
          document.querySelector('#task-input-form input[name=priority]').value;

        // Remove edit button event before rerendering tasks
        document
          .querySelector('#task-input-form')
          .replaceChild(addButton, editButton);
        displayProjects();
      });
    });
  });
}

// addProjectEventListeners - adds event listeners for each project card's buttons
function addProjectEventListeners() {
  let deleteProjectsButtons = [
    ...document.querySelectorAll('.btn-delete-project'),
  ];

  // Add delete functionality to each project delete button
  deleteProjectsButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      // Get the target project id and delete from projects array
      let projectIndex = e.target.getAttribute('data-project-id');
      projects.splice(projectIndex, 1);

      // Rerender update projects/tasks in the DOM and generate an updated dropdown menu
      displayAllTasks();
      displayProjects();
      generateDropdown(projects);
    });
  });

  const addProjectTaskButtons = [
    ...document.querySelectorAll('.btn-add-project-task'),
  ];

  addProjectTaskButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      console.log(
        'test, project index #' + e.target.getAttribute('data-project-id')
      );

      clearForms();
      displayTaskForm();
      let projectIndex = e.target.getAttribute('data-project-id');
      let taskForm = document.querySelector('#task-input-form select');

      taskForm.selectedIndex = projectIndex;
    });
  });
}

// Swap out potential edit button back to add button
function resetAddButton() {
  let editButton = document.querySelector('.btn-edit-task');
  let addButton = document.createElement('button');
  addButton.classList += 'btn btn-add-task';
  addButton.innerText = 'Add Task';

  if (editButton) {
    document
      .querySelector('#task-input-form')
      .replaceChild(addButton, editButton);
  }
}

// clearForms - resets all form controls to default state
function clearForms() {
  let inputs = [...document.querySelectorAll('input')];
  let dropdownMenus = [...document.querySelectorAll('select')];

  inputs.forEach((input) => {
    input.value = '';
  });

  // Reset all dropdowns to first index
  dropdownMenus.forEach((menu) => {
    menu.selectedIndex = 0;
  });

  resetAddButton();
}

// TODO: Break into display/show form functions for easy resuse

function addFormEventListeners() {
  document.querySelector('#task-input-form').style.display = 'none';
  document.querySelector('#project-input-form').style.display = 'none';

  document
    .querySelector('.add-tasks')
    .addEventListener('click', displayTaskForm);

  document
    .querySelector('.add-projects')
    .addEventListener('click', displayProjectForm);
}

addFormEventListeners();

function displayTaskForm() {
  document.querySelector('#task-input-form').style.display = 'block';
  document
    .querySelector('#task-input-form')
    .setAttribute(
      'style',
      'position: absolute; top: 120px; left: 0; width: 320px;  '
    );

  addFormExitEvents();
}

function displayProjectForm() {
  document.querySelector('#project-input-form').style.display = 'block';
  document
    .querySelector('#project-input-form')
    .setAttribute(
      'style',
      'position: absolute; top: 120px; left: 0; width: 320px;  '
    );

  addFormExitEvents();
}

function addFormExitEvents() {
  document.querySelectorAll('.btn-exit').forEach((button) => {
    button.addEventListener('click', (e) => {
      abandonFormEntry();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      abandonFormEntry();
    }
  });
}

function abandonFormEntry() {
  clearForms();
  document.querySelector('#project-input-form').style.display = 'none';
  document.querySelector('#task-input-form').style.display = 'none';

  let editButton = document.querySelector('.btn-edit-task');
  let addButton = document.createElement('button');
  addButton.classList += 'btn btn-add-task';
  addButton.innerText = 'Add Task';

  if (editButton)
    document
      .querySelector('#task-input-form')
      .replaceChild(addButton, editButton);
}

// Initial display of projects
displayProjects();
generateDropdown(projects);
