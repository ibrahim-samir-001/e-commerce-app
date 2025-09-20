import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Sets up the routes for our application
    provideRouter(routes),
    // Sets up the HTTP client and attaches our authentication interceptor
    provideHttpClient(withInterceptors([authInterceptor])),
    // Sets up animations, required for ngx-toastr
    provideAnimations(),
    // Configures the notification service
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
};
