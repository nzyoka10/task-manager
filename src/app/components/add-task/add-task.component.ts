// add-task.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  standalone: true,        // This is a standalone component
  imports: [FormsModule],   // Import FormsModule for ngModel
})
export class AddTaskComponent {
  // Holds the current input value
  title: string = '';

  // Emits the newly created Task to the parent component
  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  /**
   * Creates a new task via the service, then emits it to the parent
   */
  addTask(): void {
    // Prevent empty submissions
    if (!this.title.trim()) {
      return;
    }

    const newTask: Task = {
      title: this.title.trim(),
      completed: false,
    };

    // Save to backend, then notify parent and clear input
    this.taskService.addTask(newTask).subscribe((savedTask) => {
      this.taskAdded.emit(savedTask);
      this.title = '';
    });
  }
}
