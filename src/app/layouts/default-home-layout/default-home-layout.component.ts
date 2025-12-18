import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeHeaderMenuComponent } from "./home-header-menu/home-header-menu.component";

@Component({
  selector: 'app-default-home-layout',
  standalone: true,
  imports: [RouterLink, HomeHeaderMenuComponent, RouterOutlet, CommonModule],
  templateUrl: './default-home-layout.component.html',
})
export class DefaultHomeLayoutComponent implements OnInit {

  userName: string | null = localStorage.getItem('name');

  constructor(private router: Router) {
    localStorage.clear();
  }

  ngOnInit(): void {

    if (!!localStorage.getItem('user')) {

    }
  }
}
