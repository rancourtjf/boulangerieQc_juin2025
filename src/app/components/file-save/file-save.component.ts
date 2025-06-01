import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FileSaverOptions } from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';
import { FormsModule } from '@angular/forms';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-file-save',
  standalone: true,
  imports: [CommonModule,FormsModule,FontAwesomeModule],
  templateUrl: './file-save.component.html',
  styleUrl: './file-save.component.css'
})
export class FileSaveComponent {

  @Input() lienURLToDownload:string = ""
  @Input() nomFileToDownload: string= ""
  faDownload=faDownload

  text = `{ "text": "This is text file!中文" }`;
  fileName?: string;
  options: FileSaverOptions = {
    autoBom: false,
  };


  httpClient=inject(HttpClient)
  fileSaverService=inject(FileSaverService)

  onDown(type: string, fromRemote: boolean) {
    // const fileName = `save.${type}`;
    const fileName = this.nomFileToDownload;
    console.log("on entre dans onDown de file-save")

    if (fromRemote) {
      this.httpClient
        // .get(`assets/files/demo.${type}`, {
          .get(this.lienURLToDownload, {
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe((res) => {
          this.fileSaverService.save(res.body, fileName);
        });
      return;
    }
    const fileType = this.fileSaverService.genType(fileName);
    const txtBlob = new Blob([this.text], { type: fileType });
    this.fileSaverService.save(txtBlob, fileName, undefined, this.options);
  }
}


