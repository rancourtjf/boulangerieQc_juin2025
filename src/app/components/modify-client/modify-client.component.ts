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
import { Client } from '../../models/client';
import { ApiService } from 'src/app/api.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { DropdownModule } from 'primeng/dropdown';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
import { PhoneFormatPipe } from '../../services/phone.pipe';
import { Boulanger } from 'src/app/identificationBoul';




@Component({
  selector: 'app-modify-client',
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DropdownModule,PhoneFormatPipe],
  templateUrl: './modify-client.component.html',
  styleUrl: './modify-client.component.css'
})
export class ModifyClientComponent implements OnInit{

  @Input() clientToModify: any[] = []
  dataSource = signal<any>(null)
  extract = inject(ExtractLienFTPService)
  fb = inject(FormBuilder)
  router = inject(Router)
  api = inject(ApiService)
  http = inject(HttpClient);
  userForm: FormGroup
  clientAjout: any = null
  ipserveurFunio:string=environment.ipServeurFunio
  serveur:string=environment.serveur
  serveurFTP:string=environment.serveurFTP
  connection: any = {}
  boulLogin: Boulanger;


  constructor() {
    this.userForm = this.fb.group({
      id:[''],
      idclient:[''],
      actif: [''],
      courriel: ['', Validators.required],
      googlemap: [''],
      adresse: [''],
      ville: [''],
      codepostal: [''],
      telephone: [''],
      nom: [''],
      emailUserWeb: [''],
      motPasseWeb: [''],
      prenomContact: [''],
      nomContact: [''],
      regroupement: [''],
      idComptable: [''],
      frais_transport: [''],
      activation_Frais_transport: [''],
      qteMincommande: [''],
      achat_minimum_sans_frais: [''],
      version: [''],
      commercial: [''],
      cueillette: [''],
      identifiant: [''],
      userURLSiteFTP: [''],
      userURLSiteCommande: [''],
      clientIndivSiteCommande: [''],
      nomBoulangerie: [''],
      logoBoulangerie:[''],
      role:[''],
      logoSignal:[''],
      emailEnvoiAuBoulanger: [''],
      dossierCommandesWeb: [''],
      proprioBoulangerie: [''],
      accesSMS: [''],
      noCellSMS: [''],
      nomEquipe: [''],
      outilsGestion: [''],
      projetSherbrooke: [''],

   

    });
  }

  ngOnInit(): void {
  
      this.dataSource.set(this.extract.getClient())

console.log("This.dataSource="+JSON.stringify(this.dataSource))
    this.userForm = this.fb.group({
      id: Number([this.dataSource()[0].id]),
      idclient: Number([this.dataSource()[0].idclient]),
      actif:[this.dataSource()[0].actif],
      courriel: [this.dataSource()[0].courriel],
      googlemap: [this.dataSource()[0].googlemap],
      adresse: [this.dataSource()[0].adresse],
      ville: [this.dataSource()[0].ville],
      codepostal: [this.dataSource()[0].codepostal],
      telephone: [this.dataSource()[0].telephone],
      nom: [this.dataSource()[0].nom],
      emailUserWeb: [this.dataSource()[0].emailUserWeb],
      motPasseWeb: [this.dataSource()[0].motPasseWeb],
      prenomContact: [this.dataSource()[0].prenomContact],
      nomContact: [this.dataSource()[0].nomContact],
      regroupement: [this.dataSource()[0].regroupement],
      idComptable: [this.dataSource()[0].idComptable],
      frais_transport: [this.dataSource()[0].frais_transport],
      activation_Frais_transport: [this.dataSource()[0].activation_Frais_transport],
      qteMincommande: [this.dataSource()[0].qteMincommande],
      achat_minimum_sans_frais: [this.dataSource()[0].achat_minimum_sans_frais],
      version: [this.dataSource()[0].version],
      commercial: [this.dataSource()[0].commercial],
      cueillette: [this.dataSource()[0].cueillette],
      identifiant: [this.dataSource()[0].identifiant],
      userURLSiteFTP: [this.dataSource()[0].userURLSiteFTP],
      userURLSiteCommande: [this.dataSource()[0].userURLSiteCommande],
      clientIndivSiteCommande: [this.dataSource()[0].clientIndivSiteCommande],
      nomBoulangerie: [this.dataSource()[0].nomBoulangerie],
      logoBoulangerie:[this.dataSource()[0].logoBoulangerie],
      role:[this.dataSource()[0].role],
      logoSignal:[this.dataSource()[0].logoSignal],
      emailEnvoiAuBoulanger: [this.dataSource()[0].emailEnvoiAuBoulanger],
      dossierCommandesWeb: [this.dataSource()[0].dossierCommandesWeb],
      proprioBoulangerie: [this.dataSource()[0].proprioBoulangerie],
      accesSMS: [this.dataSource()[0].accesSMS],
      noCellSMS: [this.dataSource()[0].noCellSMS],
      nomEquipe: [this.dataSource()[0].nomEquipe],
      outilsGestion: [this.dataSource()[0].outilsGestion],
      projetSherbrooke: [this.dataSource()[0].projetSherbrooke],
      
    });
  }

  modifyUser() {
    console.log('on entre dans le modifyUser()')


    this.clientAjout = {
      id: this.userForm.value.id,
      idclient: this.userForm.value.idclient,
      actif: this.userForm.value.actif,
      courriel: this.userForm.value.courriel,
      googlemap:this.userForm.value.googlemap,
      adresse:this.userForm.value.adresse,
      ville:this.userForm.value.ville,
      codepostal:this.userForm.value.codepostal,
      telephone:this.userForm.value.telephone,
      nom:this.userForm.value.nom,
      emailUserWeb:this.userForm.value.emailUserWeb,
      motPasseWeb:this.userForm.value.motPasseWeb,
      prenomContact:this.userForm.value.prenomContact,
      nomContact:this.userForm.value.nomContact,
      regroupement:this.userForm.value.regroupement,
      idComptable:this.userForm.value.idComptable,
      frais_transport:this.userForm.value.frais_transport,
      activation_Frais_transport:this.userForm.value.activation_Frais_transport,
      qteMincommande:this.userForm.value.qteMincommande,
      achat_minimum_sans_frais:this.userForm.value.achat_minimum_sans_frais,
      version:this.userForm.value.version,
      commercial:this.userForm.value.commercial,
      cueillette:this.userForm.value.cueillette,
      identifiant:this.userForm.value.identifiant,
      userURLSiteFTP:this.userForm.value.userURLSiteFTP,
      userURLSiteCommande:this.userForm.value.userURLSiteCommande,
      clientIndivSiteCommande:this.userForm.value.clientIndivSiteCommande,
      nomBoulangerie:this.userForm.value.nomBoulangerie,
      logoBoulangerie:this.userForm.value.logoBoulangerie,
      role:this.userForm.value.role,
      logoSignal:this.userForm.value.logoSignal,
      emailEnvoiAuBoulanger:this.userForm.value.emailEnvoiAuBoulanger,
      dossierCommandesWeb:this.userForm.value.dossierCommandesWeb,
      proprioBoulangerie:this.userForm.value.proprioBoulangerie,
      accesSMS:this.userForm.value.accesSMS,
      noCellSMS:this.userForm.value.noCellSMS,
      nomEquipe:this.userForm.value.nomEquipe,
      outilsGestion:this.userForm.value.outilsGestion,
      projetSherbrooke:this.userForm.value.projetSherbrooke,
    
    }


    this.api.modifyClient(this.clientAjout).subscribe((res) => {

      this.router.navigate(['/clients'])
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
