import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  imports: [FormsModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  Name : string = ''
  cardNum? : number
  country : string = 'india'
  Exit : boolean = false

  onSubmit(){
    this.Exit = true
  }
  canExit(): boolean {
    if ((!this.Exit)&&(this.Name || this.cardNum)) {
      return confirm('You have unsaved changes!! Are you sure you want to exit ');
    } else {
      this.Exit = true
      return this.Exit;
    }
  }
}
