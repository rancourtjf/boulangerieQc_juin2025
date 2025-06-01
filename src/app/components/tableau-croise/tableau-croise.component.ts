import { Component, inject, Input, input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Detail } from '../../models/detail';
import { MatTableModule } from '@angular/material/table';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';


@Component({
  selector: 'app-tableau-croise',
  imports: [MatTableModule],
  templateUrl: './tableau-croise.component.html',
  styleUrl: './tableau-croise.component.css'
})
export class TableauCroiseComponent implements OnInit {
  @Input() listeDetail: any[] = [];  // Correctement défini comme une propriété @Input()
  @Input() clients: any[] = []
  @Input() produits: any[] = []

  extract = inject(ExtractLienFTPService)
  displayedColumns: string[] = ['nom_client', 'nom_produit', 'quantite'];
  dataSource = []
  dataMap: { [client: string]: { [produit: string]: number } } = {};

  mesClients: any[] = [];
  mesProduits: any[] = [];

  constructor() {
  }

  ngOnInit(): void {


    this.mesClients = this.extract.mesClientsDetails
    this.mesProduits = this.extract.mesProduitsDetails
    this.dataSource = this.extract.details

    // Construire le dataMap pour stocker les totaux de quantités
    this.calculerTotaux();

  }
  // Initialiser dataMap avec des valeurs à 0
  totalQuantite(dataSource: any[], nom_produit: string, nom_client: string): number {
    return dataSource
      .filter(item => item.nom_produit === nom_produit && item.nom_client === nom_client)
      .reduce((total, item) => total + Number(item.quantite), 0);
  }
  calculerTotaux(): void {
    this.dataMap = {};

    this.dataSource.forEach(({ nom_client, nom_produit, quantite }) => {
      if (!this.dataMap[nom_client]) {
        this.dataMap[nom_client] = {};
      }
      if (!this.dataMap[nom_client][nom_produit]) {
        this.dataMap[nom_client][nom_produit] = 0;
      }
      this.dataMap[nom_client][nom_produit] += Number(quantite);
    });
  }

  getQuantite(nom_produit: string, nom_client: string): number {
    return this.dataMap[nom_client]?.[nom_produit] || 0;
  }
}
