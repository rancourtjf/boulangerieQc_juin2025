import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Produit } from '../models/produits';

//https://www.geeksforgeeks.org/angular-file-upload/
//https://roytuts.com/file-upload-example-using-angular/

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
 // API url
 basebaseUrl = "https://file.io"

 importCsv(fileFromCSV:any){

  this.upload(fileFromCSV)
 }

  constructor(private http:HttpClient) { }
  // Returns an observable
  upload(file):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.basebaseUrl, formData)
}

uploadAncien(file):Observable<any>{

  return file
}

//permet de réaffecter les bonnes données aux bons chmaps de dataSourceListePrix avec les données de p.data
parserOldCommande(results:Produit[],dataSourceListePrix:Produit[]){ 

  let objectKey=Object.keys(results[0])


  for(let i=0;i<results.length;i++){
    let prodMardi =results[i].produit_mardi_b

    dataSourceListePrix[i].ID=results[i].ID
    dataSourceListePrix[i].ID=results[i].variete_poids_a=results[i].variete_poids_a
    dataSourceListePrix[i].categorie_a=results[i].produit_lundi_b
    dataSourceListePrix[i].input0_lundi=results[i].input0_lundi
    dataSourceListePrix[i].input0_mardi=results[i].input0_mardi
    dataSourceListePrix[i].input0_mercredi=results[i].input0_mercredi
    dataSourceListePrix[i].input0_jeudi=results[i].input0_jeudi
    dataSourceListePrix[i].input0_vendredi=results[i].input0_vendredi
    dataSourceListePrix[i].input0_samedi=results[i].input0_samedi
    dataSourceListePrix[i].input0_dimanche=results[i].input0_dimanche
    dataSourceListePrix[i].prixEscompte=results[i].produit_mercredi_b
    dataSourceListePrix[i].prix_vente_variete_r=results[i].produit_mardi_b
    dataSourceListePrix[i].produit_lundi_b=results[i].produit_jeudi_b
    dataSourceListePrix[i].produit_mardi_b=results[i].produit_vendredi_b
    dataSourceListePrix[i].produit_mercredi_b=results[i].produit_samedi_b
    dataSourceListePrix[i].produit_jeudi_b=results[i].produit_dimanche_b
    dataSourceListePrix[i].produit_vendredi_b=results[i].produit_mardi_b
    dataSourceListePrix[i].produit_samedi_b=results[i].prixEscompte
    dataSourceListePrix[i].produit_dimanche_b=results[i].prix_vente_variete_r
  }
return dataSourceListePrix
}

majTotalCommande(data:Produit[]){
  console.log('on entre dans majTOtalCommande')
  let prixEscString :string
  let prixEsc:number
  let qteLundi:string
  let qteMardi:string
  let qteMercredi:string
  let qteJeudi:string
  let qteVendredi:string
  let qteSamedi:string
  let qteDimanche:string
  let totalCommandeAjout:number =0

  let nbrLignes=data.length

  for(let i=0;1<nbrLignes;i++){
    prixEscString =data[i].prixEscompte
    qteLundi =data[i].input0_lundi
    qteMardi = data[i].input0_mardi
    qteMercredi=data[i].input0_mercredi
    qteJeudi =data[i].input0_jeudi
    qteVendredi=data[i].input0_vendredi
    qteSamedi=data[i].input0_samedi
    qteDimanche=data[i].input0_dimanche

    if (typeof prixEscString === 'string') {
      prixEsc = Number(prixEscString.replace(',', '.'));
    } else {
      prixEsc = data[i].prixEscompte;
    }
    let ajout: number = (parseInt(qteLundi) * prixEsc)+(parseInt(qteMardi) * prixEsc)+(parseInt(qteMercredi) * prixEsc)+(parseInt(qteJeudi) * prixEsc)+(parseInt(qteVendredi) * prixEsc)+(parseInt(qteSamedi) * prixEsc)+(parseInt(qteDimanche) * prixEsc)
  
    totalCommandeAjout+=ajout
  }

 return totalCommandeAjout

}

}
