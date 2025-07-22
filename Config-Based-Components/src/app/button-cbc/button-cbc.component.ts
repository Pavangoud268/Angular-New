import { Component, Input } from '@angular/core';
import { buttonConfig } from '../Modals/button-config/button-config';

@Component({
  selector: 'app-button-cbc',
  imports: [],
  templateUrl: './button-cbc.component.html',
  styleUrl: './button-cbc.component.scss',
})
export class ButtonCBCComponent {
  @Input() config!: buttonConfig;
  protected sizeMap = {
    small: '12px',
    medium: '16px',
    large: '20px',
  };
}
