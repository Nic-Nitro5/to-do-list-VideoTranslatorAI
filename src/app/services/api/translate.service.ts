import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from 'src/app/models/TodoItem';
import { urls } from './urls';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  // Api post to translate the todo
  postTranslateTodo(data: Object) {
    return this.http.post(`${urls.translateApi}`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
