import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { MessageAfficheComponent } from 'src/app/components/message-affiche/message-affiche.component';
import { Router,RouterLink } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports:[MessageAfficheComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() messageImport=signal<string>("test")
  
  api=inject(ApiService);
  extract=inject(ExtractLienFTPService)
  router=inject(Router)

  ngOnInit(): void {
  this.view_message()
  }

  view_message() {

    let connectionMysqlObjMessage = {
      "id1Boulangerie": 1,
      "messageText": "",
      "dateMessage": new Date(),
      "dossier": this.extract.getBoulanger().dossierCommandesWeb,
      "dossierCommandesWeb":this.extract.getBoulanger().dossierCommandesWeb
    };

    this.api.view_message(connectionMysqlObjMessage).subscribe((res) => {
      let arr = Object.values(res);
     
      let nbrMessage=arr.length
  
      let messageText = JSON.stringify(arr[0].messageText);
      this.messageImport.set(messageText);
    });
  }
  refEditor(){
    this.router.navigate(['/editor'])
  }

}
