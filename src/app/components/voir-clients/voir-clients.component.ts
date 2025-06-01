import { AfterViewInit, Component, computed, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Client } from '../../models/client';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from '../../identificationBoul';
import { MatTableModule } from '@angular/material/table'
import { filter, from, merge, Observable, tap } from 'rxjs';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { PhoneFormatPipe } from '../../services/phone.pipe';
import { rxResource, toObservable, toSignal } from "@angular/core/rxjs-interop";
import { HttpClient, HttpErrorResponse, HttpParams, httpResource } from '@angular/common/http';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
import { isLastDayOfMonth } from 'date-fns';



@Component({
  selector: 'app-voir-clients',
  standalone: true,
  imports: [MatTableModule, MatSortModule, FontAwesomeModule, CommonModule, PhoneFormatPipe],
  templateUrl: './voir-clients.component.html',
  styleUrls: ['./voir-clients.component.scss']
})
export class VoirClientsComponent implements AfterViewInit {

  api = inject(ApiService)
  router = inject(Router)
  extract = inject(ExtractLienFTPService)
  http = inject(HttpClient)
  boulLogin: Boulanger
  dataSource!: any[]
  displayedColumns: string[] = ['idclient', 'actif', 'role', 'version', 'nom', 'adresse', 'ville', 'codepostal', 'courriel', 'telephone', 'googlemap', 'Modifier'];
  sortedData!: Client[];
  connection: any = {}
  connectionResource: any = {}
  tousLesClients = "?dossierCommandesWeb=boulangerieqc&tokenAuth=" + this.extract.getTokenAuth()
  clientResource: any;
  baseUrl = environment.baseUrl;


  // todoResource = resource({
  //   loader: () => fetch("https://www.boulangerieqc.com/assets/crudmysql/viewclient_fetch.php" + this.tousLesClients).then((res) => res.json())
  // })

  // list = computed(() => this.todoResource.value().data);
  faBookOpen = faBookOpen;
  faTrash = faTrash;
  faEdit = faEdit;
  dossierCommandesWeb: string = ""
  proprioBoulangerie = signal<boolean>(false)



  constructor() {
    this.boulLogin = this.extract.boulanger

    let dossierConnection: any = {}
    dossierConnection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    dossierConnection.tokenAuth = this.extract.getTokenAuth();

    let queryParams = new HttpParams({ fromObject: dossierConnection });


    this.clientResource = httpResource<Client>({
      url: this.baseUrl + "viewClient_Obj.php",
      method: 'GET',
      params: queryParams,
      headers: {
        'Accept': 'application/json'
      }
    })
    
    setTimeout(() => {
      this.processData(this.clientResource.value());  // Appelle processData() après 500 ms
    }, 200);


    // this.clientResource = rxResource({
    //   loader: () => {
    //     return this.http.get<Client[]>(this.baseUrl + "viewClient_Obj.php",
    //       {
    //         params: queryParams,
    //       }).pipe(tap(response => {
    //         this.processData(response);
    //       }))
    //   }
    // })

  }
  processData(response: any) {
    // Implémentez ici votre logique de traitement post-requête
    if (response.data === "Erreur : Token expired") {
      alert(
        "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
      );
    }
    response.data.forEach(client => {
      // Traitement pour chaque client
      client.ville = client.ville.toUpperCase()
    });
  }

  protected refresh() {
    this.clientResource.reload();
  }

  ngOnInit(): void {

    this.boulLogin = this.extract.boulanger

    this.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    this.proprioBoulangerie.set(this.boulLogin.proprioBoulangerie)

    this.connection.dossierCommandesWeb = this.dossierCommandesWeb;
    this.connection.tokenAuth = this.extract.getTokenAuth();


    // this.api.getClientInformation(this.connection).subscribe(
    //   (result: any) => {
    //     this.dataSource = result.data;

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
    const data = this.clientResource.value().data.slice();

    console.log("data dans sortData=" + JSON.stringify(data))
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      console.log("apres this.clientResource.value().data dans sortData=" + JSON.stringify(this.clientResource.value().data))
      return;
    }

    this.clientResource.value().data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {

        case "nom":
          return compare(a.nom, b.nom, isAsc);
        case "idclient":
          return compare(a.idclient, b.idclient, isAsc);

        default:
          return 0;
      }
    });
  }
  goToCommande() {
    this.router.navigate(['/commande'])
  }
  modifClient(id: any) {
    let $id = parseInt(id);
    this.connection.id = $id;

    this.api.getUser(this.connection).subscribe((result: any) => {
      this.dataSource = (result.data);

      const source: Observable<any> = from(this.dataSource);
      const req = [];
      let example = source.pipe(filter((obj) => obj.id == this.connection.id));

      const subscribe = example.subscribe((val) => {
        req.push(val);
        return merge(req);
      });

      this.dataSource = (req);
      this.clientResource.value().data = this.dataSource

      this.extract.setClient(this.dataSource);
      this.router.navigate(["/modifyClient"]);
    });
  }
  deleteClient(id: string) {
    this.connection.id = id;

    var result = confirm(
      "Voulez-vous vraiment supprimer la fiche de " + id + "?"
    );
    if (result) {
      //Logic to delete the item
      this.api.deleteClientLogiciel(this.connection).subscribe((res) => {
        this.api.getUsersLogiciel(this.connection).subscribe((result: any) => {
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
