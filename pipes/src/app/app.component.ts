import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomPipe } from './pipe';

@Component({
  selector: 'app-root',
  imports: [CommonModule,CustomPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pipes';
  date = new Date()
  name = 'PAVAN'
  currency = 1000
  details : any = {
    firstName : 'pavan',
    lastname : 'goud'

  }
  changeName(){
    this.details.name = 'Pavan Goud'
  }
}
