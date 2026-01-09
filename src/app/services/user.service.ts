import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/auth/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = "http://localhost:8080/auth";

  constructor(private client: HttpClient) {

  }

  getUserByName(name: string): Observable<User[]> {
    const params = new HttpParams();
    params.set('name', name);
    return this.client.get<User[]>(this.apiURL + `/users`, { params: params })
  }

  getUsersByName(name: string): Observable<User[]> {
    const params = new HttpParams().set('name', name);

    return this.client.get<User[]>(
      `${this.apiURL}/users`,
      { params }
    );
  }
}
