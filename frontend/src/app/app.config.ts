import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { tokenHttpInterceptor } from './Components/core/token-http-intercepter';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations() //required for toaster
    , importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true

      })
    ), provideHttpClient(withInterceptors([tokenHttpInterceptor])),
  provideNativeDateAdapter(),
 


  ]
};
