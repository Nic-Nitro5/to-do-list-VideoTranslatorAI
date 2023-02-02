import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/TodoItem';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  displayedUserColumns: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Todo[]) {
  
    if (data != null && data.length > 0) {
      this.displayedUserColumns = Object.keys(this.data![0]);
    }

  }

}
