import { Component, OnInit, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from '../../identificationBoul';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-factures',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './navbar-factures.component.html',
  styleUrls: ['./navbar-factures.component.scss']
})
export class NavbarFacturesComponent implements OnInit {

  router=inject(Router)
  extract=inject(ExtractLienFTPService)

  leboulanger:Boulanger
  roleBoulanger:boolean=false
  roleLivraison:boolean=false
//  logoClient:string="../../assets/imagesPain/croissant.png"
  logoClient:string="../../assets/imagesPain/croissant.png"
  proprioBoulangerie = false;


  ngOnInit(): void {
this.leboulanger = this.extract.getBoulanger()
this.proprioBoulangerie=this.leboulanger.proprioBoulangerie
if(this.leboulanger.role == 'boulanger'){
this.roleBoulanger=true
//this.logoClient = this.leboulanger.logoBoulangerie
}
else{
  this.roleBoulanger=false
}
if(this.leboulanger.role == 'livraison'){
  this.roleLivraison=true
  }
  else{
    this.roleLivraison=false
  }

}


  gotoClients(){

    if(this.leboulanger.role != 'client'){
      this.router.navigate(['/clients'])
    }
  }
  gotoBoulanger(){
      this.router.navigate(['/boulanger'])
  }
  gotoBoulangerObj(){
    this.router.navigate(['/boulanger'])
  }

  gotoFactures(){
        this.router.navigate(['/factures']) 
  }
  goToAccueil(){
    this.router.navigate(['/commande'])
  }
  gotoCedule(){
    console.log('dans goToCedule')
    this.router.navigate(['/recherche'])
  }
  gotoCommandesWeb(){

    if( this.roleLivraison == true){
      this.router.navigate(['/factures'])
    }
    else{
      this.router.navigate(['/commandesWeb'])
    }
  }
  gotoCommande(){
    this.router.navigate(['/commandes'])
  }
  gotoLivraison(){
    this.router.navigate(['/livraison'])
  }
  gotoCommandeWebTable(){
    this.router.navigate(['/commandesWebTable'])
  }

  gotoNoel(){
    console.log('dans goToNoel')
    this.router.navigate(['/commandeNoel'])
  }
  gotoFacturesPrime(){
    console.log('dans goToFacturesPrimeNg')
    this.router.navigate(['/goToFacturesPrimeNg'])
  }
  gotoAddClientsLogiciel(){
    console.log('dans gotoClientsLogiciel')
    this.router.navigate(['/clientLogicielAdd'])
  }
  gotoVoirClientsLogiciel(){
    console.log('dans gotoVoirClientsLogiciel')
    this.router.navigate(['/voirClientsLogiciel'])
  }
  gotoGraphicUnProduit(){
    this.router.navigate(['/unProduit'])
  }
  gotoDateGraphic(){
    this.router.navigate(['/dateGraphic'])
  }
  gotoModifyClient(){
    this.router.navigate(['/modifyClient'])
  }

}
