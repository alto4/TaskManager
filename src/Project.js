// Project class
class Project {
  constructor(title, description, dueDate, tasks) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

module.exports = { Project };
