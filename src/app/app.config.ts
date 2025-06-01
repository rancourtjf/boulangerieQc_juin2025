import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';


// https://stackoverflow.com/questions/76671701/how-to-import-a-ngmodule-library-with-forroot-to-an-angular-standalone-compone

import { routes } from './app.routes'
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),
    importProvidersFrom( HttpClientModule,AuthModule.forRoot({
      domain: 'dev-wx0k55smuoqzhzrz.us.auth0.com',
      clientId: 'gL9BtBaCMt2NKPb1FOGgUBa3nD5iSFBT',
      authorizationParams: {
        redirect_uri: window.location.origin
        // redirect_uri: 'htttps://www.google.ca'
        //audience: https://dev-wx0k55smuoqzhzrz.us.auth0.com/api/v2/
      }
    }))]
};
