import { Component, inject, Input, OnInit, signal } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// Reactive form for generate and validate the form
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// primeng components
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
// FormBuilder to create form and Validators for validations
import { FormBuilder, Validators } from '@angular/forms';
import { ClientLogiciel } from '../../models/clientLogiciel';
import { ApiService } from 'src/app/api.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { DropdownModule } from 'primeng/dropdown';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';


interface licenceActive {
  boolLicence: boolean,
  choixValue: string
}

@Component({
  selector: 'app-modify-client-logiciel',
  standalone: true,
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DropdownModule],
  templateUrl: './modify-client-logiciel.component.html',
  styleUrl: './modify-client-logiciel.component.css'
})
export class ModifyClientLogicielComponent implements OnInit {
  choix: licenceActive[] = [];
  selectedChoix: licenceActive = this.choix[0];

  licenceActiveBool = true

  @Input() clientToModify: ClientLogiciel[] = []
  dataSource = signal<ClientLogiciel>(null)
  extract = inject(ExtractLienFTPService)
  fb = inject(FormBuilder)
  router = inject(Router)
  api = inject(ApiService)
  http = inject(HttpClient);
  userForm: FormGroup
  clientAjout: ClientLogiciel = null
  ipserveurFunio:string=environment.ipServeurFunio
  serveur:string=environment.serveur
  serveurFTP:string=environment.serveurFTP


  constructor() {
    this.userForm = this.fb.group({
      nomBoulangerie: ['', Validators.required],
      courriel: ['', Validators.required],
      actifBoolean: [true],
      prenom: ['', Validators.required],
      nomFamille: [''],
      telephone: [''],
      adresse: this.fb.group({ // <- another group of element
        rue: [''],
        ville: [''],
        codePostal: ['', Validators.required]
      }),
      dateDebut: [''],
      dateFin: [''],
      identifiant: [''],
      logoBoulangerie: [''],
      emailEnvoiAuBoulanger: [''],
      host: [''],
      user: [''],
      password: [''],
      logfile: [''],
      port: [0],
      //
      serveurFTP: [''],
      userFTP: [''],
      passwordFTP: [''],
      site_web_documents: [''],
      user_site_web: [''],
      //
      pwd_site_web: [''],
      serveurFTP_bkup: [''],
      userFTP_bkup: [''],
      pwdFTPbkup: [''],
      dataFile4DD: [''],
      //
      dataFile4DIndx: [''],
      depotListePrixClients: [''],
      userFTPDepot: [''],
      pwdFTPDepot: [''],
      serveurFTPListePrixClients: [''],
      //
      serveurFTPSansFTP: [''],
      passwordFTPHash: [''],
      serveurFTPSansFTP_bkup: [''],
      pwdFTPbkup_Hash: [''],
      db_host_mysql: [''],
      //
      db_name_mysql: [''],
      db_username_mysql: [''],
      db_password_mysql: [''],
      repertoireBoulangerie: [''],
      db_host_mysql_boulangerieqc: [''],
      //
      db_name_mysql_boulangerieqc: [''],
      db_username_mysql_boulangerieqc: [''],
      db_password_mysql_boulangerieqc: [''],
      suiviDeProjetGoogle: ['']

    });
  }

  ngOnInit(): void {
    this.choix = [
      { boolLicence: true, choixValue: 'licence active' },
      { boolLicence: false, choixValue: 'licence inactive' }]


    this.dataSource.set(this.extract.getClientLogiciel())

    this.licenceActiveBool = this.dataSource()[0].actifBoolean
    this.userForm = this.fb.group({
      id: Number([this.dataSource()[0].id]),
      nomBoulangerie: [this.dataSource()[0].nomBoulangerie],
      courriel: [this.dataSource()[0].courriel],
      actifBoolean: [this.dataSource()[0].actifBoolean],
      prenom: [this.dataSource()[0].prenom],
      nomFamille: [this.dataSource()[0].nomFamille],
      telephone: [this.dataSource()[0].telephone],
      adresse: this.fb.group({ // <- another group of element
        rue: [this.dataSource()[0].rue],
        ville: [this.dataSource()[0].ville],
        codePostal: [this.dataSource()[0].codePostal]
      }),
      dateDebut: [this.dataSource()[0].dateDebut],
      dateFin: [this.dataSource()[0].dateFin],
      identifiant: [this.dataSource()[0].identifiant],
      logoBoulangerie: [this.dataSource()[0].logoBoulangerie],
      emailEnvoiAuBoulanger: [this.dataSource()[0].emailEnvoiAuBoulanger],
      //
      host: [this.dataSource()[0].host],
      user: [this.dataSource()[0].user],
      password: [this.dataSource()[0].password],
      port: [this.dataSource()[0].port],
      logfile: [this.dataSource()[0].logfile],
      //
     // serveurFTP: [this.dataSource()[0].serveurFTP],
      serveurFTP: [this.serveurFTP],
      userFTP: [this.dataSource()[0].userFTP],
      passwordFTP: [this.dataSource()[0].passwordFTP],
      site_web_documents: [this.dataSource()[0].site_web_documents],
      user_site_web: [this.dataSource()[0].user_site_web],
      //
      pwd_site_web: [this.dataSource()[0].pwd_site_web],
     // serveurFTP_bkup: [this.dataSource()[0].serveurFTP_bkup],
      serveurFTP_bkup: [this.serveurFTP],
      userFTP_bkup: [this.dataSource()[0].userFTP_bkup],
      pwdFTPbkup: [this.dataSource()[0].pwdFTPbkup],
      dataFile4DD: [this.dataSource()[0].dataFile4DD],
      //
      dataFile4DIndx: [this.dataSource()[0].dataFile4DIndx],
      depotListePrixClients: [this.dataSource()[0].depotListePrixClients],
      userFTPDepot: [this.dataSource()[0].userFTPDepot],
      pwdFTPDepot: [this.dataSource()[0].pwdFTPDepot],
      //serveurFTPListePrixClients: [this.dataSource()[0].serveurFTPListePrixClients],
      serveurFTPListePrixClients: [this.serveurFTP],
      //
      //serveurFTPSansFTP: [this.dataSource()[0].serveurFTPSansFTP],
      serveurFTPSansFTP: [this.ipserveurFunio],
      passwordFTPHash: [this.dataSource()[0].passwordFTPHash],
     // serveurFTPSansFTP_bkup: [this.dataSource()[0].serveurFTPSansFTP_bkup],
      serveurFTPSansFTP_bkup: [this.ipserveurFunio],
      pwdFTPbkup_Hash: [this.dataSource()[0].pwdFTPbkup_Hash],
      //db_host_mysql: [this.dataSource()[0].db_host_mysql],
      db_host_mysql: [this.ipserveurFunio],
      //
      db_name_mysql: [this.dataSource()[0].db_name_mysql],
      db_username_mysql: [this.dataSource()[0].db_username_mysql],
      db_password_mysql: [this.dataSource()[0].db_password_mysql],
      repertoireBoulangerie: [this.dataSource()[0].repertoireBoulangerie],
     // db_host_mysql_boulangerieqc: [this.dataSource()[0].db_host_mysql_boulangerieqc],
      db_host_mysql_boulangerieqc: [this.ipserveurFunio],
      //
      db_name_mysql_boulangerieqc: [this.dataSource()[0].db_name_mysql_boulangerieqc],
      db_username_mysql_boulangerieqc: [this.dataSource()[0].db_username_mysql_boulangerieqc],
      db_password_mysql_boulangerieqc: [this.dataSource()[0].db_password_mysql_boulangerieqc],
      suiviDeProjetGoogle: [this.dataSource()[0].suiviDeProjetGoogle]
    });
  }

  modifyUser() {
    console.log('on entre dans le modifyUser()')

    this.clientAjout = {
      id: this.userForm.value.id,
      nomBoulangerie: this.userForm.value.nomBoulangerie,
      courriel: this.userForm.value.courriel,
      actifBoolean: this.userForm.value.actifBoolean,
      prenom: this.userForm.value.prenom,
      nomFamille: this.userForm.value.nomFamille,
      telephone: this.userForm.value.telephone,
      rue: this.userForm.value.adresse.rue,
      ville: this.userForm.value.adresse.ville,
      codePostal: this.userForm.value.adresse.codePostal,
      dateDebut: new Date(this.userForm.value.dateDebut),
      dateFin: new Date(this.userForm.value.dateFin),
      identifiant: this.userForm.value.identifiant,
      logoBoulangerie: this.userForm.value.logoBoulangerie,
      emailEnvoiAuBoulanger: this.userForm.value.emailEnvoiAuBoulanger,
      dossierCommandesWeb: 'boulangerieqc',

      host: this.userForm.value.host,
      user: this.userForm.value.user,
      password: this.userForm.value.password,
      logfile: this.userForm.value.logfile,
      port:this.userForm.value.port,
      //
      serveurFTP: this.userForm.value.serveurFTP,
      userFTP: this.userForm.value.userFTP,
      passwordFTP: this.userForm.value.passwordFTP,
      site_web_documents: this.userForm.value.site_web_documents,
      user_site_web: this.userForm.value.user_site_web,
      //
      pwd_site_web: this.userForm.value.pwd_site_web,
      serveurFTP_bkup:  this.userForm.value.serveurFTP_bkup,
      userFTP_bkup: this.userForm.value.userFTP_bkup,
      pwdFTPbkup: this.userForm.value.pwdFTPbkup,
      dataFile4DD: this.userForm.value.dataFile4DD,
      //
      dataFile4DIndx: this.userForm.value.dataFile4DIndx,
      depotListePrixClients: this.userForm.value.depotListePrixClients,
      userFTPDepot: this.userForm.value.userFTPDepot,
      pwdFTPDepot: this.userForm.value.pwdFTPDepot,
      serveurFTPListePrixClients: this.userForm.value.serveurFTPListePrixClients,
      //
      serveurFTPSansFTP: this.userForm.value.serveurFTPSansFTP,
      passwordFTPHash: this.userForm.value.passwordFTPHash,
      serveurFTPSansFTP_bkup: this.userForm.value.serveurFTPSansFTP_bkup,
      pwdFTPbkup_Hash: this.userForm.value.pwdFTPbkup_Hash,
      db_host_mysql: this.userForm.value.db_host_mysql,
      //
      db_name_mysql: this.userForm.value.db_name_mysql,
      db_username_mysql: this.userForm.value.db_username_mysql,
      db_password_mysql: this.userForm.value.db_password_mysql,
      repertoireBoulangerie: this.userForm.value.repertoireBoulangerie,
      db_host_mysql_boulangerieqc: this.userForm.value.db_host_mysql_boulangerieqc,
      //
      db_name_mysql_boulangerieqc:this.userForm.value.db_name_mysql_boulangerieqc,
      db_username_mysql_boulangerieqc: this.userForm.value.db_username_mysql_boulangerieqc,
      db_password_mysql_boulangerieqc: this.userForm.value.db_password_mysql_boulangerieqc,
      suiviDeProjetGoogle: this.userForm.value.suiviDeProjetGoogle

    }
console.log("this.clientAjout="+JSON.stringify(this.clientAjout))
    this.api.modifyClientLogiciel(this.clientAjout).subscribe((res) => {

      this.router.navigate(['/voirClientsLogiciel'])
      error => {
        console.error('Erreur lors de la requête HTTP :', error);
      }
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
}



