import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: '<button (click)="login()">Log in</button>'
})
export class LoginButtonComponent {
  constructor(private auth: AuthService,private spinner:SpinnerComponent,public extractLienFTPService:ExtractLienFTPService) {}

  login() {
    this.auth.loginWithRedirect();
    this.extractLienFTPService.alert()

  }
}