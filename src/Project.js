// Project class - represents an individual Project instance
class Project {
  // Creates a new Project instance
  constructor(title, description, dueDate, tasks) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
  }

  // Add a new task to project
  addTask(task) {
    this.tasks.push(task);
  }

  // Remove a task from the project
  removeTask(index) {
    this.tasks.splice(index, 1);
  }
}

module.exports = { Project };
