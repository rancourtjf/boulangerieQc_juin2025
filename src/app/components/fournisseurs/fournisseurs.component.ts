import { Component, inject, OnInit, signal } from "@angular/core";
import { ApiService } from "../../api.service";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { filter, from, merge, Observable } from "rxjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Fournisseur } from "../../models/fournisseur";
import Swal from "sweetalert2";
import { InitialesResult } from "../../models/initialesModel";

import { PhoneFormatPipe } from "../../services/phone.pipe";



@Component({
  selector: 'app-fournisseurs',
  imports: [MatTableModule, MatSortModule, FontAwesomeModule, PhoneFormatPipe],

  templateUrl: './fournisseurs.component.html',
  styleUrl: './fournisseurs.component.css'
})
export class FournisseursComponent  {


  faTrash = faTrash;
  faEdit = faEdit;

  api = inject(ApiService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  extract = inject(ExtractLienFTPService);
  boulLogin: any;
  dataSource :Fournisseur[];

  displayedColumns: string[] = [

    "nom",
    "courriel",
    "telephone",
    "ville",
    "fax",
    "nom_responsable",
    "Modifier"
  ]

  sortedData!: Fournisseur[];
  connection: any = {};
  idFournisseur = 0;
  nom: string = ""
  isAsc: boolean;

  constructor() { }

  ngOnInit(): void {


    //  this.idFournisseur = this.route.snapshot.params["id"];
    this.boulLogin = this.extract.getBoulanger()

    this.connection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;;
    this.connection.tokenAuth = this.extract.getTokenAuth();

    this.api.viewFournisseur(this.connection).subscribe((result: any) => {
      this.dataSource=(result.data);
      this.extract.setFournisseur(this.dataSource)

      if (result.data === "Erreur : Token expired") {
        alert(
          "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
        );
      }
    });
  }
  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.dataSource=(
      data.sort((a: any, b: any) => {
        this.isAsc = sort.direction === "desc";

        switch (sort.active) {
          case "nom":
            return compare(a.nom, b.nom, this.isAsc);

          default:
            return 0;
        }
      })
    );
  }
  goToCommande() {
    this.router.navigate(["/fournisseurs"]);
  }
  modifFournisseur(id: any) {
    let $id = parseInt(id);
    this.connection.id = $id;

    this.api.viewFournisseur(this.connection).subscribe((result: any) => {
      this.dataSource=(result.data);

      const source: Observable<any> = from(((this.dataSource)));
      const req = [];
      let example = source.pipe(filter((obj) => obj.id == this.connection.id));

      const subscribe = example.subscribe((val) => {
        req.push(val);
        return merge(req);
      });

      this.dataSource=(req);

      this.extract.setFournisseur(this.dataSource);
      this.router.navigate(["/modify_Fournisseur"]);
    });
  }
  deleteFournisseur(id: string) {
    this.connection.id = id;

    var result = confirm(
      "Voulez-vous vraiment supprimer la fiche de " + id + "?"
    );
    if (result) {
      //Logic to delete the item
      this.api.deleteFournisseur(this.connection).subscribe((res) => {

        //on demande à voir tous les fournisseurs
        this.connection={}
    this.connection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;;
    this.connection.tokenAuth = this.extract.getTokenAuth();

        this.api.viewFournisseur(this.connection).subscribe((result: any) => {
          this.dataSource=(result.data);
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
