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
  selector: 'app-modify-boulanger',
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DropdownModule],
  templateUrl: './modify-boulanger.component.html',
  styleUrl: './modify-boulanger.component.css'
})
export class ModifyBoulangerComponent {
 @Input() clientToModify: any[] = []
  dataSource = signal<any>(null)
  extract = inject(ExtractLienFTPService)
  fb = inject(FormBuilder)
  router = inject(Router)
  api = inject(ApiService)
  http = inject(HttpClient);
  userForm: FormGroup
  clientAjout: any = null

  connection: any = {}
  boulLogin: Boulanger;


  constructor() {
    this.userForm = this.fb.group({
      idclient:[''],
      nom:[''],
      courriel:[''],
      adresse:[''],
      ville:[''],
      codepostal:[''],
      telephone:[''],
      courrielcommande:[''],
      courriel_retour_paye:[''],
      date_code_acces_d:[''],
      date_fin_acces_d:[''],
      datenewVersion:[''],
      debutCalendrierLundi:[''],
      emailEnvoiAuBoulanger:[''],
      heure_tombee_production_h:[''],
      jours_conservation_FTP:[''],
      monnaieCanada_b:[''],
      noCompteTPS:[''],
      noCompteTVQ:[''],
      noVersion:[''],
      ouvertlundi_b:[''],
      ouvertmardi_b:[''],
      ouvertmercredi_b:[''],
      ouvert_jeudi_b:[''],
      ouvert_vendredi_b:[''],
      ouvert_samedi_b:[''],
      ouvert_dimanche_b:[''],
      site_internet_a:[''],
      transmissionProduitComptable:[''],
      txtVersementBancaire:['']
    });
  }

  ngOnInit(): void {
  
      this.dataSource.set(this.extract.getClient())


    this.userForm = this.fb.group({

      idclient: Number([this.dataSource()[0].idclient]),
      nom: [this.dataSource()[0].nom],
      courriel: [this.dataSource()[0].courriel],
      adresse: [this.dataSource()[0].adresse],
      ville: [this.dataSource()[0].ville],
      codepostal: [this.dataSource()[0].codepostal],
      telephone: [this.dataSource()[0].telephone],
      courrielcommande: [this.dataSource()[0].courrielcommande],
      courriel_retour_paye: [this.dataSource()[0].courriel_retour_paye],
      date_code_acces_d: [this.dataSource()[0].date_code_acces_d],
      date_fin_acces_d: [this.dataSource()[0].date_fin_acces_d],
      datenewVersion: [this.dataSource()[0].datenewVersion],
      debutCalendrierLundi: [this.dataSource()[0].debutCalendrierLundi],
      emailEnvoiAuBoulanger: [this.dataSource()[0].emailEnvoiAuBoulanger],
      heure_tombee_production_h: [this.dataSource()[0].heure_tombee_production_h],
      jours_conservation_FTP: [this.dataSource()[0].jours_conservation_FTP],
      monnaieCanada_b: [this.dataSource()[0].monnaieCanada_b],
      noCompteTPS: [this.dataSource()[0].noCompteTPS],
      noCompteTVQ: [this.dataSource()[0].noCompteTVQ],
      noVersion: [this.dataSource()[0].noVersion],
      ouvertlundi_b: [this.dataSource()[0].ouvertlundi_b],
      ouvertmardi_b: [this.dataSource()[0].ouvertmardi_b],
      ouvertmercredi_b: [this.dataSource()[0].ouvertmercredi_b],
      ouvert_jeudi_b: [this.dataSource()[0].ouvert_jeudi_b],
      ouvert_vendredi_b: [this.dataSource()[0].ouvert_vendredi_b],

      ouvert_samedi_b: [this.dataSource()[0].ouvert_samedi_b],
      ouvert_dimanche_b: [this.dataSource()[0].ouvert_dimanche_b],
      site_internet_a: [this.dataSource()[0].site_internet_a],
      transmissionProduitComptable: [this.dataSource()[0].transmissionProduitComptable],
      txtVersementBancaire: [this.dataSource()[0].txtVersementBancaire]
      
    });
  }

  modifyBoulanger() {
    console.log('on entre dans le modifyUser()')

    this.clientAjout = {
      dossierCommandesWeb:this.extract.getBoulanger().dossierCommandesWeb ,
      id: this.userForm.value.id,
      idclient: this.userForm.value.idclient,
    
      nom: this.userForm.value.nom,
      courriel: this.userForm.value.courriel,
      adresse: this.userForm.value.adresse,
      ville: this.userForm.value.ville,
      codepostal: this.userForm.value.codepostal,

      telephone: this.userForm.value.telephone,
      courrielcommande: this.userForm.value.courrielcommande,
      courriel_retour_paye: this.userForm.value.courriel_retour_paye,
      date_code_acces_d: this.userForm.value.date_code_acces_d,
      date_fin_acces_d: this.userForm.value.date_fin_acces_d,

      datenewVersion: this.userForm.value.datenewVersion,
      debutCalendrierLundi: this.userForm.value.debutCalendrierLundi,
      emailEnvoiAuBoulanger: this.userForm.value.emailEnvoiAuBoulanger,
      heure_tombee_production_h: this.userForm.value.heure_tombee_production_h,
      jours_conservation_FTP: this.userForm.value.jours_conservation_FTP,

      monnaieCanada_b: this.userForm.value.monnaieCanada_b,
      noCompteTPS: this.userForm.value.noCompteTPS,
      noCompteTVQ: this.userForm.value.noCompteTVQ,
      noVersion: this.userForm.value.noVersion,
      ouvertlundi_b: this.userForm.value.ouvertlundi_b,
      ouvertmardi_b: this.userForm.value.ouvertmardi_b,

      ouvertmercredi_b: this.userForm.value.ouvertmercredi_b,
      ouvert_jeudi_b: this.userForm.value.ouvert_jeudi_b,
      ouvert_vendredi_b: this.userForm.value.ouvert_vendredi_b,
 
      ouvert_samedi_b: this.userForm.value.ouvert_samedi_b,
      ouvert_dimanche_b: this.userForm.value.ouvert_dimanche_b,
      site_internet_a: this.userForm.value.site_internet_a,
      transmissionProduitComptable: this.userForm.value.transmissionProduitComptable,
      txtVersementBancaire: this.userForm.value.txtVersementBancaire,
    }

    this.api.modifyBoulanger(this.clientAjout).subscribe((res) => {

      this.router.navigate(['/boulanger'])
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
