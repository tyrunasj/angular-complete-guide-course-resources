import { Component, inject, input, output } from '@angular/core';
import type { Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component'; 
import { DatePipe } from '@angular/common';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task = input.required<Task>();
  complete = output<string>();
  taskService = inject(TaskService)

  onCompleteTask = () => {
    this.taskService.completeTask(this.task().id);
  }
}
