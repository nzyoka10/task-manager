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
  imports: [CommonModule, AddTaskComponent], // Add required components/modules
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  // Load all tasks when page loads
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  // Add new task to the list (triggered by child)
  addTaskToList(newTask: Task): void {
    this.tasks.push(newTask);
  }

  // Delete task from list
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  // Toggle task complete/incomplete
  toggleComplete(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }
}
