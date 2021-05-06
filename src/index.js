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
  let index = 1;
  projects.forEach((project) => {
    let projectDisplay = `
    <div className="project-card">
      <h3>Project #${index}: ${project.title}</h3>
      <p>${project.description}</p>
      <strong>Task List</strong>
      <ul>
        ${project.tasks.map((task) => {
          return `<li><strong>${task.title}</strong> (<small>${task.dueDate}</small>)</li>`;
        })}
      </ul>
    </div>
  `;
    projectsContainer.innerHTML += projectDisplay;
  });
}

displayProjects();

// displayAllTasks
projects.map((project) => {
  project.tasks.map((task) => {
    allTasks.push(task.title);
  });
});

console.log(allTasks);

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

  let newProject = new Project(title, description, dueDate, tasks);
  projects.push(newProject);
  console.log(projects);
});

//addTask
addTaskButton.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("add task button clicked.");
});
