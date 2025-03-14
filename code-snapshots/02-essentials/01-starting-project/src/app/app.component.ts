import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './data/dummy-users';
import { User } from './user/user.model';   
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUser = signal<User>(this.users[0]);

  onSelectUser = (id: string) => {
    const user = this.users.find((user) => user.id === id);
    if (user) {
    this.selectedUser.set(user);
    }
  };
}
