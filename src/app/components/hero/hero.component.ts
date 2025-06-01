import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BackgroudImageComponent } from 'src/app/components/backgroud-image/backgroud-image.component';
import { CommonModule } from '@angular/common';
import { AideComponent } from 'src/app/components/aide/aide.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';

@Component({
  selector: 'app-hero',
  imports:[CommonModule,AideComponent,BackgroudImageComponent,
    FooterComponent],
  templateUrl: './hero.component.html',
  standalone: true,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  openClick:boolean=false
extract=inject(ExtractLienFTPService)

  isAuth=signal<boolean>(false)
  constructor( public auth: AuthService){
if(this.extract.getisAuth()===true)
{
this.isAuth.set(true)

}
else{
  this.isAuth.set(false)
}
  }

  toggleComponent(){
   // this.openClick=!this.openClick

    window.location.href = 'https://www.boulangerieqc.com/wiki';
  }
}

