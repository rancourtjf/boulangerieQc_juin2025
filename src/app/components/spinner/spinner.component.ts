import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
constructor(private spinner: NgxSpinnerService,public extractLienFTPService:ExtractLienFTPService){}
ngOnInit(): void {
  /** spinner starts on init */
  this.spinner.show();
  setTimeout(() => {
   /** spinner  1,3 second */
   this.spinner.hide();
   this.extractLienFTPService.alert();
   //this.router.navigate(['Produits']);
 }, 1300);
   }
}
