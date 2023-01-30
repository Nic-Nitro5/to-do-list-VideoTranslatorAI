import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from './urls';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(data: Object){
    return this.http.post<any>(`${urls.baseUrl}Auth`, data)
    .pipe(map((response: any) => {
      return response;
    }));
  }
}
