import { Component, inject, OnInit, signal, AfterViewInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { ApiService } from '../../api.service';
import { Detail } from '../../models/detail';
import { CommonModule } from "@angular/common";
import { filter, merge } from 'rxjs';
import { VoirGraphicComponent } from '../voir-graphic/voir-graphic.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectClientComponent } from '../select-client/select-client.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-produit',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule, CommonModule, VoirGraphicComponent, MatProgressSpinnerModule, SelectClientComponent],
  templateUrl: './select-produit.component.html',
  styleUrl: './select-produit.component.css'
})
export class SelectProduitComponent implements OnInit {
  api = inject(ApiService)
  extract = inject(ExtractLienFTPService)
  details = signal<Detail[]>([]);
  fb = inject(FormBuilder)
  router = inject(Router)

  produitForm: FormGroup<{ nomProduit: FormControl<any> }>;
  // listeDesProduits = []
  listeDesProduits = signal<any>([])
  nomProduit: string
  openGraphic: boolean = false
  loading = false;
  onClick: boolean = false
  loginPhp: any = {
    dossierCommandesWeb: "",
    date_prod: new Date(),
    id_client: null,
  };
  clients: string[];
  produits = signal<string[]>([]);



  constructor() {

  }


  ngOnInit(): void {

    this.extract.unProduit = ""
    this.produitForm = this.fb.group({
      nomProduit: [null],
    });
    let $dossierCommandesWeb = this.extract.boulanger.dossierCommandesWeb

    this.loginPhp.dossierCommandesWeb = $dossierCommandesWeb
    this.loginPhp.id_client = this.extract.boulanger.idclient;

    this.api
      // .getDetailInformation(this.$dossierCommandesWeb)
      .getDetailListeProduits(this.loginPhp)
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

        this.clients = [] = [...new Set(this.details().map(d => d.nom_client))];
        this.produits.set([...new Set(this.details().map(d => d.nom_produit))]);

        this.extract.mesClientsDetails = this.clients
        this.extract.mesProduitsDetails = this.produits()
        this.extract.details = this.details()
        this.loading = true


      });



    // if (this.extract.listeDesProduits.length > 0) {
    //   this.listeDesProduits.set(this.extract.listeDesProduits)

    //   this.loading = false;
    // }
    // else {
    //   this.loading = true;
    //   this.api
    //     .getDetailInformation($dossierCommandesWeb)
    //     .subscribe((result: any) => {
    //       this.details.set(result.data);
    //       this.details.set(
    //         this.details().sort((p1, p2) =>
    //           p1.nom_produit > p2.nom_produit ? 1 : p1.nom_produit < p2.nom_produit ? -1 : 0
    //         )
    //       );

    //       let uniqueNames = this.details().map(item => item.nom_produit).filter((value, index, self) =>
    //         self.indexOf(value) === index);
    //       this.loading = false;
    //       this.extract.listeDesProduits = uniqueNames
    //       this.listeDesProduits.set(this.extract.listeDesProduits)
    //       console.log("dans le else de select-produit ngoninit"+JSON.stringify(this.listeDesProduits() ))
    //     });
    // }

  }


  onSubmit() {

    this.nomProduit = this.produitForm.value.nomProduit;
    this.extract.unProduit = this.nomProduit
    this.onClick = !this.onClick
  }
  voirGraphic() {
    this.openGraphic = !this.openGraphic
  }

}
