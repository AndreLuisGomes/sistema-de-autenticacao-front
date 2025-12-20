import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-header-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-header-menu.component.html',
})
export class HomeHeaderMenuComponent {

  authState$! : BehaviorSubject<AuthResponse | null>;

  constructor(private authService : AuthService, private router: Router){
    
  }

  isLogged() : boolean{
    return !!this.authService.getIsLoggedIn();
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/home'])
  }

  login(){
    this.router.navigate(['/auth/fazer-login'])
  }

}
