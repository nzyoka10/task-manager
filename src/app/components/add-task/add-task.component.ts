// add-task.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  standalone: true,
  imports: [FormsModule],
})
export class AddTaskComponent {
  title: string = '';

  // This will send the new task to the parent component
  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  // Add new task to the backend and emit to parent
  addTask(): void {
    if (!this.title.trim()) return;

    const newTask: Task = {
      title: this.title,
      completed: false,
    };

    // Call service to save task to the server
    this.taskService.addTask(newTask).subscribe((savedTask) => {
      this.taskAdded.emit(savedTask); // Send task to parent
      this.title = ''; // Clear input
    });
  }
}
