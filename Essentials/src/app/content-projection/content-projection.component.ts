import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'projection',
  imports: [CommonModule],
  templateUrl: './content-projection.component.html',
  styleUrl: './content-projection.component.css'
})
export class ContentProjectionComponent {
  contentSwitch : boolean = false
  changeContent(){
    this.contentSwitch = !this.contentSwitch
  }
}
