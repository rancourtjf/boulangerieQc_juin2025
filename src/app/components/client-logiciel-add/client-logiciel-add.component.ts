import { Component, inject, OnInit } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// Reactive form for generate and validate the form
import { ReactiveFormsModule } from '@angular/forms'; 
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
import { DropdownModule } from 'primeng/dropdown';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';


interface licenceActive {
  boolLience:boolean,
  choixValue:string
}

@Component({
  selector: 'app-client-logiciel-add',
  standalone: true,
  imports: [  ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DropdownModule
  ],
  templateUrl: './client-logiciel-add.component.html',
  styleUrl: './client-logiciel-add.component.css'
})
export class ClientLogicielAddComponent implements OnInit{

  ipServeurFunio:string=environment.ipServeurFunio
  serveur:string=environment.serveur
  serveurFTP:string=environment.serveurFTP

  choix: licenceActive[] =[] ;
  selectedChoix: licenceActive = this.choix[0]; 

  fb=inject(FormBuilder)
  router=inject(Router)
  api=inject(ApiService)
  http = inject(HttpClient);
  userForm = this.fb.group({
    nomBoulangerie: ['', Validators.required], 
    courriel: ['', Validators.required], 
    actifBoolean:[true],
    actif: [''],
    prenom: [''], 
    nomFamille: [''],
    telephone: [''],
    adresse: this.fb.group({ // <- another group of element
      rue: [''],
      ville: [''],
      codePostal: ['']
    }),
    dateDebut: [''],
    dateFin: [''],
    identifiant: [''],
    logoBoulangerie: [''],
    emailEnvoiAuBoulanger: [''],

    //
    host: [''],
    user: [''],
    password: [''],
    logfile: [''],
    port: [0],
    //
    serveurFTP: [this.serveurFTP],
    userFTP: [''],
    passwordFTP: [''],
    site_web_documents: [''],
    user_site_web: [''],
    //
    pwd_site_web: [''],
    serveurFTP_bkup: [this.serveurFTP],
    userFTP_bkup: [''],
    pwdFTPbkup: [''],
    dataFile4DD: [''],
    //
    dataFile4DIndx: [''],
    depotListePrixClients: [''],
    userFTPDepot: [''],
    pwdFTPDepot: [''],
    serveurFTPListePrixClients: [this.serveurFTP],
    //
    serveurFTPSansFTP: [this.ipServeurFunio],
    passwordFTPHash: [''],
    serveurFTPSansFTP_bkup: [this.ipServeurFunio],
    pwdFTPbkup_Hash: [''],
    db_host_mysql: [this.ipServeurFunio],
    //
    db_name_mysql: [''],
    db_username_mysql: [''],
    db_password_mysql: [''],
    repertoireBoulangerie: [''],
    db_host_mysql_boulangerieqc: [this.ipServeurFunio],
    //
    db_name_mysql_boulangerieqc: [''],
    db_username_mysql_boulangerieqc: [''],
    db_password_mysql_boulangerieqc: [''],
    suiviDeProjetGoogle: ['']
  });
  clientAjout:ClientLogiciel=null
  ngOnInit(): void {
    this.choix=[
      {boolLience:true,choixValue:'oui'},
      {boolLience:false,choixValue:'non'}]
  }

  addUser() {

    console.log('selectedChoix='+this.selectedChoix)
    console.log(this.userForm.value);
    this.clientAjout={
      id:0,
      nomBoulangerie: this.userForm.value.nomBoulangerie,
      courriel: this.userForm.value.courriel,
      actifBoolean:this.userForm.value.actifBoolean,
      prenom: this.userForm.value.prenom,
      nomFamille: this.userForm.value.nomFamille,
      telephone: this.userForm.value.telephone,
      rue: this.userForm.value.adresse.rue,
      ville: this.userForm.value.adresse.ville,
      codePostal: this.userForm.value.adresse.codePostal,
      dateDebut: new Date(this.userForm.value.dateDebut),
      dateFin: new Date(this.userForm.value.dateFin),
      identifiant:this.userForm.value.identifiant,
      logoBoulangerie: this.userForm.value.logoBoulangerie,
      emailEnvoiAuBoulanger: this.userForm.value.emailEnvoiAuBoulanger,
      dossierCommandesWeb:'boulangerieqc',
      //
      host: this.userForm.value.host,
      user: this.userForm.value.user,
      password: this.userForm.value.password,
      logfile: this.userForm.value.logfile,
      port: this.userForm.value.port,
      //
      serveurFTP: this.userForm.value.serveurFTP,
      userFTP: this.userForm.value.userFTP,
      passwordFTP: this.userForm.value.passwordFTP,
      site_web_documents: this.userForm.value.site_web_documents,
      user_site_web:this.userForm.value.user_site_web,
      //
      pwd_site_web: this.userForm.value.pwd_site_web,
      serveurFTP_bkup: this.userForm.value.serveurFTP_bkup,
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
      db_name_mysql_boulangerieqc: this.userForm.value.db_name_mysql_boulangerieqc,
      db_username_mysql_boulangerieqc: this.userForm.value.db_username_mysql_boulangerieqc,
      db_password_mysql_boulangerieqc:this.userForm.value.db_password_mysql_boulangerieqc,
      suiviDeProjetGoogle:this.userForm.value.suiviDeProjetGoogle
    }
    this.api.addClientLogiciel(this.clientAjout).subscribe((res) => {
      let arr = Object.values(res);
      console.log("arr="+JSON.stringify(arr))
      this.simpleAlertConfirm('Les coordonnées du client sont transmises...')
     this.router.navigate(['/voirClientsLogiciel'])
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



