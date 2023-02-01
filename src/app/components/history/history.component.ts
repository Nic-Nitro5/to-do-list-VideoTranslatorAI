import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/models/TodoItem';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  userHistory: Todo[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

}
