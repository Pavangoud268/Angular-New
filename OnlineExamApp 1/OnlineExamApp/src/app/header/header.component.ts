import { Component, OnInit, Input, Injector } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports : []
})
export class HeaderComponent implements OnInit {
  @Input() headerInfo!: any;

  account!:any;

  constructor(private authService: MsalService,
    private injector: Injector) {
    this.authService = this.injector.get(MsalService);
   }

  ngOnInit(): void {
    this.account = {
      name : this.headerInfo.name,
      userName : this.headerInfo.userName
    }
  }
  logout() {
    localStorage.clear();
    this.authService.logout();
  }
}
