import { Component, inject } from '@angular/core';
import { DemoService } from './Services/demo.service';
import { CommonModule } from '@angular/common';
import { DependencyComponent } from './dependency/dependency.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,DependencyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Services';
  private demoDetails = inject(DemoService)
  bikes = this.demoDetails.getAllBikes()

}
