import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { Boulanger } from 'src/app/identificationBoul';
import { ActivatedRoute } from '@angular/router';
import { clientIndividuel } from 'src/app/models/clientIndividuel';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageAfficheComponent } from '../message-affiche/message-affiche.component';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router } from "@angular/router";
import { RouterModule, Routes } from "@angular/router";


@Component({
  selector: 'app-nom-individuel',
  standalone: true,
  providers: provideNgxMask(),
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './nom-individuel.component.html',
  styleUrl: './nom-individuel.component.css'
})
export class NomIndividuelComponent implements OnInit {

  form: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";

  emailBoulanger: string;
  http = inject(HttpClient);
  router = inject(Router)
  boulanger: Boulanger;


  api = inject(ApiService);
  extract = inject(ExtractLienFTPService);
  route = inject(ActivatedRoute);
  $connection: object;
  formBuilder = inject(FormBuilder)
  unLieu = signal<string>("")
  listeLieux = signal([]);

  constructor() {
    this.form = this.formBuilder.group({
      dateCommande: [new Date(), [Validators.required]],
      prenom: ["", Validators.minLength(1)],
      nom: ["", [Validators.required, Validators.minLength(1)]],
      telephone: ["", Validators.minLength(10)],
      courriel: ["",  Validators.email],
      cueillette: [""],
      lieu: [""],
      paye:[false],
      commentaires:[""]
    });

  }

  ngOnInit(): void {
    this.boulanger = this.extract.getBoulanger();

    if (this.boulanger.dossierCommandesWeb === "painsetroses") {
      this.listeLieux.set(['830 boulevard des Récollets, Trois-Rivières'])
    }

    if (this.boulanger.dossierCommandesWeb === "lesvraiesrichesses") {
      console.log("on entre dans this.extract.loginGroupeBoulangerie  lesvraiesrichesses")
      this.listeLieux.set(['Centre-Ville, 242 rue King Ouest, Sherbrooke', 'Jacques-Cartier, 1705 rue King Ouest, Sherbrooke', 'Rock-Forest, 11 rue Léger, Sherbrooke'])
 
    }
    if (this.boulanger.dossierCommandesWeb === "boulangerieqc") {
     // this.listeLieux.set([''])
      this.listeLieux.set(['Centre-Ville, 242 rue King Ouest, Sherbrooke', 'Jacques-Cartier, 1705 rue King Ouest, Sherbrooke', 'Rock-Forest, 11 rue Léger, Sherbrooke'])
    }
  }

  onSubmit() {


    this.unLieu.set(this.form.value.lieu)
    this.extract.setClientIndividuel(this.form.value)
    this.router.navigate(["/commande"]);

  }

}
