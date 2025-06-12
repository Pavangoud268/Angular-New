import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { environment } from './environment';



export function loggerCallback(logLevel: LogLevel, message: string) {
  //TODO : Re consider that are we going to show logs of msal loggings
  // if (environment.production && logLevel === LogLevel.Error) {
  //   console.error(`[MSAL ERROR] ${message}`);
  // } else {
  //   console.log(`[MSAL ${logLevel}] ${message}`);
  // }
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: `https://login.microsoftonline.com/${environment.msalConfig.auth.authority}`,
      redirectUri: window.location.origin
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
    },
    system: {
      allowPlatformBroker: false,
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,           //PII--Personally Identifiable Info (like your name, email)--Don’t log sensitive user info
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();


  protectedResourceMap.set(
    environment.apiConfig.uri,
    environment.apiConfig.scopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes],
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),MsalRedirectComponent,


  provideHttpClient(withInterceptorsFromDi(), withFetch()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,


  },
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory,
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: MSALGuardConfigFactory,
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory,
  },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ]
};
