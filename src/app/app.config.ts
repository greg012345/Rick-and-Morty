import { ApplicationConfig } from '@angular/core';
import { withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideKeycloak,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService,
  includeBearerTokenInterceptor,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG
} from 'keycloak-angular';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const bearerCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^http:\/\/localhost:8080\/.*$/i
});

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'demo-realm',
        clientId: 'angular-app'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000
        })
      ],
      providers: [AutoRefreshTokenService, UserActivityService]
    }),
    provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor])
    ),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [bearerCondition]
    }
  ]
};