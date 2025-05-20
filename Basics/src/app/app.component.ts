import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PracticeComponent } from './practice/practice.component';
import { ParentInputComponent } from './parent-input/parent-input.component';
// import {NgFor,NgIf} from '@angular/common';
// import {signal} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,PracticeComponent,ParentInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

}
