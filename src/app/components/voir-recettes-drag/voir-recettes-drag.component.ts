// https://www.tektutorialshub.com/angular/select-options-example-in-angular/
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// import { FileSaveComponent } from "../file-save/file-save.component";

import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ApiService } from "../../api.service";
import { Recette } from "../../models/recette";
import { ItemService } from "../../services/item.service";

import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { Observable, from, merge } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Boulanger } from "../../identificationBoul";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { getDay, getMonth, getYear } from "date-fns";
import { Time } from "@angular/common";
import { Client } from "../../models/client";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-voir-recettes-drag',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    CdkDropList, CdkDrag,],
  templateUrl: './voir-recettes-drag.component.html',
  styleUrl: './voir-recettes-drag.component.css'
})
export class VoirRecettesDragComponent {

  @ViewChild(MatSort)
  sort: MatSort | undefined;
  api = inject(ApiService);
  item = inject(ItemService);
  extract = inject(ExtractLienFTPService);
  router = inject(Router);
  fb = inject(FormBuilder);
  routerActivate = inject(ActivatedRoute)


  displayedColumns: string[] = ["dateProd", "chemin", "timestamp", "production"];

  sortedData!: Recette[];
  postPerPage: number;
  pageNumber: number;
  isAsc: boolean = true;
  itemObservable: any;
  boulLogin: Boulanger;
  $connection: string;
  truck: string = "truck";
  rechercheFactFind: Recette;
  resultOnefactExtract: any;
  Idetconnection: any;
  selectedTeam: any;
  //listRecettes = signal<any[]>([]);
  //dataSource!: Facture[];
  listRecettes = signal<Recette[]>([]);

  dataSourceClients: any;
  recettesForm: FormGroup<{ recette: FormControl<any> }>;
  noClientChoisi: number;
  role = signal<string>("");
  resultRecherche: { date: any };
  dateForm: any;
  dossierCommandesWeb = "";
  dossierRecetteObj: object = {
    dossierCommandesWeb: "",
    dateProd: "",
  };
  dateProduction: any;
  jourDeLaProduction: string = "";
  madateJourProduction: Date;
  productionRecette = signal<boolean>(false)

  @Input() datedujour: any;
  @ViewChild('table', { static: true }) table: MatTable<any>;


  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.listRecettes().findIndex(d => d === event.item.data);

    moveItemInArray(this.listRecettes(), previousIndex, event.currentIndex);
    this.table.renderRows();
  }


  ngOnInit(): void {
    // this.datedujour= this.dateProduction
    this.datedujour = this.extract.getDateProduction()

    console.log("on entre dans ngOnInit voir-recettes");


    this.madateJourProduction = this.extract.getmaDateProduction()
    this.onModifDate(this.datedujour)
    this.jourDeLaProduction = this.getDayName()

    // this.dateProduction= this.routerActivate.snapshot.paramMap.get('dateProduction')
    // console.log("dans le constructeur this.dateProduction parametre router="+this.dateProduction)


    this.boulLogin = this.extract.getBoulanger();

    this.role.set(this.boulLogin.role);
    this.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;


    this.dossierRecetteObj = {
      dossierCommandesWeb: this.dossierCommandesWeb,
      dateProd: this.datedujour,
    };

    this.recettesForm = this.fb.group({
      recette: [null],
    });
    let connexion =
      "dossierCommandesWeb=" +
      this.dossierCommandesWeb +
      "&dateProd=" +
      this.datedujour;

    this.dateForm = this.fb.group({
      date: ["", Validators.required],
    });

    this.onModifDate(this.datedujour)

  }
  ngAfterViewInit() {
    console.log("on entre dans ngAfterViewInit voir-recettes");
  }
  ngOnChanges() {
    // create header using child_id
    console.log("on est dans NgOnChange")

    this.onModifDate(this.datedujour)
    this.jourDeLaProduction = this.getDayName()
    console.log("dans le NgOnChange")
    this.madateJourProduction = this.extract.getmaDateProduction()

  }
  sortData(sort: Sort) {
    const data = this.listRecettes().slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.listRecettes.set(
      data.sort((a: any, b: any) => {
        this.isAsc = sort.direction === "desc";

        switch (sort.active) {
          case "dateProd":
            return compare(a.dateProd, b.dateProd, this.isAsc);
          // case "chemin":
          //   return compare(a.chemin, b.chemin, this.isAsc);
          case "chemin":
            return compare(a.nomDocument, b.nomDocument, this.isAsc);

          case "categorie":
            return compare(a.categorie, b.categorie, this.isAsc);
          case "timestamp":
            return compare(a.timestamp, b.timestamp, this.isAsc);
          default:
            return 0;
        }
      })
    );
  }

  goToCommande() {
    this.router.navigate(["/commande"]);
  }

  update(e) {
    let connexion =
      "dossierCommandesWeb=" +
      this.dossierCommandesWeb +
      "&dateProd=" +
      this.datedujour;

    this.api.getRecettes(connexion).subscribe((resultRecettes: any) => {
      this.listRecettes.set(resultRecettes.data);


      this.listRecettes.set(
        this.listRecettes().sort((p1, p2) =>
          p1.chemin > p2.chemin ? 1 : p1.chemin < p2.chemin ? -1 : 0
        )
      );
    });
  }
  updateSelect() {
    let connexion =
      "dossierCommandesWeb=" +
      this.dossierCommandesWeb +
      "&dateProd=" +
      this.datedujour;
    this.api.getRecettes(connexion).subscribe((resultRecettes: any) => {
      this.listRecettes.set(resultRecettes.data);


      this.listRecettes.set(
        this.listRecettes().sort((p1, p2) =>
          p1.chemin > p2.chemin ? 1 : p1.chemin < p2.chemin ? -1 : 0
        )
      );
    });
    this.listRecettes.set(
      this.listRecettes().sort((p1, p2) =>
        p1.dateProd > p2.dateProd ? 1 : p1.dateProd < p2.dateProd ? -1 : 0
      )
    );
  }
  onSubmitDate() {
    this.resultRecherche = {
      date: this.dateForm.controls.date.value,
    };

    let connexion =
      "dossierCommandesWeb=" +
      this.dossierCommandesWeb +
      "&dateProd=" +
      this.datedujour;

    this.api.getRecettes(connexion).subscribe((resultRecettes: any) => {
      this.listRecettes.set(resultRecettes.data);

      if (this.role() == "boulanger") {
        const source: Observable<Recette> = from(this.listRecettes());
        const req = [];
        const example = source.pipe(
          filter((obj) => obj.dateProd == this.resultRecherche.date)
        );

        const subscribe = example.subscribe((val) => {
          req.push(val);
          return merge(req);
        });

        this.listRecettes.set(req);

        this.listRecettes().forEach(user => {
          user.production = false;  // Ajoute l'attribut 'age' avec une valeur de 30 à chaque objet
        });
      }


      this.listRecettes.set(
        this.listRecettes().sort((p1, p2) =>
          p1.chemin > p2.chemin ? 1 : p1.chemin < p2.chemin ? -1 : 0
        )
      );

      this.listRecettes.set(
        this.listRecettes().sort((p1, p2) =>
          p1.categorie > p2.categorie ? 1 : p1.categorie < p2.categorie ? -1 : 0
        )
      );
    });

    this.listRecettes.set(
      this.listRecettes().sort((a: any, b: any) =>
        a.dateProd < b.dateProd ? 1 : -1
      )
    );
  }
  onModifDate($dateProduction: Date) {


    let connexion =
      "dossierCommandesWeb=" +
      this.dossierCommandesWeb +
      "&dateProd=" +
      $dateProduction;


    this.api.getRecettes(connexion).subscribe((resultRecettes: any) => {
      this.listRecettes.set(resultRecettes.data);

      if (this.role() == "boulanger") {
        const source: Observable<Recette> = from(this.listRecettes());
        const req = [];
        const example = source.pipe(
          filter((obj) => obj.dateProd == $dateProduction)
        );

        const subscribe = example.subscribe((val) => {
          req.push(val);
          return merge(req);
        });

        this.listRecettes.set(req);
      }

      this.listRecettes.set(
        this.listRecettes().sort((p1, p2) =>
          p1.chemin > p2.chemin ? 1 : p1.chemin < p2.chemin ? -1 : 0
        )
      );

      this.listRecettes.set(
        this.listRecettes().sort((p1, p2) =>
          p1.categorie > p2.categorie ? 1 : p1.categorie < p2.categorie ? -1 : 0
        )
      );
    });

    this.listRecettes.set(
      this.listRecettes().sort((a: any, b: any) =>
        a.dateProd < b.dateProd ? 1 : -1
      )
    );
  }
  getDayName(date = new Date(this.madateJourProduction), locale = "fr-ca") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }
  productionFaite(index: number) {
    this.listRecettes()[index].production = true
    console.log("this.listRecettes()[1].production=" + this.listRecettes()[index].production)
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
