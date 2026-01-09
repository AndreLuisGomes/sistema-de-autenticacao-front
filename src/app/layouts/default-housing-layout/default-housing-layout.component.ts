import { Component } from '@angular/core';
import { HomeHeaderMenuComponent } from "../default-home-layout/home-header-menu/home-header-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-housing-layout',
  imports: [HomeHeaderMenuComponent, RouterOutlet],
  templateUrl: './default-housing-layout.component.html'
})
export class DefaultHousingLayoutComponent {

}
