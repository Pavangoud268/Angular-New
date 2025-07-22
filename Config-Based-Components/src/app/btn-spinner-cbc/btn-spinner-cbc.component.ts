import { Component, Input } from '@angular/core';
import { buttonConfig, spinnerConfig } from '../Modals/button-config/button-config';

@Component({
  selector: 'app-btn-spinner-cbc',
  imports: [],
  templateUrl: './btn-spinner-cbc.component.html',
  styleUrl: './btn-spinner-cbc.component.scss'
})
export class BtnSpinnerCbcComponent {
  @Input() styleConfig! : buttonConfig
  @Input() classConfig! : string
  protected sizeMap = {
    small: '12px',
    medium: '16px',
    large: '20px',
  };
}
