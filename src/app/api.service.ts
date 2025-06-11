import { Injectable, computed, inject, resource, signal } from "@angular/core";
import { format, formatDate } from "date-fns";
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";

//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
import { BoulangerBoss } from "./models/boulagerBoss";
import { ExtractLienFTPService } from "./extract-lien-ftp.service";
import { Client } from "./models/client";
import { Recette } from "./models/recette";
import { Facture } from "./models/facture";
import { MajPrix } from "./models/majPrix";
import { Boulanger } from "./identificationBoul";
import { CommandeWeb } from "src/app/models/commandeWeb";
import { Message } from "./models/message";
import { Observable, catchError, throwError } from "rxjs";
import { pipe, map } from "rxjs";
import { Detail } from "./models/detail";
import { ClientLogiciel } from "./models/clientLogiciel";
import { Ingredient } from "./models/ingredient";
import { AnyCatcher } from "rxjs/internal/AnyCatcher";
import { RecetteMysql } from "./models/recettesMysql";
import { Tache } from "./models/tache";
import { Equipes } from "./models/equipes";
import { Fournisseur } from "./models/fournisseur";
import { Produit } from "./models/produits";



// faire requete http.get
//https://angular.io/guide/http-request-data-from-server

@Injectable({
  providedIn: "root",
})
export class ApiService {
  http = inject(HttpClient);
  extract = inject(ExtractLienFTPService);
  baseUrl = environment.baseUrl;
  $connection: string = "";
  boulLogin: Boulanger;
  messageSiteWeb = signal<string>("");


  jsonplaceholder="https://jsonplaceholder.typicode.com/todos"
  todoResource=resource({
    loader:()=>fetch(this.jsonplaceholder).then((res)=>res.json())
    // list=computed(()=>this.todoResource.value())
  })

  // $db_host = '184.107.112.43';
  // $db_name = 'rancour_croissantdelune';
  // $db_username = 'rancour_croissant';
  // $db_password = 'covvoh-wevfug-siVti0';
  // $connection="db_host="+this.$db_host+"&db_name="+this.$db_name+"&db_username="+this.$db_username+"&db_password="+this.$db_password

  constructor() { }

  formatDate(date: Date): string {
    return format(date, "yyyy/MM/dd");
  }

  getBoulangerInformation(connection: string) {
    return this.http.get<any[]>(
      this.baseUrl + "viewBoulanger.php" + "?" + connection
    );
  }
  getBoulanger(dossierConnexion:any) {
    

    let queryParams = new HttpParams({ fromObject: dossierConnexion });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<any[]>(
      this.baseUrl + "viewBoulangerObj.php",
      {
        params: queryParams,
      }
    );
  }

 
  deleteBoulangerie(dossierBoulangerie: any) {
    let connectionJSON = JSON.stringify(dossierBoulangerie);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "delete_boulangerie.php",
      connectionJSON,
      httpOptions
    );
  }
  
  modifyBoulanger(dossierBoulanger: any) {
    let connectionJSON = JSON.stringify(dossierBoulanger);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.put(
      this.baseUrl + "update_boulangerObj.php",
      connectionJSON,
      httpOptions
    );
  }

  getClientInformation(dossierConnexion: any) {

    let queryParams = new HttpParams({ fromObject: dossierConnexion });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Client[]>(
      this.baseUrl + "viewClient_Obj.php",
      {
        params: queryParams,
      }
    );
  }
  getIngredientsInformation(dossierConnexion: any) {

    let queryParams = new HttpParams({ fromObject: dossierConnexion });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Ingredient[]>(
      this.baseUrl + "view_ingredients_token.php",
      {
        params: queryParams,
      }
    );
  }
  getProduitsInformation(dossierConnexion: any) {
console.log("on entre dans getProduitsInformation")
    let queryParams = new HttpParams({ fromObject: dossierConnexion });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Produit[]>(
      this.baseUrl + "view_produits_token.php",
      {
        params: queryParams,
      }
    );
  }
  //----
  //get recettesPDF
  getRecettesPDF(dossierConnexion: any) {
    let queryParams = new HttpParams({ fromObject: dossierConnexion });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<RecetteMysql[]>(
      this.baseUrl + "view_recettesPDF.php",
      {
        params: queryParams,
      }
    );
  }
  // fin get recettes PDF

  getUsers(dossierCommandesWeb: string): Observable<Client[]> {
    const url =
      this.baseUrl +
      "viewClientString.php?dossierCommandesWeb=" +
      dossierCommandesWeb;

    // let queryParams = new HttpParams().append("dossierCommandesWeb",dossierCommandesWeb);

    // return this.http.get<Client[]>(url,{params:queryParams});
    return this.http.get<Client[]>(url);
  }

  getRecettes(connexion: string) {
    return this.http.get<Recette[]>(
      this.baseUrl + "viewRecetteProd.php" + "?" + connexion
    );
  }

  getSingleClient(id: any) {
    return this.http.get<Client[]>(
      this.baseUrl + "viewSingleClient.php?idclient=" + id
    );
  }
  getSingleClientTimestamp(connection: string) {
    return this.http.get<Client[]>(
      this.baseUrl + "viewClients.php" + "?" + connection
    );
  }
  getClientEmail(dossierConnexion: any) {


    let queryParams = new HttpParams({ fromObject: dossierConnexion });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<any>(
      this.baseUrl + "viewClient_Email.php",
      {
        params: queryParams,
      }
    );

  }

  getFactureInformation(dossierCommandesWeb: string) {
    return this.http.get<Facture[]>(
      this.baseUrl +
      "viewFactures.php" +
      "?dossierCommandesWeb=" +
      dossierCommandesWeb

    );
  }
  getFactureSortieInformation(
    dossierCommandesWeb: string,
    type_facture: string
  ) {
    return this.http.get<Facture[]>(
      this.baseUrl +
      "view_facture_sortie.php" +
      "?" +
      "dossierCommandesWeb=" +
      dossierCommandesWeb +
      "&type_facture=" +
      type_facture
    );
  }

  getFactureInformationOne($connection: string) {
    return this.http.get<Facture[]>(
      this.baseUrl + "viewFactures.php" + "?" + $connection
    );
  }

  getSingleFacture(id: any) {
    return this.http.get<Facture[]>(
      this.baseUrl +
      "viewSingleFacture.php?idclient=" +
      id +
      "&" +
      this.$connection
    );
  }
  getFactureLivraison(getFacture: object) {
    return this.http.get<Facture[]>(
      this.baseUrl + "viewFactureObj.php",
      getFacture
    );
  }
  deleteFacture(id: any) {
    return this.http.delete(
      this.baseUrl +
      "delete_facture.php?idclient=" +
      id +
      "&" +
      this.$connection
    );
  }
  deleteClient(id: any) {
    return this.http.delete(
      this.baseUrl + "delete_client.php?idclient=" + id + "&" + this.$connection
    );
  }

  editFacture(updateFacture: object) {
    return this.http.put(this.baseUrl + "update_factureObj.php", updateFacture);
  }
  editFactureLivraison(updateFacture: object) {
    return this.http.put(
      this.baseUrl + "update_factureObjLivraison.php",
      updateFacture
    );
  }

  createClient(client: any) {
    return this.http.post(
      this.baseUrl + "insert_client.php" + "?" + this.$connection,
      client
    );
  }
  createFacture(facture: any) {
    return this.http.post(
      this.baseUrl + "insert_facture.php" + "?" + this.$connection,
      facture
    );
  }
  createBoulanger(boulagerBoss: any) {
    return this.http.post(
      this.baseUrl + "insert_facture.php" + "?" + this.$connection,
      boulagerBoss
    );
  }
  createCommandeWeb(CommandeWeb: any) {
    console.log("on est dans createCommandeWeb");
    return this.http.post(
      this.baseUrl + "insert_commandeWeb.php" + "?" + this.$connection,
      CommandeWeb
    );
  }
  createCommandeWebMysql(CommandeWebObj: Object) {
    return this.http.post(
      this.baseUrl + "insert_commandeWebObj.php",
      CommandeWebObj
    );
  }
  createCommandeWebMysqlOBJ(CommandeWebObj: Object) {
    return this.http.post(
      this.baseUrl + "insert_commandeWebObj.php",
      CommandeWebObj
    );
  }
  getUser(dossierCommandesWeb: any) {
    let queryParams = new HttpParams({ fromObject: dossierCommandesWeb });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<any[]>(
      this.baseUrl + "viewClient_Obj.php",
      {
        params: queryParams,
      }
    );
  }

  modifyClient(modifClient: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };
    return this.http.post(
      this.baseUrl + "update_client_ObjAngular.php",
      modifClient,
      httpOptions
    );
  }
  modifyIngredient(modifIngredient: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };
    return this.http.post(
      this.baseUrl + "update_ingredient_token.php",
      modifIngredient,
      httpOptions
    );
  }
  modifyProduit(modifProduit: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };
    return this.http.post(
      this.baseUrl + "update_produit_web.php",
      modifProduit,
      httpOptions
    );
  }

  updateTimestampNewCommande(CommandeWebObj: Object) {
    return this.http.post(
      this.baseUrl + "update_client_timestampCommande.php",
      CommandeWebObj
    );
  }


  createEnvoiCourrielCommande(CommandeWebObj: Object) {
    return this.http.post(this.baseUrl + "mailObjString.php", CommandeWebObj);
  }

  getCommandeWebInformation(CommandeWebObj: Object) {
    // this.updateMajPrixMysql()
    return this.http.post<CommandeWeb[]>(
      this.baseUrl + "viewCommandeWebObj.php",
      CommandeWebObj
    );
  }
  updateMajPrixMysql(CommandeWebObj: Object) {
    return this.http.post(
      this.baseUrl + "insert_commandeWebTabTest.php",
      CommandeWebObj
    );
  }
  getMajPrix(param: any) {
    //let queryParams=new HttpParams({fromObject:param})
    return this.http.get<MajPrix[]>(this.baseUrl + "view_majPrix_parNom.php", {
      params: param,
    });
  }
  getMessage(param: any) {
    let queryParams = new HttpParams({ fromObject: param });

    return this.http.get<Message[]>(this.baseUrl + "view_message.php", {
      params: queryParams,
    });
  }
  createMessageMysql(MessageObj: string) {

    return this.http.get(
      this.baseUrl + "insert_messagePost.php" + "?" + MessageObj,
      { responseType: "text" }
    );
  }

  updateMessage(MessageObj: Object) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };
    return this.http.post(
      this.baseUrl + "update_message.php",
      MessageObj,
      httpOptions
    );
  }
  /** POST: add a new hero to the database */
  addMessage(message: Message) {
    let messageJSON = JSON.stringify(message);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "insert_message.php",
      message,
      httpOptions
    );
  }

  view_message($dossier: Message) {
    return this.http.post<Message>(this.baseUrl + "view_message.php", $dossier);
  }
  deleteMessage(message: Message) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "delete_message.php",
      message,
      httpOptions
    );
  }

  getDetailInformation(dossierCommandesWeb: any) {
       
    return this.http.get<Detail[]>(
      this.baseUrl +
      "view_details.php?dossierCommandesWeb=" +
      dossierCommandesWeb.dossierCommandesWeb+"&date_prod="+"'"+dossierCommandesWeb.date_prod+"'"
    );
  }
    getDetailListeProduits(dossierCommandesWeb: any) {
       
    return this.http.get<Detail[]>(
      this.baseUrl +
      "view_detail_listeProduit.php?dossierCommandesWeb=" +
      dossierCommandesWeb.dossierCommandesWeb+"&id_client="+"'"+dossierCommandesWeb.id_client+"'"
    );
  }
  //
  getDetailsBetweenDates(DetailBetweenObj: any) {
    let queryParams = new HttpParams({ fromObject: DetailBetweenObj });
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Detail[]>(
      this.baseUrl + "view_details_periode.php",
      {
        params: queryParams,
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
  addClientLogiciel(clientLogiciel: ClientLogiciel) {
    let clientJSON = JSON.stringify(clientLogiciel);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "insert_clientLogiciel.php",
      clientLogiciel,
      httpOptions
    );
  }
  getUsersLogiciel(dossierCommandesWeb: any) {
    let queryParams = new HttpParams({ fromObject: dossierCommandesWeb });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<ClientLogiciel[]>(
      this.baseUrl + "view_clientLogiciel.php",
      {
        params: queryParams,
      }
    );
  }

  modifyClientLogiciel(dossierCommandesWeb: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };
    return this.http.post(
      this.baseUrl + "update_clientLogiciel.php",
      dossierCommandesWeb,
      httpOptions
    );
  }
  addIngredient(ingredient: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };
    return this.http.post(
      this.baseUrl + "insert_ingredient.php",
      ingredient,
      httpOptions
    );
  }

  addNewClientLogiciel(connection: any) {
    let connectionJSON = JSON.stringify(connection);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "insert_clientLogicielTest.php",
      connectionJSON,
      httpOptions
    );
  }
    deleteClientLogiciel(connection: any) {
      let connectionJSON = JSON.stringify(connection);

      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
        observe: "response" as const,
        responseType: "text" as const,
      };

      return this.http.post(
        this.baseUrl + "delete_clientLogiciel.php",
        connectionJSON,
        httpOptions
      );
    }
    deleteIngredient(connection: any) {
      let connectionJSON = JSON.stringify(connection);

      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
        observe: "response" as const,
        responseType: "text" as const,
      };

      return this.http.post(
        this.baseUrl + "delete_ingredient_web.php",
        connectionJSON,
        httpOptions
      );
    }
    deleteProduit(connection: any) {
      let connectionJSON = JSON.stringify(connection);

      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
        observe: "response" as const,
        responseType: "text" as const,
      };

      return this.http.post(
        this.baseUrl + "delete_produit_web.php",
        connectionJSON,
        httpOptions
      );
    }
  sendTwillo(toPhoneNumber: string, message: string) {
    console.log("dans api sendTwillo")
    return this.http.get<any>(
      this.baseUrl + "twillo.php?toPhoneNumber=" + toPhoneNumber + "&message=" + message
    );
  }

  //  return this.http.post(this.baseUrl + "mailObjString.php", CommandeWebObj);

    addTache(connectionMysqlObjTache: any) {
    let connectionJSON = JSON.stringify(connectionMysqlObjTache);


    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "insert_tache.php",
      connectionJSON,
      httpOptions
    );
  }
  viewTache(dossierCommandesWeb: any) {
    //il faut retrouver dossierCommandesWeb et equipe pour laquelle on recherche tâches
    let queryParams = new HttpParams({ fromObject: dossierCommandesWeb });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Tache[]>(
      this.baseUrl + "view_taches.php",
      {
        params: queryParams,
      }
    );
  }
  deleteTache(connection: any) {
    let connectionJSON = JSON.stringify(connection);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "delete_tache.php",
      connectionJSON,
      httpOptions
    );
  }
  updateTache(connectionMysqlObjTache: any) {
    let connectionJSON = JSON.stringify(connectionMysqlObjTache);


    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.put(
      this.baseUrl + "update_tache.php",
      connectionJSON,
      httpOptions
    );
  }

  viewEquipe(dossierCommandesWeb: any) {
    //il faut retrouver dossierCommandesWeb et equipe pour laquelle on recherche tâches
    let queryParams = new HttpParams({ fromObject: dossierCommandesWeb });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Equipes[]>(
      this.baseUrl + "view_equipes.php",
      {
        params: queryParams,
      }
    );
  }
  deleteEquipe(connection: any) {
    let connectionJSON = JSON.stringify(connection);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "delete_equipe.php",
      connectionJSON,
      httpOptions
    );
  }
  addEquipe(connectionMysqlObjTache: any) {
   let connectionJSON = JSON.stringify(connectionMysqlObjTache);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    // return this.http.post(
    //   this.baseUrl + "insert_equipe.php",
    //   connectionMysqlObjTache,
    //   httpOptions
    // );
    return this.http.get(
      this.baseUrl + "insert_equipe.php?dossierCommandesWeb="+connectionMysqlObjTache.dossierCommandesWeb+"&nomEquipe="+connectionMysqlObjTache.nomEquipe

    );
  }
  viewFournisseur(dossierFournisseur: any) {

    let queryParams = new HttpParams({ fromObject: dossierFournisseur });

    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: queryParams,
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.get<Fournisseur[]>(
      this.baseUrl + "view_fournisseurJWT.php",
      {
        params: queryParams,
      }
    );
  }
  addFournisseur(dossierFournisseur: any) {
    let connectionJSON = JSON.stringify(dossierFournisseur);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "insert_fournisseur.php",
      connectionJSON,
      httpOptions
    );
   }
   updateFournisseur(dossierFournisseur: any) {
    let connectionJSON = JSON.stringify(dossierFournisseur);


    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };


    return this.http.put(
      this.baseUrl + "update_fournisseurJWT.php",
      connectionJSON,
      httpOptions
    );
  }
  deleteFournisseur(dossierFournisseur: any) {
    let connectionJSON = JSON.stringify(dossierFournisseur);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as const,
      responseType: "text" as const,
    };

    return this.http.post(
      this.baseUrl + "delete_fournisseur.php",
      connectionJSON,
      httpOptions
    );
  }
}

