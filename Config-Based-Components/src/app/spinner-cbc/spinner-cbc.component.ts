import { Component, Input } from '@angular/core';
import { spinnerConfig } from '../Modals/button-config/button-config';

@Component({
  selector: 'app-spinner-cbc',
  imports: [],
  templateUrl: './spinner-cbc.component.html',
  styleUrl: './spinner-cbc.component.scss'
})
export class SpinnerCbcComponent {
  @Input() config! : string

}
