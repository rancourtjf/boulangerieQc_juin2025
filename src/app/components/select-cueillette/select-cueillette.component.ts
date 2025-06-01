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
import { Cueillette } from '../../models/cueillette';
import { CommonModule } from "@angular/common";
import { filter, merge } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-cueillette',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './select-cueillette.component.html',
  styleUrl: './select-cueillette.component.css'
})
export class SelectCueilletteComponent implements OnInit{
  api = inject(ApiService)
  extract = inject(ExtractLienFTPService)
  listeLieux = signal([]);

  fb = inject(FormBuilder)
  router=inject(Router)
  form: any
  formBuilder:FormBuilder

  lieuCueillette = []
  adresse: string
  loading = false;

  constructor(){
this.form = this.formBuilder.group({
  lieu: ["",Validators.required]
  })
  this.listeLieux.set(['Option 1', 'Option 2', 'Option 3', 'Option 4']) 
}

  ngOnInit(): void {
    this.extract.unProduit=""
    
        this.form = this.fb.group({
          lieu: [null],
        });
    
            this.listeLieux.set(
              this.listeLieux().sort((p1, p2) =>
                p1.lieu > p2.lieu ? 1 : p1.lieu < p2.lieu ? -1 : 0
              )
            );
      
            let uniqueNames = this.listeLieux().map(item => item.lieu).filter((value, index, self) =>
              self.indexOf(value) === index);
            this.loading = false;
        }
        onSubmit() {
    
          this.adresse = this.form.value.lieu;
         // this.extract.unProduit= this.nomProduit 
         // this.onClick=!this.onClick
        }
    
      }
     

