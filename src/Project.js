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

  removeTask(index) {
    console.log("BEFORE SPLICE: " + this.tasks);
    this.tasks.splice(index, 1);
    console.log("AFTER SPLICE: " + this.tasks);
  }
}

module.exports = { Project };
