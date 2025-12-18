import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(name: string, token: string) {
    this.logout();
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
