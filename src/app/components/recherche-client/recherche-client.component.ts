import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-recherche-client',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './recherche-client.component.html',
  styleUrls: ['./recherche-client.component.scss']
})
export class RechercheClientComponent {
  listEquipe:any[]
  @ViewChild('teams') teams!: ElementRef;
	selectedTeam = '';
  api=inject(ApiService)
  constructor(){
    this.listEquipe= [
      {
        id: '1',
        nom: 'Canadien'
      },
      {
        id: '2',
        nom: 'Toronto'
      },
      {
        id: '3',
        nom: 'Detroit'
      }]

   
  }


	update(e) {
		this.selectedTeam = e.target.value
    
	}
}
