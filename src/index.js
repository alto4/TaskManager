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
// testProject.addTask(task1);
task1.toggleComplete();

// displayProjects
function displayProjects() {
  projectsContainer.innerHTML = "";

  projects.forEach((project, projectIndex) => {
    let projectDisplay = `
    <div class="project-card">
      <h3>${project.title}<button class="btn btn-delete-project" data-project-id="${projectIndex}"><i class="fa fa-trash"></i></button></h3>
      <ul>`;

    project.tasks.length > 0
      ? (projectDisplay += `${project.tasks
          .map((task, taskIndex) => {
            console.log("TASK INDEX ->" + taskIndex);
            console.log("PROJECT INDEX" + projectIndex);
            return `<li><div><button class="btn-complete">O</button>${task.title}(<small>${task.dueDate}</small>)</div><div class="card-buttons"><button class="btn btn-delete" data-project="${projectIndex}" data-id="${taskIndex}"><i class="fa fa-trash"></i></button> <button class="btn btn-edit" data-project="${projectIndex}" data-id="${taskIndex}"><i class="fa fa-edit"></i></button></div></li>`;
          })
          .join("")}`)
      : (projectDisplay += "<li><strong>No tasks to display.</strong></li>");

    projectDisplay += `</ul>
    </div>
    `;

    projectsContainer.innerHTML += projectDisplay;
  });

  addProjectEventListeners();
  addTaskEventListeners();
  clearForms();
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

  addProjectEventListeners();
  displayProjects();
  document.querySelector("#project-input-form").style.display = "none";
  generateDropdown(projects);
});

//addTask
addTaskButton.addEventListener("click", function addTaskEvents(e) {
  e.preventDefault();
  document.querySelector("#task-input-form").style.display = "none";
  addNewTask();
});

function addNewTask() {
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

  // Add task to corresponding list
  projects[projectId].addTask(newTask);

  console.log("PROJECTS ARRAY UPDATED: " + projects);
  displayAllTasks();
  displayProjects();
}

generateDropdown(projects);

// generateDropdown - creates dropdown based on existing projects to associate a task with
function generateDropdown(options) {
  let projectsDropdown = document.querySelector("select[name=projectId]");
  let index = 0;

  // Clear current options
  projectsDropdown.innerHTML = "";

  options.forEach((option) => {
    let dropdownOption = document.createElement("option");
    dropdownOption.setAttribute("data-id", index);
    dropdownOption.value = index;
    dropdownOption.innerText = option.title;
    projectsDropdown.appendChild(dropdownOption);
    index++;
  });
}

function addTaskEventListeners() {
  let deleteTaskButtons = [...document.querySelectorAll(`.btn-delete`)];
  let editTaskButtons = [...document.querySelectorAll(".btn-edit")];
  let completeButtons = [...document.querySelectorAll(".btn-complete")];

  completeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      alert("COMPLETE");
    });
  });
  deleteTaskButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      let projectIndex = e.target.getAttribute("data-project");
      let taskIndex = e.target.getAttribute("data-id");
      console.log(
        "PROJECT INDEX: " +
          projectIndex +
          "TASK INDEX: " +
          taskIndex +
          projects.toString()
      );
      projects[projectIndex].removeTask(taskIndex);
      displayAllTasks();
      displayProjects();
    });
  });

  editTaskButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Update add button to edit
      let editButton = document.querySelector(".btn-add-task");
      editButton.innerText = "Edit Task";

      let projectIndex = e.target.getAttribute("data-project");
      let taskIndex = e.target.getAttribute("data-id");

      document.querySelector(
        "#task-input-form input[name=title]"
      ).value = projects[projectIndex].tasks[taskIndex].title.toString();
      document.querySelector(
        "#task-input-form select[name=projectId]"
      ).selectedIndex = projectIndex;
      document.querySelector(
        "#task-input-form input[name=description]"
      ).value = projects[projectIndex].tasks[taskIndex].description.toString();

      document.querySelector(
        "#task-input-form input[name=dueDate]"
      ).value = projects[projectIndex].tasks[taskIndex].dueDate.toString();
      let checklist = (document.querySelector(
        "#task-input-form input[name=checklist]"
      ).value = projects[projectIndex].tasks[taskIndex].checklist.toString());
      let notes = (document.querySelector(
        "#task-input-form input[name=notes]"
      ).value = projects[projectIndex].tasks[taskIndex].notes.toString());
      let priority = (document.querySelector(
        "#task-input-form input[name=priority]"
      ).value = projects[projectIndex].tasks[taskIndex].priority.toString());

      editButton.addEventListener("click", function addEditEvents(e) {
        e.preventDefault();
        projects[projectIndex].tasks[taskIndex].title = document.querySelector(
          "#task-input-form input[name=title]"
        ).value;
        console.log(
          "PROCESS EDIT NOW!" + projects[projectIndex].tasks[taskIndex].title
        );
        projects[projectIndex].tasks[taskIndex].title = document.querySelector(
          "#task-input-form input[name=title]"
        ).value;
        editButton.removeEventListener("click", addEditEvents);
        displayProjects();
      });
    });
  });
}

function addProjectEventListeners() {
  let deleteProjectsButtons = [
    ...document.querySelectorAll(".btn-delete-project"),
  ];

  deleteProjectsButtons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      let projectIndex = e.target.getAttribute("data-project-id");
      projects.splice(projectIndex, 1);
      displayAllTasks();
      displayProjects();
      generateDropdown(projects);
    });
  });
}
function clearForms() {
  let inputs = [...document.querySelectorAll("input")];
  let dropdownMenus = [...document.querySelectorAll("select")];

  inputs.forEach((input) => {
    input.value = "";
  });

  dropdownMenus.forEach((menu) => {
    menu.selectedIndex = 0;
  });
}

document.querySelector("#task-input-form").style.display = "none";
document.querySelector("#project-input-form").style.display = "none";

document.querySelector(".add-tasks").addEventListener("click", () => {
  document.querySelector("#task-input-form").style.display = "block";
  document
    .querySelector("#task-input-form")
    .setAttribute(
      "style",
      "position: absolute; top: 120px; left: 100px; width: 350px;  "
    );
});

document.querySelector(".add-projects").addEventListener("click", () => {
  document.querySelector("#project-input-form").style.display = "block";
  document
    .querySelector("#project-input-form")
    .setAttribute(
      "style",
      "position: absolute; top: 120px; left: 100px; width: 350px;  "
    );
});
