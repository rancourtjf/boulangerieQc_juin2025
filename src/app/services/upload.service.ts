import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//https://www.filestack.com/fileschool/angular/angular-file-upload-tutorial/
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  public uploadfile(file: File) {

    let formParams = new FormData();
    formParams.append('file', file)

    return this.http.post('https://www.boulangerieqc.com/assets/crudmysql/upload.php', formParams)
  }
}
