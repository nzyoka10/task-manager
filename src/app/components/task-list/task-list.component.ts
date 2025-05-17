// task-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../task.service';
import { Task } from '../../task';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true, // Mark component as standalone
  imports: [CommonModule, AddTaskComponent], // Import required modules/components
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  // Load all tasks when the page loads
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Add new task to the list
  addTaskToList(newTask: Task): void {
    this.tasks.push(newTask);
    this.showToast('successToast'); // Show success notification
  }

  // Delete a task from the list
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.showToast('deleteToast'); // Show delete notification
    });
  }

  // Toggle task complete/incomplete
  toggleComplete(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }

  // Show Bootstrap toast notification
  showToast(toastId: string): void {
    const toastEl = document.getElementById(toastId);
    if (toastEl) {
      const toast = new (window as any).bootstrap.Toast(toastEl);
      toast.show();
    }
  }
}
