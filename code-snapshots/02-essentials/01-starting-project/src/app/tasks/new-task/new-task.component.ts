import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task/task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})

export class NewTaskComponent {
selectedUserId = input<string>();
close = output<void>();
title = "";
summary = "";
dueDate = "";
private taskService = inject(TaskService);

onSubmit = () => {
  const userId = this.selectedUserId();
  if(userId) {
    
    this.taskService.addTask({
      title: this.title,
      summary: this.summary,
      dueDate: this.dueDate|| new Date().toISOString(),
      }, userId);
  }
  this.onClose();
}

  onClose = () => {
    this.close.emit();

  }
}
