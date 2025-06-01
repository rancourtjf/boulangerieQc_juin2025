import { Component, ElementRef, HostListener, Inject, Input, OnInit } from "@angular/core";
import { AuthService } from '@auth0/auth0-angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CsvResultService } from "../../services/csv-result.service";
import { HttpClient } from "@angular/common/http";
import { Produit } from "../../models/produits";
import { Papa, ParseResult } from "ngx-papaparse";
import { ngxCsv } from "ngx-csv";
import Swal from "sweetalert2";
import {
  Observable,
  Subject,
  of,
  from,
  take,
  asyncScheduler,
  fromEvent,
} from "rxjs";
import { tap } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-commande-produit",
  standalone:true,
  imports:[CommonModule],
  templateUrl: "./commande-produit.component.html",
  styleUrls: ["./commande-produit.component.scss"],
})
export class CommandeProduitComponent implements OnInit {
  listeCsvData =
    "https://www.boulangerieqc.com/clients/boulangerieqc/listePrixClients/listeCourteCSV.csv";
    @Input() progress;
    public file: File | null = null;

    @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
      const file = event && event.item(0);
      this.file = file;
    }


  commandeForm: FormGroup;
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
  clientNom: string;
  nbrProduit: any;
  testResult: string;
  control: FormArray<any>;
  dataSourceListePrixApresHtpp: Produit;
  dataHttp: Produit;
  total=0;    
  value; 
  prixEsc:number
  prixEscString: any;
  nomClient:string

  public get Rows() {
    return this.commandeForm.get("Rows") as FormArray;
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public csv: CsvResultService,
    private papa: Papa,
    public auth:AuthService,
    @Inject(DOCUMENT) private doc: Document,
     private host: ElementRef<HTMLInputElement>
  ) {
    this.nomClient="jflevis"
    this.clientNom = this.nomClient;
    this.inputDate = this.formBuilder.group({
      dateCommande: [new Date(), Validators.required],
    });
    this.dataSourceListePrix = [
    ];
  }

  ngOnInit(): void {

    // console.log('dans le ngONInit this.dataSrouceListePrix:'+JSON.stringify(this.dataSourceListePrix))
    this.obtenirListeProduit()

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
          input0_lundi: [Number(this.dataSourceListePrix[i].input0_lundi)],
          input0_mardi: [Number(this.dataSourceListePrix[i].input0_mardi)],
          input0_mercredi: [this.dataSourceListePrix[i].input0_mercredi],
          input0_jeudi: [this.dataSourceListePrix[i].input0_jeudi],
          input0_vendredi: [this.dataSourceListePrix[i].input0_vendredi],
          input0_samedi: [this.dataSourceListePrix[i].input0_samedi],
          input0_dimanche: [this.dataSourceListePrix[i].input0_dimanche],
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
    }
  }

   ngAfterOnInit() {

   }
  downloadCSV(dataListe: any) {
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
        "prixEscompte",
        "prix_vente_variete_r",
        "categorie_a",
        "input0_lundi",
        "input0_mardi",
        "input0_mercredi",
        "input0_jeudi",
        "input0_vendredi",
        "input0_samedi",
        "input0_dimanche",
        "produit_lundi_b",
        "produit_mardi_b",
        "produit_mercredi_b",
        "produit_jeudi_b",
        "produit_vendredi_b",
        "produit_samedi_b",
        "produit_dimanche_b",
      ],
    };
    new ngxCsv(dataListe, "reports", options);
  }
  downloadCSVObject(dataListe: any) {
    let options = {
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
        "prixEscompte",
        "prix_vente_variete_r",
        "categorie_a",
        "input0_lundi",
        "input0_mardi",
        "input0_mercredi",
        "input0_jeudi",
        "input0_vendredi",
        "input0_samedi",
        "input0_dimanche",
        "produit_lundi_b",
        "produit_mardi_b",
        "produit_mercredi_b",
        "produit_jeudi_b",
        "produit_vendredi_b",
        "produit_samedi_b",
        "produit_dimanche_b",
      ],
    };
    let csvFormatte = new ngxCsv(dataListe, "reports"+this.dateStringCommande, options);
    console.log('le csv formatté non downloadé: '+JSON.stringify(csvFormatte))
  }
  envoiCommande(e: any) {

    for (let i=0; i < this.membersLength; i++) {
      let iStringLundi = "input0_lundi" + i.toString();
      let iStringMardi = "input0_mardi" + i.toString();
      let iStringMercredi = "input0_mercredi" + i.toString();
      let iStringJeudi = "input0_jeudi" + i.toString();
      let iStringVendredi = "input0_vendredi" + i.toString();
      let iStringSamedi = "input0_samedi" + i.toString();
      let iStringDimanche = "input0_dimanche" + i.toString();
      let iStringTotalProduit = "totalProduit" + i.toString();


       let lundiValue = (
        document.getElementById(iStringLundi) as HTMLInputElement
      ).value;
      let mardiValue = (
        document.getElementById(iStringMardi) as HTMLInputElement
      ).value;
      let mercrediValue = (
        document.getElementById(iStringMercredi) as HTMLInputElement
      ).value;
      let jeudiValue = (
        document.getElementById(iStringJeudi) as HTMLInputElement
      ).value;
      let vendrediValue = (
        document.getElementById(iStringVendredi) as HTMLInputElement
      ).value;
      let samediValue = (
        document.getElementById(iStringSamedi) as HTMLInputElement
      ).value;
      let dimancheValue = (
        document.getElementById(iStringDimanche) as HTMLInputElement
      ).value;
      let totalProduitValue = (
        document.getElementById(iStringTotalProduit) as HTMLInputElement
      ).value;

      this.prixEscString=(this.dataSourceListePrix[i].prixEscompte)
      if (typeof this.prixEscString === 'string' )
        {
          this.prixEsc=Number(this.prixEscString.replace("," , "."))
        }
        else{
          this.prixEsc=this.dataSourceListePrix[i].prixEscompte
        }
      this.dataSourceListePrix[i].input0_lundi = Number(lundiValue);
      let qteLundi=Number(lundiValue)
      this.total=this.total+qteLundi*this.prixEsc
      this.dataSourceListePrix[i].input0_mardi = Number(mardiValue);
      let qteMardi=Number(mardiValue)
      this.total=this.total+qteMardi*this.prixEsc
      this.dataSourceListePrix[i].input0_mercredi = Number(mercrediValue);
      let qteMercredi=Number(mercrediValue)
      this.total=this.total+qteMercredi*this.prixEsc
      this.dataSourceListePrix[i].input0_jeudi = Number(jeudiValue);
      let qteJeudi=Number(jeudiValue)
      this.total=this.total+qteJeudi*this.prixEsc
      this.dataSourceListePrix[i].input0_vendredi = Number(vendrediValue);
      let qteVendredi=Number(vendrediValue)
      this.total=this.total+qteVendredi*this.prixEsc
      this.dataSourceListePrix[i].input0_samedi = Number(samediValue);
      let qteSamedi=Number(samediValue)
      this.total=this.total+qteSamedi*this.prixEsc
      this.dataSourceListePrix[i].input0_dimanche = Number(dimancheValue);
      let qteDimanche=Number(dimancheValue)
      this.total=this.total+qteDimanche*this.prixEsc
    }
  }
  envoiInput(index: number, id: string) {
    console.log("Il faut calculer le total nombre cumulé x prix escompté");
    let iStringTotalProduit = "totalProduit" + index.toString();
    let leID = id + index.toString();
    console.log("resultat iStringTotalProduit:" + iStringTotalProduit);

    // var str = (<HTMLInputElement>document.getElementById(iStringTotalProduit)).value;
    let element = document.getElementById(iStringTotalProduit);
    var num = parseFloat(
      (<HTMLInputElement>document.getElementById(iStringTotalProduit)).value
    );
    var numJour = parseFloat(
      (<HTMLInputElement>document.getElementById(leID)).value
    );
    let elementJour = <HTMLInputElement>document.getElementById(leID);
    if (numJour != 0) {
      elementJour.classList.toggle("mystyle");
    }
    element.innerHTML = (<HTMLInputElement>(
      document.getElementById(iStringTotalProduit)
    )).value;
  }
  getDayName(date = new Date(this.datedelaCommande), locale = "fr-ca") {

    return date.toLocaleDateString(locale, { weekday: "long" });
  }
  onSubmitDateCommande() {
    this.datedelaCommande = this.inputDate.value.dateCommande;
    let d = new Date(this.datedelaCommande);

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
  }
  simpleAlert(textAlert: string) {
    Swal.fire({
      icon: "error",
      title: "Oups...",
      text: textAlert,
    });
  }
 public  initiateForm(dataHttp:Produit): FormGroup {
   let i:number = 0
this.dataHttp=dataHttp

    return this.formBuilder.group({
      ID: [dataHttp.ID],
      variete_poids_a: [dataHttp.variete_poids_a],
      input0_lundi: [Number(dataHttp.input0_lundi)],
      input0_mardi: [Number(dataHttp.input0_mardi)],
      input0_mercredi: [dataHttp.input0_mercredi],
      input0_jeudi: [dataHttp.input0_jeudi],
      input0_vendredi: [dataHttp.input0_vendredi],
      input0_samedi: [dataHttp.input0_samedi],
      input0_dimanche: [dataHttp.input0_dimanche],
      categorie_a: [dataHttp.categorie_a],
      prixEscompte: ["$ " + dataHttp.prixEscompte],
      prix_vente_variete_r:["$ " + dataHttp.prix_vente_variete_r],  
      totalProduit: [0],
      produit_lundi_b: [dataHttp.produit_lundi_b],
      produit_mardi_b: [dataHttp.produit_mardi_b],
      produit_mercredi_b: [dataHttp.produit_mercredi_b],
      produit_jeudi_b: [dataHttp.produit_jeudi_b],
      produit_vendredi_b: [dataHttp.produit_vendredi_b],
      produit_samedi_b: [dataHttp.produit_samedi_b],
      produit_dimanche_b: [dataHttp.produit_dimanche_b],

    });
  }

 public  addRow() {
   // https://stackoverflow.com/questions/34031448/typescript-typeerror-myclass-myfunction-is-not-a-function
   console.log('debut addRow ')
   
    const control =  this.commandeForm.get('Rows') as FormArray;
    for(let i=0;i<this.membersLength-1;i++)
    {
      control.push(this.initiateForm(this.dataSourceListePrix[i]));
    }
  }

 public deleteRow(index: number) {
    const control = this.commandeForm.get("Rows") as FormArray;
    control.removeAt(index);
  }

public   get getFormControls() {
    const control = this.commandeForm.get("Rows") as FormArray;
    return control;
  }


  //https://stackoverflow.com/questions/45660868/cant-reach-results-of-papa-parse-outside-the-complete-function
parseCsv(): Observable<ParseResult<Produit[]>> {
  return new Observable(observable => {
      this.papa.parse(this.listeCsvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: "greedy",
        worker: true,
        download: true,
          complete: (results) => {
              observable.next(results);
              observable.complete();
          }
      });
  });
}
  public obtenirListeProduit(){
    const obsParse=
    this.parseCsv().subscribe(p => {
      this.dataSourceListePrix=p.data;
      this.membersLength=this.dataSourceListePrix.length;
      const control =  this.commandeForm.get('Rows') as FormArray;
      for(let i=0;i<this.membersLength-1;i++)
      {
        control.push(this.initiateForm(this.dataSourceListePrix[i]));
      }


     // obsParse.unsubscribe()
  })
  }
  findsum(value:Produit[]){

  }

}
function requiredFileType(arg0: string): import("@angular/forms").ValidatorFn {
  throw new Error("Function not implemented.");
}

