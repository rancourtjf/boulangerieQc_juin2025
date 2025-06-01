import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { FileSaverModule } from 'ngx-filesaver';




@NgModule({
  declarations: [
  
   
  ],
  imports: [

    FileSaverModule,HttpClientModule,MatDatepickerModule,MatNativeDateModule,MatFormField,MatFormFieldModule,
    AuthModule.forRoot({
      domain: 'dev-wx0k55smuoqzhzrz.us.auth0.com',
      clientId: 'x2L3t7jVmOxoLbTdy3S7OD7BuasBNIgO',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-ca' },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
})
export class AppModule { }
