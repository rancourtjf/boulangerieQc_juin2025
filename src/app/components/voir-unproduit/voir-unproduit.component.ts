import { Component } from '@angular/core';
import { SelectProduitComponent } from '../select-produit/select-produit.component';
// import { VoirGraphicComponent } from '../voir-graphic/voir-graphic.component';
@Component({
  selector: 'app-voir-unproduit',
  standalone: true,
  imports: [SelectProduitComponent],  templateUrl: './voir-unproduit.component.html',
  styleUrl: './voir-unproduit.component.css'
})
export class VoirUnproduitComponent {

  openDateGraphic:boolean=false

voirUnProduit(){
  this.openDateGraphic=!this.openDateGraphic
}

}