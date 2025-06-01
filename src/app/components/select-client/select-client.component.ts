import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { ApiService } from '../../api.service';
import { Client } from "../../models/client";
import { CommonModule } from "@angular/common";
import { filter, merge } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-select-client',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './select-client.component.html',
  styleUrl: './select-client.component.css'
})
export class SelectClientComponent implements OnInit {
  api = inject(ApiService)
  extract = inject(ExtractLienFTPService)
  clients = signal<Client[]>([]);
  fb = inject(FormBuilder)
  noClientChoisi: number;
  role = signal<string>("");
  listeDesClients = signal<Client[]>([])
  nomClient: string
  noIDClient: number
  dataSourceClients: any;
  clientForm: FormGroup<{ client: FormControl<any> }>;
  loading = false;
  boulLogin: import("/Users/1jf/Documents/Documents_Mac_local/boulangerieQcSiteWeb/src/app/identificationBoul").Boulanger;
 onClick:boolean=false
 
  constructor() {

  }
  ngOnInit(): void {
    this.boulLogin = this.extract.getBoulanger();
    this.extract.unClientID=0
    this.extract.unNomClient=""
    
    this.role.set(this.boulLogin.role);

    this.clientForm = this.fb.group({
      client: [null],
    });
    let $dossierCommandesWeb = this.extract.boulanger.dossierCommandesWeb
    this.loading = true;
    this.api
      .getUsers( this.boulLogin.dossierCommandesWeb)
      .subscribe((resultClients: any) => {
        this.listeDesClients.set(resultClients.data);

        this.listeDesClients.set(
          this.listeDesClients().sort((p1, p2) =>
            p1.nom > p2.nom ? 1 : p1.nom < p2.nom ? -1 : 0
          )
        );
      });

  }
  onSubmit() {
    this.noClientChoisi = this.clientForm.value.client;
    const objetTrouve = this.listeDesClients().find(objet => objet.idclient === this.noClientChoisi);
    this.extract.setunClientID(this.noClientChoisi,objetTrouve.nom)
    this.onClick=!this.onClick
  }
}
