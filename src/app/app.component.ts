// src/app/app.component.ts
import { Component } from '@angular/core';
import { AddTaskComponent } from "./components/add-task/add-task.component";
import { TaskListComponent } from "./components/task-list/task-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AddTaskComponent, TaskListComponent]
})
export class AppComponent {
  title = 'task-manager';
}
