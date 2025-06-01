import { Component, inject, OnInit, signal } from "@angular/core";
import { ApiService } from "../../api.service";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { Boulanger } from "../../identificationBoul";
import { MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { filter, from, merge, Observable } from "rxjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Equipes } from "../../models/equipes";



@Component({
  selector: 'app-voir-equipes',
  standalone: true,
  imports: [MatTableModule, MatSortModule, FontAwesomeModule],
  templateUrl: './voir-equipes.component.html',
  styleUrl: './voir-equipes.component.css'
})
export class VoirEquipesComponent implements OnInit {

  faTrash = faTrash;
  api = inject(ApiService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  extract = inject(ExtractLienFTPService);
  boulLogin: Boulanger;
  dataSource = signal<Equipes[]>([]);

  displayedColumns: string[] = [
  
    "nomEquipe",
    "Supprimer"
  ]
  sortedData!: Equipes[];
  connection: any = {};
  equipeID:number=0
  isAsc: boolean;
  constructor() {}

  ngOnInit(): void {

      this.boulLogin = this.extract.getBoulanger()
      this.connection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;;
      this.connection.tokenAuth = this.extract.getTokenAuth();
  
      this.api.viewEquipe(this.connection).subscribe((result: any) => {
        this.dataSource.set(result.data);
     
  
        if (result.data === "Erreur : Token expired") {
          alert(
            "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
          );
        }
      });
    }
    sortData(sort: Sort) {
      const data = this.dataSource().slice();
      if (!sort.active || sort.direction === "") {
        this.sortedData = data;
        return;
      }
  
      this.dataSource.set(
        data.sort((a: any, b: any) => {
          this.isAsc = sort.direction === "desc";
  
          switch (sort.active) {
            case "nomEquipe":
              return compare(a.nomEquipe, b.nomEquipe, this.isAsc);
            default:
              return 0;
          }
        })
      );
    }
    goToCommande() {
      this.router.navigate(["/commande"]);
    }


    deleteEquipe(id: string) {
      this.connection.ID= id;
      this.connection.dossierCommandesWeb=this.extract.boulanger.dossierCommandesWeb
  console.log("deleteEquipe id = "+JSON.stringify(this.connection))
      var result = confirm(
        "Voulez-vous vraiment supprimer la fiche de " + id + "?"
      );
      if (result) {
        //Logic to delete the item
        this.api.deleteEquipe(this.connection).subscribe((res) => {
          this.api.viewEquipe(this.connection).subscribe((result: any) => {
            this.dataSource.set(result.data);
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
  