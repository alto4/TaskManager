// Imports
import { Task } from "./Task";
import { Project } from "./Project";

let tasks = document.querySelector("#tasks");

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

testProject.tasks.push(task1);
console.log(testProject);
