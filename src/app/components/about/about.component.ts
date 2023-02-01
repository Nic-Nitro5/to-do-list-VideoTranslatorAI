import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  hireMe() {
    alert('Hire me, You wont be dissapointed!');
  }

}
