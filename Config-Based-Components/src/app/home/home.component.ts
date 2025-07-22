import { Component } from '@angular/core';
import { ButtonCBCComponent } from '../button-cbc/button-cbc.component';
import { buttonConfig, spinnerConfig } from '../Modals/button-config/button-config';
import { SpinnerCbcComponent } from '../spinner-cbc/spinner-cbc.component';
import { BtnSpinnerCbcComponent } from '../btn-spinner-cbc/btn-spinner-cbc.component';

@Component({
  selector: 'app-home',
  imports: [ButtonCBCComponent,SpinnerCbcComponent,BtnSpinnerCbcComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected buttonConfig1: buttonConfig = {
    color: 'red',
    text: 'Hello from Button 1',
    size: 'medium',
    action: () => console.log('Button 1 clicked'),
  };
  protected buttonConfig2: buttonConfig = {
    color: 'blue',
    text: 'Msg from Button 2',
    size: 'large',
    action: () => console.log('Button 2 clicked'),
  };
  protected spinnerConfig1 : string = 'spinner-border text-primary'

  protected spinnerConfig2 : string = 'spinner-border text-danger'

}
