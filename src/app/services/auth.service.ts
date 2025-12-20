import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = "http://localhost:8080"

  private authState = new BehaviorSubject<AuthResponse | null>({
    token: null,
    name: null  
  });
  
  authState$ = this.authState.asObservable();

  constructor(private http : HttpClient, private router : Router){
    this.restoreSession();
  }

  login(email: string, password: string) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/login`, {
      email, password
    }).pipe(
      tap(response => this.setSession(response))
    )
  }

  private setSession(session: AuthResponse) : void{
    localStorage.setItem('token', session.token!)
    localStorage.setItem('name', session.name!)
    this.authState.next(session)
  }

  private restoreSession() : void{
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if(token && name){
      const authResponse : AuthResponse = {token, name};
      this.authState.next(authResponse)
    }
  }

  register(user : User) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/register`, user)
    .pipe(
      tap(session => this.setSession(session))
    )
  }

  logout() {
    localStorage.clear();
    this.authState.next(null);
    this.router.navigate(['/home']);
  }

  getIsLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): AuthResponse | null {
    return this.authState.value;
  }
}
