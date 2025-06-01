import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ExtractLienFTPService } from "../extract-lien-ftp.service";
import Swal from "sweetalert2";


@Injectable({
  providedIn: "root",
})
export class TransfertCommandesWebService {
  @Input()
  dateLundiCommandeString: string = ""; // decorate the property with @Input()
  @Input()
  objDataToMysql: Object | undefined;
  @Input()
  montant: number | undefined;
  @Input()
  oldCommande: boolean | undefined;
  
  fileName: string;
  msg: any;
  boulangerDossier: any;
  lienURLPhp: string = "";
  invendusActif: boolean = false;
  liencommandeFTP: string = "";
  liencommandeWebToMysql: string = "";
  messageEmail: string | undefined;

  extract = inject(ExtractLienFTPService);
  http = inject(HttpClient);

  constructor() {}

  fileSelected(fileFromCSV: any, filename: string) {
    const file: any = fileFromCSV;
    this.fileName = filename;

    console.log("dans service Transfert fileSelected avant uploadfile")


    this.uploadfile(file.csv, filename).subscribe((response) => {
      if (response instanceof HttpResponse) {
        this.msg = response.body;
      }
    });
  }

  uploadfile(file: any, filename: string): Observable<HttpEvent<{}>> {


    this.boulangerDossier = this.extract.boulanger.dossierCommandesWeb;
    const formData = new FormData();
    let blob = new Blob([file], {
      type: "application/octet-stream",
    });
    formData.append("file", blob);

    const body = formData;
 


    //const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
    const req = new HttpRequest(
      "POST",
      "https://www.boulangerieqc.com/assets/crudmysql/fileUploadNoDownload.php?dossier=" +
        this.boulangerDossier +
        "&filename=" +
        filename,
      body,
      {
        reportProgress: true,
        responseType: "text",
      }
    );

    return this.http.request(req);
  }

simpleAlertConfirm(textAlert: string) {
  Swal.fire({
    icon: "success",
    title: "Parfait...",
    text: textAlert,
    timer: 2000,
    toast: true,
  });
}
}
