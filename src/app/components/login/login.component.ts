import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/api/login.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  data: Object = {};
  userEmail: string = "";
  userPassword: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  loginUser() {
    if (this.userEmail.trim().length > 0 && this.userPassword.trim().length > 0) {
      this.data = {
        email: this.userEmail,
        password: this.userPassword
      }
      // Check if user credentials match any stored users
      this.loginService.loginUser(this.data)
        .subscribe(response => {
          let logInSuccess: boolean = false;
          
          if(response){
            localStorage.setItem('userId', response.id);
            localStorage.setItem('name', response.name);
            logInSuccess = true;
          }

          if (logInSuccess !== false) {
            alert('Login Successful!');
            
            // Redirect to login
            return window.location.href = window.location.origin + '/todo-items';
          }

          return alert('Credentials are incorrect! Please no hacking allowed.');
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
