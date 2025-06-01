import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { Boulanger } from 'src/app/identificationBoul';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageAfficheComponent } from 'src/app/components/message-affiche/message-affiche.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [MessageAfficheComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  newMessage: FormGroup;
  emailBoulanger: string;
  http = inject(HttpClient);

  boulanger: Boulanger;
  boulLogin: any;

  private sub: any;
  public getJsonValue: any;
  public postJsonValue: any;

  api = inject(ApiService);
  extract = inject(ExtractLienFTPService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  messageExistant: any;
  $connection: string;
  messageImport = signal<string>('');

  constructor() { }

  ngOnInit(): void {
    this.boulanger = this.extract.getBoulanger();

    this.boulLogin = this.extract.boulanger;

    let $db_host = this.boulLogin.db_host;
    let $db_name = this.boulLogin.db_name;
    let $db_username = this.boulLogin.db_username;
    let $db_password = this.boulLogin.db_password;
    this.$connection =
      'db_host=' +
      $db_host +
      '&db_name=' +
      $db_name +
      '&db_username=' +
      $db_username +
      '&db_password=' +
      $db_password;

    this.newMessage = this.formBuilder.group({
      messageText: ['', [Validators.required]],
    });
  }

  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: 'success',
      title: 'Attention...',
      text: textAlert,
      timer: 2000,
      toast: true,
    });
  }
  simpleAlertNonTransmission(textAlert: string) {
    Swal.fire({
      icon: 'error',
      title: 'Attention...',
      text: textAlert,
      timer: 2000,
      toast: true,
    });
  }
  envoiAjoutMessage() {
    let connectionMysqlObjMessage = {
      id1Boulangerie: 1,
      messageText: this.newMessage.value.messageText,
      dateMessage: new Date(),
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb
    };

    this.api.addMessage(connectionMysqlObjMessage).subscribe((res) => {
      let status = res.status;
      if (status = 201) {
        this.messageImport.set(connectionMysqlObjMessage.messageText)
        this.simpleAlertConfirm("mise à jour du message complétée")
      }
      else {
        this.simpleAlertNonTransmission("La transmission du message n'a pas pu être complétée")
      }

    });
  }
  delete_message() {
    let connectionMysqlObjMessage = {
      id1Boulangerie: 1,
      messageText: this.newMessage.value.messageText,
      dateMessage: new Date(),
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb
      // db_host: this.extract.boulanger.db_host,
      // db_username: this.extract.boulanger.db_username,
      // db_name: this.extract.boulanger.db_name,
      // db_password: this.extract.boulanger.db_password,
    };
    this.api.deleteMessage(connectionMysqlObjMessage).subscribe((res) => {

      this.simpleAlertConfirm("suppression des messages complétée")
    });
    this.messageImport.set("")
    this.simpleAlertConfirm("suppression du message complétée")
  }
  view_message() {
    let connectionMysqlObjMessage = {
      id1Boulangerie: 1,
      messageText: this.newMessage.value.messageText,
      dateMessage: new Date(),
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb
      // db_host: this.extract.boulanger.db_host,
      // db_username: this.extract.boulanger.db_username,
      // db_name: this.extract.boulanger.db_name,
      // db_password: this.extract.boulanger.db_password,

    };
    this.api.view_message(connectionMysqlObjMessage).subscribe((res) => {
      let arr = Object.values(res);
      let messageText = JSON.stringify(arr[0].messageText);
      this.messageImport.set(messageText);
      console.log('messageImport=' + this.messageImport());
    });

  }
}

//countries.map(country => country.name)
