// Imports
import { Task } from "./Task";
import { Project } from "./Project";

let projects = [];
let allTasks = [];
let projectsContainer = document.querySelector("#projects");
let tasksContainer = document.querySelector("#tasks");

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
testProject.tasks.push(task1);
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
