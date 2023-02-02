import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/api/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';
import { TodosService } from 'src/app/services/api/todos.service';
import { Todo } from 'src/app/models/TodoItem';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  // Container for all users
  users: User[] = [];
  // Container for table data
  displayedColumns: string[] = [];
  // Container for user data
  userDataById: Todo[] = [];

  constructor(private adminService: AdminService, private todosService: TodosService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // Get All Users
  getUsers() {
    this.adminService.getAllUsers()
      .subscribe(response => {
        this.users = response;

        if (this.users.length > 0) {
          this.displayedColumns = Object.keys(this.users[0]);

          return this.users;
        }
        alert('No users found.');

        return this.users;
      }),
      (error: string) => {
        alert('An error occured!');
        console.error(error);
      }
  }

  // Get user history
  userHistory(userId: string) {
    // Get all todo data by userId
    this.todosService.getTodos(userId)
      .subscribe(response => {
        this.userDataById = response ?? [];

        if(this.userDataById.length == 0){
          return alert('This user has not created any to do items yet.');
        }
        
        this.matDialog.open(HistoryComponent,
          {
            data: this.userDataById
          });
      }),
      (error: string) => {
        alert('An error occured!');
        console.error(error);
      }
  }
}
