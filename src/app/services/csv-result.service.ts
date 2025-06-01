import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from '../models/produits';
import { HttpClient } from '@angular/common/http';
// https://www.samarpaninfotech.com/blog/methods-to-share-data-between-angular-components/#h-method-4-unrelated-components-via-a-service



@Injectable({
  providedIn: 'root'
})
export class CsvResultService {
dataSourcePrix!:Produit[]
//private csvObservable= new BehaviorSubject([])
//getCsvResultObs=this.csvObservable.asObservable();

csvResultToJson!:Produit[]
datecommande!:Date
testResult!: string;
  httpClient: any;

  listeCsvData = 'https://www.boulangerieqc.com/clients/boulangerieqc/listePrixClients/listeCourteCSVID.csv';


  constructor(public papa:Papa,private http:HttpClient) { 

}
findAllPersons(): Observable<object> {
  return this.http.get(this.listeCsvData, {responseType: 'json'});
}

setCsvResultObs(result:Produit[]){
  //this.csvObservable.next(result)
  //console.log('dans setCSVresult avec observ:'+this.csvResult.data)
}
public setCSVresult(result:Produit[]){
  this.dataSourcePrix=result
  }
setCSVresultToJson(result:Produit[]){
  this.dataSourcePrix=result
  console.log('on est dans setCSVresult this.csvResult:')
    }
    
public getCSVResultToJson(){
  return this.dataSourcePrix
}

  getCSVResult(){

    let resultObsCsvToJson= this.findAllPersons()

    return this.dataSourcePrix
  }

  public setDataSourceOne(results:Produit){
    this.dataSourcePrix.push(results)
  }
  
  public getDataSourceOne (){
    return this.dataSourcePrix
  }

  setDateCommande(date:Date){
    this.datecommande=date
  }

  getDateCommande(){
    return this.datecommande
  }
  parseCsvURL(listeCsvData:string) {
    this.papa.parse(listeCsvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      worker: true,
      download:true,
      // chunk: this.papaParseChunk
      complete: this.papaParseCompleteFunctionURL
    });
  }
  parseCsvData(csvData:any) {
    this.papa.parse(csvData, {
      complete: (resultCSVToJson) => {
      }
    });
  }
  parseCsvFile(file:File) {
    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      worker: true,
      // chunk: this.papaParseChunk
      complete: this.papaParseCompleteFunction
    });
  }
  papaParseChunk(chunk:any) {
    // console.log("Chunk:", chunk.data);
  }

  papaParseCompleteFunction(results:any) {
  let nbrProduit=results.data.length
  let options ={
  }

 
  }
  papaParseCompleteFunctionURL(results:any) {

  let nbrProduit=results.data.length
 
    for(let i=0;i<nbrProduit;i++)
    {
    //  let  resultat=results[i].value.Produit
    let resultat=i
    }
    this.testResult=(results.data[1].variete_poids_a+" à $"+results.data[1].prixEscompte+", boutique = $"+results.data[1].prix_vente_variete_r)
    let options ={
    }
    // let data1:[any,string] = ["hello","world"];
    // console.log('Unparsed: ', this.papa.unparse(results,options));
  }

}
