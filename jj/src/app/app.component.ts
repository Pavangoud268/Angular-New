import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jj';
  ngOnChanges(){
    console.log('hii on changes')
  }
  ngOnInit(){
    console.log('Hii oninit')
  }
}
