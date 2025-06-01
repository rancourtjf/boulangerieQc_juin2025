import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  AfterRenderOptions,
  Input,
  OnDestroy,
} from "@angular/core";

//import { MaterialComponentsModule } from "../material-components/material-components-module";
//https://datatables.net/extensions/keytable/examples/initialisation/simple.html  pour naviguer avec fleche dans tableau
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient, HttpResponse, HttpEventType } from "@angular/common/http";
import { Produit } from "../../models/produits";
import { Papa, ParseResult } from "ngx-papaparse";
import { ngxCsv } from "ngx-csv";
import Swal from "sweetalert2";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMobilePhone } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

import {
  Observable,
  BehaviorSubject,
  Subject,
  of,
  from,
  take,
  asyncScheduler,
  fromEvent,
  map,
  Subscription,
  timestamp,
} from "rxjs";
import { ExtractLienFTPService } from "src/app/extract-lien-ftp.service";
import { FileUploadService } from "src/app/services/file-upload.service";
import { FileuploadCommandesService } from "src/app/services/fileupload-commandes.service";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { EnvoiAuBoulangerService } from "src/app/services/envoi-au-boulanger.service";
import { TransfertCommandesWebService } from "src/app/services/transfert-commandes-web.service";
import { format, compareAsc, parse } from "date-fns";
import { addDays } from "date-fns/addDays";
import { ApiService } from "src/app/api.service";
import { Client } from "src/app/models/client";
import { MessageComponent } from "src/app/components/message/message.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavbarFacturesComponent } from "../navbar-factures/navbar-factures.component";
import { signalUpdateFn } from "@angular/core/primitives/signals";
import { clientIndividuel } from "src/app/models/clientIndividuel";
import { NgxMatTimepickerComponent, NgxMatTimepickerModule } from 'ngx-mat-timepicker';


import { DateTime } from 'ts-luxon';
import { FileUploadRuptureComponent } from "src/app/components/file-upload-rupture/file-upload-rupture.component";
import { toSignal } from '@angular/core/rxjs-interop';



const lang = 'fr-CA';

@Component({
  selector: 'app-heure-rupture',
  standalone: true,
  imports: [
    MessageComponent,
    MatDatepickerModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    NavbarFacturesComponent,
    RouterModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    FontAwesomeModule, NgxMatTimepickerModule,
    FileUploadRuptureComponent,
    

],
  templateUrl: './heure-rupture.component.html',
  styleUrl: './heure-rupture.component.css'
})
export class HeureRuptureComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  FormBuilder = inject(FormBuilder);
  httpclient = inject(HttpClient);
  fileService = inject(FileuploadCommandesService);

  faMobilePhone = faMobilePhone
  faDesktop = faDesktop
  extract = inject(ExtractLienFTPService);
  envoiMail = inject(EnvoiAuBoulangerService);
  fileUploadService = inject(FileUploadService);
  fileUpLoadCommandeService = inject(FileuploadCommandesService);
  fileUploadVersMysql = inject(FileuploadCommandesService);
  api = inject(ApiService);
  transfertCommandes = inject(TransfertCommandesWebService);

  tabletteOK: boolean = false;
  dateChoisie: Date = new Date();
  totalCommande = signal<number>(0);

  dataListeProdSignal = signal<Produit[]>([]);
  listeCsvData: string = "";
  datasourceTempResult: Produit[];
  dataSourceInitiale: Produit[];

  userPostToPhp: Object = {
    username: "Mike",
    password: "Mike567",
    gender: "male",
    email: "mike@mail.com",
  };

  // "https://www.boulangerieqc.com/clients/boulangerieqc/listePrixClients/listeProduitPourClient232.csv";

  commandeForm: FormGroup;
  commandeFormHeure: FormGroup

  public dataSourceListePrix: Produit[];
  membersLength: number;
  dateLundi!: Date;
  dateMardi!: Date;
  dateMercredi!: Date;
  dateJeudi!: Date;
  dateVendredi!: Date;
  dateSamedi!: Date;
  dateDimanche!: Date;
  dateLundiString!: string;
  dateMardiString!: string;
  dateMercrediString!: string;
  dateJeudiString!: string;
  dateVendrediString!: string;
  dateSamediString!: string;
  dateDimancheString!: string;
  jourdelaCommande!: string;
  inputDate: any;
  datedelaCommande!: Date;

  dateStringCommande!: string;
  fullNameDate!: string;

  nbrProduit: any;
  testResult: string;
  control: FormArray<any>;
  dataSourceListePrixApresHtpp: Produit;
  dataHttp: Produit;
  total = 0;
  value;
  prixEsc: number;
  prixEscString: any;
  nomClient: string = "";
  logoClient: string = "";
  role: string = "client";
  inputDate1jour: any;
  show: boolean = false;
  commande1semaine: number = 1;
  submitted1sem = false;
  submitted1jour = false;
  invendusActif: boolean = false;
  invendusString: string = "";
  //unInputPattern = "/^-?(0|[1-9]\d*)?$/";
  unInputPattern = "[0-9]*";
  file: any;
  inputMessage: string = "";
  formMessage: FormGroup;

  csvData: any;
  options: {};
  saisieVerticale: boolean = false;
  ajout: number = 0;
  arrayLen: any;
  oldCommande: boolean = false;
  loading: boolean = true;

  objDataToMysql: any;
  alertMAJListePrix: boolean = false;
  unClient: Client;
  timeStampNewCommande: any;
  majprixTimestamp: any;

  dateDernierMajProduit = signal<String>("");

  datemajPrix: Date;
  fileName: string;
  msg: {};

  objDataToMysqlSansLogin: {
    idclient: number;
    dossier: string;
    dateLundi: string; // ou this.fileUploadService.dateLundiCommandeString
    // dateLundi:this.fileUploadService.
    dateEnvoi: string;
    heureEnvoi: string;
    montant: number;
    lienURL: string;
    nom_commandeCSV: string;
    nomClient: string;
    invendus: string;
  };
  shortLink: any;
  csvFormatteNoDownload: ngxCsv;
  nomFileToMail: string;
  montantToMysql: number;
  subscription?: Subscription;
  subscriptionOld?: Subscription;
  proprio = signal<boolean>(false)
  qteMinCommande = signal<number>(0)
  bgwhite: boolean = false;
  currentFile: File | undefined;
  linkFileIOName: string;
  clientIndividuel: clientIndividuel = null


  formControlItem: FormControl = new FormControl('');
  maxTime: DateTime = DateTime.local().set({
    hour: 16,
  });
  minTime: DateTime = DateTime.local().set({
    hour: 14,
  });
  required: boolean = !1;

  //@ViewChild('timepicker') timepicker: any;
  @ViewChild('timepicker') timepicker!: NgxMatTimepickerComponent;

  defaultTimeValue: string = '';
  dataSource = signal<Produit[]>([]);

  displayedColumns: string[] = [

    "produit",
    "quantite",
    "heureRupture",
  ]
  colHeureRupture1jour: string;
  choixUnJour=signal<boolean>(false)
  currentTimePickerIndex: number = -1; // Track which row is being edited



  /**
   * Lets the user click on the icon in the input.
   */
// Modify your existing openFromIcon method
openFromIcon(timepicker: any, index: number) {
  this.currentTimePickerIndex = index;
  timepicker.open();
}

  /**
   * Function to clear FormControl's value, called from the HTML template using the clear button
   *
   * @param $event - The Event's data object
   */
  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }



  public get Rows() {
    return this.commandeForm.get("Rows") as FormArray;
  }

  constructor(
    private http: HttpClient,
    private papa: Papa,
    private formBuilder: FormBuilder,
    //private extract: ExtractLienFTPService,
    public router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    //https://stackoverflow.com/questions/67192422/how-to-validate-date-using-reactive-form-in-angular-if-user-select-date-greater
    this.inputDate = this.formBuilder.group({
      dateCommande: [new Date(), [Validators.required]],
    });
    this.inputDate1jour = this.formBuilder.group({
      dateCommande: [new Date(), Validators.required],
    });

    this.formMessage = this.formBuilder.group({
      inputMessage: [""],
    });

    this.dataSourceListePrix = [];
    if (this.extract.invendus == "INVENDUS") {
      this.invendusActif = true;
    }

    this.tabletteOK = this.extract.getTabletteOK();
    this.clientIndividuel = this.extract.formClientIndividuel

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // destruction this.parseCSV
    console.log("this.subscription?.unsubscribe(); // destruction this.parseCSV")

    this.subscriptionOld?.unsubscribe();// destruction this.parseCSVOld
    console.log("this.subscriptionOld?.unsubscribe();// destruction this.parseCSVOld")
  }
  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day == 1; // 1 means monday, 0 means sunday, etc.
  };
  //https://onthecode.co.uk/blog/angular-material-focus-form-input-with-renderer2
  //https://www.tektutorialshub.com/angular/renderer2-angular/
  ngAfterViewInit() {
    setTimeout(() => {
      console.log("on est dans le ngAfterViewInit");
      var elem = this.renderer.selectRootElement("#input0_jeudi0");

      // this.renderer.listen(elem, "focus", () => { console.log('focus') });
      // this.renderer.listen(elem, "blur-sm", () => { console.log('blur-sm') });
      this.renderer.listen(elem, "keydown.tab", () => { });
      elem.focus();
    }, 100);
    // Accéder à la propriété defaultTime après l'initialisation de la vue

    this.timepicker.defaultTime = '00:00'; // Mettre à jour la valeur

    this.defaultTimeValue = this.timepicker.defaultTime;
console.log("dans ngAfterViewInit")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnchange start");

  }
  ngOnInit(): void {

    this.proprio.set(this.extract.getBoulanger().proprioBoulangerie)
    this.totalCommande.set(0);
    this.dataListeProdSignal.set([]);
    this.dataSourceListePrix = [];
    this.dataSourceInitiale = [];
    console.log("ngOnInit call");

    if (this.extract.invendus == "INVENDUS") {

      this.invendusActif = true;
    } else {
      this.invendusActif = false;

    }

    this.listeCsvData = this.extract.boulanger.userURLSiteCommande;
    // console.log(this.extract.formClientIndividuel.nom)
    //ici pour une commande client individuel on remplace par this.extract.boulanger.clientIndivSiteCommande 2024-11-14
    // if(this.extract.formClientIndividuel.nom!=undefined){
    //   this.listeCsvData = this.extract.boulanger.clientIndivSiteCommande
    // }
    // console.log(this.listeCsvData)



    this.nomClient = this.extract.boulanger.nom;
    this.logoClient = this.extract.boulanger.logoBoulangerie;
    this.role = this.extract.boulanger.role;

    this.obtenirListeProduit();

    for (let i = 0; i < this.membersLength; i++) {
      this.commandeFormHeure = this.formBuilder.group({
        variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
        input0_lundi: [
          Number(0),
        ],
        heureRupture: [""],
      });
    }

    this.extract.invendusAdd(this.invendusActif); // on change '' pour INVENDUS

    //ajout 3 oct 2024 pour mettre a ) produits si INVENDUS ==true

    this.obtenirListeProduitZero()

         this.triParCategoriesDown()
    //fin 3 oct 2024
    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    console.log("avant le for de ngOnInit=" + JSON.stringify(this.dataSourceListePrix))
    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({

          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          heureRupture: [""],

        })
      );
    }

  }

  public get getFormControls() {
    const control = this.commandeForm.get("Rows") as FormArray;
    return control;
  }
  downloadCSV(dataListe: any) {

    if(this.choixUnJour()!=true){
      this.simpleAlert("Vous devez entrez une date du jour!");
      return;
    }
 

    //ici on retire l'attribut qteMinCommande
    dataListe.forEach(produit => {
      delete produit.qteMinCommande;

    });
    // Méthode 2 : forEach()

    this.dataListeProdSignal().forEach(item => {
      item.codeClient = this.extract.boulanger.idclient;
      item.invendus = false;
      item.dateLundi = this.dateLundiString
      item.heureRupture = item.heureRupture;

    });

    this.dataListeProdSignal.set(dataListe);

    let options = {
      title: "DetailProduit",
      fieldSeparator: ";",
      quoteString: '"',
      decimalSeparator: ",",
      showLabels: false,
      noDownload: false, // si true pas de download automatique mais csv formatté si false, download automatique
      showTitle: false,
      useBom: false,
      headers: [
        "ID",
        "variete_poids_a",
        "lundi " + this.dateLundiString,
        "mardi " + this.dateMardiString,
        "mercredi " + this.dateMercrediString,
        "jeudi " + this.dateJeudiString,
        "vendredi " + this.dateVendrediString,
        "samedi " + this.dateSamediString,
        "dimanche " + this.dateDimancheString,
        "categorie_a",
        "prix_vente_variete_r",
        "prixEscompte",
        "produit_lundi_b",
        "produit_mardi_b",
        "produit_mercredi_b",
        "produit_jeudi_b",
        "produit_vendredi_b",
        "produit_samedi_b",
        "produit_dimanche_b",
        "special",
        "urlImage",
        "codeClient",
        "invendus?",
        "lundi",
        "heureRupture"
        // "nom",
        // "prenom",
        // "telephone",
        // "courriel",
        // "cueillette"
      ],
    };
    let optionsNoDownload = {
      title: "DetailProduit",
      fieldSeparator: ";",
      quoteString: '"',
      decimalSeparator: ",",
      showLabels: false,
      noDownload: true, // si true pas de download automatique mais csv formatté si false, download automatique
      showTitle: false,
      useBom: false,
      headers: [
        "ID",
        "variete_poids_a",
        "lundi " + this.dateLundiString,
        "mardi " + this.dateMardiString,
        "mercredi " + this.dateMercrediString,
        "jeudi " + this.dateJeudiString,
        "vendredi " + this.dateVendrediString,
        "samedi " + this.dateSamediString,
        "dimanche " + this.dateDimancheString,
        "categorie_a",
        "prix_vente_variete_r",
        "prixEscompte",
        "produit_lundi_b",
        "produit_mardi_b",
        "produit_mercredi_b",
        "produit_jeudi_b",
        "produit_vendredi_b",
        "produit_samedi_b",
        "produit_dimanche_b",
        "special",
        "urlImage",
        "codeClient",
        "invendus?",
        "lundi",
        "heureRupture"
        // "nom",
        // "prenom",
        // "telephone",
        // "courriel",
        // "cueillette"
      ],
    };

    let heure = new Date().getHours();
    let minutes = new Date().getMinutes();
    let secondes = new Date().getSeconds();
    let timeCommande = heure + "_" + minutes + "_" + secondes;

    let dateCommandeInvendus: string = new Date().toLocaleDateString("fr-ca");
    let nomFile = ""

    if (this.invendusActif == true) {
      this.invendusString = "Invendus**";
    } else {
      this.invendusString = "";
    }


    // let heureTexte = this.timepicker.defaultTime;
    // let time = parse(heureTexte, "HH:mm", new Date());

    //2024-12-2 transformer this.timepicker en heure et non texte
    // let heuresCalc: number = parseInt(heureTexte.substring(0, 2), 10);
    // console.log("heuresCalc=" + heuresCalc)

    nomFile =
      "Rupture" +
      this.extract.boulanger.identifiant +
      "**" +
      this.fullNameDate +
      "**C" +
      dateCommandeInvendus +
      "H" +
      timeCommande;


    this.nomFileToMail = nomFile;

    let linkUrlCsv: string = nomFile + ".csv";
    this.linkFileIOName = linkUrlCsv
    let $lienURL: string =
      "https://www.boulangerieqc.com/clients/" +
      this.extract.boulanger.dossierCommandesWeb +
      "/commandesWeb/" +
      linkUrlCsv;

    this.objDataToMysql = {
      idclient: this.extract.boulanger.idclient,
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dateLundi: this.dateLundiString, // ou this.fileUploadService.dateLundiCommandeString
      // dateLundi:this.fileUploadService.
      dateEnvoi: dateCommandeInvendus,
      heureEnvoi: timeCommande,
      montant: this.totalCommande(),
      lienURL: $lienURL,
      nom_commandeCSV: nomFile,
      nomClient: this.nomClient,
    };

    if (this.invendusString != "") {
      this.montantToMysql = -this.totalCommande();

    } else {
      this.montantToMysql = this.totalCommande();
    }

    this.objDataToMysqlSansLogin = {
      idclient: this.extract.boulanger.idclient,
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dateLundi: this.dateLundiString, // ou this.fileUploadService.dateLundiCommandeString
      // dateLundi:this.fileUploadService.
      dateEnvoi: dateCommandeInvendus,
      heureEnvoi: timeCommande,
      montant: this.montantToMysql,
      lienURL: $lienURL,
      nom_commandeCSV: nomFile,
      nomClient: this.nomClient,
      invendus: this.extract.getInvendus(),
    };

    let csvFormatte = new ngxCsv(dataListe, nomFile, options);

    this.csvFormatteNoDownload = new ngxCsv(
      dataListe,
      nomFile,
      optionsNoDownload
    );



    this.transfertCommandes.fileSelected(
      this.csvFormatteNoDownload,
      linkUrlCsv
    );

    this.total = 0; // reset le total au cas ou une autre commande

    //test 8 juin 2024 tout le monde est un ordi on va voir si le telechargement envoi des commandes est identique
    // il semble que des ipad ne peuvent envoyer de fichier si tabletteOK est false pour tous...
    //this.tabletteOK=false

    if (this.tabletteOK) {
   
      this.simpleAlertConfirm(
       "Envoyé dans votre dossier Téléchargement ou Download. Vous avez une tablette ou cellulaire. Vous devrez faire l'étape 3!"
      //  "Envoyé dans votre dossier Téléchargement ou Download!"
      );
    } else {

      //créer une fiche commandeWeb dans le Mysql
      // this.api.createCommandeWeb(this.objDataToMysql);
      this.api
        .createCommandeWebMysql(this.objDataToMysqlSansLogin)
        .subscribe();

      this.envoiEmail();

      if (this.oldCommande == false) {
        this.api
          .updateTimestampNewCommande(this.objDataToMysqlSansLogin)
          .subscribe();
      }

      this.simpleAlertConfirm(
        "Envoyé dans votre dossier Téléchargement ou Download et Envoi automatique au boulanger"
      )
    }

    this.transfertCommNoelMysql(dataListe);


    this.extract.formClientIndividuel = []

    this.timepicker.defaultTime = '00:00'; // Mettre à jour la valeur
    this.formControlItem.setValue(null);
  }
  downloadCSVOLD(dataListe: any) {
    console.log("on entre dans downloadCSVOLD");

    let dataListeAvant = dataListe;

    for (let i = 0; i < dataListeAvant.length; i++) {
      delete dataListeAvant[i]["input0_lundi"];
      delete dataListeAvant[i]["input0_mardi"];
      delete dataListeAvant[i]["input0_mercredi"];
      delete dataListeAvant[i]["input0_jeudi"];
      delete dataListeAvant[i]["input0_vendredi"];
      delete dataListeAvant[i]["input0_samedi"];
      delete dataListeAvant[i]["input0_dimanche"];
      delete dataListeAvant[i][21]; // on supprime noclient(21), invendus(22) et datelundi(23) quand importe ancienne commande
      delete dataListeAvant[i][22];
      delete dataListeAvant[i][23];
    }

    this.dataListeProdSignal.update((v) => dataListe)

      ;

    let options = {
      title: "DetailProduit",
      fieldSeparator: ";",
      quoteString: '"',
      decimalSeparator: ",",
      showLabels: false,
      noDownload: false, // si true pas de download automatique mais csv formatté si false, download automatique
      showTitle: false,
      useBom: false,
      headers: [
        "ID",
        "variete_poids_a",
        "lundi " + this.dateLundiString,
        "mardi " + this.dateMardiString,
        "mercredi " + this.dateMercrediString,
        "jeudi " + this.dateJeudiString,
        "vendredi " + this.dateVendrediString,
        "samedi " + this.dateSamediString,
        "dimanche " + this.dateDimancheString,
        "categorie_a",
        "prix_vente_variete_r",
        "prixEscompte",
        "produit_lundi_b",
        "produit_mardi_b",
        "produit_mercredi_b",
        "produit_jeudi_b",
        "produit_vendredi_b",
        "produit_samedi_b",
        "produit_dimanche_b",
        "special",
        "urlImage",
        "codeClient",
        "invendus?",
        "lundi",
        "heureRupture"
        // "nom",
        // "prenom",
        // "telephone",
        // "courriel",
        // "cueillette"
      ],
    };
    let optionsNoDownload = {
      title: "DetailProduit",
      fieldSeparator: ";",
      quoteString: '"',
      decimalSeparator: ",",
      showLabels: false,
      noDownload: true, // si true pas de download automatique mais csv formatté si false, download automatique
      showTitle: false,
      useBom: false,
      headers: [
        "ID",
        "variete_poids_a",
        "lundi " + this.dateLundiString,
        "mardi " + this.dateMardiString,
        "mercredi " + this.dateMercrediString,
        "jeudi " + this.dateJeudiString,
        "vendredi " + this.dateVendrediString,
        "samedi " + this.dateSamediString,
        "dimanche " + this.dateDimancheString,
        "categorie_a",
        "prix_vente_variete_r",
        "prixEscompte",
        "produit_lundi_b",
        "produit_mardi_b",
        "produit_mercredi_b",
        "produit_jeudi_b",
        "produit_vendredi_b",
        "produit_samedi_b",
        "produit_dimanche_b",
        "special",
        "urlImage",
        "codeClient",
        "invendus?",
        "lundi",
        "heureRupture"
        // "nom",
        // "prenom",
        // "telephone",
        // "courriel",
        // "cueillette"
      ],
    };
    let heure = new Date().getHours();
    let minutes = new Date().getMinutes();
    let secondes = new Date().getSeconds();
    let timeCommande = heure + "_" + minutes + "_" + secondes;

    let dateCommandeInvendus: string = new Date().toLocaleDateString("fr-ca");

    if (this.invendusActif == true) {
      this.invendusString = "Invendus**";
    } else {
      this.invendusString = "";
    }

    let nomFile =
      this.invendusString +
      this.extract.boulanger.identifiant +
      "**" +
      this.fullNameDate +
      "**C" +
      dateCommandeInvendus +
      "H" +
      timeCommande;


    this.nomFileToMail = nomFile;

    let linkUrlCsv: string = nomFile + ".csv";
    let $lienURL: string =
      "https://www.boulangerieqc.com/clients/" +
      this.extract.boulanger.dossierCommandesWeb +
      "/commandesWeb/" +
      linkUrlCsv;

    this.objDataToMysql = {
      idclient: this.extract.boulanger.idclient,
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dateLundi: this.dateLundiString, // ou this.fileUploadService.dateLundiCommandeString
      // dateLundi:this.fileUploadService.
      dateEnvoi: dateCommandeInvendus,
      heureEnvoi: timeCommande,
      montant: this.totalCommande(),
      lienURL: $lienURL,
      nom_commandeCSV: nomFile,
      nomClient: this.nomClient,
      // db_host: this.extract.boulanger.db_host,
      // db_username: this.extract.boulanger.db_username,
      // db_name: this.extract.boulanger.db_name,
      // db_password: this.extract.boulanger.db_password,
    };
    if (this.invendusString != "") {
      this.montantToMysql = -this.totalCommande();

    } else {
      this.montantToMysql = this.totalCommande();
    }

    this.objDataToMysqlSansLogin = {
      idclient: this.extract.boulanger.idclient,
      dossier: this.extract.boulanger.dossierCommandesWeb,
      dateLundi: this.dateLundiString, // ou this.fileUploadService.dateLundiCommandeString
      // dateLundi:this.fileUploadService.
      dateEnvoi: dateCommandeInvendus,
      heureEnvoi: timeCommande,
      montant: this.montantToMysql,
      lienURL: $lienURL,
      nom_commandeCSV: nomFile,
      nomClient: this.nomClient,
      invendus: this.extract.getInvendus(),
    };

    let csvFormatte = new ngxCsv(dataListe, nomFile, options);
    this.csvFormatteNoDownload = new ngxCsv(
      dataListe,
      nomFile,
      optionsNoDownload
    );

    this.transfertCommandes.fileSelected(
      this.csvFormatteNoDownload,
      linkUrlCsv
    );
    this.total = 0; // reset le total au cas ou une autre commande
    if (this.tabletteOK) {
      this.simpleAlertConfirm(
        "Envoyé dans votre dossier Téléchargement ou Download. Vous avez une tablette ou cellulaire. Vous devrez faire l'étape 3!"
      );
    } else {

      //créer une fiche commandeWeb dans le Mysql
      // this.api.createCommandeWeb(this.objDataToMysql);

      this.api
        .createCommandeWebMysql(this.objDataToMysqlSansLogin)
        .subscribe();
      this.envoiEmail();

      if (this.oldCommande == false) {
        this.api
          .updateTimestampNewCommande(this.objDataToMysqlSansLogin)
          .subscribe();
      }
      this.simpleAlertConfirm(
        "Envoyé dans votre dossier Téléchargement ou Download et Envoi automatique au boulanger"
      );
    }
    this.extract.formClientIndividuel = []
  }

  envoiCommande() {
    console.log("on entre dans envoiCommande");
    if(this.choixUnJour()!=true){
      this.simpleAlert("Vous devez entrez une date du jour!");
      return;
    }

    this.simpleAlertConfirm("Validation de la commande faite!");


    for (let i = 0; i < this.membersLength; i++) {
      let iStringLundi = "input0_lundi" + i.toString();
      let iStringMardi = "input0_mardi" + i.toString();
      let iStringMercredi = "input0_mercredi" + i.toString();
      let iStringJeudi = "input0_jeudi" + i.toString();
      let iStringVendredi = "input0_vendredi" + i.toString();
      let iStringSamedi = "input0_samedi" + i.toString();
      let iStringDimanche = "input0_dimanche" + i.toString();
      let iStringTotalProduit = "totalProduit" + i.toString();
      let lundiValue: string | null = (
        document.getElementById(iStringLundi) as HTMLInputElement
      ).value;
      let mardiValue: string | null = (
        document.getElementById(iStringMardi) as HTMLInputElement
      ).value;
      let mercrediValue: string | null = (
        document.getElementById(iStringMercredi) as HTMLInputElement
      ).value;
      let jeudiValue: string | null = (
        document.getElementById(iStringJeudi) as HTMLInputElement
      ).value;
      let vendrediValue: string | null = (
        document.getElementById(iStringVendredi) as HTMLInputElement
      ).value;
      let samediValue: string | null = (
        document.getElementById(iStringSamedi) as HTMLInputElement
      ).value;
      let dimancheValue: string | null = (
        document.getElementById(iStringDimanche) as HTMLInputElement
      ).value;
      let totalProduitValue = (
        document.getElementById(iStringTotalProduit) as HTMLInputElement
      ).value;

      this.prixEscString = this.dataSourceListePrix[i].prixEscompte;

      if (typeof this.prixEscString === "string") {
        this.prixEsc = Number(this.prixEscString.replace(",", "."));
      } else {
        this.prixEsc = this.dataSourceListePrix[i].prixEscompte;
      }
      let qteLundi = 0
      if ((Number(lundiValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_lundi = 0;
        this.dataListeProdSignal()[i].input0_lundi = 0;
        qteLundi = 0;
      }
      else {
        this.dataSourceListePrix[i].input0_lundi = Number(lundiValue);
        this.dataListeProdSignal()[i].input0_lundi = Number(lundiValue);
        qteLundi = Number(lundiValue);

      }

      this.total = this.total + qteLundi * this.prixEsc;

      let qteMardi = 0
      if ((Number(mardiValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_mardi = 0;
        this.dataListeProdSignal()[i].input0_mardi = 0;
        qteMardi = 0
      }
      else {
        this.dataSourceListePrix[i].input0_mardi = Number(mardiValue);
        this.dataListeProdSignal()[i].input0_mardi = Number(mardiValue);
        qteMardi = Number(mardiValue);
      }

      this.total = this.total + qteMardi * this.prixEsc;
      let qteMercredi = 0
      if ((Number(mercrediValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_mercredi = 0
        this.dataListeProdSignal()[i].input0_mercredi = 0
        qteMercredi = 0
      }
      else {
        this.dataSourceListePrix[i].input0_mercredi = Number(mercrediValue);
        this.dataListeProdSignal()[i].input0_mercredi = Number(mercrediValue);
        qteMercredi = Number(mercrediValue);
      }

      this.total = this.total + qteMercredi * this.prixEsc;

      let qteJeudi = 0
      if ((Number(jeudiValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_jeudi = 0
        this.dataListeProdSignal()[i].input0_jeudi = 0
        qteJeudi = 0
      }
      else {
        this.dataSourceListePrix[i].input0_jeudi = Number(jeudiValue);
        this.dataListeProdSignal()[i].input0_jeudi = Number(jeudiValue);
        qteJeudi = Number(jeudiValue);
      }

      this.total = this.total + qteJeudi * this.prixEsc;

      let qteVendredi = 0
      if ((Number(vendrediValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_vendredi = 0
        this.dataListeProdSignal()[i].input0_vendredi = 0
        qteVendredi = 0
      }
      else {
        this.dataSourceListePrix[i].input0_vendredi = Number(vendrediValue);
        this.dataListeProdSignal()[i].input0_vendredi = Number(vendrediValue);
        qteVendredi = Number(vendrediValue);
      }

      this.total = this.total + qteVendredi * this.prixEsc;

      let qteSamedi = 0
      if ((Number(samediValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_samedi = 0
        this.dataListeProdSignal()[i].input0_samedi = 0
        qteSamedi = 0
      }
      else {
        this.dataSourceListePrix[i].input0_samedi = Number(samediValue);
        this.dataListeProdSignal()[i].input0_samedi = Number(samediValue);
        qteSamedi = Number(samediValue);
      }

      this.total = this.total + qteSamedi * this.prixEsc;

      let qteDimanche = 0
      if ((Number(dimancheValue) < this.qteMinCommande()) && !this.invendusActif) {
        this.dataSourceListePrix[i].input0_dimanche = 0
        this.dataListeProdSignal()[i].input0_dimanche = 0
        qteDimanche = 0
      }
      else {
        this.dataSourceListePrix[i].input0_dimanche = Number(dimancheValue);
        this.dataListeProdSignal()[i].input0_dimanche = Number(dimancheValue);
        qteDimanche = Number(dimancheValue);
      }


      this.total = this.total + qteDimanche * this.prixEsc;

      //test2024-1114 pour mettre code client individuel dans l'application 4D
      console.log("dans commande component=" + this.extract.formClientIndividuel.nom)
      if (this.extract.formClientIndividuel.nom === undefined) {
        this.dataListeProdSignal()[i].codeClient =
          this.extract.boulanger.idclient;
      }
      else {
        this.dataListeProdSignal()[i].codeClient = 10000
      }


      let $dateduLundi: Date = this.dateChoisie;
      var year = $dateduLundi.toLocaleString("default", { year: "numeric" });
      var month = $dateduLundi.toLocaleString("default", { month: "2-digit" });
      var day = $dateduLundi.toLocaleString("default", { day: "2-digit" });

      // Generate yyyy-mm-dd date string
      var formattedDate = year + "-" + month + "-" + day;
      this.dataListeProdSignal()[i].invendus = this.invendusActif;
      this.dataListeProdSignal()[i].lundi = formattedDate;
      // const heureTexte = "14:30";
      let heureTexte = this.timepicker.defaultTime;

      let time = parse(heureTexte, "HH:mm", new Date());

      //2024-12-2 transformer this.timepicker en heure et non texte
      const heures = parseInt(heureTexte.substring(0, 2), 10);
      const minutes = parseInt(heureTexte.substring(3, 5), 10);

      this.dataListeProdSignal()[i].heureRupture = heures
      if (heures == 0 && minutes == 0) {
        this.dataListeProdSignal()[i].heureRupture = 0
      }
      //   this.dataListeProdSignal()[i].heureRupture = time

      // this.dataListeProdSignal()[i].nom = this.extract.formClientIndividuel.nom
      // this.dataListeProdSignal()[i].prenom = this.extract.formClientIndividuel.prenom
      // this.dataListeProdSignal()[i].telephone = this.extract.formClientIndividuel.telephone
      // this.dataListeProdSignal()[i].courriel = this.extract.formClientIndividuel.courriel
      // this.dataListeProdSignal()[i].lieu = this.extract.formClientIndividuel.lieu

    }

    this.totalCommande.set(this.total);
  }

  //envoiInput(index: number, id: string, qteEvent: Event, noChamp: number) {
    envoiInput(index: number) {


    console.log(" on entre dans envoiInput");
    let dataSourceListePrix: any[] = this.dataListeProdSignal()

 


     let hrRupture = parseInt(this.commandeForm.getRawValue().Rows[index].heureRupture.split(':')[0]); // Résultat : 12
      //let hrRupture = this.commandeForm.getRawValue().Rows[index].heureRupture


      dataSourceListePrix[index].heureRupture = hrRupture
      dataSourceListePrix[index][this.colHeureRupture1jour] = 1



    // var leID = id + index.toString();
    //on remplace par le id par le input déterminer par le choix de jour ex input_lundi pour lundi etc...
    var leID = this.colHeureRupture1jour + index.toString();



    this.dataListeProdSignal.set(dataSourceListePrix);
  }

  getDayName(date = new Date(this.datedelaCommande), locale = "fr-ca") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }
  onSubmitDateCommande() {
    // stop here if form is invalid

    if (this.inputDate.invalid) {
      return;
    }
    this.total = 0;
    this.totalCommande.set(0);

    this.show = !this.show;
    this.extract.showTelechargement = !this.extract.showTelechargement;
    this.datedelaCommande = this.inputDate.value.dateCommande;
    let d = new Date(this.datedelaCommande);
    this.dateChoisie = d;
    let dateFormatte: Date;
    let dcommande = +new Date(d); // le + transforme en number millisecondes
    let datedujour = +new Date();
    let diffdate = Math.round((datedujour - dcommande) / (60 * 60 * 24 * 1000));

    if (diffdate > 14) {
      this.simpleAlert("Vous faites votre demande trop tard, changez de date!");
      return;
    } else {
      this.submitted1sem = true;
    }
    this.dateStringCommande = d.toLocaleDateString();

    let dateNameJour = d.getDate();
    // let dateNameMonth=d.toLocaleString('default', { month: 'short' });
    //let dateNameMonth=d.toLocaleString('en-US', { month: 'short' });

    let dateNameMonth = d.toLocaleString("default", { month: "long" });
    let dateNameYear = d.getFullYear();
    this.fullNameDate = dateNameJour + "_" + dateNameMonth + "_" + dateNameYear;

    let eaigue = "é";
    let ucirconflexe = "û";
    let str = this.fullNameDate;
    this.fullNameDate = str.replace(eaigue, "e");
    str = this.fullNameDate;
    this.fullNameDate = str.replace(ucirconflexe, "u");

    this.jourdelaCommande = this.getDayName();
    this.dateLundi = d;

    this.dateLundiString = this.dateLundi.toLocaleDateString();
    this.dateMardi = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    this.dateMardiString = this.dateMardi.toLocaleDateString();
    this.dateMercredi = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate() + 2
    );
    this.dateMercrediString = this.dateMercredi.toLocaleDateString();
    this.dateJeudi = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3);
    this.dateJeudiString = this.dateJeudi.toLocaleDateString();
    this.dateVendredi = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate() + 4
    );
    this.dateVendrediString = this.dateVendredi.toLocaleDateString();
    this.dateSamedi = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 5);
    this.dateSamediString = this.dateSamedi.toLocaleDateString();
    this.dateDimanche = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate() + 6
    );
    this.dateDimancheString = this.dateDimanche.toLocaleDateString();

    if (this.jourdelaCommande === "lundi") {
    } else {
      this.simpleAlert("Recommencez, vous devez choisir un lundi");
    }
    this.totalCommande.set(0);
    //ajout 3 oct 2024 pour mettre a ) produits si INVENDUS ==true

    if (this.invendusActif === true) {

      this.obtenirListeProduitZero()
    }
  }
  onSubmitDateCommande1jour() {
    console.log("au début de onSubmitDateCommande1jour()")
    this.choixUnJour.update(v=>true)

    this.parseZero()

    this.datedelaCommande = this.inputDate1jour.value.dateCommande;
    let d = new Date(this.datedelaCommande);
    let dcommande = +new Date(d); // le + transforme en number millisecondes
    let datedujour = +new Date();
    let diffdate = (dcommande - datedujour) / (60000 * 60 * 24);

    this.dateStringCommande = d.toLocaleDateString();
    this.jourdelaCommande = this.getDayName();

    switch (this.jourdelaCommande) {
      case "lundi": {
        this.colHeureRupture1jour = "input0_lundi"
        break
      }
      case "mardi": {
        this.colHeureRupture1jour = "input0_mardi"
        break
      }
      case "mercredi": {
        this.colHeureRupture1jour = "input0_mercredi"
        break
      }
      case "jeudi": {
        this.colHeureRupture1jour = "input0_jeudi"
        break
      }
      case "vendredi": {
        this.colHeureRupture1jour = "input0_vendredi"
        break
      }
      case "samedi": {
        this.colHeureRupture1jour = "input0_samedi"
        break
      }
      case "dimanche": {
        this.colHeureRupture1jour = "input0_dimanche"
        break
      }
    }


  }
  onSubmitAncienneCommande() {
    this.datedelaCommande = this.inputDate1jour.value.dateCommande;
    let d = new Date(this.datedelaCommande);
    let dcommande = +new Date(d); // le + transforme en number millisecondes
    let datedujour = +new Date();
    let diffdate = (dcommande - datedujour) / (60000 * 60 * 24);

    this.dateStringCommande = d.toLocaleDateString();
    this.jourdelaCommande = this.getDayName();

    if (diffdate < 1.2) {
      this.simpleAlert(
        "Un pré-avis de 48h est nécessaire. Veuillez changez de date!"
      );
      this.submitted1sem = false;
      this.datedelaCommande = null;
      this.router.navigate(["cedule"]);
      return;
    }
  }
  onSubmitResetZero() {
    this.datedelaCommande = this.inputDate1jour.value.dateCommande;
    let d = new Date(this.datedelaCommande);
    let dcommande = +new Date(d); // le + transforme en number millisecondes
    let datedujour = +new Date();
    let diffdate = (dcommande - datedujour) / (60000 * 60 * 24);

    this.dateStringCommande = d.toLocaleDateString();
    this.jourdelaCommande = this.getDayName();

    if (diffdate < 1.2) {
      this.simpleAlert(
        "Un pré-avis de 48h est nécessaire. Veuillez changez de date!"
      );
      this.submitted1sem = false;
      this.datedelaCommande = null;
      this.router.navigate(["cedule"]);
      return;
    }
  }
  simpleAlert(textAlert: string) {
    Swal.fire({
      icon: "error",
      title: "Oups...",
      text: textAlert,
      toast: true,
      timer: 1500,
    });
  }

  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: "success",
      title: "Parfait...",
      text: textAlert,
      timer: 3500,
      toast: true,
    });
  }
  simpleAlertAccept(textAlert: string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: textAlert,
    });
  }
  //https://stackoverflow.com/questions/45660868/cant-reach-results-of-papa-parse-outside-the-complete-function
  parseCsv(): Observable<ParseResult<Produit[]>> {
    return new Observable((observable) => {
      this.papa.parse(this.listeCsvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: "greedy",
        worker: true,
        download: true,
        complete: (results) => {
          observable.next(results);
          observable.complete();
          this.loading = false;
        },
      });
    });
  }
  parseCsvOLD(): Observable<ParseResult<Produit[]>> {
    return new Observable((observable) => {
      this.papa.parse(this.listeCsvData, {
        header: false, //remplace les nom d item object par chiffre
        dynamicTyping: true,
        skipEmptyLines: "greedy",
        worker: true,
        download: true,
        complete: (results) => {
          observable.next(results);

          this.dataListeProdSignal.update((v) => this.dataSourceListePrix);

          let myArray = [];
          for (let i = 0; i < this.membersLength; i++) {
            //https://www.geeksforgeeks.org/convert-an-array-to-an-object-in-javascript/

            let myObject = this.dataListeProdSignal()[i];
            let obj = Object.assign({}, myObject);

            myArray.push(obj);
          }

          // on assigne à this.dataListeProdSignal(), les valeurs de myArray
          this.dataListeProdSignal.update((v) => myArray);

          const control = this.commandeForm.get("Rows") as FormArray;
          for (let i = 1; i < this.membersLength; i++) {
            //  control.push(this.initiateForm(this.dataSourceListePrix[i]));
            control.push(this.initiateFormOLD(this.dataListeProdSignal()[i]));
            // control.push(this.resetInputZero(this.dataListeProdSignal()[i]));
          }
          //   this.addHiddenOldCommande()
          observable.complete();
        },
      });
    });
  }
  parseCsvOldCommande(): Observable<ParseResult<Produit[]>> {
    return new Observable((observable) => {
      this.options = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: "greedy",
        worker: true,
        download: true,
        complete: (results) => {
          observable.next(results);
          this.commandeForm = this.formBuilder.group({
            Rows: this.formBuilder.array([]),
          });
          for (let i = 0; i < this.membersLength; i++) {
            this.Rows.push(
              this.formBuilder.group({
                ID: [this.dataSourceListePrix[i].ID],
                variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
                prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
                prix_vente_variete_r: [
                  "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
                ],
                categorie_a: [this.dataSourceListePrix[i].categorie_a],
                input0_lundi: [
                  Number(this.dataSourceListePrix[i].input0_lundi),
                  Validators.pattern(this.unInputPattern),
                ],
                input0_mardi: [
                  Number(this.dataSourceListePrix[i].input0_mardi),
                  Validators.pattern(this.unInputPattern),
                ],
                input0_mercredi: [
                  this.dataSourceListePrix[i].input0_mercredi,
                  Validators.pattern(this.unInputPattern),
                ],
                input0_jeudi: [
                  this.dataSourceListePrix[i].input0_jeudi,
                  Validators.pattern(this.unInputPattern),
                ],
                input0_vendredi: [
                  this.dataSourceListePrix[i].input0_vendredi,
                  Validators.pattern(this.unInputPattern),
                ],
                input0_samedi: [
                  this.dataSourceListePrix[i].input0_samedi,
                  Validators.pattern(this.unInputPattern),
                ],
                input0_dimanche: [
                  this.dataSourceListePrix[i].input0_dimanche,
                  Validators.pattern(this.unInputPattern),
                ],
                produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
                produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
                produit_mercredi_b: [
                  this.dataSourceListePrix[i].produit_mercredi_b,
                ],
                produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
                produit_vendredi_b: [
                  this.dataSourceListePrix[i].produit_vendredi_b,
                ],
                produit_samedi_b: [
                  this.dataSourceListePrix[i].produit_samedi_b,
                ],
                produit_dimanche_b: [
                  this.dataSourceListePrix[1].produit_dimanche_b,
                ],
                totalProduit: [0],
              })
            );
          }
          observable.complete();
        },
      };
      this.papa.parse(this.csvData, this.options);
    });
  }
  parseRemettreZeroObs(): Observable<Produit[]> {
    console.log("on entre dans parseRemettreZeroObs");
    this.parseZero();
       this.triParCategoriesDown()
   console.log(JSON.stringify(this.dataListeProdSignal()))

    return new Observable((observable) => {
      complete: (results) => {
        observable.next(results);
        this.commandeForm = this.formBuilder.group({
          Rows: this.formBuilder.array([]),
        });
        for (let i = 0; i < this.membersLength; i++) {
          this.Rows.push(
            this.formBuilder.group({
              ID: [this.dataSourceListePrix[i].ID],
              variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],

              input0_lundi: [
                Number(this.dataSourceListePrix[i].input0_lundi),
                Validators.pattern(this.unInputPattern),
              ],
              input0_mardi: [
                Number(this.dataSourceListePrix[i].input0_mardi),
                Validators.pattern(this.unInputPattern),
              ],
              input0_mercredi: [
                this.dataSourceListePrix[i].input0_mercredi,
                Validators.pattern(this.unInputPattern),
              ],
              input0_jeudi: [
                this.dataSourceListePrix[i].input0_jeudi,
                Validators.pattern(this.unInputPattern),
              ],
              input0_vendredi: [
                this.dataSourceListePrix[i].input0_vendredi,
                Validators.pattern(this.unInputPattern),
              ],
              input0_samedi: [
                this.dataSourceListePrix[i].input0_samedi,
                Validators.pattern(this.unInputPattern),
              ],
              input0_dimanche: [
                this.dataSourceListePrix[i].input0_dimanche,
                Validators.pattern(this.unInputPattern),
              ],
            })
          );
        }
        observable.complete();
      };
    });
  }

  parseZero() {
    this.dataSourceListePrix = this.dataListeProdSignal();
    this.totalCommande.update((v) => 0);
    this.membersLength = this.dataListeProdSignal().length;

    for (let i = 0; i < this.membersLength; i++) {
      this.dataSourceListePrix[i].input0_lundi = 0;
      this.dataSourceListePrix[i].input0_mardi = 0;
      this.dataSourceListePrix[i].input0_mercredi = 0;
      this.dataSourceListePrix[i].input0_jeudi = 0;
      this.dataSourceListePrix[i].input0_vendredi = 0;
      this.dataSourceListePrix[i].input0_samedi = 0;
      this.dataSourceListePrix[i].input0_dimanche = 0;
    }

    this.dataListeProdSignal.update((v) => this.dataSourceListePrix);
   this.triParCategoriesDown()
     
    this.membersLength = this.dataSourceListePrix.length;

    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    const control = this.commandeForm.get("Rows") as FormArray;

    // for (let i = 1; i < this.membersLength; i++) {
    for (let i = 0; i < this.membersLength; i++) {
      control.push(this.initiateForm(this.dataSourceListePrix[i]));
    }
      

  }

  public obtenirListeProduit() {
    console.log("debut obtenirListeProduit");
             
    this.totalCommande.set(0);
    this.loading = true;

    this.subscription = this.parseCsv().subscribe((p) => {
      this.dataSourceListePrix = p.data;
      this.dataSourceInitiale = p.data;
      this.dataListeProdSignal.set(p.data);

this.triParCategoriesDown()

      // Méthode 2 : forEach()
      this.dataListeProdSignal().forEach(item => {
        item.codeClient = this.extract.boulanger.idclient;
        item.invendus = false;
        item.dateLundi = this.dateLundiString
        item.heureRupture = 0;
      });

      console.log("dans ngoninit ");

      this.membersLength = this.dataListeProdSignal().length;

      const control = this.commandeForm.get("Rows") as FormArray;
      for (let i = 0; i < this.membersLength + 1; i++) {
        //  control.push(this.initiateForm(this.dataSourceListePrix[i]));
        control.push(this.initiateForm(this.dataListeProdSignal()[i]));
      }
            this.triParCategoriesDown()

    });
    
  }
  public obtenirListeProduitOldCommande() {


    // ajout parseCSVOLD

    this.subscriptionOld = this.parseCsvOLD().subscribe((p) => {
      this.dataSourceListePrix = p.data;
      this.dataListeProdSignal.set(p.data);
      this.membersLength = this.dataListeProdSignal().length;
    });

    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    this.dataListeProdSignal.update((v) => this.dataSourceListePrix);

    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({
          ID: [this.dataSourceListePrix[i].ID],
          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
          prix_vente_variete_r: [
            "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
          ],
          categorie_a: [this.dataSourceListePrix[i].categorie_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mardi: [
            Number(this.dataSourceListePrix[i].input0_mardi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mercredi: [
            this.dataSourceListePrix[i].input0_mercredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_jeudi: [
            this.dataSourceListePrix[i].input0_jeudi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_vendredi: [
            this.dataSourceListePrix[i].input0_vendredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_samedi: [
            this.dataSourceListePrix[i].input0_samedi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_dimanche: [
            this.dataSourceListePrix[i].input0_dimanche,
            Validators.pattern(this.unInputPattern),
          ],
          produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
          produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
          produit_mercredi_b: [this.dataSourceListePrix[i].produit_mercredi_b],
          produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
          produit_vendredi_b: [this.dataSourceListePrix[i].produit_vendredi_b],
          produit_samedi_b: [this.dataSourceListePrix[i].produit_samedi_b],
          produit_dimanche_b: [this.dataSourceListePrix[1].produit_dimanche_b],
          totalProduit: [0],
        })
      );
    }

  }
  public obtenirListeProduitZero() {
    console.log("on entre dans obtenirListeProduitZero");


    this.parseRemettreZeroObs().subscribe((p) => {
      console.log("dans this.parseRemettreZeroObs le p =");

      this.membersLength = this.dataListeProdSignal().length;
                   this.triParCategoriesDown()
   console.log(JSON.stringify(this.dataSourceListePrix))

      return this.dataListeProdSignal();
    });

    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    this.dataListeProdSignal.update((v) => this.dataSourceListePrix);

    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({
          ID: [this.dataSourceListePrix[i].ID],
          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
          prix_vente_variete_r: [
            "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
          ],
          categorie_a: [this.dataSourceListePrix[i].categorie_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mardi: [
            Number(this.dataSourceListePrix[i].input0_mardi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mercredi: [
            this.dataSourceListePrix[i].input0_mercredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_jeudi: [
            this.dataSourceListePrix[i].input0_jeudi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_vendredi: [
            this.dataSourceListePrix[i].input0_vendredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_samedi: [
            this.dataSourceListePrix[i].input0_samedi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_dimanche: [
            this.dataSourceListePrix[i].input0_dimanche,
            Validators.pattern(this.unInputPattern),
          ],
          produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
          produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
          produit_mercredi_b: [this.dataSourceListePrix[i].produit_mercredi_b],
          produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
          produit_vendredi_b: [this.dataSourceListePrix[i].produit_vendredi_b],
          produit_samedi_b: [this.dataSourceListePrix[i].produit_samedi_b],
          produit_dimanche_b: [this.dataSourceListePrix[i].produit_dimanche_b],
          totalProduit: [0],
        })
      );
        this.triParCategoriesDown()
    }
    this.total = 0;
    this.totalCommande.update((value) => 0);
  }
  commandeClientIndividuel() {
    console.log("dans client individuel")
    this.totalCommande.set(0);

    // ajout parseCSVOLD

    this.parseRemettreZeroObs().subscribe((p) => {
      console.log("dans this.parseRemettreZeroObs le p =");

      this.membersLength = this.dataListeProdSignal().length;
      return this.dataListeProdSignal();
    });

    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    this.dataListeProdSignal.update((v) => this.dataSourceListePrix);

    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({
          ID: [this.dataSourceListePrix[i].ID],
          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
          prix_vente_variete_r: [
            "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
          ],
          categorie_a: [this.dataSourceListePrix[i].categorie_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mardi: [
            Number(this.dataSourceListePrix[i].input0_mardi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mercredi: [
            this.dataSourceListePrix[i].input0_mercredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_jeudi: [
            this.dataSourceListePrix[i].input0_jeudi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_vendredi: [
            this.dataSourceListePrix[i].input0_vendredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_samedi: [
            this.dataSourceListePrix[i].input0_samedi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_dimanche: [
            this.dataSourceListePrix[i].input0_dimanche,
            Validators.pattern(this.unInputPattern),
          ],
          produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
          produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
          produit_mercredi_b: [this.dataSourceListePrix[i].produit_mercredi_b],
          produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
          produit_vendredi_b: [this.dataSourceListePrix[i].produit_vendredi_b],
          produit_samedi_b: [this.dataSourceListePrix[i].produit_samedi_b],
          produit_dimanche_b: [this.dataSourceListePrix[1].produit_dimanche_b],
          totalProduit: [0],
        })
      );
    }
    this.total = 0;
    this.totalCommande.update((value) => 0);
  }

  public initiateForm(dataHttp: Produit): FormGroup {
    let i: number = 0;
    this.dataHttp = dataHttp;

    this.totalCommande.update((v) => v + Number(dataHttp[2]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[3]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[4]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[5]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[6]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[7]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[8]) * this.prixEsc);


    return this.formBuilder.group({

      variete_poids_a: [dataHttp.variete_poids_a],
      input0_lundi: [Number(0)],
      heureRupture: [],
    });
  }
  public initiateFormOLD(dataHttp: Produit): FormGroup {
    console.log("on est dans initiateFormOLD");

    this.dataSourceListePrix = this.dataListeProdSignal();
    this.dataHttp = dataHttp;

    this.prixEscString = dataHttp[11];

    if (typeof this.prixEscString === "string") {
      this.prixEsc = Number(this.prixEscString.replace(",", "."));
    } else {
      this.prixEsc = dataHttp[11];
    }

    this.totalCommande.update((v) => v + Number(dataHttp[2]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[3]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[4]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[5]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[6]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[7]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[8]) * this.prixEsc);

    return this.formBuilder.group({
      ID: [dataHttp[0]],
      variete_poids_a: [dataHttp[1]],
      input0_lundi: [dataHttp[2]],
      input0_mardi: [dataHttp[3]],
      input0_mercredi: [dataHttp[4]],
      input0_jeudi: [dataHttp[5]],
      input0_vendredi: [dataHttp[6]],
      input0_samedi: [dataHttp[7]],
      input0_dimanche: [dataHttp[8]],
      categorie_a: [dataHttp[9]],
      prixEscompte: ["$ " + dataHttp[11]],
      prix_vente_variete_r: ["$ " + dataHttp[10]],
      totalProduit: [0],
      produit_lundi_b: [dataHttp[12]],
      produit_mardi_b: [dataHttp[13]],
      produit_mercredi_b: [dataHttp[14]],
      produit_jeudi_b: [dataHttp[15]],
      produit_vendredi_b: [dataHttp[16]],
      produit_samedi_b: [dataHttp[17]],
      produit_dimanche_b: [dataHttp[18]],
    });
  }
  public initiateFormZero(dataHttp: Produit): FormGroup {
    console.log("on est dans initiateFormOLD");

    //this.dataSourceListePrix = this.dataListeProdSignal();
    this.dataHttp = dataHttp;

    this.prixEscString = dataHttp[11];

    if (typeof this.prixEscString === "string") {
      this.prixEsc = Number(this.prixEscString.replace(",", "."));
    } else {
      this.prixEsc = dataHttp[11];
    }

    this.totalCommande.update((v) => v + Number(dataHttp[2]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[3]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[4]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[5]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[6]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[7]) * this.prixEsc);
    this.totalCommande.update((v) => v + Number(dataHttp[8]) * this.prixEsc);

    return this.formBuilder.group({
      ID: [dataHttp[0]],
      variete_poids_a: [dataHttp[1]],
      input0_lundi: [dataHttp[2]],
      input0_mardi: [dataHttp[3]],
      input0_mercredi: [dataHttp[4]],
      input0_jeudi: [dataHttp[5]],
      input0_vendredi: [dataHttp[6]],
      input0_samedi: [dataHttp[7]],
      input0_dimanche: [dataHttp[8]],
      categorie_a: [dataHttp[9]],
      prixEscompte: ["$ " + dataHttp[11]],
      prix_vente_variete_r: ["$ " + dataHttp[10]],
      totalProduit: [0],
      produit_lundi_b: [dataHttp[12]],
      produit_mardi_b: [dataHttp[13]],
      produit_mercredi_b: [dataHttp[14]],
      produit_jeudi_b: [dataHttp[15]],
      produit_vendredi_b: [dataHttp[16]],
      produit_samedi_b: [dataHttp[17]],
      produit_dimanche_b: [dataHttp[18]],
    });
  }

  public resetInputZero(dataHttp: Produit): FormGroup {
    console.log("on est dans resetInputZero");

    this.dataSourceListePrix = this.dataListeProdSignal();
    this.dataHttp = dataHttp;

    this.prixEscString = dataHttp[11];

    if (typeof this.prixEscString === "string") {
      this.prixEsc = Number(this.prixEscString.replace(",", "."));
    } else {
      this.prixEsc = dataHttp[11];
    }

    this.totalCommande.update((v) => 0);

    return this.formBuilder.group({
      ID: [dataHttp[0]],
      variete_poids_a: [dataHttp[1]],
      input0_lundi: [dataHttp[2]],
      input0_mardi: [dataHttp[3]],
      input0_mercredi: [dataHttp[4]],
      input0_jeudi: [dataHttp[5]],
      input0_vendredi: [dataHttp[6]],
      input0_samedi: [dataHttp[7]],
      input0_dimanche: [dataHttp[8]],
      categorie_a: [dataHttp[9]],
      prixEscompte: ["$ " + dataHttp[11]],
      prix_vente_variete_r: ["$ " + dataHttp[10]],
      totalProduit: [0],
      produit_lundi_b: [dataHttp[12]],
      produit_mardi_b: [dataHttp[13]],
      produit_mercredi_b: [dataHttp[14]],
      produit_jeudi_b: [dataHttp[15]],
      produit_vendredi_b: [dataHttp[16]],
      produit_samedi_b: [dataHttp[17]],
      produit_dimanche_b: [dataHttp[18]],
    });
  }

  envoiCourriel() {
    this.envoiMail.envoiCourriel();
  }
  // OnClick of button Upload
  onUpload() {
    this.fileUploadService.uploadAncien(this.file).subscribe((event: any) => {
      if (typeof event === "object") {
        // Short link via api response

        this.simpleAlertConfirm("Sélection du fichier faite");

        //window.open(this.lienURLPhp, '_blank');
        //  window.open(this.lienURLPhp, '_self');
      }
    });
  }
  createFileIO(file: any, nomFile: string): Observable<any> {
    let basebaseUrl = "https://file.io"
    // Create form data
    const formData = new FormData();
    let blob = new Blob([file.csv], {
      type: 'application/octet-stream',
    });

    formData.append('file', blob, nomFile);

    const body = formData;

    // Store form name as "file" with file data
    //formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(basebaseUrl, formData)

  }
  // On file Select old commande
  onChange(event) {
    this.file = event.target.files[0];
    console.log("on entre dans le onChange");
    this.dataSourceListePrix = [];

    this.dataListeProdSignal.update((v) => []);

    //https://alberthaff.dk/projects/ngx-papaparse/docs/v7/parsing-csv
    this.csvData = this.file;
    this.listeCsvData = this.file;

    // this.papa.parse(this.csvData, this.options);
    this.obtenirListeProduitOldCommande(); // permet de créer des controls pour le tableau de commande
  }
  invendus() {

    this.invendusActif = !this.invendusActif;
    this.extract.invendusAdd(this.invendusActif); // on change '' pour INVENDUS

    if (this.invendusActif == true) {
      this.obtenirListeProduitZero()
    }
  }

  envoiMessage(event: Event) {
    this.inputMessage = this.formMessage.controls.inputMessage.value;
    this.simpleAlertConfirm("Ajout du message fait!");
  }

  getPosts() {
    let url =
      "https://my-json-server.typicode.com/JSGund/XHR-Fetch-Request-JavaScript/posts";
    return this.http.get(url);
  }

  sendObjectToPhp() {
    //https://www.telerik.com/blogs/angular-basics-how-to-use-httpclient
    //this.getPosts()
    //https://reqres.in/api/users

    let params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.userPostToPhp),
    };
    fetch("../../../assets/crudmysql/phpObjectReceive.php", params);
    let jsonString = JSON.stringify(this.userPostToPhp);
    let http = new XMLHttpRequest();

    http.open(
      "post",
      "https://www.boulangerieqc.com/assets/crudmysql/phpObjectReceive.php",
      true
    );
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    http.send(jsonString);
  }
  onKey($event) {
    console.log("tab key touched");
  }
  focusMyInput($event, i: number, idString: string) {

    console.log("on entre dans focusMyInput")
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (!allowedKeys.includes($event.key) && !/^[0-9]$/.test($event.key)) {
      $event.preventDefault();
    }
    let elementJour = <HTMLInputElement>document.getElementById("idRow" + i);
    let elementJourNext = <HTMLInputElement>(
      document.getElementById("idRow" + (i + 1))
    );
    if (this.saisieVerticale == true) {
      elementJour.classList.remove("bg-green-200");
      elementJourNext.classList.add("bg-green-200");
    }
  }
  focusRow(i: number) {
    let elementJour = <HTMLInputElement>document.getElementById("idRow" + i);
    let elementJourBefore = <HTMLInputElement>(
      document.getElementById("idRow" + (i - 1))
    );
    elementJour.classList.add("bg-yellow-200");
    elementJourBefore.classList.remove("bg-yellow-200");

    // elementJour.classList.add('mystyleRed');
  }
  getTabIndex(index: number) {
    let indexTab: number;
    if (this.saisieVerticale == false) {
      indexTab = 0;

      return indexTab;
    } else {
      indexTab = index;

      return indexTab;
    }
  }

  calculTotalOldCommande(dataSource: Produit[]) {
    console.log("on entre dans calculTotalOldCommande");
    this.totalCommande.set(0);
    let noEnr = dataSource.length;

    var totalCompteur: number = 0;
    let ajout: number = 0;

    for (let i = 0; i < noEnr; i++) {
      this.prixEscString = dataSource[i][11];

      if (this.prixEscString != null && this.prixEscString != "prixEscompte") {
        if (typeof this.prixEscString === "string") {
          this.prixEsc = Number(this.prixEscString.replace(",", "."));
        } else {
          this.prixEsc = dataSource[i][11];
        }
        if (parseInt(dataSource[i][2]) && parseFloat(dataSource[i][11])) {
          ajout = parseInt(dataSource[i][2]) * this.prixEsc;
          this.totalCommande.update((v) => v + ajout);
        }
      }
    }
  }
  openImage(url_image: string) {
    if (url_image == null) {
    } else {
      window.open(url_image, "_blank");
    }
  }

  get_objDataToMysql(): any {
    return this.objDataToMysql;
  }
  oldCommandeClick() {
    this.oldCommande = true;
    //la derniere utilisation d'une listePrix.

    this.objDataToMysql = {
      idclient: this.extract.boulanger.idclient,
      dossier: this.extract.boulanger.dossierCommandesWeb,
      nomBoulanger: this.extract.boulanger.nomBoulangerie,
      dateLundi: this.dateLundiString, // ou this.fileUploadService.dateLundiCommandeString
      // dateLundi:this.fileUploadService.
      montant: this.totalCommande(),
      // db_host: this.extract.boulanger.db_host,
      // db_username: this.extract.boulanger.db_username,
      // db_name: this.extract.boulanger.db_name,
      // db_password: this.extract.boulanger.db_password,
    };

    let connectionMysql =
      "db_host=" +
      this.objDataToMysql.db_host +
      "&db_username=" +
      this.objDataToMysql.db_username +
      "&db_name=" +
      this.objDataToMysql.db_name +
      "&db_password=" +
      this.objDataToMysql.db_password +
      "&idclient=" +
      this.objDataToMysql.idclient;

    this.api
      .getSingleClientTimestamp(connectionMysql)
      .subscribe((result: any) => {
        this.unClient = result.data;


        let connectionMysqlObjDossier = {
          dossier: this.extract.boulanger.dossierCommandesWeb,
          db_host: this.extract.boulanger.db_host,
          db_username: this.extract.boulanger.db_username,
          db_name: this.extract.boulanger.db_name,
          db_password: this.extract.boulanger.db_password,
        };

        this.api
          .getMajPrix(connectionMysqlObjDossier)
          .subscribe((result: any) => {
            this.majprixTimestamp = result.data;

            this.datemajPrix = new Date(this.majprixTimestamp.timestamp);

            this.dateDernierMajProduit.set(
              this.datemajPrix.toLocaleDateString()
            );

            let commandeTimestamp = new Date(
              this.unClient.timestampNewCommande
            );
            if (commandeTimestamp < this.datemajPrix) {
              this.simpleAlertAccept(
                "Veuillez utiliser une nouvelle commande, car une mise à jour des produits a eu lieu le " +
                this.majprixTimestamp.timestamp
              );
            } else {
              console.log(
                "Votre dernière ancienne commande est plus récente que la mise à jour..."
              );
            }
          });
      }); //permet de récupérer le client et voir la date de
  }
  resetCommandeZero() {
    console.log("on est dans resetInputZero");

    this.dataSourceListePrix = this.dataListeProdSignal();
    this.totalCommande.update((v) => 0);

    for (let i = 1; i < this.dataSourceListePrix.length - 1; i++) {
      this.dataSourceListePrix[i][2] = 0;
      this.dataSourceListePrix[i][3] = 0;
      this.dataSourceListePrix[i][4] = 0;
      this.dataSourceListePrix[i][5] = 0;
      this.dataSourceListePrix[i][6] = 0;
      this.dataSourceListePrix[i][7] = 0;
      this.dataSourceListePrix[i][8] = 0;
    }

    this.dataListeProdSignal.set(this.dataSourceListePrix);

    this.membersLength = this.dataListeProdSignal().length;

    const control = this.commandeForm.get("Rows") as FormArray;
    for (let i = 0; i < this.membersLength; i++) {
      //  control.push(this.initiateForm(this.dataSourceListePrix[i]));
      control.push(this.resetInputZero(this.dataListeProdSignal()[i]));
    }
  }
  sendToMysql() {
    //creer la fiche Mysql de commandeWeb
    /*
$db_host = $_GET["db_host"];
$db_username = $_GET["db_username"];
$db_name = $_GET["db_name"];
$db_password = $_GET["db_password"];
*/
    let lienURLFromFileLoad = this.file;

    let parametrePhpToMysql1 =
      "idclient=" +
      this.objDataToMysql.idclient +
      "&dossier=" +
      this.objDataToMysql.dossier +
      "&dateLundi=" +
      this.objDataToMysql.dateLundi;
    let parametrePhpToMysql2 =
      "&dateEnvoi=" +
      this.objDataToMysql.dateEnvoi +
      "&heureEnvoi=" +
      this.objDataToMysql.heureEnvoi;

    let parametrePhpToMysql3 =
      "&lienURL=" +
      this.objDataToMysql.lienURL +
      "&montant=" +
      this.objDataToMysql.montant;

    let connectionMysql =
      "&db_host=" +
      this.objDataToMysql.db_host +
      "&db_username=" +
      this.objDataToMysql.db_username +
      "&db_name=" +
      this.objDataToMysql.db_name +
      "&db_password=" +
      this.objDataToMysql.db_password;

    let objDataToMysqlString =
      parametrePhpToMysql1 +
      parametrePhpToMysql2 +
      parametrePhpToMysql3 +
      connectionMysql;

    this.fileUploadVersMysql
      .uploadCSVToMysql(objDataToMysqlString)
      .subscribe((event: any) => { });
  }
  transfertCommNoelMysql(dataliste: any) { }
  public obtenirListeProduitResetToZero() {


    // ajout parseCSVOLD

    this.parseRemettreZeroObs().subscribe((p) => {
      this.parseZero;
      console.log("on entre dans parseRemettreZeroObs");
   this.triParCategoriesDown()
   console.log(JSON.stringify(this.dataListeProdSignal()))

      this.membersLength = this.dataListeProdSignal().length;
    });
  }
  onFileSelected(fileFromCSV: any, filename: string) {
    //https://stackoverflow.com/questions/19617996/file-upload-without-form
    const file: any = fileFromCSV;

    this.fileName = filename;


    this.fileUpLoadCommandeService
      .uploadfileTest(file.csv, filename)
      .subscribe((response) => {
        if (response instanceof HttpResponse) {
          this.msg = response.body;

        }
      });
  }

  //https://github.com/maneeshaindrachapa/Hall-Management-System/blob/master/angular/src/app/services/login.service.ts
  // updateDetails(indexNo,firstname,lastname,password){
  //   return this.http.post("http://localhost/update.php",{"indexno":indexNo,"firstname":firstname,"lastname":lastname,"password":password}).map(res=>res.json());
  // }

  envoiEmail() {
    // this.shortLink = event.link;

    //test 2024-11-11 créeation this.shortLink file.io
    this.createFileIO(this.csvFormatteNoDownload, this.linkFileIOName).subscribe((response) => {

      this.shortLink = response.link
      this.loading = false; // Flag variable
      let varTo = this.extract.boulanger.emailEnvoiAuBoulanger;
      let varFrom = this.extract.boulanger.emailClient;
      let $boulangerie = this.extract.boulanger.dossierCommandesWeb;
      let varNom = this.extract.boulanger.nom;
      let varUrl = this.shortLink;

      let varDate = this.dateLundiString;
      let nomBoulangerie = this.extract.boulanger.nomBoulangerie;

      let varInvendus = this.invendusActif;
      let invendus = this.extract.getInvendus(); // par défaut '' sinon INVENDUS

      let liencommandeFTP =
        "https://www.boulangerieqc.com/clients/" +
        $boulangerie +
        "/commandesWeb/" +
        this.nomFileToMail +
        ".csv";

      let messageEmail =
        "<strong>" +
        "Veuillez lire ce message: " +
        this.inputMessage +
        '</strong><br> <br> Ce document est archivé sur votre espace web dans le menu "Utilisez commandes Web": ' +
        liencommandeFTP +
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
        messageEmail +
        "&nomBoulangerie=" +
        nomBoulangerie;
      let lienURLPhp =
        "https://www.boulangerieqc.com/assets/crudmysql/mail.php" + ajout;

      this.envoiMail
        .envoiMailCommandeMailObjString(
          "https://www.boulangerieqc.com/assets/crudmysql/mailObjString.php" +
          ajout
        )
        .subscribe();

    })

  }
  tabletteAdd() {
    this.extract.tabletteAdd(!this.tabletteOK);
    this.tabletteOK = this.extract.getTabletteOK();

  }
  triParCategoriesUp() {
    let dataTriparCategorie = signal(this.dataListeProdSignal().sort((a, b) => a.categorie_a.localeCompare(b.categorie_a)));
    this.dataListeProdSignal.set(dataTriparCategorie())
    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({
          ID: [this.dataSourceListePrix[i].ID],
          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
          prix_vente_variete_r: [
            "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
          ],
          categorie_a: [this.dataSourceListePrix[i].categorie_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mardi: [
            Number(this.dataSourceListePrix[i].input0_mardi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mercredi: [
            this.dataSourceListePrix[i].input0_mercredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_jeudi: [
            this.dataSourceListePrix[i].input0_jeudi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_vendredi: [
            this.dataSourceListePrix[i].input0_vendredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_samedi: [
            this.dataSourceListePrix[i].input0_samedi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_dimanche: [
            this.dataSourceListePrix[i].input0_dimanche,
            Validators.pattern(this.unInputPattern),
          ],
          produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
          produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
          produit_mercredi_b: [this.dataSourceListePrix[i].produit_mercredi_b],
          produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
          produit_vendredi_b: [this.dataSourceListePrix[i].produit_vendredi_b],
          produit_samedi_b: [this.dataSourceListePrix[i].produit_samedi_b],
          produit_dimanche_b: [this.dataSourceListePrix[1].produit_dimanche_b],
          totalProduit: [0],
        })
      );
    }

  }
  triParCategoriesDown() {
   // let dataTriparCategorie = signal(this.dataListeProdSignal().sort((a, b) => b.categorie_a.localeCompare(a.categorie_a)));

   
     let dataTriparCategorie = signal(
      this.dataListeProdSignal().sort((a, b) => {
        // Tri par catégorie (A → Z)
        const catCompare = a.categorie_a.localeCompare(b.categorie_a);
        if (catCompare !== 0) return catCompare;

        // Si même catégorie, tri par variété/poids (A → Z)
        return a.variete_poids_a.localeCompare(b.variete_poids_a);
      })
    );
   
      // Mise à jour du signal
    this.dataListeProdSignal.set(dataTriparCategorie());

    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({
          ID: [this.dataSourceListePrix[i].ID],
          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
          prix_vente_variete_r: [
            "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
          ],
          categorie_a: [this.dataSourceListePrix[i].categorie_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mardi: [
            Number(this.dataSourceListePrix[i].input0_mardi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mercredi: [
            this.dataSourceListePrix[i].input0_mercredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_jeudi: [
            this.dataSourceListePrix[i].input0_jeudi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_vendredi: [
            this.dataSourceListePrix[i].input0_vendredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_samedi: [
            this.dataSourceListePrix[i].input0_samedi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_dimanche: [
            this.dataSourceListePrix[i].input0_dimanche,
            Validators.pattern(this.unInputPattern),
          ],
          produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
          produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
          produit_mercredi_b: [this.dataSourceListePrix[i].produit_mercredi_b],
          produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
          produit_vendredi_b: [this.dataSourceListePrix[i].produit_vendredi_b],
          produit_samedi_b: [this.dataSourceListePrix[i].produit_samedi_b],
          produit_dimanche_b: [this.dataSourceListePrix[1].produit_dimanche_b],
          totalProduit: [0],
        })
      );
    }

  }
  triParNomUp() {
    let dataTriparNom = signal(this.dataListeProdSignal().sort((a, b) => a.variete_poids_a.localeCompare(b.variete_poids_a)));
    this.dataListeProdSignal.set(dataTriparNom())
    this.commandeForm = this.formBuilder.group({
      Rows: this.formBuilder.array([]),
    });
    for (let i = 0; i < this.membersLength; i++) {
      this.Rows.push(
        this.formBuilder.group({
          ID: [this.dataSourceListePrix[i].ID],
          variete_poids_a: [this.dataSourceListePrix[i].variete_poids_a],
          prixEscompte: ["$ " + this.dataSourceListePrix[i].prixEscompte],
          prix_vente_variete_r: [
            "$ " + this.dataSourceListePrix[i].prix_vente_variete_r,
          ],
          categorie_a: [this.dataSourceListePrix[i].categorie_a],
          input0_lundi: [
            Number(this.dataSourceListePrix[i].input0_lundi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mardi: [
            Number(this.dataSourceListePrix[i].input0_mardi),
            Validators.pattern(this.unInputPattern),
          ],
          input0_mercredi: [
            this.dataSourceListePrix[i].input0_mercredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_jeudi: [
            this.dataSourceListePrix[i].input0_jeudi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_vendredi: [
            this.dataSourceListePrix[i].input0_vendredi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_samedi: [
            this.dataSourceListePrix[i].input0_samedi,
            Validators.pattern(this.unInputPattern),
          ],
          input0_dimanche: [
            this.dataSourceListePrix[i].input0_dimanche,
            Validators.pattern(this.unInputPattern),
          ],
          produit_lundi_b: [this.dataSourceListePrix[i].produit_lundi_b],
          produit_mardi_b: [this.dataSourceListePrix[i].produit_mardi_b],
          produit_mercredi_b: [this.dataSourceListePrix[i].produit_mercredi_b],
          produit_jeudi_b: [this.dataSourceListePrix[i].produit_jeudi_b],
          produit_vendredi_b: [this.dataSourceListePrix[i].produit_vendredi_b],
          produit_samedi_b: [this.dataSourceListePrix[i].produit_samedi_b],
          produit_dimanche_b: [this.dataSourceListePrix[1].produit_dimanche_b],
          totalProduit: [0],
        })
      );
    }

  }
  validateInput(event: KeyboardEvent) {

    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];

    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
  envoiHeure(index: number, id: string, qteEvent: Event, noChamp: number) { // $id est le id du produit dans dataSourceListePrix

  }
  Recommencer(){
      this.router.navigate(["cedule"]);
  }
  testHeure(index:number){
    console.log("on clique dans le input Heure")
    console.log("le id sera="+"heureRupture"+index)
    let hrRupture = parseInt(this.commandeForm.getRawValue().Rows[index].heureRupture.split(':')[0]); // Résultat : 12

  }
  // Add this method to handle timepicker selection
onTimeSelected(event: any,index:number) {
  this.currentTimePickerIndex =index

  console.log("on entre dans onTImeSelected")


  if (this.currentTimePickerIndex >= 0) {
  console.log  ("on entre dans le if si this.currentTimePickerIndex>=0")
    const formArray = this.commandeForm.get('Rows') as FormArray;
    const rowFormGroup = formArray.at(this.currentTimePickerIndex) as FormGroup;
    
    // Update the form control with the selected time
    rowFormGroup.get('heureRupture').setValue(event);

    let elementJour = <HTMLInputElement>document.getElementById("idRow" + this.currentTimePickerIndex);
    elementJour.classList.add("bg-green-200");

    let hrRupture = parseInt(this.commandeForm.getRawValue().Rows[this.currentTimePickerIndex].heureRupture.split(':')[0]); // Résultat : 12
    //let hrRupture =this.commandeForm.getRawValue().Rows[this.currentTimePickerIndex].heureRupture
    


    this.dataSourceListePrix[this.currentTimePickerIndex].heureRupture = hrRupture
   // this.dataSourceListePrix[this.currentTimePickerIndex][this.colHeureRupture1jour] = 1
   // this.dataSourceListePrix[this.currentTimePickerIndex][25] = 1

    
    // If you need to trigger any other behavior after selection
    this.envoiInput(this.currentTimePickerIndex)
    
    // Reset the index
    this.currentTimePickerIndex = -1;
  }
}
}