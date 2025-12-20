import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "../../services/auth.service";
import { HomeHeaderMenuComponent } from "./home-header-menu/home-header-menu.component";

@Component({
  selector: 'app-default-home-layout',
  standalone: true,
  imports: [RouterLink, HomeHeaderMenuComponent, RouterOutlet, CommonModule],
  templateUrl: './default-home-layout.component.html',
})
export class DefaultHomeLayoutComponent {

  authState$!: Observable<AuthResponse | null>;

  constructor(private router: Router, public authService: AuthService) {
    this.authState$ = this.authService.authState$;
  } 
}
