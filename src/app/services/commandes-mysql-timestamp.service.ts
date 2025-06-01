import { Injectable } from "@angular/core";
import { Component, Input, OnInit, inject } from "@angular/core";
import { FileUploadService } from "src/app/services/file-upload.service";
import { ExtractLienFTPService } from "src/app/extract-lien-ftp.service";
import { EnvoiAuBoulangerService } from "src/app/services/envoi-au-boulanger.service";
import { CommandeComponent } from "src/app/components/commande/commande.component";
import Swal from "sweetalert2";
import { HttpClient, HttpResponse, HttpEventType } from "@angular/common/http";
import { FileuploadCommandesService } from "src/app/services/fileupload-commandes.service";
import { ApiService } from "src/app/api.service";
import { CommonModule } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class CommandesMysqlTimestampService {
  http = inject(HttpClient);
  fileService = inject(FileuploadCommandesService);
  api = inject(ApiService);
  fileName: any;
  selectedFiles: FileList | undefined;
  currentFile: File | undefined;

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
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

  ngOnInit(): void {

  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;

    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === "object") {
        // Short link via api response
        this.shortLink = event.link;
        this.loading = false; // Flag variable
        let varTo = this.extract.boulanger.emailEnvoiAuBoulanger;
        let varFrom = this.extract.boulanger.emailClient;
        let $boulangerie = this.extract.boulanger.dossierCommandesWeb;
        let varNom = this.extract.boulanger.nom;
        let varUrl = this.shortLink;
        let varDate = this.dateLundiCommandeString;
        let nomBoulangerie = this.extract.boulanger.nomBoulangerie;

        let varInvendus = this.invendusActif;
        let invendus = this.extract.invendus; // par défaut '' sinon INVENDUS
        this.liencommandeFTP =
          "https://www.boulangerieqc.com/clients/" +
          $boulangerie +
          "/commandesWeb/" +
          this.file.name;

        this.messageEmail =
          "<strong>" +
          this.commande.inputMessage +
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

        // console.log('Voici le liennmailObjString.php ' + 'https://www.boulangerieqc.com/assets/crudmysql/mailObjString.php'+ajout)
        this.envoiMail
          .envoiMailCommandeMailObjString(
            "https://www.boulangerieqc.com/assets/crudmysql/mailObjString.php" +
              ajout
          )
          .subscribe();

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
          varInvendus: this.extract.invendus,
          oldCommande: this.oldCommande,

          db_host: $db_host,
          db_name: $db_name,
          db_username: $db_username,
          db_password: $db_password,
        };

        let CommandeWebObjNoLogin: Object = {
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
          varInvendus: this.extract.invendus,
          oldCommande: this.oldCommande,
        };
       
        // console.log('Commande Web  vers api=',JSON.stringify(CommandeWebObj))
        console.log("avant d'entrer dans api.createCommandeWebMysqlOBJ");
        this.api
          .createCommandeWebMysqlOBJ(CommandeWebObjNoLogin)
          .subscribe((res) => {});
        //permet de garder la date où le client a utilisé la listePrix et non ancienne commande
       
        if (this.oldCommande == false) {
          this.api
            .updateTimestampNewCommande(CommandeWebObjNoLogin)
            .subscribe();
        }
        //création du lien pour créer commandeWeb sur Mysql

        this.simpleAlertConfirm(
          "Sélection du fichier faite et  envoyée à " + varTo + " !"
        );

        //window.open(this.lienURLPhp, '_blank');
        //  window.open(this.lienURLPhp, '_self');
      }
    });
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
}
