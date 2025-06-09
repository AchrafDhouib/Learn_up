import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/services/user.service';

@Component({
  selector: 'app-user-list-admin',
  templateUrl: './user-list-admin.component.html',
  styleUrls: ['./user-list-admin.component.css']
})
export class UserListAdminComponent implements OnInit {
  users: User[] = [];
  searchText: string = '';
  selectedRole: 'teacher' | 'student' = 'teacher';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.selectedRole).subscribe({
      next: data => this.users = data,
      error: err => console.error('Erreur de chargement:', err)
    });
  }

  filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  changeRole(role: 'teacher' | 'student') {
    this.selectedRole = role;
    this.loadUsers();
  }

  toggleActivation(user: User): void {
    const action = user.is_active ? this.userService.deactivateUser(user.id) : this.userService.activateUser(user.id);
    action.subscribe({
      next: () => this.loadUsers(),
      error: err => console.error('Erreur:', err)
    });
  }
}
