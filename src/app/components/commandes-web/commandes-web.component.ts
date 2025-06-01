import { Component, OnInit, inject } from '@angular/core';
import { SafePipeModule } from 'safe-pipe';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';


@Component({
  selector: 'app-commandes-web',
  imports:[SafePipeModule],
  standalone:true,

  templateUrl: './commandes-web.component.html',
  styleUrls: ['./commandes-web.component.scss']
})
export class CommandesWebComponent implements OnInit {


  extract=inject(ExtractLienFTPService)
  dossier:string
 lienURLcommandesWeb!: string;

 ngOnInit(): void {
this.dossier = this.extract.boulanger.dossierCommandesWeb
this.lienURLcommandesWeb="https://www.boulangerieqc.com/assets/crudmysql/listeCommandesFTP.php?dossier="+this.dossier
 }
}
