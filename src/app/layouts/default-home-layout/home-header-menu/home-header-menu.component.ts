import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse, AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-header-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-header-menu.component.html',
})
export class HomeHeaderMenuComponent {

  constructor(public authService: AuthService, private router: Router) {

  }

  isLogged(): boolean {
    return !!this.authService.currentUser
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home'])
    window.location.reload();
  }

  login() {
    this.router.navigate(['/auth/fazer-login'])
  }

}
