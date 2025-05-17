// src/app/task.ts
export interface Task {
  id?: number;          // Optional, assigned by backend
  title: string;        // Task description
  completed: boolean;   // Task status (done or not)
}
