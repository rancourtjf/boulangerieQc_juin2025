import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../models/produits';
import { Observable } from 'rxjs';
import { Boulanger } from '../identificationBoul';

@Injectable({
  providedIn: 'root'
})
export class EnvoiAuBoulangerService {

 // baseUrl: string = 'https://www.boulangerieqc.com/crudmysql/';
  baseUrl: string = 'https://localhost/crudmysql/';

  idProduit: number;
  commande: any;

   //baseUrl: string = 'http://localhost/crudmysql/';
  constructor(private http:HttpClient) { }

  getStudents() {
    return this.http.get<Produit[]>(this.baseUrl+'view.php');
  } 

  getSingleProduit(id:any) {
    return this.http.get<Produit[]>(this.baseUrl+'view.php?id='+id);
  } 
  
  deleteProduit(id:any) {

    return this.http.delete(this.baseUrl+'delete.php?id='+ id);  
  }  

  createProduit(produit:any) {
    return this.http.post(this.baseUrl+'insert.php', produit);  
  }  
 createCommande(csvForm_email:Object) {
 return this.http.post(this.baseUrl+'emailAuBoulanger.php', csvForm_email);  
 }  
 

  envoiCourriel(){
    console.log('dans envoiCourriel du service')
    return this.http.post('../../assets/crudmysql/mail.php',"info@boulangerieqc.com");  
  }

  editProduit(student:any) {
  
    return this.http.put(this.baseUrl+'update.php', student);  
    }  
  changeIdProduit(id:number){
    this.idProduit=id

  }

  /*
$to = $_GET["varTo"];
$from = $_GET["varFrom"];
$subject = "Ma commande du " . $_GET["varDate"] ." " . $_GET["varNom"] . "..." . $_GET["varInvendus"] ;
  http.post("http://localhost/assets/php/test.php",{}).subscribe(data =>     { 
 alert(data);
});

    performGetEx():Observable<any>{
        return this.http.get<any>(this.url);
    }
*/
  envoiMailCommande(lienURLPhp: string):Observable<any> {

    return this.http.get<any>(lienURLPhp)
  }

  envoiMailCommandeMailObjString(lienURLPhp: string):Observable<any> {

    console.log("on entre dans envoiMailCommandeMailObjString ")

    return this.http.get<any>(lienURLPhp)
  }
  envoiMailCommandeMailObjTest(lienURLPhp: string):Observable<any> {
    return this.http.get<any>(lienURLPhp)
  }

  envoiMailCommandeWebMysql(lienURLPhpMysql: string):Observable<any> {
    return this.http.get<any>(lienURLPhpMysql)
  }

  uploadCSV(csv:any):Observable<any>{

    let lienURLphp ='https://www.boulangerieqc.com/assets/crudmysql/ftpupload.php?file='+csv
    let uploadVersFTP=lienURLphp
    return this.http.get<any>(lienURLphp)
  }

  envoiMailnewClient(lienURLPhp: string):Observable<any> {
    let phpLink ='https://www.boulangerieqc.com/assets/crudmysql/mailNewClient.php'
    phpLink=phpLink+lienURLPhp

    window.open(phpLink,"_blanck");
    return this.http.get<any>(phpLink)
  }
  envoiMailHelp(lienURLPhp: string):Observable<any> {
    let phpLink ='https://www.boulangerieqc.com/assets/crudmysql/mailHelp.php'
    
    phpLink=phpLink+lienURLPhp
    console.log("phpLink="+phpLink)

    window.open(phpLink,"_blanck");
    return this.http.get<any>(phpLink)
  }


  public get(url: string, options?: any) { 
    return this.http.get(url, options); 
    } 
    public post(url: string, data: any, options?: any) { 
    return this.http.post(url, data, options); 
    } 
    public put(url: string, data: any, options?: any) { 
    return this.http.put(url, data, options); 
    } 
    public delete(url: string, options?: any) { 
    return this.http.delete(url, options); 
    } 

}
