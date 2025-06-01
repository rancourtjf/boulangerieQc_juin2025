import { AfterViewInit, Component, computed, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Ingredient } from '../../models/ingredient';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from '../../identificationBoul';
import { MatTableModule } from '@angular/material/table'
import { filter, from, merge, Observable } from 'rxjs';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-voir-ingredients',
  imports: [MatTableModule, MatSortModule, FontAwesomeModule, CommonModule],
  templateUrl: './voir-ingredients.component.html',
  styleUrl: './voir-ingredients.component.css'
})
export class VoirIngredientsComponent implements AfterViewInit {
  api = inject(ApiService)
  router = inject(Router)
  extract = inject(ExtractLienFTPService)
  boulLogin: Boulanger
  dataSource!: any[]
  displayedColumns: string[] = ['ID', 'nom_ingredient_a', 'fournisseur_a', 'categorie', 'no_code_ingr_fournisseur_a', 'prix_au_kilo_r', 'Modifier'];


  /*
  ID,
  nom_ingredient_a,
  fournisseur_a,
 categorie:string,
 coeffprixvente:number,
 date_modif_stock:Date,
 date_modification:Date,
 description_fournisseur:string,
 fournisseur_a:string,
 fournisseurId_el:number,
 id_categorie_ingredient:number,
 IdFournIngrBest:number,
 ingredient_description_a:string,
 inventaire_b:boolean,
 limite_alerte_kg:number,
 masquage_sur_etiquette:boolean,
 nbr_sacs:number,
 no_code_ingr_fournisseur_a:string,
 nom_ingredient_a:string,
 nomIngrFournisseur:string,
 prix_au_kilo_r:number,
 prix_par_sac_r:number,
 prixdevente:number,
 produit_allergisant_b:boolean,
 qte_en_stock_kg:number,
 qteOptimale:number,
 quantite_par_sac_en_kg_r:number,
 unite_a:string
 
  */


  sortedData!: Ingredient[];
  connection: any = {}
  tousLesClients = "?dossierCommandesWeb=boulangerieqc&tokenAuth=" + this.extract.getTokenAuth()
  faTrash = faTrash;
  faEdit = faEdit;
  dossierCommandesWeb: string = ""
  proprioBoulangerie = signal<boolean>(false)

  ngOnInit(): void {

    this.boulLogin = this.extract.boulanger
    this.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    this.connection.dossierCommandesWeb = this.dossierCommandesWeb;
    this.connection.tokenAuth = this.extract.getTokenAuth();
    this.proprioBoulangerie.set(this.boulLogin.proprioBoulangerie)


    this.api.getIngredientsInformation(this.connection).subscribe(
      (result: any) => {
        this.dataSource = result.data;


        if (result.data === "Erreur : Token expired") {
          alert(
            "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
          );
        }
      }
    )

  }

  ngAfterViewInit() {

  }
  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {

        case "nom_ingredient_a":
          return compare(a.nom_ingredient_a, b.nom_ingredient_a, isAsc);
        case "fournisseur_a":
          return compare(a.fournisseur_a, b.fournisseur_a, isAsc);
        case "categorie":
          return compare(a.categorie, b.categorie, isAsc);
        default:
          return 0;
      }
    });
  }
  goToCommande() {
    this.router.navigate(['/commande'])
  }
  modifIngredient(ID: any) {
    let $ID = parseInt(ID);
    this.connection.ID = $ID;

    this.api.getIngredientsInformation(this.connection).subscribe((result: any) => {
      this.dataSource = (result.data);

      const source: Observable<any> = from(this.dataSource);
      const req = [];
      let example = source.pipe(filter((obj) => obj.ID == this.connection.ID));

      const subscribe = example.subscribe((val) => {
        req.push(val);
        return merge(req);
      });

      this.dataSource = (req);

      this.extract.setClient(this.dataSource);
      this.router.navigate(["/modify_ingredient"]);
    });
  }
  deleteIngredient(ID: string) {
    this.connection.ID = ID;

    var result = confirm(
      "Voulez-vous vraiment supprimer la fiche de " + ID + "?"
    );
    if (result) {
      //Logic to delete the item
      this.api.deleteIngredient(this.connection).subscribe((res) => {
        this.api.getIngredientsInformation(this.connection).subscribe((result: any) => {
          this.dataSource = (result.data);
        });
        (error) => {
          console.error("Erreur lors de la requête HTTP :", error);
        };
      });
    }
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
