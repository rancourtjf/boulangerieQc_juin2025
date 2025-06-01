import { Component } from '@angular/core';
import { SafePipeModule } from 'safe-pipe';

@Component({
  selector: 'app-logiciel',
  standalone: true,
  imports:[SafePipeModule],
  templateUrl: './logiciel.component.html',
  styleUrls: ['./logiciel.component.scss']
})
export class LogicielComponent {

}
