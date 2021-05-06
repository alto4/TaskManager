// Project class
class Project {
  constructor(title, description, dueDate, tasks) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.tasks = tasks;
  }
}

module.exports = { Project };
