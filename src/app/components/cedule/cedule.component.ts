import {
  Component,
  OnInit,
  Inject,
  Input,
  signal,
  inject,
  OnChanges,
  SimpleChanges,
  effect,
} from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { CommonModule, DOCUMENT } from "@angular/common";
import { Boulanger } from "src/app/identificationBoul";
import { Router } from "@angular/router";
import { RouterModule, Routes } from "@angular/router";
import Swal from "sweetalert2";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { BoulangerBoss } from "src/app/models/boulagerBoss";
import { MessageAfficheComponent } from "../../components/message-affiche/message-affiche.component";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { SafePipe } from "safe-pipe";
import { VoirRecettesComponent } from "../voir-recettes/voir-recettes.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
// import { VoirRecettesDragComponent } from "../../voir-recettes-drag/voir-recettes-drag.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from "src/app/api.service";
import { Text } from "@angular/compiler";
import { tap } from "rxjs";
import { PdfValidatorService } from "src/app/services/pdf-validator.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: "app-cedule",
  standalone: true,
  imports: [
    MessageAfficheComponent,
    CommonModule,
    MatRadioModule,
    FormsModule,
    RouterModule,
    SafePipe,
    VoirRecettesComponent, MatMenuModule, MatButtonModule,

],
  templateUrl: "./cedule.component.html",
  styleUrl: "./cedule.component.scss",
})
export class CeduleComponent implements OnInit {

  http = inject(HttpClient)
  extract = inject(ExtractLienFTPService);
  pdfValidatorService=inject(PdfValidatorService)
  sanitizer=inject(DomSanitizer) 

  dossier: string = "ProductionQuotidienne";
  lienURL: string = "";
  lienURLFacturation: string = "";

  logoSignal = signal("../../../assets/logo/logoBoulangerieQc.png");
  messageImport = signal<string>("");
  lienRecettes = signal<string>("");

  //nom!:string
  url?: string;
  redirectURL?: string;
  //userURLSiteFTP!:string
  // logoBoulangerie!:string
  //
  role = signal("client");
  //emailEnvoiAuBoulanger!:string
  //identifiant!:string
  boulanger!: Boulanger;
  accesRole: number = 2;
  private storageKey = "user-background";
  private defaultColor = "#bedac9";

  private storageKeyConsent = "consentement";
  private consent: string = "false";

  userConsent = null;
  madate: Date = new Date();

  //datedujour: string=new Date().toLocaleDateString('fr-ca');
  datedujour = signal(new Date().toLocaleDateString("fr-ca"));
  value: number;
  isAuth = signal<boolean>(false);
  isOpen = signal<boolean>(undefined);
  lienListeRecette = signal<string>(undefined);
  tabletteOK: boolean = false;
  proprio = signal<boolean>(false);
  ipserveurFunio: string = environment.ipServeurFunio
  serveur: string = environment.serveur
  serveurFTP: string = environment.serveurFTP
  clientIndividuel = this.extract.formClientIndividuel
  api = inject(ApiService)
  phoneNumber: string = ""
  messageSMS: string = ""
  outilGestion = signal<boolean>(false)
  projetSherbrooke = signal<boolean>(false)
  clientDataByEmail: any;
  dossierCommandesWeb: any;
  showError = false;
  pdfUrl: string;
  loading = false;
  roleLogin:string=""

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    public extractLienFTPService: ExtractLienFTPService,
    private router: Router
  ) {
    this.boulanger = new Boulanger();
    // let madate:Date=new Date()


this.madate.setDate(this.madate.getDate() + 1);
    this.datedujour.set(this.madate.toLocaleDateString("fr-ca"));
    this.extract.setDateProduction(this.datedujour());
    this.extract.setmaDateProduction(this.madate);

    this.isAuth.set(this.extract.getisAuth());
    this.isOpen.set(this.extract.getisOpenCedule());
    this.tabletteOK = this.extract.getTabletteOK();

    effect(() => {
      console.log("les signaux sont mis à jour");

    });
  }

  ngOnInit(): void {
    // this.loadConsentPreferences();
    // throw new Error('Method not implemented.');

    this.roleLogin=this.extract.getRoleLogin()

    this.isOpen.set(this.extract.getisOpenCedule());

    this.extract.invendusAdd(false); // on change '' pour INVENDUS
    // this.extract.setClientIndividuel(null) //aucun client individuel n'est sélectionné au début

    this.extract.formClientIndividuel.nom=""
    this.extract.formClientIndividuel.prenom=""
    this.extract.formClientIndividuel.telephone=""
    this.extract.formClientIndividuel.courriel=""
    this.extract.formClientIndividuel.lieu=""

  }

  voirURL(url?: string, invendu?: boolean, valeurRole?: number) {
    this.redirectURL = url;
    if (valeurRole == 1 || valeurRole == 3) {
      this.role.set("boulangerie");
      this.extract.changeisOpenCedule(false);
      this.isOpen.set(false);
    } else {
      this.role.set("client");
    }

    if (invendu == true) {
      this.extractLienFTPService.invendusAdd(invendu); //on s'assure que le mot Invendus sera ajouté au titre de la commande
    }
    this.boulanger=this.extract.getBoulanger()


    this.role.set(this.boulanger.role);
    console.log("this.role ands voirURL="+this.role)
    this.dossierCommandesWeb=this.boulanger.dossierCommandesWeb


    this.extractLienFTPService.boulanger = this.boulanger;

    this.proprio.set(this.boulanger.proprioBoulangerie);
    this.outilGestion.set(this.boulanger.outilsGestion)
    console.log("dans cedule.ts outilGestion="+this.outilGestion())

    if(this.boulanger.projetSherbrooke ==="1")
    {
      this.projetSherbrooke.update(() => true)
    }
    else{
      this.projetSherbrooke.update(() => false)
    }


    if (this.boulanger.role == "livraison") {
      this.madate.setDate(this.madate.getDate() - 1);
      console.log("dans cedule voirURL this.madate livraison=" + this.madate);      // this.datedujour=madate.toLocaleDateString('fr-ca');
      this.datedujour.set(this.madate.toLocaleDateString("fr-ca"));
      this.extract.setDateProduction(this.datedujour());
      this.extract.setmaDateProduction(this.madate);
    }
    this.lienRecettes.set(this.boulanger.userURLSiteFTP);
    this.lienListeRecette.set(
      "https://www.boulangerieqc.com/clients/" +
      this.boulanger.dossierCommandesWeb +
      "/recettesPDF/"
    );

    this.lienURL =
      this.boulanger.userURLSiteFTP +
      "ProductionQuotidienne/" +
      this.datedujour();
    this.lienURLFacturation =
      this.boulanger.userURLSiteFTP +
      "FacturationQuotidienne/" +
      this.datedujour();
    // let connectionMysqlObjMessage = {
    //   id1Boulangerie: 1,
    //   messageText: "",
    //   dateMessage: new Date(),
    //   dossier: this.boulanger.dossierCommandesWeb,
    //   db_host: this.boulanger.db_host,
    //   db_username: this.boulanger.db_username,
    //   db_name: this.boulanger.db_name,
    //   db_password: this.boulanger.db_password,
    // };
    // this.api.view_message(connectionMysqlObjMessage).subscribe((res) => {
    //   let arr = Object.values(res);
    //   let messageText = JSON.stringify(arr[0].messageText);
    //   this.messageImport.set(messageText);
    //  });
  }

  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: "success",
      title: "Attention...",
      text: textAlert,
      timer: 2000,
      toast: true,
    });
  }
  newClient() {
    this.router.navigate(["/nouveauClient"]);
  }
  newMessage() {
    this.router.navigate(["/newMessage"]);
  }
  private loadConsentPreferences(): void {
    this.userConsent = this.getConsentement();
  }
  removePreferences(): void {
    localStorage.removeItem(this.storageKeyConsent);
    this.loadConsentPreferences();
  }

  saveConsentement(consent: string): void {
    localStorage.setItem(this.storageKeyConsent, consent);
    this.loadConsentPreferences();
  }
  getConsentement(): string {
    return localStorage.getItem(this.storageKeyConsent) || this.consent;
  }
  getAllBoulanger() {
    this.router.navigate(["/boulanger"]);
  }
  getAllClients() {
    this.router.navigate(["/clients"]);
  }
  getAllFactures() {
    this.router.navigate(["/factures"]);
  }
  voirLoi() {
    this.extract.changeisOpenCedule(false);
    this.isOpen.set(this.extract.getisOpenCedule());
    this.router.navigate(["/protection"]);
  }
  gotoFactures() {
    this.router.navigate(["/factures"]);
  }
  selectDay(nbrJour: number) {
    console.log("date debut=" + this.datedujour());

    this.madate.setDate(this.madate.getDate() + nbrJour);
    // this.datedujour=this.madate.toLocaleDateString('fr-ca');
    this.datedujour.set(this.madate.toLocaleDateString("fr-ca"));
    console.log("date apres clic=" + this.datedujour());
    // this.router.navigate(['/recettes',this.datedujour()])
    this.extract.setDateProduction(this.datedujour());
    this.extract.setmaDateProduction(this.madate);
  }
  gotoCommandeWebTable() {
    this.router.navigate(["/commandesWebTable"]);
  }
  reverseIsOpen() {
    // this.isOpen.set(!this.isOpen())
    // this.extract.changeisOpenCedule(this.isOpen())
  }
  tabletteAdd() {
    console.log("this.tabletteOK avant clic changement=" + this.tabletteOK);
    this.tabletteOK = !this.tabletteOK;
    console.log("this.tabletteOK apres clic changement=" + this.tabletteOK);

    this.extract.tabletteAdd(this.tabletteOK); // on change '' pour !this.tabletteOK
  }
  gotoDateGraphic() {
    this.router.navigate(['/dateGraphic'])
  }
  gotoGraphicUnProduit() {
    this.router.navigate(['/unProduit'])
  }
  gotoClients() {
    this.router.navigate(['/clients'])
  }
  commandeClientIndividuel() {
    this.router.navigate(["/clientIndividuel"]);
  }
  gotoViewTaches() {
    this.router.navigate(['/afficheTache'])
  }
  gotoAddTache() {
    this.router.navigate(['/addTache'])
  }
  viewTaches() {
    this.router.navigate(['afficheTache'])
  }
  gotoViewEquipes() {
    this.router.navigate(['afficheEquipes'])
  }
  gotoAddEquipe() {
    this.router.navigate(['addEquipe'])
  }
  gotoAddClientsLogiciel(){
    console.log('dans gotoClientsLogiciel')
    this.router.navigate(['/clientLogicielAdd'])
  }
  gotoVoirClientsLogiciel(){
    console.log('dans gotoVoirClientsLogiciel')
    this.router.navigate(['/voirClientsLogiciel'])
  }

  closeError(): void {
    this.showError = false;
  }
  verifierEtOuvrirPDF(nomDoc:string){
   // const pdfUrl = `${this.lienURL}/cuisson1Vien.pdf`;


   this.lienURL =
   this.boulanger.userURLSiteFTP +"ProductionQuotidienne/"+this.datedujour();

    const pdfUrl = this.lienURL+nomDoc
    
    this.pdfValidatorService.validateAndOpenPdf(pdfUrl).subscribe(
      isValid => {
        if (!isValid) {
          this.showError = true;
        }
        this.loading = false;
      })
  }

}
