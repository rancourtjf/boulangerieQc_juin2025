
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { Boulanger } from 'src/app/identificationBoul';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { listeJours } from '../../models/listeJours';
import { Equipes } from '../../models/equipes';
import { getDay, getMonth, getYear } from "date-fns";
import { subDays } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';
import { VoirTachesComponent } from 'src/app/components/voir-taches/voir-taches.component';



@Component({
  selector: 'app-taches-livraison',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VoirTachesComponent],
  templateUrl: './taches-livraison.component.html',
  styleUrl: './taches-livraison.component.css'
})
export class TachesLivraisonComponent implements OnInit {
  jourSemaine: string;
  newTache: FormGroup;
  http = inject(HttpClient);
  api = inject(ApiService);
  router=inject(Router)
  extract = inject(ExtractLienFTPService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  tacheExistant: any;
  $connection: string;
  nomEquipe: string = ""

  boulanger: Boulanger;
  boulLogin: any;
  textAlert: string = ""
  listeJours = listeJours
  truck: string = "truck";
  mesEquipes:Equipes[]=[]
  dataSource=signal([])
  connection:any={ "dossierCommandesWeb":"","tokenAuth":"","nomEquipe":""}

  repetitionArray:number[]=[7,14,28]
  cacherRepetition:boolean =false

  constructor() {}

  ngOnInit() {


    this.boulLogin = this.extract.getBoulanger()

    this.connection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;;
    this.connection.tokenAuth = this.extract.getTokenAuth();
    this.connection.nomEquipe=this.boulLogin.nomEquipe

    this.api.viewEquipe(this.connection).subscribe((result: any) => {
      this.mesEquipes=(result.data);

    });

    this.boulanger = this.extract.getBoulanger();
    this.boulLogin = this.extract.boulanger;

    this.newTache = this.formBuilder.group({
      descriptif: ['', [Validators.required]],
      dateDebut: [new Date()],
      dateFin: [new Date()],
      jourSemaine: ["",[Validators.required]],
      repetition:[7,[Validators.required]],
      nomEquipe: [""],
      initiales: [""],
    });
  }

  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: 'success',
      title: 'Attention...',
      text: textAlert,
      timer: 2000,
      toast: true,
    });
  }
  simpleAlertNonTransmission(textAlert: string) {
    Swal.fire({
      icon: 'error',
      title: 'Attention...',
      text: textAlert,
      timer: 2000,
      toast: true,
    });
  }

  envoiAjoutTache() {

  let  startDate = this.newTache.value.dateDebut
   let  endDate = this.newTache.value.dateFin

     //methode pour calculer le nombre de répétition de cette tâche
     let $intervalle = differenceInDays(endDate, startDate);
     console.log("$intervalle="+$intervalle)
     console.log(this.newTache.value)

    let $repetition=$intervalle/this.newTache.value.repetition;
    console.log("$repetition="+$repetition)
    let $jourSemaine=[]

    if(this.newTache.value.jourSemaine==="tous les jours"){
      this.cacherRepetition=true
   

      $jourSemaine=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche']
 
      console.log($jourSemaine)
      console.log("dans le else de tous les jours? OUI ="+JSON.stringify($jourSemaine))
    }
    else{
      $jourSemaine=[this.newTache.value.jourSemaine]
      console.log("dans le else de tous les jours? non ="+JSON.stringify($jourSemaine))
      console.log($jourSemaine)
    }
   let $nbrElement=$jourSemaine.length

 
for(let $jour=0;$jour<$nbrElement;$jour++){


  for (let $i = 0; $i < $repetition; $i++) {
    console.log($i);
    let $jourTxt=$jourSemaine[$jour]
    console.log($jourTxt)

    let connectionMysqlObjTache = {
      descriptif: this.newTache.value.descriptif,
      datePrevue:addDays(startDate,((this.newTache.value.repetition* $i))+$jour),
      dateDebut:this.newTache.value.dateDebut,
      dateFin:this.newTache.value.dateFin,
     // jourSemaine:this.newTache.value.jourSemaine,
      jourSemaine:$jourTxt,
      nomEquipe: this.newTache.value.nomEquipe.nomEquipe,
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb
    };
    console.log(JSON.stringify(connectionMysqlObjTache))
    console.log(this.newTache.value.dateFin)
    console.log(connectionMysqlObjTache.datePrevue>this.newTache.value.dateFin)

    let d=connectionMysqlObjTache.datePrevue
    let $date= new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
   let dateString = $date.toLocaleDateString();
   console.log("dateString="+dateString)
    if(dateString>this.newTache.value.dateFin){
console.log("on entre dans le if pour pas ajouter de tache")
    }

 

else{
    this.api.addTache(connectionMysqlObjTache).subscribe((res) => {
      let status = res.status;
      console.log("status apres addTache="+status)
      if (status == 201) {
        this.simpleAlertConfirm("Ajout de la tâche complétée")
        this.router.navigate(["afficheTache"]);
      }
      else {
        this.simpleAlertNonTransmission("La transmission de la tâche n'a pas pu être complétée")
      }
    });
  }
  }
}
  }
}
