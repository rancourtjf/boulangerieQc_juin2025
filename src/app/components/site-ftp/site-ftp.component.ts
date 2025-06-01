import { Component,Input,OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { SafePipe } from 'src/app/safe.pipe';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { AideComponent } from '../aide/aide.component';
import { CommonModule } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';

@Component({
  selector: 'app-site-ftp',
  standalone:true,
imports:[AideComponent,CommonModule,SafePipeModule],
  templateUrl: './site-ftp.component.html',
  styleUrls: ['./site-ftp.component.scss']
})
export class SiteFTPComponent implements OnChanges,OnInit {
lienURL!: string;
logo!:string
openAide!:boolean
routerLink: any;

@Input()formDate!:object


constructor(
  public  extractLienFTPService:ExtractLienFTPService, public auth:AuthService
){


}
  ngOnInit(): void {
    this.lienURL=this.extractLienFTPService.boulanger.userURLSiteFTP
    this.logo=this.extractLienFTPService.boulanger.logoBoulangerie
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    let siteFtpClient=this.extractLienFTPService.boulanger.userURLSiteFTP
    this.lienURL=siteFtpClient+changes['formDate'].currentValue.dossier+"/"+changes['formDate'].currentValue.date+"/"
  }
toggleAide(){
  this.openAide= this.extractLienFTPService.toggleComponent()

}
}
