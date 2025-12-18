import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-header-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-header-menu.component.html',
})
export class HomeHeaderMenuComponent {

  constructor(private authService : AuthService, private router: Router){

  }

  isLogged() : boolean{
    return this.authService.isLoggedIn();
  }

  loggout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  login(){
    this.router.navigate(['/auth/login']);
  }

  seeProfile(){

  }

  selectedButton(name : string){

  }
}
