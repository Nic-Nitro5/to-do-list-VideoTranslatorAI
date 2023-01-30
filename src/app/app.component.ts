import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('userId') ? true : false;
  }

  closeNavbar(): void {
    document.querySelector('.mat-drawer')
  }

  userLogout(): void {
    localStorage.removeItem('userId');
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
