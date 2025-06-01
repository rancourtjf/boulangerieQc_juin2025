// https://www.tektutorialshub.com/angular/select-options-example-in-angular/
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { ApiService } from "../../api.service";
import { Detail } from "../../models/detail";
import { ItemService } from "../../services/item.service";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { Observable, from, merge } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Boulanger } from "../../identificationBoul";
import { Router } from "@angular/router";
import { format, getDay, getMonth, getYear } from "date-fns";
import { addDays } from "date-fns/addDays";
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TableauCroiseComponent } from "../tableau-croise/tableau-croise.component";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: "app-voir-details",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TableModule, MatProgressSpinnerModule, TableauCroiseComponent],
  templateUrl: "./voir-details.component.html",
  styleUrls: ["./voir-details.component.css"],
})
export class VoirDetailsComponent implements AfterViewInit, OnInit {
  api = inject(ApiService);
  item = inject(ItemService);
  extract = inject(ExtractLienFTPService);
  router = inject(Router);
  fb = inject(FormBuilder);
  cols!: Column[];

  //dataSource!: Facture[];
  details = signal<Detail[]>([]);

  isAsc: boolean = true;
  itemObservable: any;
  boulLogin: Boulanger;
  rechercheDetailFind: Detail;
  resultOnefactExtract: any;
  selectedTeam: any;
  listBoulanger = signal<any[]>([]);

  clientForm: FormGroup<{ client: FormControl<any> }>;
  noClientChoisi: number;
  role = signal<string>("");
  resultRecherche: { date: any };
  dateForm: any;
  $dossierCommandesWeb = "";
  dateProd: any;
  loginPhp: any = {
    dossierCommandesWeb: "",
    date_prod: new Date(),
    id_client: null,
  };
  sortField: string;
  sortOrder: number;
  startDate: string;
  endDate: string;
  loading :boolean=false
  clients: string[];
  produits: string[];

  constructor() { }
  ngOnInit(): void {
    console.log("on entre dans ngOnInit voir-details");
    this.boulLogin = this.extract.getBoulanger();

    this.role.set(this.boulLogin.role);


    this.$dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;
    this.dateProd = this.extract.getDateProduction();

    this.loginPhp.dossierCommandesWeb = this.$dossierCommandesWeb;
    this.loginPhp.date_prod = this.dateProd;
    this.loginPhp.id_client = this.boulLogin.idclient;

    this.clientForm = this.fb.group({
      client: [null],
    });

    this.api
      .getUsers(this.$dossierCommandesWeb)
      .subscribe((resultClients: any) => {
        this.listBoulanger.set(resultClients.data);

        this.listBoulanger.set(
          this.listBoulanger().sort((p1, p2) =>
            p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
          )
        );
      });

    this.dateForm = this.fb.group({
      date: ["", Validators.required],
    });

    this.cols = [
      { field: "nom_client", header: "nom_client" },
      { field: "prix_escompte", header: "prix_escompte" },
      { field: "nom_produit", header: "nom produit" },
      { field: "quantite", header: "quantite" },
      { field: "date_prod", header: "date_prod" },
      // { field: "jour_semaine", header: "jour_semaine" },
      { field: "nom_pate", header: "nom_pate" },
      { field: "poids_pate", header: "poids_pate" },
      { field: "cout_pate", header: "cout_pate" },
      { field: "prix_boutique", header: "prix_boutique" },
      // { field: "invendus", header: "invendus" },
      { field: "tot_non_taxable", header: "tot_non_taxable" },
      { field: "tot_taxable", header: "tot_taxable" },
      { field: "tps", header: "tps" },
      { field: "tvq", header: "tvq" },
      { field: "total_vente", header: "total_vente" },
      // { field: "clientRegroupement", header: "clientRegroupement" },
      // { field: "heureRupture", header: "heureRupture" },
      // { field: "timeStamp", header: "timeStamp" },
    ];
  }
  ngAfterViewInit() {
    console.log("on entre dans ngAfterViewInit voir-details");

    //this.dateProd = this.extract.getDateProduction();
//this.loginPhp

    this.loading = true;
    console.log("this.loginPHP dans voir-detail="+JSON.stringify(this.loginPhp))
    this.api
     // .getDetailInformation(this.$dossierCommandesWeb)
      .getDetailInformation(this.loginPhp)
      .subscribe((result: any) => {
        this.details.set(result.data);
        this.details.set(
          this.details().sort((p1, p2) =>
            p1.nom_produit > p2.nom_produit ? 1 : p1.nom_produit < p2.nom_produit ? -1 : 0
          )
        );

        let uniqueNames = this.details().map(item => item.nom_produit).filter((value, index, self) =>
          self.indexOf(value) === index);
   

        this.extract.listeDesProduits = uniqueNames

        console.log("uniquenames="+JSON.stringify(uniqueNames))


        const source: Observable<Detail> = from(this.details());
        const req = [];

        let dateProdMoins30jours: any
        dateProdMoins30jours = addDays(this.dateProd, -2)


        let formattedDate = format(dateProdMoins30jours, 'yyyy-MM-dd');
        let formattedDateString: string

        formattedDateString = new Date().toLocaleDateString("fr-ca");
        let formattedDateFormatDate = new Date(formattedDateString)
      

        let example = source.pipe(

          filter((obj) =>
            (obj.date_prod == this.dateProd)
            //(obj.date_prod == formattedDateFormatDate)
          )
        );

        const subscribe = example.subscribe((val) => {
          req.push(val);
          return merge(req);
        });

        this.details.set(req);
        let sommeQuantite = 0;
        this.details().forEach(nombre => sommeQuantite += Number(nombre.quantite));
        this.loading = false;

   
       this.clients  =[] = [...new Set(this.details().map(d => d.nom_client))];
        this.produits =[] = [...new Set(this.details().map(d => d.nom_produit))];

        this.extract.mesClientsDetails=this.clients
        this.extract.mesProduitsDetails=this.produits
        this.extract.details=this.details()
      });

  }

  goToCommande() {
    this.router.navigate(["/commande"]);
  }

  onSubmit() {
    console.log("Formulaire soumis");

    this.noClientChoisi = this.clientForm.value.client;

    console.log("on entre dans onSubmit apres le choix du client voir-facture");
    this.api.getDetailInformation(this.loginPhp).subscribe((result: any) => {
      this.details.set(result.data);


      if (this.role() == "boulanger") {
        const source: Observable<Detail> = from(this.details());
        const req = [];

        const example = source.pipe(
          filter((obj) => obj.id_client == this.noClientChoisi)
        );

        const subscribe = example.subscribe((val) => {
          req.push(val);
          return merge(req);
        });

        this.details.set(req);
      } else {
        //le boulanger peut voir toutes les factures
      }
    });

  }

  onSubmitDate() {
    this.resultRecherche = {
      date: this.dateForm.controls.date.value,
    };
    this.api
      .getFactureInformation(this.$dossierCommandesWeb)
      .subscribe((result: any) => {
        this.details.set(result.data);

        if (this.role() == "boulanger") {
          const source: Observable<Detail> = from(this.details());
          const req = [];

          const example = source.pipe(
            filter((obj) => obj.date_prod == this.resultRecherche.date)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.details.set(req);
        } else {
          //le boulanger peut voir toutes les factures
        }
      });
  }
  sort(field: string) {
    const sortOrder = this.sortField === field ? -this.sortOrder : 1;
    this.sortField = field;
    this.sortOrder = sortOrder;

    this.details().sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      let result = 0;

      if (valueA < valueB) {
        result = -1;
      } else if (valueA > valueB) {
        result = 1;
      }

      return result * this.sortOrder;
    });
  }

  getSortIcon(field: string) {
    if (this.sortField !== field) {
      return "";
    }

    return this.sortOrder === 1
      ? "pi pi-sort-amount-up"
      : "pi pi-sort-amount-down";
  }
}
