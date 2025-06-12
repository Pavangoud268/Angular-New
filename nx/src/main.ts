import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-yafubsqixared06h.us.auth0.com',
      clientId: 'yUOdhr39zRi0PEFx5ngvEPXnm8KJmxVO',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});
