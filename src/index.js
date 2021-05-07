// Imports
import { Task } from "./Task";
import { Project } from "./Project";

let projects = [];
let allTasks = [];

let projectsContainer = document.querySelector("#projects");
let tasksContainer = document.querySelector("#tasks");
let addProjectButton = document.querySelector("#project-input-form button");
let addTaskButton = document.querySelector("#task-input-form button");

// Sample project creation
let testProject = new Project(
  "Todo List",
  "A dynamic project management application.",
  "May 10, 2021",
  []
);

// Sample task creation
let task1 = new Task(
  "Project setup",
  "Webpack setup and create Project and Task classes",
  "May 6, 2021",
  "High",
  "Use webpack",
  []
);

projects.push(testProject);
testProject.addTask(task1);
task1.toggleComplete();
console.log(projects);

// displayProjects
function displayProjects() {
  projectsContainer.innerHTML = "";

  projects.forEach((project, projectIndex) => {
    let projectDisplay = `
    <div className="project-card">
      <h3>Project #${projectIndex + 1}: ${
      project.title
    }</h3><button class="btn btn-delete-project" data-project-id="${projectIndex}">Delete</button>
      <p>${project.description}</p>
      <strong>Task List</strong>
      <ul>`;

    project.tasks.length > 0
      ? (projectDisplay += `${project.tasks.map((task, taskIndex) => {
          return `<li><strong>${task.title}</strong><button class="btn btn-delete" data-project="${projectIndex}" data-id="${taskIndex}">Delete</button> (<small>${task.dueDate}</small>)</li>`;
        })}`)
      : (projectDisplay += "<li><strong>No tasks to display.</strong></li>");

    projectDisplay += `</ul>
    </div>
    `;

    projectsContainer.innerHTML += projectDisplay;
  });

  addTaskEventListeners();
  addProjectEventListeners();
}

displayProjects();
// displayAllTasks
function displayAllTasks() {
  allTasks = [];
  projects.map((project) => {
    project.tasks.map((task) => {
      allTasks.push(task.title);
    });
  });

  console.log("ALL TASKS UPDATED:\n" + allTasks.join(" | "));
}
// addProject
addProjectButton.addEventListener("click", function (e) {
  e.preventDefault();
  let title = document.querySelector("#project-input-form input[name=title]")
    .value;
  let description = document.querySelector(
    "#project-input-form input[name=description]"
  ).value;
  let dueDate = document.querySelector(
    "#project-input-form input[name=dueDate]"
  ).value;
  let tasks = document.querySelector("#project-input-form input[name=tasks]")
    .value;

  let newProject = new Project(title, description, dueDate, []);
  projects.push(newProject);
  displayProjects();

  // addProjectEventListeners();
  generateDropdown(projects);
});

//addTask
addTaskButton.addEventListener("click", function (e) {
  e.preventDefault();

  let title = document.querySelector("#task-input-form input[name=title]")
    .value;
  let projectId = document.querySelector(
    "#task-input-form select[name=projectId]"
  ).value;
  let description = document.querySelector(
    "#task-input-form input[name=description]"
  ).value;
  let dueDate = document.querySelector("#task-input-form input[name=dueDate]")
    .value;
  let checklist = document.querySelector(
    "#task-input-form input[name=checklist]"
  ).value;
  let notes = document.querySelector("#task-input-form input[name=notes]")
    .value;
  let priority = document.querySelector("#task-input-form input[name=priority]")
    .value;

  let newTask = new Task(
    title,
    description,
    dueDate,
    priority,
    notes,
    [],
    false
  );

  console.log("PROJECTS ID:" + projectId);
  // TODO -> task should be assigned to a project using dropdown
  projects[projectId].addTask(newTask);

  displayAllTasks();
  displayProjects();
  addTaskEventListeners();
});

generateDropdown(projects);

// generateDropdown - creates dropdown based on existing projects to associate a task with
function generateDropdown(options) {
  let projectsDropdown = document.querySelector("select[name=projectId]");
  let index = 0;

  console.log("Dropdown to be create on " + projectsDropdown);

  // Clear current options
  projectsDropdown.innerHTML = "";

  options.forEach((option) => {
    console.log(option.title);
    // let dropdownOption = `<option value="${option.title}" data-id="${index}">${option.title}<option>`;
    let dropdownOption = document.createElement("option");
    dropdownOption.setAttribute("data-id", index);
    dropdownOption.value = index;
    dropdownOption.innerText = option.title;
    //projectsDropdown.innerHTML += dropdownOption;
    console.log(dropdownOption);
    projectsDropdown.appendChild(dropdownOption);
    index++;
  });
}

function addTaskEventListeners() {
  let deleteTaskButtons = [...document.querySelectorAll(`.btn-delete`)];

  deleteTaskButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      let projectIndex = e.target.getAttribute("data-project");
      let taskIndex = e.target.getAttribute("data-id");
      console.log(allTasks);
      console.log("PROJECT ID: " + projectIndex + " TASK INDEX " + taskIndex);
      projects[projectIndex].removeTask(taskIndex);
      displayAllTasks();
      displayProjects();
    });
  });
}

function addProjectEventListeners() {
  let deleteProjectsButtons = [
    ...document.querySelectorAll(".btn-delete-project"),
  ];

  deleteProjectsButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      alert("ACKNOWLEDGED");
      let projectIndex = e.target.getAttribute("data-project-id");
      console.log(allTasks);
      console.log("PROJECT ID: " + projectIndex);
      projects.splice(projectIndex, 1);
      displayAllTasks();
      displayProjects();
    });
  });
  //<button class="btn btn-delete-project" data-project-id="${projectIndex}">Delete</button>
}
