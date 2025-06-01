import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EnvoiAuBoulangerService } from 'src/app/services/envoi-au-boulanger.service';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { Boulanger } from 'src/app/identificationBoul';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
})
export class NewClientComponent implements OnInit {
  newClient: FormGroup;
  emailBoulanger: string;

boulanger:Boulanger
private sub: any;


  constructor(
    private formBuilder: FormBuilder,
    private envoiAuBoulangerService: EnvoiAuBoulangerService,
    private extractLienFTPService: ExtractLienFTPService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

 this.boulanger=this.extractLienFTPService.getBoulanger()

 this.newClient = this.formBuilder.group({
      nom: ["", [Validators.required]],
      courriel: ['', Validators.required],
      ID: [0, Validators.required],
      password: ['', Validators.required],
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
  envoiAjoutClient() {

    let newNom = this.newClient.value.nom;
    let newCourriel = this.newClient.value.courriel;
    let newID = this.newClient.value.ID.toString();
    let newPassword = this.newClient.value.password;
    let varTo = "info@boulangerieqc.com"
    let varFrom = this.boulanger.emailEnvoiAuBoulanger


    let lienURLPhp =
      '?nom=' +
      newNom +
      '&ID=' +
      newID +
      '&courriel=' +
      newCourriel +
      '&password=' +
      newPassword +
      '&varTo=' +
      varTo +
      '&varFrom=' +
      varFrom;


    this.envoiAuBoulangerService.envoiMailnewClient(lienURLPhp);
  }

}
