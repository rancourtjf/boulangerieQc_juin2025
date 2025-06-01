import { AfterViewInit, Component, computed, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Produit } from '../../models/produits';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from '../../identificationBoul';
import { MatTableModule } from '@angular/material/table'
import { filter, from, merge, Observable, tap } from 'rxjs';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { rxResource } from "@angular/core/rxjs-interop";
import { HttpClient, HttpParams } from '@angular/common/http';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';

@Component({
  selector: 'app-voir-produits',
  imports: [MatTableModule, MatSortModule, FontAwesomeModule, CommonModule],
  templateUrl: './voir-produits.component.html',
  styleUrl: './voir-produits.component.css'
})
export class VoirProduitsComponent implements AfterViewInit{
  api = inject(ApiService)
  router = inject(Router)
  extract = inject(ExtractLienFTPService)
  http=inject(HttpClient)

  boulLogin: Boulanger
  dataSource!: any[]
  displayedColumns: string[] = ['id', 'variete_poids', 'nom_recette', 'taxable', 'prix_vente_variete','prixderevient', 'Modifier'];

  sortedData!: Produit[];
  connection: any = {}
  // tousLesClients = "?dossierCommandesWeb=boulangerieqc&tokenAuth=" + this.extract.getTokenAuth()
  faTrash = faTrash;
  faEdit = faEdit;
  dossierCommandesWeb: string = ""
  proprioBoulangerie = signal<boolean>(false)
  produitsResource: any;
  baseUrl = environment.baseUrl;

    constructor() {
      this.boulLogin = this.extract.boulanger
  
      let dossierConnection: any = {}
      dossierConnection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
      dossierConnection.tokenAuth = this.extract.getTokenAuth();
  
      let queryParams = new HttpParams({ fromObject: dossierConnection });
      this.produitsResource = rxResource({
        loader: () => {
          return this.http.get<Produit[]>( this.baseUrl + "view_produits_token.php",
            {
              params: queryParams,
            }).pipe(tap(response => {
              this.processData(response);
            }))
        }
      })
    }


    processData(response: any) {
      // Implémentez ici votre logique de traitement post-requête
      if (response.data === "Erreur : Token expired") {
        alert(
          "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
        );
      }
      response.data.forEach(produit => {
        // Traitement pour chaque client
        produit.variete_poids = produit.variete_poids.toUpperCase()
      });
    }
  
    protected refresh() {
      this.produitsResource.reload();
    }
  ngOnInit(): void {

    this.boulLogin = this.extract.boulanger

    this.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    this.connection.dossierCommandesWeb = this.dossierCommandesWeb;
    this.connection.tokenAuth = this.extract.getTokenAuth();
    this.proprioBoulangerie.set(this.boulLogin.proprioBoulangerie)


    // this.api.getProduitsInformation(this.connection).subscribe(
    //   (result: any) => {
    //     this.dataSource = result.data;
    //     this.extract.setProduits(result.data);
   
    //     if (result.data === "Erreur : Token expired") {
    //       alert(
    //         "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
    //       );
    //     }
    //   }
    // )
  }

  ngAfterViewInit() {

  }
  sortData(sort: Sort) {
    const data = this.produitsResource.value().data.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.produitsResource.value().data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {

        case "variete_poids":
          return compare(a.variete_poids, b.variete_poids, isAsc);
        case "nom_recette":
          return compare(a.nom_recette, b.nom_recette, isAsc);
        case "taxable":
          return compare(a.taxable, b.taxable, isAsc);
        default:
          return 0;
      }
    });
  }
  goToCommande() {
    this.router.navigate(['/commande'])
  }
  modifProduit(id: any) {
    let $id = parseInt(id);
    this.connection.id = $id;

    const item = this.produitsResource.value().data.find(item => item.id === id);


    this.extract.setProduits(item);
    console.log(JSON.stringify(this.extract.getProduits()))
    this.router.navigate(["/modify_produit"]);

    // this.api.getProduitsInformation(this.connection).subscribe((result: any) => {
    //   this.dataSource = (result.data);

    //   const source: Observable<any> = from(this.dataSource);
      
    //   const req = [];
    //   let example = source.pipe(filter((obj) => obj.id == this.connection.id));

    //   const subscribe = example.subscribe((val) => {
    //     req.push(val);
    //     return merge(req);
    //   });

    //   this.dataSource = (req);

    //   this.extract.setProduits(this.dataSource);
    //   console.log(JSON.stringify(this.extract.getProduits()))
    //   this.router.navigate(["/modify_produit"]);
    // });
  }
  deleteProduit(id: string) {
    this.connection.id = id;

    var result = confirm(
      "Voulez-vous vraiment supprimer la fiche de " + id + "?"
    );
    if (result) {
      //Logic to delete the item
      this.api.deleteProduit(this.connection).subscribe((res) => {
        this.api.getProduitsInformation(this.connection).subscribe((result: any) => {
          this.produitsResource.value().data = (result.data);
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
