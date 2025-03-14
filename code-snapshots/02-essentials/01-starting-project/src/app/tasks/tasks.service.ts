import { Injectable, signal, computed } from '@angular/core';
import { NewTaskData, Task } from "./task/task.model";
import {dummyTasks} from "../data/dummy-tasks";

@Injectable()
export class TaskService {
    // Convert tasks to a signal
    private tasks = signal<Task[]>([]);

    constructor() {
        const tasks=localStorage.getItem('tasks');
        if(tasks) {
            this.tasks.set(JSON.parse(tasks));
        } else {
            this.tasks.set(dummyTasks);
            this.saveTasks()
        }
    }

    getUserTasks(userId: string) {
        return computed(() => this.tasks().filter(task => task.userId === userId));
    }

    addTask(taskData: NewTaskData, userId: string) {
        console.log(taskData, userId);
        this.tasks.update(tasks => [{ ...taskData, userId, id: crypto.randomUUID() },...tasks]);
        this.saveTasks()
    }

    completeTask(taskId: string) {
        // Update the tasks signal by filtering out the completed task
        this.tasks.update(tasks =>tasks.filter(task => task.id !== taskId));
        this.saveTasks()
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }
}
