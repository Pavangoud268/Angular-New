import { Component, inject } from '@angular/core';
import { DemoService } from '../Services/demo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dependency',
  imports: [CommonModule,FormsModule],
  templateUrl: './dependency.component.html',
  styleUrl: './dependency.component.css'
})
export class DependencyComponent {
  private demo = inject(DemoService)
  newBike! : string;
  addBike(bike : string){
    this.demo.addBike(bike)
  }

}
