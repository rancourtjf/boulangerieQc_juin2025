import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { FormBuilder, Validators } from '@angular/forms';
import { Produit } from '../../models/produits';
import { ApiService } from 'src/app/api.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { DropdownModule } from 'primeng/dropdown';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
import { computed } from '@angular/core';

@Component({
  selector: 'app-modify-produit',
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DropdownModule],
  templateUrl: './modify-produit.component.html',
  styleUrl: './modify-produit.component.css'
})
export class ModifyProduitComponent implements OnInit {

  dataSource = signal<any>(null)
  extract = inject(ExtractLienFTPService)
  fb = inject(FormBuilder)
  router = inject(Router)
  api = inject(ApiService)
  http = inject(HttpClient);
  userForm: FormGroup
  produitAjout: any = null

  connection: any = {}


  constructor() {
    console.log("début constructor modify_produit")
    this.userForm = this.fb.group({
      id: [''],
      categorie: [''],
      condition_taxable: [''],
      consommation_temp: [''],
      contenu_codebarre: [''],
      date_ancienprixListe: [''],
      dateprixliste_changement: [''],
      descriptionProd: [''],
      differenceargent: [''],
      differencepourcentage: [''],
      duree_de_conservation: [''],
      id_recette: [''],
      id_recetteSecPrincipale: [''],
      input0_dimanche: [''],
      input0_jeudi: [''],
      input0_lundi: [''],
      input0_mardi: [''],
      input0_mercredi: [''],
      input0_samedi: [''],
      input0_vendredi: [''],
      nom_recette: [''],
      nom_sac: [''],
      nom_variete: [''],
      poids_apres_cuisson: [''],
      poids_avant_perte: [''],
      poids_variete: [''],
      ponderation_temps: [''],
      portion_par_bacplaque: [''],
      pourc_perte: [''],
      prix_vente_variete: [''],
      prixauclientsuggere: [''],
      prixderevient: [''],
      prixderevientavant: [''],
      prixKgPate: [''],
      produit_dimanche: [''],
      produit_jeudi: [''],
      produit_lundi: [''],
      produit_mardi: [''],
      produit_mercredi: [''],
      produit_samedi: [''],
      produit_special: [''],
      produit_vendredi: [''],
      profit: [''],
      qte_par_bac: [''],
      qte_par_plaque: [''],
      sac_associe_ID: [''],
      taxable: [''],
      url_image: [''],
      variete_poids: [''],
      allergene: [''],
      ingredients: [''],
    });
 console.log("fin constructor")

  }
     /*

`categorie` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`condition_taxable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`consommation_temp` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
`contenu_codebarre` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`date_ancienprixListe` date NOT NULL,
`dateprixliste_changement` date NOT NULL,
`descriptionProd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
`differenceargent` decimal(10,2) NOT NULL,
`differencepourcentage` int(11) NOT NULL,
`duree_de_conservation` int(11) DEFAULT NULL,
`id_recette` int(11) NOT NULL,
`id_recetteSecPrincipale` int(11) NOT NULL,
`input0_dimanche` int(11) NOT NULL,
`input0_jeudi` int(11) NOT NULL,
`input0_lundi` int(11) NOT NULL,
`input0_mardi` int(11) NOT NULL,
`input0_mercredi` int(11) NOT NULL,
`input0_samedi` int(11) NOT NULL,
`input0_vendredi` int(11) NOT NULL,
`nom_recette` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`nom_sac` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`nom_variete` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`poids_apres_cuisson` decimal(10,3) NOT NULL,
`poids_avant_perte` decimal(10,3) NOT NULL,
`poids_variete` decimal(10,3) NOT NULL,
`ponderation_temps` decimal(5,2) NOT NULL,
`portion_par_bacplaque` decimal(10,3) NOT NULL,
`pourc_perte` int(11) NOT NULL,
`prix_vente_variete` decimal(5,2) NOT NULL,
`prixauclientsuggere` decimal(5,2) NOT NULL,
`prixderevient` decimal(5,2) NOT NULL,
`prixderevientavant` decimal(5,2) NOT NULL,
`prixKgPate` decimal(5,2) NOT NULL,
`produit_dimanche` tinyint(1) NOT NULL,
`produit_jeudi` tinyint(1) NOT NULL,
`produit_lundi` tinyint(1) NOT NULL,
`produit_mardi` tinyint(1) NOT NULL,
`produit_mercredi` tinyint(1) NOT NULL,
`produit_samedi` tinyint(1) NOT NULL,
`produit_special` tinyint(1) NOT NULL,
`produit_vendredi` tinyint(1) NOT NULL,
`profit` decimal(5,2) NOT NULL,
`qte_par_bac` decimal(5,2) NOT NULL,
`qte_par_plaque` decimal(5,2) NOT NULL,
`sac_associe_ID` int(11) NOT NULL,
`taxable` tinyint(1) NOT NULL,
`url_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
`variete_poids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`allergene` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`ingredients` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
     */

  ngOnInit(): void {
    console.log("dans ngOninit de modify_produit")

    this.connection.dossierCommandesWeb = this.extract.boulanger.dossierCommandesWeb;
    this.connection.tokenAuth = this.extract.getTokenAuth();
 
     this.dataSource.set(this.extract.getProduits());


    this.userForm = this.fb.group({
      id: ([this.dataSource().id]),
      categorie: ([this.dataSource().categorie]),

      condition_taxable: ([this.dataSource().condition_taxable]),
      consommation_temp: ([this.dataSource().consommation_temp]),
      contenu_codebarre: ([this.dataSource().contenu_codebarre]),
      date_ancienprixListe: ([this.dataSource().date_ancienprixListe]),
      dateprixliste_changement: ([this.dataSource().dateprixliste_changement]),

      descriptionProd: ([this.dataSource().descriptionProd]),
      differenceargent: ([this.dataSource().differenceargent]),
      differencepourcentage: ([this.dataSource().differencepourcentage]),
      duree_de_conservation: ([this.dataSource().duree_de_conservation]),
      id_recette: ([this.dataSource().id_recette]),

      id_recetteSecPrincipale: ([this.dataSource().id_recetteSecPrincipale]),
      input0_dimanche: ([this.dataSource().input0_dimanche]),
      input0_jeudi: ([this.dataSource().input0_jeudi]),
      input0_lundi: ([this.dataSource().input0_lundi]),
      input0_mardi: ([this.dataSource().input0_mardi]),

      input0_mercredi: ([this.dataSource().input0_mercredi]),
      input0_samedi: ([this.dataSource().input0_samedi]),
      input0_vendredi: ([this.dataSource().input0_vendredi]),
      nom_recette: ([this.dataSource().nom_recette]),
      nom_sac: ([this.dataSource().nom_sac]),

      nom_variete: ([this.dataSource().nom_variete]),
      poids_apres_cuisson: ([this.dataSource().poids_apres_cuisson]),
      poids_avant_perte: ([this.dataSource().poids_avant_perte]),
      poids_variete: ([this.dataSource().poids_variete]),
      ponderation_temps: ([this.dataSource().ponderation_temps]),

      portion_par_bacplaque: ([this.dataSource().portion_par_bacplaque]),
      pourc_perte: ([this.dataSource().pourc_perte]),
      prix_vente_variete: ([this.dataSource().prix_vente_variete]),
      prixauclientsuggere: ([this.dataSource().prixauclientsuggere]),
      prixderevient: ([this.dataSource().prixderevient]),
      prixderevientavant: ([this.dataSource().prixderevientavant]),

      prixKgPate: ([this.dataSource().prixKgPate]),
      produit_dimanche: ([this.dataSource().produit_dimanche]),
      produit_jeudi: ([this.dataSource().produit_jeudi]),
      produit_lundi: ([this.dataSource().produit_lundi]),
      produit_mardi: ([this.dataSource().produit_mardi]),

      produit_mercredi: ([this.dataSource().produit_mercredi]),
      produit_samedi: ([this.dataSource().produit_samedi]),
      produit_special: ([this.dataSource().produit_special]),
      produit_vendredi: ([this.dataSource().produit_vendredi]),
      profit: ([this.dataSource().profit]),

      qte_par_bac: ([this.dataSource().qte_par_bac]),
      qte_par_plaque: ([this.dataSource().qte_par_plaque]),
      sac_associe_ID: ([this.dataSource().sac_associe_ID]),
      taxable: ([this.dataSource().taxable]),
      url_image: ([this.dataSource().url_image]),

      variete_poids: ([this.dataSource().variete_poids]),
      allergene: ([this.dataSource().allergene]),
      ingredients: ([this.dataSource().ingredients]),

    });
  }

  modifyProduit() {
    console.log('on entre dans le modifyProduit()')

    this.produitAjout = {
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb,
      id: this.userForm.value.id,
      categorie: this.userForm.value.categorie,

      condition_taxable: this.userForm.value.condition_taxable,
      consommation_temp: this.userForm.value.consommation_temp,
      contenu_codebarre: this.userForm.value.contenu_codebarre,
      date_ancienprixListe: this.userForm.value.date_ancienprixListe,
      dateprixliste_changement: this.userForm.value.dateprixliste_changement,

      descriptionProd: this.userForm.value.descriptionProd,
      differenceargent: this.userForm.value.differenceargent,
      differencepourcentage: this.userForm.value.differencepourcentage,
      duree_de_conservation: this.userForm.value.duree_de_conservation,
      id_recette: this.userForm.value.id_recette,

      id_recetteSecPrincipale: this.userForm.value.id_recetteSecPrincipale,
      input0_dimanche: this.userForm.value.input0_dimanche,
      input0_jeudi: this.userForm.value.input0_jeudi,
      input0_lundi: this.userForm.value.input0_lundi,
      input0_mardi: this.userForm.value.input0_mardi,

      input0_mercredi: this.userForm.value.input0_mercredi,
      input0_samedi: this.userForm.value.input0_samedi,
      input0_vendredi: this.userForm.value.input0_vendredi,
      nom_recette: this.userForm.value.nom_recette,
      nom_sac: this.userForm.value.nom_sac,

      nom_variete: this.userForm.value.nom_variete,
      poids_apres_cuisson: this.userForm.value.poids_apres_cuisson,
      poids_avant_perte: this.userForm.value.poids_avant_perte,
      poids_variete: this.userForm.value.poids_variete,
      ponderation_temps: this.userForm.value.ponderation_temps,


      portion_par_bacplaque: this.userForm.value.portion_par_bacplaque,
      pourc_perte: this.userForm.value.pourc_perte,
      prix_vente_variete: this.userForm.value.prix_vente_variete,
      prixauclientsuggere: this.userForm.value.prixauclientsuggere,
      prixderevient: this.userForm.value.prixderevient,
      prixderevientavant: this.userForm.value.prixderevientavant,

      prixKgPate: this.userForm.value.prixKgPate,
      produit_dimanche: this.userForm.value.produit_dimanche,
      produit_jeudi: this.userForm.value.produit_jeudi,
      produit_lundi: this.userForm.value.produit_lundi,
      produit_mardi: this.userForm.value.produit_mardi,

      produit_mercredi: this.userForm.value.produit_mercredi,
      produit_samedi: this.userForm.value.produit_samedi,
      produit_special: this.userForm.value.produit_special,
      produit_vendredi: this.userForm.value.produit_vendredi,
      profit: this.userForm.value.profit,

      qte_par_bac: this.userForm.value.qte_par_bac,
      qte_par_plaque: this.userForm.value.qte_par_plaque,
      sac_associe_ID: this.userForm.value.sac_associe_ID,
      taxable: this.userForm.value.taxable,
      url_image: this.userForm.value.url_image,
   
      variete_poids: this.userForm.value.variete_poids,
      allergene: this.userForm.value.allergene,
      ingredients: this.userForm.value.ingredients,

    }

    console.log(JSON.stringify(this.produitAjout))

    this.api.modifyProduit(this.produitAjout).subscribe((res) => {

      this.router.navigate(['/produits'])
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
