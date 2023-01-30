import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from 'src/app/models/TodoItem';
import { urls } from './urls';

interface completeItem {
  id: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos(id: string) {
    return this.http.get<any>(`${urls.baseUrl}Todos/UserTodos/${id}`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  postTodo(data: Todo) {
    return this.http.post<Todo>(`${urls.baseUrl}Todos`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  completeTodo(data: completeItem) {
    return this.http.put<completeItem>(`${urls.baseUrl}Todos/Update/${data.id}`, data)
    .pipe(map((response: any) => {
      return response;
    }));
  }

  deleteTodo(id: string) {
    return this.http.delete<Todo>(`${urls.baseUrl}Todos/Delete/${id}`)
    .pipe(map((response: any) => {
      return response;
    }));
  }

}
