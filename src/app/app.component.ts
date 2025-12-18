import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private titleService : Title
  ){

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while(child){
          if(child.firstChild){
            child = child.firstChild;
          }else if(child.snapshot.data && child.snapshot.data['title']){
            return child.snapshot.data['title']
          }else{
            return null;
          }
        }
        return null;
      }) 
    ).subscribe((title : string | null) => {
      if(title){
        this.titleService.setTitle(title);
      }
    })
  }
}
