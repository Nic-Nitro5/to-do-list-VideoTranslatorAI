import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/api/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';

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

  constructor(private adminService: AdminService, private matDialog: MatDialog) { }

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

  userHistory(userId: string) {
    this.matDialog.open(HistoryComponent,
      {
        data: userId
      });
  }
}
