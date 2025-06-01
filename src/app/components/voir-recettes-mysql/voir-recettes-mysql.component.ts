import { Component, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { RecetteMysql } from '../../models/recettesMysql';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from '../../identificationBoul';
import { MatTableModule } from '@angular/material/table'


@Component({
  selector: 'app-voir-recettes-mysql',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './voir-recettes-mysql.component.html',
  styleUrl: './voir-recettes-mysql.component.css'
})
export class VoirRecettesMysqlComponent {
  api = inject(ApiService)
  router = inject(Router)
  extract = inject(ExtractLienFTPService)
  boulLogin: Boulanger
  dataSource!: RecetteMysql[]
  displayedColumns: string[] = ['nom_recette', 'categorie', 'date_derniere_modif'];
  //url_recette_web
  sortedData!: RecetteMysql[];
  connection: any = {}

  ngOnInit(): void {

    this.boulLogin = this.extract.boulanger

    let $dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    this.connection.dossierCommandesWeb = $dossierCommandesWeb;
    this.connection.tokenAuth = this.extract.getTokenAuth();

    this.api.getRecettesPDF(this.connection).subscribe(
      (result: any) => {
        this.dataSource = result.data;

        this.dataSource.sort((a, b) => a.nom_recette.localeCompare(b.nom_recette));

        this.dataSource.sort((a, b) => {
          if (a.categorie === b.categorie) {
            return a.categorie.localeCompare(b.categorie);
          } else {
            return a.nom_recette.localeCompare(b.nom_recette);
          }
        });

        if (result.data === "Erreur : Token expired") {
          alert(
            "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
          );
        }
      }
    )
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

        case "nom_recette":
          return compare(a.nom_recette, b.nom_recette, isAsc);
        case "categorie":

          return compare(a.categorie, b.categorie, isAsc);
        case "date_derniere_modif":
          return compare(a.date_derniere_modif, b.date_derniere_modif, isAsc);

        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

// nom_recette:string;
// categorie: string;
// date_derniere_modif?:Date;
// url_recette_web:string;

