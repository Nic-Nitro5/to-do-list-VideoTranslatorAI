import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from 'src/app/models/TodoItem';
import { urls } from './urls';

interface updateItem {
  id: string;
  completed?: boolean;
  translated?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  // Get all todos by id
  getTodos(id: string) {
    return this.http.get<any>(`${urls.baseUrl}Todos/UserTodos/${id}`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  // Post todo
  postTodo(data: Todo) {
    return this.http.post<Todo>(`${urls.baseUrl}Todos`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  // Complete todo
  updateTodo(data: updateItem) {
    return this.http.put<updateItem>(`${urls.baseUrl}Todos/Update/${data.id}`, data)
    .pipe(map((response: any) => {
      return response;
    }));
  }

  // Delete todo
  deleteTodo(id: string) {
    return this.http.delete<Todo>(`${urls.baseUrl}Todos/Delete/${id}`)
    .pipe(map((response: any) => {
      return response;
    }));
  }

}
