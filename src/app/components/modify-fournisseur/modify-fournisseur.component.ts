import { Component, inject, Input, OnInit, signal } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// Reactive form for generate and validate the form
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// primeng components
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

// FormBuilder to create form and Validators for validations
import { FormBuilder, Validators } from '@angular/forms';
import { Fournisseur } from '../../models/fournisseur';
import { ApiService } from 'src/app/api.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { DropdownModule } from 'primeng/dropdown';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';

@Component({
  selector: 'app-modify-fournisseur',
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    DropdownModule],  templateUrl: './modify-fournisseur.component.html',
  styleUrl: './modify-fournisseur.component.css'
})
export class ModifyFournisseurComponent implements OnInit{

  dataSource = signal<Fournisseur[]>(null)
  extract = inject(ExtractLienFTPService)
  fb = inject(FormBuilder)
  router = inject(Router)
  api = inject(ApiService)
  http = inject(HttpClient);
  userForm: FormGroup
  clientAjout: any = null

  connection: any = {}
  boulLogin= this.extract.getBoulanger()

  constructor() {
    this.userForm = this.fb.group({
      id:[''],
      ID4D:[''],
      nom:[''],
      courriel: ['', Validators.required],
      telephone: [''],
      adresse: [''],
      ville:[''],
      code_postal: [''],
      fax: [''],
      prenom_responsable: [''],
      nom_responsable: [''],
    });
}
ngOnInit(): void {

this.dataSource.set(this.extract.getFournisseur())

this.userForm = this.fb.group({

  id: [this.dataSource()[0].id],
  ID4D: [this.dataSource()[0].ID4D],
  nom: [this.dataSource()[0].nom],
  courriel: [this.dataSource()[0].courriel],
  telephone: [this.dataSource()[0].telephone],
  adresse: [this.dataSource()[0].adresse],
  ville:[this.dataSource()[0].ville],
  code_postal: [this.dataSource()[0].code_postal],
  fax: [this.dataSource()[0].fax],
  prenom_responsable: [this.dataSource()[0].prenom_responsable],
  nom_responsable: [this.dataSource()[0].nom_responsable]
});
}
 modifyFournisseur() {
    console.log('on entre dans le modifyFournisseur()')

    this.clientAjout = {
      id:this.dataSource()[0].id,
      ID4D: this.userForm.value.ID4D,
      nom: this.userForm.value.nom,
      courriel: this.userForm.value.courriel,
      telephone: this.userForm.value.telephone,
      adresse: this.userForm.value.adresse,
      ville: this.userForm.value.ville,
      code_postal: this.userForm.value.code_postal,
      fax: this.userForm.value.fax,
      prenom_responsable: this.userForm.value.prenom_responsable,
      nom_responsable: this.userForm.value.nom_responsable,
      dossierCommandesWeb:this.extract.getBoulanger().dossierCommandesWeb
    }
    console.log("this.clientAjout"+JSON.stringify(this.clientAjout))

    this.api.updateFournisseur(this.clientAjout).subscribe((res) => {

      this.router.navigate(['/fournisseurs'])
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
