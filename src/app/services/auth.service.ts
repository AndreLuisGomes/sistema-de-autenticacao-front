import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserLoginDTO } from '../../models/auth/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
} 

interface TokenPayload {
  exp: number;
  sub: string;
}

export interface AuthResponse {
  name: string | null;
  token: string | null;
  role: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) {
  }

  currentUser = signal<AuthResponse | null>(this.getUserFromStorage());

  isLoggedIn = computed(() => !!this.currentUser());

  currentName = computed(() => this.currentUser()?.name ?? null);

  isOwner = computed(() => this.currentUser()?.role === 'owner')

  // Função para login

  login(userLogin: UserLoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/login`, userLogin).pipe(
      tap(response => {
        localStorage.setItem('user_data', JSON.stringify(response));
        if (this.isTokenValid())
          this.currentUser.set({ ...response });
        this.router.navigate(['/home']);
      })
    )
  }

  // Função para registrar

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/register`, user)
      .pipe(
        tap((session) => {
          localStorage.setItem('user_data', JSON.stringify(session))
          this.currentUser.set(session)
        }
        )
      )
  }

  // Função para deslogar

  logout() {
    localStorage.removeItem('user_data');
    this.currentUser.set(null);
  }

  // Retorna usuário do LocalStorage

  getUserFromStorage(): AuthResponse | null {
    const userData = localStorage.getItem('user_data');
    if (userData && this.isTokenValid()) {
      const user = JSON.parse(userData) as AuthResponse;
      return user;
    }
    localStorage.removeItem('user_data');
    return null;
  }

  // Verifica se o token é válido

  isTokenValid(): boolean {
    const userData = localStorage.getItem('user_data');
    if (!userData) {
      return false;
    }
    try {
      const user = JSON.parse(userData);
      if (!user.token) {
        return false;
      }
      const decoded = jwtDecode<TokenPayload>(user.token);

      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch (error) {
      return false;
    }
  }
}
