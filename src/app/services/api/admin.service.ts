import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { urls } from './urls';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any>(`${urls.baseUrl}Users`)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
