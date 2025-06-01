import { Component, inject, input, Input, OnInit } from '@angular/core';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { ApiService } from '../../api.service';
import { GraphicComponent } from '../graphic/graphic.component';
import { SelectDateRangeComponent } from '../select-date-range/select-date-range.component';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-voir-graphic',
  standalone: true,
  imports: [GraphicComponent, SelectDateRangeComponent],
  templateUrl: './voir-graphic.component.html',
  styleUrl: './voir-graphic.component.css'
})
export class VoirGraphicComponent implements OnInit {

  //@Input() unProduit:string
  unProduit = input<string>()
  unNomClient: string = ""
  unClientID: number = 0
  dateRangChoix = input<string>

  api = inject(ApiService)
  extract = inject(ExtractLienFTPService)
  router = inject(Router)

  sommeUnProduitSelectionDate: number
  ouvrirGraphique: boolean

  sommeSelectionDate1: number
  sommeSelectionDate2: number
  sommeSelectionDate3: number
  sommeSelectionDate4: number

  startEnd1: string
  startEnd2: string;
  startEnd3: string;
  startEnd4: string;


  constructor() {
    this.ouvrirGraphique = false
  }

  ngOnInit() {
    this.unNomClient = this.extract.unNomClient
    this.unClientID = this.extract.unClientID
    let unProduitChoisi=this.extract.unProduit

    console.log("dans ngoninit de voir-graphic le nom du client est: " + this.unNomClient)

    console.log("dans ngoninit de voir-graphic le nom du produit est: " + unProduitChoisi)
    this.startEnd1 = ""
    this.startEnd2 = ""
    this.startEnd3 = ""
    this.startEnd4 = ""
  }

  voirGraphique() {
    this.ouvrirGraphique = !this.ouvrirGraphique
  }

  rePrendreDates() {
    this.ouvrirGraphique = !this.ouvrirGraphique
    this.extract.unProduit = ""
    this.extract.startEnd1 = ""
    this.extract.startEnd2 = ""
    this.extract.startEnd3 = ""
    this.extract.startEnd4 = ""

    this.startEnd1 = ""
    this.startEnd2 = ""
    this.startEnd3 = ""
    this.startEnd4 = ""

    this.extract.sommeSelectionDate1 = 0
    this.extract.sommeSelectionDate2 = 0
    this.extract.sommeSelectionDate3 = 0
    this.extract.sommeSelectionDate4 = 0


    this.router.navigateByUrl('/unProduit', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });


  }
  syncProducts(dateRangChoix: number): void {
    // Achieve the operation on trigger of output

    switch (dateRangChoix) {
      case 1: {
        this.startEnd1 = (this.extract.startEnd1)
        break
      }
      case 2: {
        this.startEnd2 = (this.extract.startEnd2)
        break
      }
      case 3: {
        this.startEnd3 = (this.extract.startEnd3)
        break
      }
      case 4: {
        this.startEnd4 = (this.extract.startEnd4)
        break
      }
    }
  }
  rePrendreProduit() {
    this.router.navigateByUrl('/cedule', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);

      this.extract.unNomClient = ""
      this.extract.unClientID = 0
      this.extract.unProduit=""

      //remettre  à 0 le graphique

      this.extract.unProduit=""
      this.extract.sommeSelectionDate1=0
     this.extract.sommeSelectionDate2=0
     this.extract.sommeSelectionDate3=0
      this.extract.sommeSelectionDate4=0

     this.extract.startEnd1=null
     this.extract.startEnd2=null
    this.extract.startEnd3=null
    this.extract.startEnd4=null


      this.extract.rangeDate.dateDebut =null
      this.extract.rangeDate.dateFin =null

    });
  }

}
