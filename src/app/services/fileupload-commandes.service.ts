import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtractLienFTPService } from '../extract-lien-ftp.service';


@Injectable({
  providedIn: 'root'
})
export class FileuploadCommandesService {

  http = inject(HttpClient)
  extract = inject(ExtractLienFTPService)


  boulangerDossier: string
  baseURLDossier = ""
  fileNameTophp: string = ""
  objtoMysql: Object;
  fichierAImporter: Object = {
    file: null,
    name: "",
    type: "text/csv"
  }

  constructor() { }


  uploadFile(file: File): Observable<HttpEvent<{}>> {
    this.boulangerDossier = this.extract.boulanger.dossierCommandesWeb

    console.log("on entre dans uploadFile boulangeDossierr="+this.boulangerDossier)

    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', 'https://www.boulangerieqc.com/assets/crudmysql/fileuploadRoy.php?dossier=' + this.boulangerDossier, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  uploadCSVToMysql(objDataToMysqlString: string): Observable<any> {

    let lienURLphp = 'https://www.boulangerieqc.com/assets/crudmysql/insert_commandeWeb.php?' + objDataToMysqlString

    return this.http.get<any>(lienURLphp)
  }


  uploadfileTest(file: any, filename: string): Observable<HttpEvent<{}>> {
    this.boulangerDossier = this.extract.boulanger.dossierCommandesWeb

    const formData = new FormData();
    let blob = new Blob([file], {
      type: 'application/octet-stream',
    });
    formData.append('file', blob);

    const body = formData;



    //const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
    const req = new HttpRequest('POST', 'https://www.boulangerieqc.com/assets/crudmysql/fileUploadNoDownload.php?dossier=' + this.boulangerDossier + '&filename=' + filename, body, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  getFileName() {
    return this.fileNameTophp
  }
  setFileName(filenam: string) {
    this.fileNameTophp = filenam
  }

  setObjToMysql(objMysql: Object) {
    this.objtoMysql = objMysql

  }


}
