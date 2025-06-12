import { Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: MsalRedirectComponent // Handles the Azure login redirect
  }
];
