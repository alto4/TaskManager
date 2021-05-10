// Task class - represents an invidual Task instance
class Task {
  // Creates a new task instance
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

  // Toggles a project task as complete/incomplete
  toggleComplete() {
    this.complete = !this.complete;
  }
}

module.exports = { Task };
