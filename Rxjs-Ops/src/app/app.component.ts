import { Component } from '@angular/core';
import { AllEmpsComponent } from "./all-emps/all-emps.component";

@Component({
  selector: 'app-root',
  imports: [AllEmpsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rxjs-Ops';
}
