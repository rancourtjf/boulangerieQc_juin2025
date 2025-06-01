import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { Fournisseur } from 'src/app/models/fournisseur';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-fournisseur',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './new-fournisseur.component.html',
  styleUrl: './new-fournisseur.component.css'
})
export class NewFournisseurComponent implements OnInit{
  newFournisseur: FormGroup;
  emailBoulanger: string;


fournisseur:Fournisseur
boulanger:any

extract=inject(ExtractLienFTPService)
api=inject(ApiService)
router=inject(Router)
  clientFournisseur: { ID4D: any; nom: any; courriel: any; telephone: any; 
    adresse: any; ville: any; code_postal: any; fax: any; prenom_responsable: string; 
    nom_responsable: string; dossierCommandesWeb: string;
    noID_logicielComptable:string };

  constructor(
    private formBuilder: FormBuilder,

    private extractLienFTPService: ExtractLienFTPService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

 this.boulanger=this.extractLienFTPService.getBoulanger()

 this.newFournisseur= this.formBuilder.group({
      nom: [""],
      ID4D: [""],
      courriel: ["", [Validators.required]],
      telephone: [""],
      adresse: [""],
      ville: [""],
      code_postal: [""],
      fax: [""],
      prenom_responsable: [""],
      nom_responsable: [""],
      noID_logicielComptable: ["", ],
      
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

  

  ajoutFournisseur() {
    console.log('on entre dans le ajoutFournisseur()')

    this.clientFournisseur = {
      nom: this.newFournisseur.value.nom,
      ID4D: this.newFournisseur.value.ID4D,
      courriel: this.newFournisseur.value.courriel,
      telephone: this.newFournisseur.value.telephone,
      adresse: this.newFournisseur.value.adresse,
      ville: this.newFournisseur.value.ville,
      code_postal: this.newFournisseur.value.code_postal,
      fax: this.newFournisseur.value.fax,
      prenom_responsable: this.newFournisseur.value.prenom_responsable,
      nom_responsable: this.newFournisseur.value.nom_responsable,
      noID_logicielComptable:this.newFournisseur.value.noID_logicielComptable,
      dossierCommandesWeb:this.extract.getBoulanger().dossierCommandesWeb

    }

    this.api.addFournisseur(this.clientFournisseur).subscribe((res) => {

      this.router.navigate(['/fournisseurs'])
      error => {
        console.error('Erreur lors de la requête HTTP :', error);
      }
    });
  }
}
