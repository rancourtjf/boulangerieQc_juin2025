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
import { VoirEquipesComponent } from 'src/app/components/voir-equipes/voir-equipes.component';

@Component({
  selector: 'app-add-equipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, VoirEquipesComponent],
  templateUrl: './add-equipe.component.html',
  styleUrl: './add-equipe.component.css'
})
export class AddEquipeComponent {

  newEquipe: FormGroup;
  http = inject(HttpClient);
  api = inject(ApiService);
  router = inject(Router)
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
  mesEquipes: Equipes[] = []
  dataSource = signal([])
  connection: any = { "dossierCommandesWeb": "", "tokenAuth": "", "nomEquipe": "" }


  ngOnInit() {

    this.boulLogin = this.extract.getBoulanger()
    console.log(this.boulLogin)
    this.connection.dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;;
    this.connection.tokenAuth = this.extract.getTokenAuth();
    this.connection.nomEquipe = this.boulLogin.nomEquipe
    console.log("this.connection" + JSON.stringify(this.connection))
    this.api.viewEquipe(this.connection).subscribe((result: any) => {
      this.mesEquipes = (result.data);
    });

    this.boulanger = this.extract.getBoulanger();
    this.boulLogin = this.extract.boulanger;

    this.newEquipe = this.formBuilder.group({
      nomEquipe: ['', [Validators.required]],
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
  envoiAjoutEquipe() {
    console.log("on entre dans envoiAjoutEquipe")

    let connectionMysqlObjTache = {
      nomEquipe: this.newEquipe.value.nomEquipe,
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb
    };

    this.api.addEquipe(connectionMysqlObjTache).subscribe((res) => {
      console.log(res);
      // if (res.status = 201) {
      //   this.simpleAlertConfirm("Création de l'équipe complétée")
      //   this.router.navigate(["afficheEquipes"]);
      // }
      // else {
      //   this.simpleAlertConfirm("La création de l'équipe n'a pas pu être complétée")
      // }
      this.simpleAlertConfirm("Création de l'équipe complétée")
      this.api.viewEquipe(this.connection).subscribe((result: any) => {
        this.mesEquipes = (result.data);

        this.simpleAlertConfirm("Création de l'équipe complétée")
        this.router.navigate(["afficheEquipes"]);
      });
    });
  }

}
