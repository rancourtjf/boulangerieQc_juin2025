import { Component } from '@angular/core';
import { inject, OnInit, signal } from '@angular/core';
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
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Rupture } from '../../models/heure-rupture';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';




@Component({
  selector: 'app-add-heure-rupture',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,NgxMatTimepickerModule,
    MatFormFieldModule,MatSelectModule,MatOptionModule
  ],
  templateUrl: './add-heure-rupture.component.html',
  styleUrl: './add-heure-rupture.component.css'
})
export class AddHeureRuptureComponent {
  extract = inject(ExtractLienFTPService);
  formBuilder = inject(FormBuilder);
  newTime: FormGroup;
  selectedTime: string = '';
  selectedHour: number = 0;
  hours: number[] = Array.from({length: 24}, (_, i) => i);


  ngOnInit(): void {
    this.newTime = this.formBuilder.group({
      heureRupture: [new Date(), [Validators.required]],
    });

  }

  envoiHeureRupture() {
    let connectionMysqlObjRupture: Rupture = {
      id1Client: this.extract.unClientID,
      idProduit: 1,
      heureRupture: this.newTime.value.messageText,
      dossierCommandesWeb: this.extract.boulanger.dossierCommandesWeb
    };
    console.log("connectionMysqlObjRupture="+JSON.stringify(connectionMysqlObjRupture))

  }
}
