import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "@auth0/auth0-angular";
import { AuthModule } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { Observable } from "rxjs";
import { ExtractLienFTPService } from "src/app/extract-lien-ftp.service";
import { Boulanger } from "src/app/identificationBoul";
import { Router } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { DeviceDetectorService } from "ngx-device-detector";
import { GenerateJWTService } from "src/app/services/generate-jwt.service";
import { ApiService } from "src/app/api.service";
import { tap } from "rxjs";
// import { clientIndividuel } from "src/app/models/clientIndividuel";

//https://rodrigokamada.medium.com/authentication-using-the-auth0-to-an-angular-application-e9f0c3939bf2

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [
    MatMenuModule,
    CommonModule,
    AuthModule,
    MatIconModule
  ],
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit, OnDestroy {
  private jwtTokenKey = "your_jwt_token_key";
  extract = inject(ExtractLienFTPService);
  api = inject(ApiService)
  router = inject(Router);
  jwt = inject(GenerateJWTService);
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  openMysql: boolean = true;
  boulanger!: Boulanger;

  menu: any;
  user: any;
  email = signal<string>("");
  deviceService = inject(DeviceDetectorService);
  deviceInfo = null;

  leboulanger: Boulanger = null;
  clientDataByEmail: any;
  dossierCommandesWeb = signal<string>("")
  proprioBoulangerie = signal<boolean>(false)
  outilsGestion = signal<boolean>(false)
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  ngOnInit() {

    this.epicFunction();
    this.auth.user$.subscribe((success: any) => {
      this.user = success;

      if (this.user != null) {
        this.email.set(this.user.email);

        this.extract.majIsAuth(true);
        this.auth.idTokenClaims$.subscribe((res) => {
          const userId = res.aud;

          // Création du JWT avec generateJWT.ts
          const payload = {
            userId: userId,
            username: this.user.email,
            role: "admin",
          };
          let tokenJWT;
          // const expiresIn = 3600*24; // Durée en secondes (24 heure)
          const expiresIn = 3600 * 24; // Durée en secondes (1 seconde)
          tokenJWT = this.jwt.generateToken(payload, expiresIn);
          this.extract.setTokenAuth(tokenJWT);
          // Stockage du JWT dans le local storage ou sessionStorage
          localStorage.setItem(this.jwtTokenKey, tokenJWT);
          const isValid = this.jwt.verifyToken(tokenJWT);
          const decodedPayload = this.jwt.decodeToken(tokenJWT);

          //ajout 3 janvier 2025 pour créer les données this.boulanger pour être présent lors ouverture commande web
          let connectionGetClient: any
          this.dossierCommandesWeb.set(this.selectionDossierCommandesWeb(this.user.email))

          connectionGetClient = {
            "dossierCommandesWeb": this.dossierCommandesWeb(),
            "emailUserWeb": this.user.email,
            "tokenAuth": this.extract.getTokenAuth()
          }
          this.api.getClientEmail(connectionGetClient).pipe(tap((data) => this.construireClient(data.data))).subscribe(()=>{console.log("apres this.construireClient");
            this.router.navigate(["/cedule"]);
          })
          
        });
      }
      //fin ajout 3 janvier 2025
    });
  }
  selectionDossierCommandesWeb(courriel: string) {
    let dossier: string = ""
    //à NOTER le couriel inscrit ne doit pas contenir de majuscule meme s'il y en a dans le courriel entré dans 
    // auth0 car ça ne passe pas.
    const emailsBoulangerieQc = ["info@boulangerieqc.com", "jflevis2019@gmail.com","livraisonboulangerieqc@boulangerieqc.com",
      "ehc@boulangerieqc.com"
    ];
    const emailsCroissantdelune = ["commande@lecroissantdelune.ca", "st-romuald@lecroissantdelune.ca",
      "comptabilite@lecroissantdelune.ca",
      "baptiste.dupre23@gmail.com", "livraison@lecroissantdelune.ca",
      "raphaekletouze@gmail.com", "info@traiteurlacourtisane.com",
      "lafourneebio@hotmail.com", "lortierenee@hotmail.com",
      "kimncormier@hotmail.com", "auxptitsoignons@gmail.com",
      "lapotagerie@outlook.com", "boucherielevis@gmail.com",
      "tambour.cafe@outlook.com", "info@phoenixduparvis.com",
      "comptabilite@delisuisse.ca", "solutionchasseur@gmail.com",
      "zakarya.benamor@gmail.com", "bistrosuacoche@gmail.com",
      "pgagne@quebecinternational.ca", "c.thibault@lecroissantdelune.ca","admin@cestmoncarrefour.com","catherine.sylvain@leclerc.ca","annrika@oravito.com"
    ];
    const emailsVraiesRichesses = ["lesvraiesrichesses@boulangerieqc.com", "sherbrooke@boulangerieqc.com",
      "rockforest@boulangerieqc.com", "lucia@boulangerieqc.com",
      "comptableVraiesRichesses@boulangerieqc.com","patisseriesvraiesrichesses@boulangerieqc.com",
      "metsvraiesrichesses@boulangerieqc.com",
      "livraisonvraies@boulangerieqc.com", "trad08724ayerscliff@sobeys.com",
      "tavalex@videotron.ca", "facturation@confreriebrasseurs.com",
      "lekaapeh@gmail.com", "axep8248@gmail.com",
      "comptabilite@fromageriedenouvellefrance.com", "fermedesecossais@gmail.com",
      "info@fermest-elie.com", "facedeboeufvictoria@boulangerieqc.com",
      "facedeboeufcliff@boulangerieqc.com", "facedeboeufrock@boulangerieqc.com",
      "marie-josee.f.fleury@desjardins.com", "daphnee.chabot@desjardins.com",
      "info@corpo-st-camille.ca", "pauline@wowevenements.com",
      "cafehubertking@boulangerieqc.com", "cafehubertbourque@boulangerieqc.com",
      "cafeducouvent@gmail.com", "boucheriecoutu@hotmail.com",
      "ewindsor41@gmail.com", "info@fabriquedebagelscafenoir.com",
      "chefmog@avril.ca", "chefshb@avril.ca",
      "jturcotte@avril.ca", "greffe-tresorerie@sfxb.qc.ca",
      "recsus@usherbrooke.ca", "remiscafemagog@gmail.com",
      "janie@westley.ca", "info@zooanimatiionestrie.ca","francine@francinebertrand.com"
    ];
    const emailsDPCT = ["dpct@boulangerieqc.com"]

    const emailsPainsetRoses = ["despainsetdesroses@gmail.com","clientpainsetroses@boulangerieqc.com","bosspainsetroses@boulangerieqc.com"]

    if (emailsBoulangerieQc.includes(courriel)) {
      dossier = "boulangerieqc"
    }
    else if (emailsCroissantdelune.includes(courriel)) {
      dossier = "croissantdelune"
    }
    else if (emailsVraiesRichesses.includes(courriel)) {
      dossier = "lesvraiesrichesses"
    }
    else if (emailsDPCT.includes(courriel)) {
      dossier = "dpct"
    }
    else if (emailsPainsetRoses.includes(courriel)) {
      dossier = "painsetroses"
    }
    else (
      dossier = ""
    )
    this.extract.setloginGroupeBoulangerie(dossier)

    return dossier
  }


  construireClient(clientDataByEmail: any) {


    this.clientDataByEmail = clientDataByEmail
    this.boulanger = new Boulanger()
    this.boulanger.emailUserWeb = this.clientDataByEmail.emailUserWeb
    this.boulanger.courriel = this.clientDataByEmail.courriel
    this.boulanger.emailClient = this.clientDataByEmail.courriel
    this.boulanger.nom = this.clientDataByEmail.nom;
    this.boulanger.idclient = this.clientDataByEmail.idclient
    this.boulanger.dossierCommandesWeb = this.clientDataByEmail.dossierCommandesWeb
    this.boulanger.userURLSiteFTP = this.clientDataByEmail.userURLSiteFTP
    this.boulanger.userURLSiteCommande = this.clientDataByEmail.userURLSiteCommande
    this.boulanger.clientIndivSiteCommande = this.clientDataByEmail.clientIndivSiteCommande
    this.boulanger.logoBoulangerie = this.clientDataByEmail.logoBoulangerie
    this.boulanger.role = this.clientDataByEmail.role
    this.boulanger.logoSignal = this.clientDataByEmail.logoSignal
    this.boulanger.emailEnvoiAuBoulanger = this.clientDataByEmail.emailEnvoiAuBoulanger
    this.boulanger.identifiant = this.clientDataByEmail.identifiant
    this.boulanger.nomBoulangerie = this.clientDataByEmail.nomBoulangerie

    this.boulanger.timestampNewCommande=this.clientDataByEmail.timestampNewCommande

    if (this.clientDataByEmail.proprioBoulangerie === "1") {
      this.boulanger.proprioBoulangerie = true;
      this.proprioBoulangerie.set(true)
    }
    else {
      this.boulanger.proprioBoulangerie = false;
      this.proprioBoulangerie.set(false)
    }
    if (this.clientDataByEmail.accesSMS === "1") {
      this.boulanger.accesSMS = true;
    }
    else {
      this.boulanger.accesSMS = false;
    }
    this.boulanger.noCellSMS = this.clientDataByEmail.noCellSMS
    this.boulanger.nomEquipe = this.clientDataByEmail.nomEquipe
    if (this.clientDataByEmail.outilsGestion === "1") {
      this.boulanger.outilsGestion = true;
      this.outilsGestion.set(true)
    }
    else {
      this.boulanger.outilsGestion = false;
      this.outilsGestion.set(false)
    }
    this.boulanger.frais_transport = this.clientDataByEmail.frais_transport
    if (this.clientDataByEmail.activation_Frais_transport === "1") {
      this.boulanger.activation_Frais_transport = true;
    }
    else {
      this.boulanger.activation_Frais_transport = false;
    }
    if (this.clientDataByEmail.commercial === "1") {
      this.boulanger.commercial = true;
    }
    else {
      this.boulanger.commercial = false;
    }
    this.boulanger.frais_transport = this.clientDataByEmail.frais_transport
    this.boulanger.qteMincommande = this.clientDataByEmail.qteMincommande
    this.boulanger.achat_minimum_sans_frais = this.clientDataByEmail.achat_minimum_sans_frais
    this.boulanger.version = this.clientDataByEmail.version
    this.boulanger.cueillette = this.clientDataByEmail.cueillette
    this.boulanger.identifiant = this.clientDataByEmail.identifiant
    this.boulanger.projetSherbrooke = this.clientDataByEmail.projetSherbrooke


//on garde le role pour permettre entree client individuel dans fenetre cedule.html
this.extract.setRoleLogin(this.boulanger.role)

// ici on définit le client et on retour l'URL de sa listePrixClient
    this.extract.getUrlFtp(this.boulanger);
  }

  ngOnDestroy() { }
  loginWithRedirect() {
    window.location.reload();
    this.extract.changeisOpenCedule(true);
    this.auth.loginWithRedirect({});
    this.extract.setClientIndividuel(null)
    // this.router.navigate(["/cedule"]);

    // this.router.navigate(['/']);
    // this.auth.loginWithRedirect({
    //   appState: {
    //     target: window.location.pathname,
    //   },
    // });

    console.log("login dans loginWithRedirect: " + window.location.pathname);
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
    this.logoutToken();
  }
  accueil() {
    this.extract.changeisOpenCedule(!this.extract.getisOpenCedule());

    this.router.navigate(["/cedule"]);
  }
  get isLoggedIn$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  get user$(): Observable<any> {
    return this.auth.user$;
  }
  getClientDataFacture() {
    this.leboulanger = this.extract.getBoulanger();

    this.router.navigate(["/factures"]);
    return this.leboulanger;
  }
  epicFunction() {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if (isMobile || isTablet) {
      this.extract.tabletteAdd(true);
    } else {
      this.extract.tabletteAdd(false);
    }
    console.log(this.deviceInfo);
    console.log("connection avec un mobile " + isMobile); // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("connection avec une tablette " + isTablet); // returns if the device us a tablet (iPad etc)
    console.log("connection avec un ordinateur " + isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
  logoutToken() {
    // Supprimer le JWT du local storage ou sessionStorage lors de la déconnexion
    localStorage.removeItem(this.jwtTokenKey);
  }
  getToken(): string | null {
    // Récupérer le JWT depuis le local storage ou sessionStorage
    return localStorage.getItem(this.jwtTokenKey);
  }

  //méthodes du menu Accès BD
  goToAccueil() {
    this.router.navigate(['/commande'])
  }
  gotoAddClientsLogiciel() {
    console.log('dans gotoClientsLogiciel')
    this.router.navigate(['/clientLogicielAdd'])
  }

  gotoBoulanger() {
    this.router.navigate(['/boulanger'])
  }
  gotoCedule() {
    console.log('dans goToCedule')
    this.router.navigate(['/recherche'])
  }

  gotoClients() {
    this.router.navigate(['/clients'])
  }


  gotoCommande() {
    this.router.navigate(['/commandes'])
  }
  gotoCommandesWeb() {
    this.router.navigate(['/commandesWeb'])
  }

  gotoCommandeWebTable() {
    this.router.navigate(['/commandesWebTable'])
  }
  gotoCreerBoulangerie() {
    this.router.navigate(['/modifyBoulangerie'])
  }
  gotoCreerClient() {
    this.router.navigate(['/modifyClient'])
  }

  gotoDetails() {
    this.router.navigate(['/details'])
  }

  gotoFactures() {
    this.router.navigate(['/factures'])
  }
  gotoFacturesPrime() {
    console.log('dans goToFacturesPrimeNg')
    this.router.navigate(['/goToFacturesPrimeNg'])
  }
  gotoFournisseur() {

    this.router.navigate(['/fournisseurs'])
  }

  gotoIngredients() {
    this.router.navigate(['/ingredients'])
  }
  gotoAddIngredients() {
    this.router.navigate(['/ajout_ingredient'])
  }

  gotoLivraison() {
    this.router.navigate(['/livraison'])
  }

  gotoNewFournisseur() {

    this.router.navigate(['/addFournisseurs'])
  }

  gotoProduits() {
    this.router.navigate(['/produits'])
  }
  gotoRecettesBase() {
    this.router.navigate(['/recettesMysql'])
  }
  gotoVoirClientsLogiciel() {
    console.log('dans gotoVoirClientsLogiciel')
    this.router.navigate(['/voirClientsLogiciel'])
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
  newClient() {
    this.router.navigate(["/nouveauClient"]);
  }

  gotoDateGraphic() {
    this.router.navigate(['/dateGraphic'])
  }
  gotoGraphicUnProduit() {

    this.router.navigate(['/unProduit'])
  }
  newMessage() {
    this.router.navigate(["/newMessage"]);
  }
  newEditor() {
    this.router.navigate(["/editor"]);
  }

  gotoClientsLogiciel(){
    this.router.navigate(['/voirClientsLogiciel'])

  }
gotoCreerClientLogiciel(){
  this.router.navigate(['/clientLogicielAdd'])
}
}
