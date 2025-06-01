import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';
import { ApiService } from 'src/app/api.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { DropdownModule } from 'primeng/dropdown';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
@Component({
  selector: 'app-modify-ingredient',
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    DropdownModule],
  templateUrl: './modify-ingredient.component.html',
  styleUrl: './modify-ingredient.component.css'
})
export class ModifyIngredientComponent implements OnInit{
   @Input() clientToModify: any[] = []
    dataSource = signal<any>(null)
    extract = inject(ExtractLienFTPService)
    fb = inject(FormBuilder)
    router = inject(Router)
    api = inject(ApiService)
    http = inject(HttpClient);
    userForm: FormGroup
    ingredientAjout: any = null
    ipserveurFunio:string=environment.ipServeurFunio
    serveur:string=environment.serveur
    serveurFTP:string=environment.serveurFTP
    connection: any = {}
  
    constructor() {
      this.userForm = this.fb.group({
        ID:[''],
        nom_ingredient_a:[''],
        categorie:[''],
        coeffprixvente:[''],
        date_modif_stock:[''],
        date_modification:[''],

        description_fournisseur:[''],
        fournisseur_a:[''],
        fournisseurId_el:[''],
        id_categorie_ingredient:[''],
        IdFournIngrBest:[''],

        ingredient_description_a:[''],
        inventaire_b:[''],
        limite_alerte_kg:[''],
        masquage_sur_etiquette:[''],
        nbr_sacs:[''],

        no_code_ingr_fournisseur_a:[''],
        nomIngrFournisseur:[''],
        prix_au_kilo_r:[''],
        prix_par_sac_r:[''],
        prixdevente:[''],

        produit_allergisant_b:[''],
        qte_en_stock_kg:[''],
        qteOptimale:[''],
        quantite_par_sac_en_kg_r:[''],
        unite_a:[''],
  
      });
    }
  
    ngOnInit(): void {
    
        this.dataSource.set(this.extract.getClient())
        
      this.userForm = this.fb.group({
        ID: Number([this.dataSource()[0].ID]),
       
        fournisseur_a: ([this.dataSource()[0].fournisseur_a]),
        categorie: ([this.dataSource()[0].categorie]),
        coeffprixvente: Number([this.dataSource()[0].coeffprixvente]),
        date_modif_stock: ([this.dataSource()[0].date_modif_stock]),

        date_modification: ([this.dataSource()[0].date_modification]),
        description_fournisseur:([this.dataSource()[0].description_fournisseur]),
        fournisseurId_el: ([this.dataSource()[0].fournisseurId_el]),
        id_categorie_ingredient: ([this.dataSource()[0].id_categorie_ingredient]),
        IdFournIngrBest: ([this.dataSource()[0].IdFournIngrBest]),

        ingredient_description_a: ([this.dataSource()[0].ingredient_description_a]),
        inventaire_b:([this.dataSource()[0].inventaire_b]),
        limite_alerte_kg: ([this.dataSource()[0].limite_alerte_kg]),
        masquage_sur_etiquette: ([this.dataSource()[0].masquage_sur_etiquette]),
        nbr_sacs: ([this.dataSource()[0].nbr_sacs]),

        no_code_ingr_fournisseur_a: ([this.dataSource()[0].no_code_ingr_fournisseur_a]),
        nom_ingredient_a:([this.dataSource()[0].nom_ingredient_a]),
        nomIngrFournisseur: ([this.dataSource()[0].nomIngrFournisseur]),
        prix_au_kilo_r: Number([this.dataSource()[0].prix_au_kilo_r]),
        prix_par_sac_r: Number([this.dataSource()[0].prix_par_sac_r]),

        prixdevente: Number([this.dataSource()[0].prixdevente]),
        produit_allergisant_b:([this.dataSource()[0].produit_allergisant_b]),
        qte_en_stock_kg: ([this.dataSource()[0].qte_en_stock_kg]),
        qteOptimale: ([this.dataSource()[0].qteOptimale]),
        quantite_par_sac_en_kg_r: ([this.dataSource()[0].quantite_par_sac_en_kg_r]),
        unite_a: ([this.dataSource()[0].unite_a]),
        
      });
    }
  
    modifyIngredient() {
      console.log('on entre dans le modifyUser()')
  
      this.ingredientAjout = {
        dossierCommandesWeb:this.extract.boulanger.dossierCommandesWeb,
        ID: this.userForm.value.ID,
        fournisseur_a: this.userForm.value.fournisseur_a,

        categorie: this.userForm.value.categorie,
        coeffprixvente: this.userForm.value.coeffprixvente,
        date_modif_stock: this.userForm.value.date_modif_stock,
        date_modification: this.userForm.value.date_modification,
        description_fournisseur: this.userForm.value.description_fournisseur,
      
        fournisseurId_el: this.userForm.value.fournisseurId_el,
        id_categorie_ingredient: this.userForm.value.id_categorie_ingredient,
        IdFournIngrBest: this.userForm.value.IdFournIngrBest,
        ingredient_description_a: this.userForm.value.ingredient_description_a,
        inventaire_b: this.userForm.value.inventaire_b,

        limite_alerte_kg: this.userForm.value.limite_alerte_kg,
        masquage_sur_etiquette: this.userForm.value.masquage_sur_etiquette,
        nbr_sacs: this.userForm.value.nbr_sacs,

        no_code_ingr_fournisseur_a: this.userForm.value.no_code_ingr_fournisseur_a,
        nom_ingredient_a: this.userForm.value.nom_ingredient_a,
        nomIngrFournisseur: this.userForm.value.nomIngrFournisseur,
        prix_au_kilo_r: this.userForm.value.prix_au_kilo_r,
        prix_par_sac_r: this.userForm.value.prix_par_sac_r,

        prixdevente: this.userForm.value.prixdevente,
        produit_allergisant_b: this.userForm.value.produit_allergisant_b,
        qte_en_stock_kg: this.userForm.value.qte_en_stock_kg,
        qteOptimale: this.userForm.value.qteOptimale,
        quantite_par_sac_en_kg_r: this.userForm.value.quantite_par_sac_en_kg_r,
        unite_a: this.userForm.value.unite_a,

      }
  
      this.api.modifyIngredient(this.ingredientAjout).subscribe((res) => {
  
        this.router.navigate(['/ingredients'])
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
