// Task class
class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    complete = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.complete = complete;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}

module.exports = { Task };
