import { Component, inject, OnInit, signal } from "@angular/core";
import { ApiService } from "../../api.service";
import { MatSort, Sort, MatSortModule } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ExtractLienFTPService } from "../../extract-lien-ftp.service";
import { Boulanger } from "../../identificationBoul";
import { MatTableModule } from "@angular/material/table";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { filter, from, merge, Observable } from "rxjs";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Tache } from "../../models/tache";
import Swal from "sweetalert2";
import { InitialesResult } from "../../models/initialesModel";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getDay, getMonth, getYear } from "date-fns";
import { subDays } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';


@Component({
  selector: 'app-voir-taches',
  standalone: true,
  imports: [MatTableModule, MatSortModule, FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './voir-taches.component.html',
  styleUrl: './voir-taches.component.css'
})
export class VoirTachesComponent implements OnInit {

    formDeletePeriode: FormGroup;
    formBuilder = inject(FormBuilder);
    dateSuppression:Date=new Date

  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  // <fa-icon [icon]="faBookOpen"></fa-icon>

  api = inject(ApiService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  extract = inject(ExtractLienFTPService);
  boulLogin: Boulanger;
  dataSource = signal<Tache[]>([]);

  displayedColumns: string[] = [

    "nomEquipe",
    "descriptif",
    "datePrevue",
    "jourSemaine",
    "initiales",
    "fait",
    "Modifier"
  ]

  sortedData!: Tache[];
  connection: any = {};
  idTache = 0;
  username: string = ""
  isAsc: boolean;
  role: string;



  constructor() { }

  ngOnInit(): void {

    this.formDeletePeriode = this.formBuilder.group({
      dateTachesSupprimees: [new Date(), [Validators.required]],
    });
    //  this.idTache = this.route.snapshot.params["id"];
    this.boulLogin = this.extract.getBoulanger()
    this.role = this.boulLogin.role
    this.connection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;;
    this.connection.tokenAuth = this.extract.getTokenAuth();
    this.connection.nomEquipe = this.boulLogin.nomEquipe


    this.api.viewTache(this.connection).subscribe((result: any) => {
      this.dataSource.set(result.data);


      if (result.data === "Erreur : Token expired") {
        alert(
          "Votre jeton de 24 h est expiré, veuillez vous déconnecter et reconnecter"
        );
      }
    });
  }
  sortData(sort: Sort) {
    const data = this.dataSource().slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.dataSource.set(
      data.sort((a: any, b: any) => {
        this.isAsc = sort.direction === "desc";

        switch (sort.active) {
          case "descriptif":
            return compare(a.descriptif, b.descriptif, this.isAsc);
          case "nomEquipe":
            return compare(a.nomEquipe, b.nomEquipe, this.isAsc);
          case "fait":
            return compare(a.fait, b.fait, this.isAsc);
          case "timestamp":
            return compare(a.timestamp, b.timestamp, this.isAsc);
          case "jourSemaine":
            return compare(a.jourSemaine, b.jourSemaine, this.isAsc);
          case "initiales":
            return compare(a.initiales, b.initiales, this.isAsc);
          case "datePrevue":
            return compare(a.datePrevue, b.datePrevue, this.isAsc);

          default:
            return 0;
        }
      })
    );
  }
  goToCommande() {
    this.router.navigate(["/commande"]);
  }
  //test avec update_tacheTest
  modifTache(id: any) {
    let $id = parseInt(id);
    this.connection.id = $id; // this.sweetAlertInitiales(id)

    this.connection.dossierCommandesWeb = this.extract.boulanger.dossierCommandesWeb
    let $userInitiale = this.sweetAlertInitiales(id)
  }
  deleteTache(id: string, fait: boolean) {
    this.connection.ID = id;
    this.connection.dossierCommandesWeb = this.extract.boulanger.dossierCommandesWeb
    this.connection.fait = fait

    var result = confirm(
      "Voulez-vous vraiment supprimer la fiche de " + id + "?"
    );
    if (result) {
      //Logic to delete the item
      this.api.deleteTache(this.connection).subscribe((res) => {
        this.api.viewTache(this.connection).subscribe((result: any) => {
          this.dataSource.set(result.data);
        });
        (error) => {
          console.error("Erreur lors de la requête HTTP :", error);
        };
      });
    }
  }
  sweetAlertInitiales(id: number) {

    let usernameInput: HTMLInputElement

    Swal.fire<InitialesResult>({
      title: 'Entrez vos initiales',
      html: `
      <input type="text" id="username" class="swal2-input" placeholder="vos initiales">
    `,
      confirmButtonText: 'Tâche complétée',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!
        usernameInput = popup.querySelector('#username') as HTMLInputElement
        usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()

      },
      preConfirm: () => {
        this.username = usernameInput.value
        let usernameFormulaire = this.username
        if (!this.username) {
          Swal.showValidationMessage(`SVP entrez vos initiales`)
        }

        let $updateTache: Object = {
          ID: id,
          dossierCommandesWeb: this.boulLogin.dossierCommandesWeb,
          initiales: this.username,
          fait: true
        };


        //test avec updateTacheTest.php
        this.api.updateTache($updateTache).subscribe(
          (res) => {
            this.api.viewTache(this.connection).subscribe((result: any) => {
              this.dataSource.set(result.data);
            });
            (error) => {
              console.error("Erreur lors de la requête HTTP :", error);
            };
          });
        return { usernameFormulaire }
      },
    })
  }
  gotoAddTache() {
    console.log("on est dans gotoAddTache")
    this.router.navigate(['/addTache'])
  }
  deleteTachePeriode(){

  }
  submitPeriodeJour(){

    let $dateString: Date = this.formDeletePeriode.value.dateTachesSupprimees

   this.connection.dossierCommandesWeb = this.extract.boulanger.dossierCommandesWeb
   this.connection.dateDebutSuppression=$dateString
   this.connection.ID=-1

   var result = confirm(
     "Voulez-vous vraiment supprimer les tâches à partir du " + $dateString + " ?"
   );
   if (result) {
     //Logic to delete the item
     this.api.deleteTache(this.connection).subscribe((res) => {
       this.api.viewTache(this.connection).subscribe((result: any) => {
         this.dataSource.set(result.data);
       });
       (error) => {
         console.error("Erreur lors de la requête HTTP :", error);
       };
     });
   }

  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

