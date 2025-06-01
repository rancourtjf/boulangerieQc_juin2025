import { Component } from '@angular/core';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { BannerComponent } from '../banner/banner.component';
import { VoirProductionComponent} from '../voir-production/voir-production.component'


@Component({
  selector: 'app-recherche',
  standalone: true,
  imports:[VoirProductionComponent,CommonModule,
    FormsModule,SafePipeModule,ReactiveFormsModule],
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {


date=Date()
resultRecherche:object={id:0,date:Date(),dossier:""}
isOpen:boolean=true
isResultFindComplet:boolean=true
lienURL!:string
logo!:string


constructor(private router:Router,private formBuilder: FormBuilder,private extractLienFTPService:ExtractLienFTPService)
{this.logo=this.extractLienFTPService.boulanger.logoBoulangerie}

findForm = this.formBuilder.group({
  date: ['', Validators.required],  
  dossier: ['',[Validators.required,Validators.minLength(2)]]
  }
  )
 
onSubmit() {
this.resultRecherche={
  date:this.findForm.controls.date.value,
  dossier:this.findForm.controls.dossier.value
}
this.isOpen=false
console.log('dossier et date Recherche=',this.resultRecherche)

  }
}
