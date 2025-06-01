import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { HeroComponent } from 'src/app/components/hero/hero.component';


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule,HeroComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  constructor(public auth:AuthService){

  }

}
