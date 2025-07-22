import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { InteractionRequiredAuthError, AuthError } from 'msal';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: true,
    imports : []
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private authService: MsalService, private http: HttpClient) { }

  ngOnInit() {

    this.getProfile();
  }

  getProfile() {
const GRAPH_SCOPES = ['User.Read'];
    this.http.get(GRAPH_ENDPOINT)
    .subscribe({
      next: (profile) => {
        this.profile =JSON.stringify(profile);
        console.log("%%%%"+this.profile+"%%%%%%%%%");

      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
          this.authService.acquireTokenPopup({ scopes: GRAPH_SCOPES })
  .subscribe((result) => {
    // Token acquired successfully
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  });
          // this.authService.acquireTokenPopup({
          //   scopes: GRAPH_SCOPES
          // })
          // .then(() => {
          //   this.http.get(GRAPH_ENDPOINT)
          //     .toPromise()
          //     .then(profile => {

          //       this.profile = profile;
          //     });
          // });
        }
      }
    });
  }

}
