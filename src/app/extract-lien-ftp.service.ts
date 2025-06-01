import { Injectable, OnInit, signal } from "@angular/core";
import { Boulanger } from "./identificationBoul";
import { BehaviorSubject } from "rxjs";
import { Produit } from "./models/produits";
import { ClientLogiciel } from "./models/clientLogiciel";
import { clientIndividuel } from "./models/clientIndividuel";
import { Fournisseur } from "./models/fournisseur";
import { Tache } from "./models/tache";

interface rangeDateRecherche {
  dateDebut: string;
  dateFin: string;
}

@Injectable({
  providedIn: "root",
})
export class ExtractLienFTPService {
  emailClient: string | undefined;
  nom!: string;
  urlSiteFtp!: string;
  logoBoulangerie!: string;
  openClick!: boolean;
  boulanger!: Boulanger;
  role!: string;
  emailAuBoulanger!: string;
  userURLSiteCommande: string | undefined;
  identifiant: string | undefined;
  showTelechargement: boolean = false;
  invendus: string = "";
  file_telecharge: any;
  isAuth = signal<boolean>(false);
  isOpenCedule = signal<boolean>(true);
  tabletteOK: boolean = false;
  dateProduction: string;
  madateProduction: Date = undefined;
  client: any;
  clientLogiciel: ClientLogiciel;
  tokenAuth: string;
  dateDebutRecherche: string;
  dateFinRecherche: string;
  fournisseurs: Fournisseur[];
  fournisseur: Fournisseur;

  rangeDate: rangeDateRecherche = {
    dateDebut: "",
    dateFin: "",
  };
  sommeSelectionDate1: number
  sommeSelectionDate2: number
  sommeSelectionDate3: number
  sommeSelectionDate4: number

  startEnd1: string = ""
  startEnd2: string = ""
  startEnd3: string = ""
  startEnd4: string = ""

  listeDesProduits: any = []
  unProduit: string = ""
  unClientID: number = 0
  unNomClient: string = ""
  formClientIndividuel: any = []
  tache: Tache[]
  unIngredient: any = [];
  ingredients: any;
  produits: any[];
  details: any[] = []
  mesClientsDetails: any[] = []
  mesProduitsDetails: any[] = []
  loginGroupeBoulangerie = ""

  constructor() { }
  ngOnInit() {
    this.openClick = false;
  }

  getUrlFtp(boulanger: Boulanger) {
    // this.nom=boulanger.nom
    // this.urlSiteFtp=boulanger.userURLSiteFTP
    // this.userURLSiteCommande=boulanger.userURLSiteCommande
    // this.logoBoulangerie=boulanger.logoBoulangerie
    // this.role=boulanger.role
    // this.emailAuBoulanger=boulanger.emailEnvoiAuBoulanger
    // this.identifiant=boulanger.identifiant
    this.boulanger = boulanger;
    return boulanger.userURLSiteFTP;
  }
  alert() {
    alert("Test d'utilisation du spinner!!");
  }
  toggleComponent() {
    this.openClick = !this.openClick;
    return this.openClick;
  }

  getBoulanger() {
    return this.boulanger;
  }
  getBoulangerIdclient() {
    return this.boulanger.idclient;
  }
  getFournisseur() {
    return this.fournisseurs;
  }
  setFournisseur(fournisseurs) {
    this.fournisseurs = fournisseurs;
  }
  redirection(url: string) {
    // window.open(url, "_self");
    window.open(url, "_blanck");
  }

  getTabletteOK() {
    return this.tabletteOK;
  }
  getInvendus() {
    return this.invendus;
  }
  invendusAdd(boolInvendus: boolean) {
    if (boolInvendus == true) {
      this.invendus = "INVENDUS";
    } else {
      this.invendus = "";
    }

    //this.invendus='INVENDUS'
  }
  tabletteAdd(boolTablette: boolean) {
    this.tabletteOK = boolTablette;
  }
  majIsAuth(authorization: boolean) {
    this.isAuth.set(authorization);
  }
  getisAuth() {
    return this.isAuth();
  }
  getisOpenCedule() {
    return this.isOpenCedule();
  }
  changeisOpenCedule(changerisOpen: boolean) {
    this.isOpenCedule.set(changerisOpen);
  }
  setDateProduction(date: string) {
    this.dateProduction = date;
  }
  getDateProduction() {
    return this.dateProduction;
  }

  setmaDateProduction(date: Date) {

    this.madateProduction = date;

  }

  getmaDateProduction() {
    return this.madateProduction;
  }

  setClient(client: any) {
    this.client = client
  }
  setIngredients(Ingredients: any) {
    this.ingredients = Ingredients
  }
  setProduits(produit: any) {
    this.produits = produit
  }
  getClient() {
    return this.client;
  }
  setClientLogiciel(client: any) {
    this.clientLogiciel = client;
  }
  getClientLogiciel() {
    return this.clientLogiciel;
  }
  getProduits() {
    return this.produits;
  }
  setTokenAuth(token: string) {
    this.tokenAuth = token;
  }
  getTokenAuth() {
    return this.tokenAuth;
  }
  setDateRange(dateDebut: string, dateFin: string) {
    this.rangeDate.dateDebut = dateDebut;
    this.rangeDate.dateFin = dateFin;
  }
  getDateRange() {
    return this.rangeDate
  }
  setunClientID(unClientID, unNomClient) {
    this.unClientID = unClientID
    this.unNomClient = unNomClient
  }
  getunClientID() {
    return this.unClientID
  }
  getIngredient() {
    return this.ingredients
  }
  setSommeDate($sommeSelectionDate: number, $dateRangChoix: number, startEnd: string) {

    switch ($dateRangChoix) {
      case 1: {
        this.sommeSelectionDate1 = $sommeSelectionDate;
        this.startEnd1 = startEnd
        break
      }
      case 2: {
        this.sommeSelectionDate2 = $sommeSelectionDate;
        this.startEnd2 = startEnd
        break
      }
      case 3: {
        this.sommeSelectionDate3 = $sommeSelectionDate;
        this.startEnd3 = startEnd
        break
      }
      case 4: {
        this.sommeSelectionDate4 = $sommeSelectionDate;
        this.startEnd4 = startEnd
        break
      }
    }
  }
  setClientIndividuel(client: clientIndividuel) {
    this.formClientIndividuel = client
    console.log("dans setClientIndividuel de extract-lien-ftp.service.ts")

  }
  setTache(tache: Tache[]) {
    this.tache = tache;
  }
  getTache() {
    return this.tache;
  }
  setloginGroupeBoulangerie(dossier: string) {
    this.loginGroupeBoulangerie = dossier
  }

  getloginGroupeBoulangerie() {
    return this.loginGroupeBoulangerie
  }
  setRoleLogin(role:string) {
    this.role = role
  }
  getRoleLogin(){
    return this.role
  }

}
