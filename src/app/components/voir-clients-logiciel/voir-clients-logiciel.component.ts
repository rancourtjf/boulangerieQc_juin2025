import { Component, inject, signal } from "@angular/core";
import { ApiService } from "../../api.service";
import { Client } from "../../models/client";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { Boulanger } from "../../identificationBoul";
import { MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClientLogiciel } from "../../models/clientLogiciel";
import { filter, from, merge, Observable } from "rxjs";
import { ModifyClientLogicielComponent } from "../modify-client-logiciel/modify-client-logiciel.component";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { rxResource } from "@angular/core/rxjs-interop";
import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';


@Component({
  selector: "app-voir-clients-logiciel",
  standalone: true,
  imports: [MatTableModule, MatSortModule, FontAwesomeModule],
  templateUrl: "./voir-clients-logiciel.component.html",
  styleUrl: "./voir-clients-logiciel.component.css",
})
export class VoirClientsLogicielComponent {
  faBookOpen = faBookOpen;
  faTrash = faTrash;
  faEdit = faEdit;
  // <fa-icon [icon]="faBookOpen"></fa-icon>

  api = inject(ApiService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  extract = inject(ExtractLienFTPService);
  http=inject(HttpClient

  )
  boulLogin: Boulanger;
  // dataSource!:ClientLogiciel[]
  dataSource = signal<ClientLogiciel[]>([]);
  displayedColumns: string[] = [
    "nomBoulangerie",
    "prenom",
    "nomFamille",
    "actifBoolean",
    "ville",
    "courriel",
    "host",
    "user",
    "password",
    "port",
    "logfile",
    "serveurFTP",
    "userFTP",
    "passwordFTP",
    "site_web_documents",
    "user_site_web",
    "pwd_site_web",
    "serveurFTP_bkup",
    "userFTP_bkup",
    "pwdFTPbkup",
    "dataFile4DD",
    "dataFile4DIndx",
    "depotListePrixClients",
    "userFTPDepot",
    "pwdFTPDepot",
    "serveurFTPListePrixClients",
    "serveurFTPSansFTP",
    "passwordFTPHash",
    "serveurFTPSansFTP_bkup",
    "pwdFTPbkup_Hash",
    "db_host_mysql",
    "db_name_mysql",
    "db_username_mysql",
    "db_password_mysql",
    "repertoireBoulangerie",
    "db_host_mysql_boulangerieqc",
    "db_name_mysql_boulangerieqc",
    "db_username_mysql_boulangerieqc",
    "db_password_mysql_boulangerieqc",
    "suiviDeProjetGoogle",
    "telephone",
    "Modifier",
  ];
  sortedData!: ClientLogiciel[];
  connection: any = {};
  idClientLogiciel = 0;
  clientLogicielResource:any;
  baseUrl = environment.baseUrl;

  constructor() {
    this.boulLogin = this.extract.boulanger

    let dossierConnection:any={}
    dossierConnection.dossierCommandesWeb=this.boulLogin.dossierCommandesWeb;
    dossierConnection.tokenAuth=this.extract.getTokenAuth();

    let queryParams = new HttpParams({ fromObject: dossierConnection });

      this.clientLogicielResource = httpResource<ClientLogiciel>({
          url: this.baseUrl + "view_clientLogiciel.php",
          method: 'GET',
          params: queryParams,
          headers: {
            'Accept': 'application/json'
          }
        })

    // this.clientLogicielResource=rxResource({
    //   loader:()=>{  return this.http.get<ClientLogiciel[]>(
    //     this.baseUrl + "view_clientLogiciel.php",
    //     {
    //       params: queryParams,
    //     })
    // }})
  }
  protected refresh() {
    this.clientLogicielResource.reload();
  }
  ngOnInit(): void {
    this.idClientLogiciel = this.route.snapshot.params["id"];
    this.boulLogin = this.extract.boulanger;

    let $dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;

    this.connection.dossierCommandesWeb = $dossierCommandesWeb;
    this.connection.tokenAuth = this.extract.getTokenAuth();

    // this.api.getUsersLogiciel(this.connection).subscribe((result: any) => {
    //   this.dataSource.set(result.data);

    //   if (result.data === "Erreur : Token expired") {
    //     alert(
    //       "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
    //     );
    //   }
    // });
  }
  // sortData1(sort: Sort) {
  //   const data = this.clientLogicielResource.value().data.slice();
  //   if (!sort.active || sort.direction === "") {
  //     this.sortedData = data;
  //     return;
  //   }
  // }
    sortData(sort: Sort) {
      const data = this.clientLogicielResource.value().data.slice();
  
      console.log("data dans sortData="+JSON.stringify(data))
      if (!sort.active || sort.direction === "") {
        this.sortedData = data;
        console.log("apres this.clientResource.value().data dans sortData="+JSON.stringify(this.clientLogicielResource.value().data))
        return;
      }
  
      this.clientLogicielResource.value().data = data.sort((a: any, b: any) => {
        const isAsc = sort.direction === "asc";
        switch (sort.active) {
  
          case "nomBoulangerie":
            return compare(a.nomBoulangerie, b.nomBoulangerie, isAsc);
          default:
            return 0;
        }
      });
    }
  goToCommande() {
    this.router.navigate(["/commande"]);
  }
  modifClientLogiciel(id: any) {
    let $id = parseInt(id);
    this.connection.id = $id;

    this.api.getUsersLogiciel(this.connection).subscribe((result: any) => {
      this.dataSource.set(result.data);

      const source: Observable<ClientLogiciel> = from(this.dataSource());
      const req = [];
      let example = source.pipe(filter((obj) => obj.id == this.connection.id));

      const subscribe = example.subscribe((val) => {
        req.push(val);
        return merge(req);
      });

      this.dataSource.set(req);
      this.extract.setClientLogiciel(this.dataSource());
      this.router.navigate(["/modifClientLogiciel"]);
    });
  }
  deleteClientLogiciel(id: string) {
    this.connection.id = id;

    var result = confirm(
      "Voulez-vous vraiment supprimer la fiche de " + id + "?"
    );
    if (result) {
      //Logic to delete the item
      this.api.deleteClientLogiciel(this.connection).subscribe((res) => {
        this.api.getUsersLogiciel(this.connection).subscribe((result: any) => {
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
