import { Component, computed, inject, input,  } from "@angular/core";
import type { User } from "../user/user.model";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskService } from "./tasks.service";

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
    imports: [TaskComponent, NewTaskComponent],
    providers:[TaskService]
    
})
export class TasksComponent {
    constructor(private taskService: TaskService) {}

    selectedUser = input<User|undefined>();
    isNewTaskVisible = false;

    selectedUserTasks = computed(() => {
        const userId = this.selectedUser()?.id;
        return userId ? this.taskService.getUserTasks(userId)() : [];
    });
     
    showNewTask = () => this.isNewTaskVisible=true;

    hiddeNewTask = () => this.isNewTaskVisible=false;

}