import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-default-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './default-auth-layout.component.html'
})
export class DefaultAuthLayoutComponent implements OnInit{

  constructor(private router : Router){

  }

  ngOnInit(): void {
  }
}
