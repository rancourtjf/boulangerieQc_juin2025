import { Component } from '@angular/core';
import { SafePipe } from 'safe-pipe';

@Component({
  selector: 'app-logiciel',
  standalone: true,
  imports:[SafePipe],
  templateUrl: './logiciel.component.html',
  styleUrls: ['./logiciel.component.scss']
})
export class LogicielComponent {

}
