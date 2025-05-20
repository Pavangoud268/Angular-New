import { Component, inject } from '@angular/core';
import { DataService } from '../Services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  data = inject(DataService)

  aboutTitle : string = this.data.aboutTitle
  about1 : string = this.data.about1
  about2 : string = this.data.about2
  about3 : string = this.data.about3
  aboutServices : string[] = this.data.aboutServices
  router : Router = inject(Router)
  toHome(){
    this.router.navigate(['Home'])
  }

}
