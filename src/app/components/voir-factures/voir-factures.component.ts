// https://www.tektutorialshub.com/angular/select-options-example-in-angular/
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileSaveComponent } from "../file-save/file-save.component";
import { PaginatorModule } from "primeng/paginator";

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ApiService } from "../../api.service";
import { Facture } from "../../models/facture";
import { ItemService } from "../../services/item.service";
import { PageEvent } from "@angular/material/paginator";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { Observable, from, merge } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Boulanger } from "../../identificationBoul";
import { Router,ActivatedRoute } from "@angular/router";

import Swal from "sweetalert2";
import { getDay, getMonth, getYear } from "date-fns";
import { subDays } from 'date-fns';
import { Time } from "@angular/common";
import { Client } from "../../models/client";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-voir-factures",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    FileSaveComponent,
],
  templateUrl: "./voir-factures.component.html",
  styleUrls: ["./voir-factures.component.scss"],
})
export class VoirFacturesComponent implements AfterViewInit, OnInit {
[x: string]: any;
  @ViewChild(MatSort)
  sort: MatSort | undefined;
  api = inject(ApiService);
  item = inject(ItemService);
  extract = inject(ExtractLienFTPService);
  router = inject(Router);
  fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);


  displayedColumns: string[] = [
    "url_facture",
    "livree",
    "jourdelasemaine",
    "dateProd",
    "montant",
    "total_est_paye",
    // "siteProduction",
    "commentaires",
    "googleMap",
    "timeStamp",
    "idclient",
  ];
  //dataSource!: Facture[];
  dataSource = signal<Facture[]>([]);

  sortedData!: Facture[];
  postPerPage: number;
  pageNumber: number;
  isAsc: boolean = true;
  itemObservable: any;
  boulLogin: Boulanger;
  $connection: string;
  truck: string = "truck";
  rechercheFactFind: Facture;
  resultOnefactExtract: any;
  Idetconnection: any;
  selectedTeam: any;
  listeClient = signal<Client[]>([]);

  dataSourceClient: any;
  clientForm: FormGroup<{ client: FormControl<any> }>;
  noClientChoisi: number;
  role = signal<string>("");
  resultRecherche: { date: any };
  dateForm: any;
  $dossierCommandesWeb = "";
  dateProd: any;
  estLivre = signal(false);
  dateLivraison:string=""
  heureLivraison:string=""
  NewTime:string=""
  connection: any = {}
  factureRxResource:any;


  constructor() {}
  ngOnInit(): void {
//https://angular.fr/routing/parameter-router


    console.log("on entre dans ngOnInit voir-facture");
    this.boulLogin = this.extract.getBoulanger();

    this.role.set(this.boulLogin.role);


    // if(this.role()=="livraison"){
    this.displayedColumns = [
      "url_facture",
      "livree",
      "jourdelasemaine",
      "dateProd",
      "montant",
      "total_est_paye",
      // "siteProduction",
      "commentaires",
      "googleMap",
      "timeStamp",
      "idclient",
    ];
    // }
    // else{
    //   this.displayedColumns = [
    //     "url_facture",
    //     "jourdelasemaine",
    //     "dateProd",
    //     "montant",
    //     "total_est_paye",
    //     "googleMap",
    //     "timeStamp",
    //     "idclient",
    //   ];
    // }

    this.$dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    this.dateProd = this.extract.getDateProduction();

    this.clientForm = this.fb.group({
      client: [null],
    });

    this.api
      .getUsers(this.$dossierCommandesWeb)
      .subscribe((resultClients: any) => {
        this.listeClient.set(resultClients.data);

        this.listeClient.set(
          this.listeClient().sort((p1, p2) =>
            p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
          )
        );

      });

    this.dateForm = this.fb.group({
      date: ["", Validators.required],
    });
  }


  ngAfterViewInit() {
    console.log("on entre dans ngAfterViewInit voir-facture");
    this.dateProd = this.extract.getDateProduction();



    this.api
      .getFactureInformation(this.$dossierCommandesWeb)
      .subscribe((result: any) => {
        this.dataSource.set(result.data);

        if (this.role() == "client") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];
          let example = source.pipe(
            filter((obj) => obj.idclient == this.boulLogin.idclient)
          );
          //  example = source.pipe(
          //   filter((obj) => obj.dateProd == this.dateProd)
          // );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource.set(req);
      
        } else {
          //le boulanger peut voir toutes les factures
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];

          let example = source.pipe(
            filter((obj) => obj.dateProd == this.dateProd)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource.set(req);
     
        }

        this.dataSource.set(
          this.dataSource().sort((p1, p2) =>
            p1.dateProd < p2.dateProd ? 1 : p1.dateProd > p2.dateProd ? -1 : 0
          )
        );
      });

    this.dataSource.set(
      this.dataSource().sort((a: any, b: any) =>
        a.dateProd < b.dateProd ? 1 : -1
      )
    );
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
          case "dateProd":
            return compare(a.dateProd, b.dateProd, this.isAsc);
          case "idclient":
            return compare(a.idclient, b.idclient, this.isAsc);
          case "livree":
            return compare(a.livree, b.livree, this.isAsc);

          // case "id_commande":
          //   return compare(a.id_commande, b.id_commande, this.isAsc);
          case "type_facture":
            return compare(a.type_facture, b.type_facture, this.isAsc);
          case "jourdelasemaine":
            return compare(a.jourdelasemaine, b.jourdelasemaine, this.isAsc);
          case "url_facture":
            return compare(a.url_facture, b.url_facture, this.isAsc);
          // case "total_est_paye":
          //   return compare(a.total_est_paye, b.total_est_paye, this.isAsc);
          case "siteProduction":
            return compare(a.siteProduction, b.siteProduction, this.isAsc);
          case "timeStamp":
            return compare(a.timeStamp, b.timeStamp, this.isAsc);

          default:
            return 0;
        }
      })
    );
  }
  onPaginate(pageEvent: PageEvent) {
    //https://medium.com/swlh/data-table-pagination-using-angular-material-f397e3d14308
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    this.item.getItems(this.postPerPage, this.pageNumber);
  }
  goToCommande() {
    this.router.navigate(["/commande"]);
  }
  livraisonFct(id_commande: number, element, text: String) {

   // const urlFacture = this.dataSource().find(item => item.id === id_commande);
    const urlFacture = this.dataSource().find(item => item.id_commande === id_commande)?.url_facture;
    const idclient=this.dataSource().find(item => item.id_commande === id_commande)?.idclient;

    console.log("on entre dans livraisonFct");
 
    let heure = new Date().getHours();
    let minutes = new Date().getMinutes();
    let secondes = new Date().getSeconds();

    this.heureLivraison= heure + ":" + minutes + ":" + secondes;

    let dejaLivre=this.estLivre()


    if(dejaLivre===false)// on ne renvoit pas un sms s'il a déjà été envoyé une première fois.
    {
      if(this.boulLogin.accesSMS===true){

//chercher le noCellSMS (string) et accesSMS (booleen 1 ou 0) dans dossier client =idclient de la facture

this.connection.dossierCommandesWeb = this.$dossierCommandesWeb;
this.connection.idclient = idclient
this.connection.tokenAuth = this.extract.getTokenAuth();


this.api.getClientInformation(this.connection).subscribe(
  (result: any) => {
    this.dataSourceClient = result.data;


     this.noCellSMS=this.dataSourceClient.noCellSMS
     this.accesSMS=this.dataSourceClient.accesSMS
     this.nomClient=this.dataSourceClient.nom

        //this.sendSMS("+15819806542",id_commande,this.heureLivraison,urlFacture)}
        this.sendSMS(this.noCellSMS,id_commande,this.heureLivraison,urlFacture,this.nomClient)

    if (result.data === "Erreur : Token expired") {
      alert(
        "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
      );
    }
  }
)
}
      }
 
    this.estLivre.set(true);
    //let dateLivraison: string = new Date().toLocaleDateString('fr-ca');
    let day: Date = new Date();
    this.dateLivraison = getYear(day) + "-" + getMonth(day) + "-" + getDay(day);

  //  this.heureLivraison= heure + "_" + minutes + "_" + secondes;

    this.NewTime = heure + ":" + minutes + ":" + secondes;

    element.textContent = text;
    element.disabled = true;

    this.boulLogin = this.extract.getBoulanger();

    let $updateFactureLivraison: Object = {
      id_commande: id_commande,
      dossierCommandesWeb: this.boulLogin.dossierCommandesWeb,
      datedelivraison: this.dateLivraison,
      heuredelivraison: this.heureLivraison,
      date_livraison: this.dateLivraison.toString(),
      heure_livraison: this.NewTime,
      
      livree: this.estLivre(),

    };

    if (this.role() != "client") {
      console.log("editFactureLivraison apiget si client dans livraisonFct");
      this.api.editFactureLivraison($updateFactureLivraison).subscribe((v) =>
        this.api
          .getFactureInformation(this.$dossierCommandesWeb)
          .subscribe((result: any) => {
            this.dataSource.set(result.data);

            if (this.role() == "client") {
              const source: Observable<Facture> = from(this.dataSource());
              const req = [];
              const example = source.pipe(
                filter((obj) => obj.idclient == this.boulLogin.idclient)
              );

              const subscribe = example.subscribe((val) => {
                req.push(val);
                return merge(req);
              });

              this.dataSource.set(req);
            } else {
              //le boulanger peut voir toutes les factures
              const source: Observable<Facture> = from(this.dataSource());
              const req = [];
              const example = source.pipe(
                filter((obj) => obj.dateProd == this.dateProd)
              );

              const subscribe = example.subscribe((val) => {
                req.push(val);
                return merge(req);
              });
              this.dataSource.set(req);
            }
          })
      );
      this.alerteLivraison(
        //  "La commande a été livrée le " + this.dateLivraison + " à test" + this.NewTime
          "La commande a été livrée"
        );
    } else {
      this.api
        .getFactureInformation(this.$dossierCommandesWeb)
        .subscribe((result: any) => {
          this.dataSource.set(result.data);

          const source: Observable<Facture> = from(this.dataSource());
          const req = [];
          const example = source.pipe(
            filter((obj) => obj.idclient == this.boulLogin.idclient)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });
          this.dataSource.set(req);

          this.dataSource.set(
            this.dataSource().sort((a: any, b: any) =>
              a.dateProd > b.dateProd ? -1 : 1
            )
          );
        });
    }

    let factureNo: Object = {
      id_commande: id_commande,
    };

  }
  alerteLivraison(text: string) {
    this.SimpleAlertLivraison(text);
   // this.SimpleLivraisonConfirm("acception de la livraison")

  }
 
  alerteLivraisonView(id_commande,element) {

    this.dateLivraison=element.datedelivraison
    this.NewTime=element.heuredelivraison
 
    this.api
      .getFactureInformation(this.$dossierCommandesWeb)
      .subscribe((result: any) => {
        this.dataSource.set(result.data);

        if (this.role() == "client") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];
          let example = source.pipe(
            filter((obj) => obj.idclient == this.boulLogin.idclient)
          );
          //  example = source.pipe(
          //   filter((obj) => obj.dateProd == this.dateProd)
          // );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource.set(req);
         
          this.alerteLivraison(
            "La commande a été livrée le " + this.dateLivraison + " à " + this.NewTime
          );

          this.alerteLivraison(
            "La commande a été livrée le " + element.timeStamp
          );
          this.dataSource.set(
            this.dataSource().sort((a: any, b: any) =>
              a.dateProd > b.dateProd ? -1 : 1
            )
          );
        } else {
          //le boulanger peut voir toutes les factures
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];

          let example = source.pipe(
            filter((obj) => obj.dateProd == this.dateProd)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource.set(req);
       
          this.alerteLivraison(
            "La commande a été livrée le " + element.timeStamp
          );
        }

        // this.dataSource.set(
        //   this.dataSource().sort((p1, p2) =>
        //     p1.dateProd < p2.dateProd ? 1 : p1.dateProd > p2.dateProd ? -1 : 0
        //   )
        // );
      });
  }

  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: "success",
      title: "Livraison faite...",
      text: textAlert,
      timer: 2500,
      toast: true,
    });
  }
  SimpleAlertLivraison(textAlert: string) {
    Swal.fire({
      icon: "success",
      title: "Livraison faite...",
      text: textAlert,
      footer: '<a href="">Au plaisir de vous servir!</a>',
    });
  }
  SimpleLivraisonConfirm(textAlert:string){
    Swal.fire({
      title: "Est-ce bien livré?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OUI c'est livré!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Livré!",
          text: "Votre commande vient d'être livrée.",
          icon: "success"
        });
      }
    });

  }
  onSubmit() {
    console.log("Formulaire soumis");

    this.noClientChoisi = this.clientForm.value.client;

    console.log("on entre dans onSubmit apres le choix du client voir-facture");
    this.api
      .getFactureInformation(this.$dossierCommandesWeb)
      .subscribe((result: any) => {
        this.dataSource.set(result.data);

        console.log("avant le filtrage role =" + this.role());
        if (this.role() == "boulanger") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];

          const example = source.pipe(
            filter((obj) => obj.idclient == this.noClientChoisi)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource.set(req);
        } else {
          //le boulanger peut voir toutes les factures
        }

        this.dataSource.set(
          this.dataSource().sort((p1, p2) =>
            p1.dateProd < p2.dateProd ? 1 : p1.dateProd > p2.dateProd ? -1 : 0
          )
        );
      });

    this.dataSource.set(
      this.dataSource().sort((a: any, b: any) =>
        a.dateProd < b.dateProd ? 1 : -1
      )
    );

  }

  update(e) {
    this.api
      .getClientInformation(this.$connection)
      .subscribe((resultClients: any) => {
        this.listeClient.set(resultClients.data);


        this.listeClient.set(
          this.listeClient().sort((p1, p2) =>
            p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
          )
        );
      });
  }
  updateSelect() {
    this.api
      .getClientInformation(this.$connection)
      .subscribe((resultClients: any) =>
        this.listeClient.set(resultClients.data)
      );
    this.listeClient.set(
      this.listeClient().sort((p1, p2) =>
        p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
      )
    );
  }
  onSubmitDate() {
    this.resultRecherche = {
      date: this.dateForm.controls.date.value,
    };
    this.api
      .getFactureInformation(this.$dossierCommandesWeb)
      .subscribe((result: any) => {
        this.dataSource.set(result.data);

        if (this.role() == "boulanger") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];

          const example = source.pipe(
            filter((obj) => obj.dateProd == this.resultRecherche.date)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource.set(req);
        } else {
          //le boulanger peut voir toutes les factures
        }

        this.dataSource.set(
          this.dataSource().sort((p1, p2) =>
            p1.nom_facture > p2.nom_facture
              ? 1
              : p1.nom_facture < p2.nom_facture
              ? -1
              : 0
          )
        );
      });

    this.dataSource.set(
      this.dataSource().sort((a: any, b: any) =>
        a.dateProd < b.dateProd ? 1 : -1
      )
    );
  }
  voirGoogleMap(googlemap: object) {

  }
  subtractOneDay(date: Date): Date {
    return subDays(date, 1);
  }
  sendSMS(toPhoneNumber:string,noIDCommande:number,heureLivraison:string,urlFacture:string,nomClient:string) {

    console.log('on entre dans sendSMS toPhoneNumber='+toPhoneNumber)


    //let toPhoneNumber = "+5819806542"
    let message = "Ceci est un test pour envoi pour dire que la livraison est faite pour: "+nomClient+" à "+heureLivraison+" lien: "+urlFacture

    this.api.sendTwillo(toPhoneNumber, message).subscribe(
      (res) => {console.log(res),console.log('envoi SMS complété')}
    )
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function rxResources(): any {
  throw new Error("Function not implemented.");
}

