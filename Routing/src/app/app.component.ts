import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,FooterComponent,PlaceholdersComponent,CommonModule,NgxSkeletonLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Routing';
  showPlaceHolder : boolean = false
  router : Router = inject(Router)
  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        this.showPlaceHolder = true
      }
      if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
        this.showPlaceHolder = false
      }
    })
  }
}
