import { Component, Input, OnInit, inject, signal } from "@angular/core";
import { FileUploadService } from "src/app/services/file-upload.service";
import { ExtractLienFTPService } from "src/app/extract-lien-ftp.service";
import { EnvoiAuBoulangerService } from "src/app/services/envoi-au-boulanger.service";
import { CommandeComponent } from "../commande/commande.component";
import Swal from "sweetalert2";
import { HttpClient, HttpResponse, HttpEventType } from "@angular/common/http";
import { FileuploadCommandesService } from "src/app/services/fileupload-commandes.service";
import { ApiService } from "src/app/api.service";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



@Component({
  selector: "app-file-upload",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
  http = inject(HttpClient);
  fileService = inject(FileuploadCommandesService);
  api = inject(ApiService);
  fileName: any;
  selectedFiles: FileList | undefined;
  currentFile: File | undefined;

  // Variable to store shortLink from api response
  shortLink: string = "";
  //loading: boolean = false; // Flag variable
  loading=signal<boolean> (false); // Flag variable
  file: File | undefined;
  lienURLPhp: string = "";
  showTelechargement: boolean | undefined;

  @Input()
  dateLundiCommandeString: string = ""; // decorate the property with @Input()
  @Input()
  objDataToMysql: Object | undefined;
  @Input()
  montant: number | undefined;
  @Input()
  oldCommande: boolean | undefined;

  invendusActif: boolean = false;
  msg: {} | undefined;
  liencommandeFTP: string = "";
  liencommandeWebToMysql: string = "";
  messageEmail: string | undefined;


  constructor(
    private fileUploadService: FileUploadService,
    private extract: ExtractLienFTPService,
    private envoiMail: EnvoiAuBoulangerService,
    private commande: CommandeComponent
  ) {}
  selectFile(event: { target: { files: FileList | undefined } }) {
    this.selectedFiles = event.target.files;
  }

  ngOnInit(): void {
    this.showTelechargement = this.extract.showTelechargement;
    console.log("on entre dans ngOninit de FileUploadComponent")
  }
  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    //== ajout 19-8-2023
    // this.currentFile = this.selectedFiles.item(0);
    this.currentFile = this.file;
    console.log("this.currentFile dans onChange cell="+JSON.stringify(this.file))

    this.fileService.uploadFile(this.currentFile).subscribe((response) => {
      //this.selectedFiles.value = '';
      if (response instanceof HttpResponse) {
        this.msg = response.body;
      }
    });
    //======ajout 19-8-2023 fin
    console.log("dans onChange(event) onUpload()")
   // this.loading.set( !this.loading());
    console.log("thisloading()="+this.loading())

    this.onUpload();
  }

  // OnClick of button Upload
  onUpload() {

    console.log("on entre dans onUpload()")

    this.loading.set( !this.loading());
  

    this.simpleAlertConfirm(
      "Sélection du fichier faite et  envoyée à " + this.extract.boulanger.nomBoulangerie + " !"
    );

    this.envoiMailConfirmation()

    this.envoiMysqlCommandeWeb()

    //retrait de ce service qui devait créer le fichier file.io et l'envoi de message. 
    // Comme le service bloquait les messages ne s'envoyaient pas
    // this.fileUploadService.upload(this.file).subscribe((event: any) => {
    //   if (typeof event === "object") {
    //     // Short link via api response
    //    // this.shortLink = event.link; //  file.io marche pas depuis janvier 2025
    //     this.shortLink = ""
    
    //     this.loading.set(false); // Flag variable
    //     let varTo = this.extract.boulanger.emailEnvoiAuBoulanger;
    //     let varFrom = this.extract.boulanger.emailClient;
    //     let $boulangerie = this.extract.boulanger.dossierCommandesWeb;
    //     let varNom = this.extract.boulanger.nom;
    //     let varUrl = this.shortLink;
    //     let varDate = this.dateLundiCommandeString;
    //     let nomBoulangerie = this.extract.boulanger.nomBoulangerie;

    //     let varInvendus = this.invendusActif;
    //     let invendus = this.extract.getInvendus(); // par défaut '' sinon INVENDUS
    //     this.liencommandeFTP =
    //       "https://www.boulangerieqc.com/clients/" +
    //       $boulangerie +
    //       "/commandesWeb/" +
    //       this.file.name;

    //     this.messageEmail =
        
    //       "<strong>" +
    //       this.commande.inputMessage +
    //       '</strong><br> Ce document est archivé sur votre espace web dans le menu "Utilisez commandes Web": ' +
    //       this.liencommandeFTP +
    //       "<br>";
    //       console.log("dans onUpload() this.messageEmail="+this.messageEmail)
    //       console.log("this.liencommandeFTP="+this.liencommandeFTP)

    //     let ajout: string =
    //       "?varTo=" +
    //       varTo +
    //       "&varFrom=" +
    //       varFrom +
    //       "&varNom=" +
    //       varNom +
    //       "&varURL=" +
    //       varUrl +
    //       "&varDate=" +
    //       varDate +
    //       "&varInvendus=" +
    //       invendus +
    //       "&messageEmail=" +
    //       this.messageEmail +
    //       "&nomBoulangerie=" +
    //       nomBoulangerie;

    //       console.log("avant envoi ajout="+ajout)
    //     this.lienURLPhp =
    //       "https://www.boulangerieqc.com/assets/crudmysql/mail.php" + ajout;

    //     this.fileService.setFileName(this.liencommandeFTP);
    //     //  this.envoiMail.envoiMailCommande(this.lienURLPhp).subscribe();

    //     this.envoiMail
    //       .envoiMailCommandeMailObjString(
    //         "https://www.boulangerieqc.com/assets/crudmysql/mailObjString.php" +
    //           ajout
    //       )
    //       .subscribe();

    //     let $idclient = this.extract.boulanger.idclient;
    //     let $dossier = $boulangerie;
    //     let $dateLundi = varDate;
    //     let $dateEnvoi = new Date();
    //     let $heureEnvoi = new Date(); // extraire l'heure
    //     let $lienURL = this.liencommandeFTP;
    //     let $montant = this.montant;
    //     let $nomClient = this.extract.boulanger.nom;

    //     let $db_host = this.extract.boulanger.db_host;
    //     let $db_name = this.extract.boulanger.db_name;
    //     let $db_username = this.extract.boulanger.db_username;
    //     let $db_password = this.extract.boulanger.db_password;

    //     let ajoutToMysql1: string =
    //       "idclient=" +
    //       $idclient +
    //       "&dossier=" +
    //       $dossier +
    //       "&dateLundi=" +
    //       $dateLundi +
    //       "&dateEnvoi=" +
    //       $dateEnvoi;
    //     let ajoutToMysql =
    //       ajoutToMysql1 +
    //       "&heureEnvoi=" +
    //       $heureEnvoi +
    //       "&lienURL=" +
    //       $lienURL +
    //       "&montant=" +
    //       $montant;

    //     this.liencommandeWebToMysql =
    //       "https://www.boulangerieqc.com/assets/crudmysql/insert_commandeWeb.php?" +
    //       ajoutToMysql;

    //     let CommandeWebObj: Object = {
    //       idclient: $idclient,
    //       nomClient: $nomClient,
    //       dossier: $dossier,
    //       dateLundi: $dateLundi,
    //       lienURL: this.liencommandeFTP,
    //       montant: $montant,
    //       invendus: invendus,
    //       nom_commandeCSV: this.file.name,
    //       messageAjout: this.messageEmail,
    //       varTo: this.extract.boulanger.emailEnvoiAuBoulanger,
    //       varFrom: this.extract.boulanger.emailClient,
    //       varNom: this.extract.boulanger.nom,
    //       varURL: this.shortLink,
    //       vardate: this.dateLundiCommandeString,
    //       varInvendus: this.extract.getInvendus(),
    //       oldCommande: this.oldCommande,

    //       db_host: $db_host,
    //       db_name: $db_name,
    //       db_username: $db_username,
    //       db_password: $db_password,
    //     };

    //     let CommandeWebObjNoLogin:Object={
    //       idclient: $idclient,
    //       nomClient: $nomClient,
    //       dossier: $dossier,
    //       dateLundi: $dateLundi,
    //       lienURL: this.liencommandeFTP,
    //       montant: $montant,
    //       invendus: invendus,
    //       nom_commandeCSV: this.file.name,
    //       messageAjout: this.messageEmail,
    //       varTo: this.extract.boulanger.emailEnvoiAuBoulanger,
    //       varFrom: this.extract.boulanger.emailClient,
    //       varNom: this.extract.boulanger.nom,
    //       varURL: this.shortLink,
    //       vardate: this.dateLundiCommandeString,
    //       varInvendus: this.extract.getInvendus(),
    //       oldCommande: this.oldCommande
    //     }
    //     // console.log('Commande Web  vers api=',JSON.stringify(CommandeWebObj))
    //     console.log("avant d'entrer dans api.createCommandeWebMysqlOBJ")
    //     this.api.createCommandeWebMysqlOBJ(CommandeWebObjNoLogin).subscribe((res) => {
   
    //     });
    //         //permet de garder la date où le client a utilisé la listePrix et non ancienne commande
    //         if (this.oldCommande == false) {
    //           this.api.updateTimestampNewCommande(CommandeWebObjNoLogin).subscribe();
    //         }
    //     //création du lien pour créer commandeWeb sur Mysql

    //     this.simpleAlertConfirm(
    //       "Sélection du fichier faite et  envoyée à " + varTo + " !"
    //     );

    //     //window.open(this.lienURLPhp, '_blank');
    //     //  window.open(this.lienURLPhp, '_self');
    //   }
    // });
  }
  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: "success",
      title: "Parfait...",
      text: textAlert,
      timer: 2000,
      toast: true,
    });
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();


      formData.append("thumbnail", file);
      console.log("dans onFileSelected de file-upload formData=");

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);
      const upload$ = this.http.post(
        "https://www.boulangerieqc.com/assets/crudmysql/upload.php",
        formData
      );

      upload$.subscribe();
    }
  }

  getFileName() {
    return this.liencommandeFTP;
  }

  envoiMailConfirmation(){

   console.log("on entre dans envoiMailConfirmation")
    let varTo = this.extract.boulanger.emailEnvoiAuBoulanger;
    let varFrom = this.extract.boulanger.emailClient;
    let $boulangerie = this.extract.boulanger.dossierCommandesWeb;
    let varNom = this.extract.boulanger.nom;
    let varUrl = this.shortLink;
    let varDate = this.dateLundiCommandeString;
    let nomBoulangerie = this.extract.boulanger.nomBoulangerie;

    let varInvendus = this.invendusActif;
    let invendus = this.extract.getInvendus(); // par défaut '' sinon INVENDUS
    this.liencommandeFTP =
      "https://www.boulangerieqc.com/clients/" +
      $boulangerie +
      "/commandesWeb/" +
      this.file.name;

    this.messageEmail =
    
      "<strong>" +
      this.commande.inputMessage +"<hr>"+
      '</strong><br> Ce document est archivé sur votre espace web dans le menu "Utilisez commandes Web": ' +
      this.liencommandeFTP +
      "<br>";


    let ajout: string =
      "?varTo=" +
      varTo +
      "&varFrom=" +
      varFrom +
      "&varNom=" +
      varNom +
      "&varURL=" +
      varUrl +
      "&varDate=" +
      varDate +
      "&varInvendus=" +
      invendus +
      "&messageEmail=" +
      this.messageEmail +
      "&nomBoulangerie=" +
      nomBoulangerie;

    this.lienURLPhp =
      "https://www.boulangerieqc.com/assets/crudmysql/mail.php" + ajout;

    this.fileService.setFileName(this.liencommandeFTP);
    //  this.envoiMail.envoiMailCommande(this.lienURLPhp).subscribe();

    this.envoiMail
      .envoiMailCommandeMailObjString(
        "https://www.boulangerieqc.com/assets/crudmysql/mailObjString.php" +
          ajout
      )
      .subscribe();
  }

  envoiMysqlCommandeWeb(){


    this.loading.set(false); // Flag variable
    let varTo = this.extract.boulanger.emailEnvoiAuBoulanger;
    let varFrom = this.extract.boulanger.emailClient;
    let $boulangerie = this.extract.boulanger.dossierCommandesWeb;
    let varNom = this.extract.boulanger.nom;
    let varUrl = this.shortLink;
    let varDate = this.dateLundiCommandeString;
    let nomBoulangerie = this.extract.boulanger.nomBoulangerie;

    let varInvendus = this.invendusActif;
    let invendus = this.extract.getInvendus(); // par défaut '' sinon INVENDUS
    this.liencommandeFTP =
      "https://www.boulangerieqc.com/clients/" +
      $boulangerie +
      "/commandesWeb/" +
      this.file.name;

    this.fileService.setFileName(this.liencommandeFTP);
    //  this.envoiMail.envoiMailCommande(this.lienURLPhp).subscribe();

  

    let $idclient = this.extract.boulanger.idclient;
    let $dossier = $boulangerie;
    let $dateLundi = varDate;
    let $dateEnvoi = new Date();
    let $heureEnvoi = new Date(); // extraire l'heure
    let $lienURL = this.liencommandeFTP;
    let $montant = this.montant;
    let $nomClient = this.extract.boulanger.nom;

    let $db_host = this.extract.boulanger.db_host;
    let $db_name = this.extract.boulanger.db_name;
    let $db_username = this.extract.boulanger.db_username;
    let $db_password = this.extract.boulanger.db_password;

    let ajoutToMysql1: string =
      "idclient=" +
      $idclient +
      "&dossier=" +
      $dossier +
      "&dateLundi=" +
      $dateLundi +
      "&dateEnvoi=" +
      $dateEnvoi;
    let ajoutToMysql =
      ajoutToMysql1 +
      "&heureEnvoi=" +
      $heureEnvoi +
      "&lienURL=" +
      $lienURL +
      "&montant=" +
      $montant;

    this.liencommandeWebToMysql =
      "https://www.boulangerieqc.com/assets/crudmysql/insert_commandeWeb.php?" +
      ajoutToMysql;

    let CommandeWebObj: Object = {
      idclient: $idclient,
      nomClient: $nomClient,
      dossier: $dossier,
      dateLundi: $dateLundi,
      lienURL: this.liencommandeFTP,
      montant: $montant,
      invendus: invendus,
      nom_commandeCSV: this.file.name,
      messageAjout: this.messageEmail,
      varTo: this.extract.boulanger.emailEnvoiAuBoulanger,
      varFrom: this.extract.boulanger.emailClient,
      varNom: this.extract.boulanger.nom,
      varURL: this.shortLink,
      vardate: this.dateLundiCommandeString,
      varInvendus: this.extract.getInvendus(),
      oldCommande: this.oldCommande,
    };

    let CommandeWebObjNoLogin:Object={
      idclient: $idclient,
      nomClient: $nomClient,
      dossier: $dossier,
      dateLundi: $dateLundi,
      lienURL: this.liencommandeFTP,
      montant: $montant,
      invendus: invendus,
      nom_commandeCSV: this.file.name,
      messageAjout: this.messageEmail,
      varTo: this.extract.boulanger.emailEnvoiAuBoulanger,
      varFrom: this.extract.boulanger.emailClient,
      varNom: this.extract.boulanger.nom,
      varURL: this.shortLink,
      vardate: this.dateLundiCommandeString,
      varInvendus: this.extract.getInvendus(),
      oldCommande: this.oldCommande
    }


    this.api.createCommandeWebMysqlOBJ(CommandeWebObjNoLogin).subscribe((res) => {

    });
        //permet de garder la date où le client a utilisé la listePrix et non ancienne commande
        if (this.oldCommande == false) {
          this.api.updateTimestampNewCommande(CommandeWebObjNoLogin).subscribe();
        }
    //création du lien pour créer commandeWeb sur Mysql

    this.simpleAlertConfirm(
      "Sélection du fichier faite et  envoyée à " + varTo + " !"
    );


  }
}
