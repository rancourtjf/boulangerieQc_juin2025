import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { EnvoiAuBoulangerService } from 'src/app/services/envoi-au-boulanger.service';


@Component({
  selector: 'app-joindre',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './joindre.component.html',
  styleUrls: ['./joindre.component.scss']
})
export class JoindreComponent implements OnInit{

  extract= inject(ExtractLienFTPService)
  envoi=inject(EnvoiAuBoulangerService)
  formBuilder = inject(FormBuilder)
  helpForm :FormGroup

nom:string=""
varFrom:string=""
sujet:string=""
message:string=""

ngOnInit(): void {
  this.helpForm = this.formBuilder.group({
    nom: ["", Validators.required],
    sujet:["" , Validators.required],
    message:["" , Validators.required]
  });
}

envoiDemandeAide(event:Event) {
this.simpleAlertConfirm("Votre message a été envoyé à info@boulangerieqc.com")

this.nom=this.helpForm.value.nom

let boulanger=this.extract.getBoulanger()


this.varFrom=boulanger.emailClient
//this.varFrom=boulanger.emailClient

this.sujet=this.helpForm.value.sujet
this.message=this.helpForm.value.message

this.envoi.envoiMailHelp('?nom='+this.nom+'&varFrom='+this.varFrom+'&sujet='+this.sujet+'&message='+this.message)
}
simpleAlertConfirm(textAlert: string) {
  Swal.fire({
    icon: 'success',
    title: "C'est fait..",
    text: textAlert,
    timer: 1500,
    toast: true,
  });
}

}
