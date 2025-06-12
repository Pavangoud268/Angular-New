import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MSAL';
  MsalServ = inject(MsalService)
  login(){
    // this.MsalServ.instance.initialize().then(()=>{
    // })
    this.MsalServ.loginRedirect()
  }
}
