import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/api/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Creating a new user
  userName: string = "";
  userEmail: string = "";
  userPassword: string = "";
  admin: boolean = false;

  // User object
  user: User = {
    name: this.userName,
    email: this.userEmail,
    password: this.userPassword,
    admin: this.admin
  };

  constructor(private registerService: RegisterService, private router: Router) { }

  registerUser() {

    if (this.userName.trim().length > 0 && this.userEmail.trim().length > 0 && this.userPassword.trim().length > 0) {
      this.user = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        admin: this.admin
      };

      this.registerService.postUser(this.user)
        .subscribe(response => {
          // Clear the input fields
          this.userEmail = "";
          this.userPassword = "";
          alert('User added successfully!');
          // Redirect to login page
          return this.router.navigate(['/login']);
        }),
        (error: string) => {
          alert('An error occured!');
          console.error(error);
        }
    } else {
      return alert('Please supply an email and password!');
    }
  }
}
