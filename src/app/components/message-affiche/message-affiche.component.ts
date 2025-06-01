import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-message-affiche',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './message-affiche.component.html',
  styleUrls: ['./message-affiche.component.scss']
})
export class MessageAfficheComponent {
@Input() message:string =""


}
