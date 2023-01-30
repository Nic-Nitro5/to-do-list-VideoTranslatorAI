import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from './urls';
import { map } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  postUser(data: User){
    return this.http.post<User>(`${urls.baseUrl}Users`, data)
    .pipe(map((response: any) => {
      return response;
    }));
  }
}
