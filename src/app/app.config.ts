import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './layouts/auth-layout/default-auth-layout/login/login.component';

export const appConfig: ApplicationConfig = {
  providers: [LoginComponent, provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withFetch())]

};
