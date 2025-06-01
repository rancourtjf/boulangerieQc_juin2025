import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NousjoindreService {
http=inject(HttpClient)

  constructor() { }

  envoiMailHelp(lienURLPhp: string):Observable<any> {
    let phpLink ='https://www.boulangerieqc.com/assets/crudmysql/mailHelp.php?'+lienURLPhp

    this.simpleAlertConfirm("Votre message a été envoyé à info@boulangerieqc.com")
    return this.http.get<any>(phpLink)
  }
  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: 'success',
      title: "C'est fait..",
      text: textAlert,
      timer: 1500,
      toast: true,
    });
  }
}
