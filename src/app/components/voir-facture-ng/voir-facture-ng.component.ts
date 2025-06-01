import { Component,signal,OnInit,AfterViewInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Facture } from '../../models/facture';
import { ApiService } from '../../api.service';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from "../../identificationBoul";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserModule }  
    from '@angular/platform-browser'; 

import { BrowserAnimationsModule }  
    from '@angular/platform-browser/animations'; 

import {SelectButtonModule} from 'primeng/selectbutton';
import { getDay, getMonth, getYear } from "date-fns";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Observable, from, merge } from "rxjs";
import { filter, map } from "rxjs/operators";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-voir-facture-ng',
  standalone: true,
  imports: [TableModule,ReactiveFormsModule,CommonModule,ButtonModule,FormsModule,SelectButtonModule],
  templateUrl: './voir-facture-ng.component.html',
  styleUrl: './voir-facture-ng.component.css'
})
export class VoirFactureNgComponent implements AfterViewInit, OnInit {
  dataSource = signal<Facture[]>([]);
  api=inject(ApiService)
  extract = inject(ExtractLienFTPService);
  router = inject(Router);
  boulLogin: Boulanger;
  role = signal<string>("");
  $connection: string;
  fb = inject(FormBuilder);
  listEquipe = signal<any[]>([]);
  dateForm: any;

  dataSourceClients: any;
  clientForm: FormGroup<{ client: FormControl<any> }>;
  noClientChoisi: number;
  resultRecherche: { date: any };
  Idetconnection: any;
  resultOnefactExtract: any;
  cols!: Column[];

  sizes!: any[];
  selectedSize: any = '';
  first = 0;

  rows = 10;


  ngOnInit(): void {

    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large',  class: 'p-datatable-lg' }
  ];

    this.cols = [
      { field: 'nom_facture', header: 'nom' },
      { field: 'idclient', header: 'idclient' },
      { field: 'id_commande', header: 'id_commande' },
      { field: 'timeStamp', header: 'timeStamp' }
  ];

    console.log("on entre dans ngOnInit voir-facture");
    this.boulLogin = this.extract.getBoulanger();
    console.log("    this.boulLogin=", this.extract.getBoulanger());
    this.role.set(this.boulLogin.role);

    let $db_host = this.boulLogin.db_host;
    let $db_name = this.boulLogin.db_name;
    let $db_username = this.boulLogin.db_username;
    let $db_password = this.boulLogin.db_password;
    this.$connection =
      "db_host=" +
      $db_host +
      "&db_name=" +
      $db_name +
      "&db_username=" +
      $db_username +
      "&db_password=" +
      $db_password;
    this.clientForm = this.fb.group({
      client: [null],
    });
    this.api
      .getFactureInformation(this.$connection)
      .subscribe((resultFactures: any) => {
        this.dataSource.set(resultFactures.data);

        console.log("this.dataSource()=" + JSON.stringify(this.dataSource()));

      });
    this.dateForm = this.fb.group({
      date: ["", Validators.required],
    });
  }

  ngAfterViewInit() {
    console.log("on entre dans ngAfterViewInit voir-facture");
    this.api
      .getFactureInformation(this.$connection)
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
  goToCommande() {
    this.router.navigate(["/commande"]);
  }
  livraisonFct(id_commande: number, element, text: string) {
    let heure = new Date().getHours();
    let minutes = new Date().getMinutes();
    let secondes = new Date().getSeconds();

    let estLivre: boolean = true;
    //let dateLivraison: string = new Date().toLocaleDateString('fr-ca');
    let day: Date = new Date();
    let dateLivraison = getYear(day) + "-" + getMonth(day) + "-" + getDay(day);

    let heureLivraison: string = heure + "_" + minutes + "_" + secondes;

    let NewTime = heure + ":" + minutes + ":" + secondes;

    element.textContent = text;
    element.disabled = true;

    this.boulLogin = this.extract.getBoulanger();

    let $db_host = this.boulLogin.db_host;
    let $db_name = this.boulLogin.db_name;
    let $db_username = this.boulLogin.db_username;
    let $db_password = this.boulLogin.db_password;

    let $updateFacture: Object = {
      db_host: $db_host,
      db_name: $db_name,
      db_username: $db_username,
      db_password: $db_password,
      id_commande: id_commande,
      date_livraison: dateLivraison,
      heure_livraison: heureLivraison,
      livree: estLivre,
    };

    let $updateFactureLivraison: Object = {
      db_host: $db_host,
      db_name: $db_name,
      db_username: $db_username,
      db_password: $db_password,
      id_commande: id_commande,
      datedelivraison: dateLivraison,
      heuredelivraison: NewTime,
      livree: estLivre,
    };
    if (this.role() != "client") {
      this.api.editFactureLivraison($updateFactureLivraison).subscribe();
    }

    this.api
      .getFactureInformation(this.$connection)
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
        }

        this.dataSource.set(
          this.dataSource().sort((p1, p2) =>
            p1.dateProd < p2.dateProd ? 1 : p1.dateProd > p2.dateProd ? -1 : 0
          )
        );
      });

    let factureNo: Object = {
      id_commande: id_commande,
      db_host: $db_host,
      db_name: $db_name,
      db_username: $db_username,
      db_password: $db_password,
    };

    // this.api
    // .getFactureLivraison(factureNo)
    // .subscribe((result: any) => {
    //  result.data;
    //   console.log(result.data.timeStamp)
    //   this.rechercheFactFind=result.data;
    // })
    this.Idetconnection = "?id_commande=" + id_commande + this.$connection;
    this.api
      .getFactureInformation(this.Idetconnection)
      .subscribe((result: any) => {
        let oneFacture = result.data;

        if (this.role() == "client") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];
          const example = source.pipe(
            filter((obj) => obj.id_commande == id_commande)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.resultOnefactExtract = req;
        } else {
          //le boulanger peut voir toutes les factures
        }
      });

    if (this.resultOnefactExtract[0].livree == 1) {
      this.alerteLivraison(
        "La commande a été livrée le " + this.resultOnefactExtract[0].timeStamp
      );
    }
  }
  alerteLivraison(text: string) {
    this.SimpleAlertLivraison(text);
  }
  alerteLivraisonView(id_commande) {
    this.api
      .getFactureInformation("?id_commande=" + id_commande + this.$connection)
      .subscribe((result: any) => {
        let dataSourceOne: Facture[] = result.data;
        const source: Observable<Facture> = from(dataSourceOne);
        const req = [];
        const example = source.pipe(
          filter((obj) => obj.id_commande == id_commande)
        );
        const subscribe = example.subscribe((val) => {
          req.push(val);
          return merge(req);
        });

        this.resultOnefactExtract = req;

        this.SimpleAlertLivraison(
          "heure livraison: " + this.resultOnefactExtract[0].timeStamp
        );
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
  onSubmit() {
    console.log("Formulaire soumis");

    this.noClientChoisi = this.clientForm.value.client;
    console.log("no client choisi=" + this.noClientChoisi);
    console.log("on entre dans onSubmit apres le choix du client voir-facture");
    this.api
      .getFactureInformation(this.$connection)
      .subscribe((result: any) => {
        this.dataSource.set(result.data);

        console.log("avant le filtrage role =" + this.role());
        if (this.role() == "boulanger") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];
          console.log("avant le filter idclient=" + this.noClientChoisi);
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
    console.log(
      "dataSource apres choix du client=" + JSON.stringify(this.dataSource())
    );
  }

  update(e) {
    this.api
      .getClientInformation(this.$connection)
      .subscribe((resultClients: any) => {
        this.listEquipe.set(resultClients.data);

        console.log("this.listEquipe()=" + JSON.stringify(this.listEquipe()));

        this.listEquipe.set(
          this.listEquipe().sort((p1, p2) =>
            p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
          )
        );
      });
  }
  updateSelect() {
    this.api
      .getClientInformation(this.$connection)
      .subscribe((resultClients: any) =>
        this.listEquipe.set(resultClients.data)
      );
    this.listEquipe.set(
      this.listEquipe().sort((p1, p2) =>
        p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
      )
    );
  }
  onSubmitDate() {
    this.resultRecherche = {
      date: this.dateForm.controls.date.value,
    };
    this.api
      .getFactureInformation(this.$connection)
      .subscribe((result: any) => {
        this.dataSource.set(result.data);

        if (this.role() == "boulanger") {
          const source: Observable<Facture> = from(this.dataSource());
          const req = [];
          console.log("avant le filter idclient=" + this.noClientChoisi);
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
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.dataSource() ? this.first === (this.dataSource().length - this.rows): true;
}

isFirstPage(): boolean {
    return this.dataSource() ? this.first === 0 : true;
}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

