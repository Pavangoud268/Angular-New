import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, UserProfileComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected auth = inject(AuthService);
  protected document = inject(DOCUMENT);
  protected logOut() {
    this.auth.logout({
      logoutParams: { returnTo: this.document.location.origin },
    });
  }
  protected logIn() {
    this.auth.loginWithRedirect();
  }
}
