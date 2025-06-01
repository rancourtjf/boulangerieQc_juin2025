import { Component, OnInit, inject } from '@angular/core';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
import { ApiService } from '../../api.service';
import { BoulangerBoss } from '../../models/boulagerBoss';
import Swal from 'sweetalert2';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from 'src/app/identificationBoul';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table'
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { filter, from, merge, Observable } from 'rxjs';


@Component({
  selector: 'app-voir-boulange',
  standalone:true,
  imports:[MatTableModule,FontAwesomeModule],
  templateUrl: './voir-boulange.component.html',
  styleUrls: ['./voir-boulange.component.scss'],
})
export class VoirBoulangeComponent implements OnInit {
  api = inject(ApiService);
  extract=inject(ExtractLienFTPService)
  router=inject(Router)

  dataSource!: any[];
  leboulanger:any
  boulLogin:any
  logoClient:string=""
  $dossierCommandesWeb:string
  connexion: any = {};
  faTrash = faTrash;
  faEdit = faEdit;
  connection: any = {}
  dossierCommandesWeb:string=""

  
  
  displayedColumns: string[] = [
    'idclient',
    'nom',
    'courriel',
    'adresse',
    'ville',
    'codepostal',
    'telephone',
    'courrielcommande',
    'courriel_retour_paye',
    'date_code_acces_d',
    'date_fin_acces_d',
    'datenewVersion',
    'debutCalendrierLundi',
    'emailEnvoiAuBoulanger',
    'heure_tombee_production_h',
    'jours_conservation_FTP',
    'monnaieCanada_b',
    'noCompteTPS',
    'noCompteTVQ',
    'noVersion',
    'ouvertlundi_b',
    'ouvertmardi_b',
    'ouvertmercredi_b',
    'ouvert_jeudi_b',
    'ouvert_vendredi_b',
    'ouvert_samedi_b',
    'ouvert_dimanche_b',
    'site_internet_a',
    'transmissionProduitComptable',
    'txtVersementBancaire',
    'Modifier'

  ];
  notel: string;


  ngOnInit(): void {
 
this.leboulanger=this.extract.boulanger


this.connection={}
this.connection.dossierCommandesWeb = this.leboulanger.dossierCommandesWeb;;
this.connection.tokenAuth = this.extract.getTokenAuth();

this.api.getBoulanger(this.connection).subscribe((result:any)=>{
    this.dataSource = result.data;
this.logoClient=this.extract.getBoulanger().logoBoulangerie

  this.dataSource[0].telephone = this.dataSource[0].telephone.substr(0, 3) + '-' + 
  this.dataSource[0].telephone.substr(3, 3) + '-' + 
  this.dataSource[0].telephone.substr(6, 4);
})
  }
  simpleConfirmImage() {

    Swal.fire({
      title: this.dataSource[0].nom,
      text: 'téléphone: ' + this.dataSource[0].telephone + '            courriel: '+this.dataSource[0].courriel,
      imageUrl: '../../assets/imagesPain/seigle.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'image boulangerie',
    });
  }
  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: 'success',
      title: 'Parfait...',
      text: textAlert,
      timer: 1500,
      toast: true,
    });
  }
  goToCommande(){
    this.router.navigate(['/commande'])
  }
    modifBoulanger(id: any) {
      let $id = parseInt(id);

      this.connection.id = $id;
      this.connection.dossierCommandesWeb = this.leboulanger.dossierCommandesWeb;;
      this.connection.tokenAuth = this.extract.getTokenAuth();
  
      this.api.getBoulanger(this.connection).subscribe((result: any) => {
        this.dataSource=(result.data);
  
        const source: Observable<any> = from(this.dataSource);
        const req = [];
        let example = source.pipe(filter((obj) => obj.id == this.connection.id));
  
        const subscribe = example.subscribe((val) => {
          req.push(val);
          return merge(req);
        });
  
        this.dataSource=(req);
  
        this.extract.setClient(this.dataSource);
        this.router.navigate(["/modifyBoulangerie"]);
      });
    }
    deleteBoulangerie(id: string) {
      this.connection.id = id;
  
      var result = confirm(
        "Voulez-vous vraiment supprimer la fiche de " + id + "?"
      );
      if (result) {
        //Logic to delete the item
        this.api.deleteBoulangerie(this.connection).subscribe((res) => {
          this.api.getBoulanger(this.connection).subscribe((result: any) => {
            this.dataSource=(result.data);
          });
          (error) => {
            console.error("Erreur lors de la requête HTTP :", error);
          };
        });
      }
    }
  
}


