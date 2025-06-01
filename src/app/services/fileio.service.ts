import { Injectable } from '@angular/core';
import { Component, Input, OnInit, inject } from "@angular/core";
import { FileUploadService } from "src/app/services/file-upload.service";
import { HttpClient, HttpResponse, HttpEventType } from "@angular/common/http";
import { FileuploadCommandesService } from "src/app/services/fileupload-commandes.service";
import { ApiService } from "src/app/api.service";

@Injectable({
  providedIn: 'root'
})
export class FileioService {
  http = inject(HttpClient);
  fileService = inject(FileuploadCommandesService);
  api = inject(ApiService);
  fileName: any;
  selectedFiles: FileList | undefined;
  currentFile: File | undefined;

   // Variable to store shortLink from api response
   shortLink: string = "";
   loading: boolean = false; // Flag variable
   file: File | undefined;
   lienURLPhp: string = "";
   showTelechargement: boolean | undefined;

  constructor(
    private fileUploadService: FileUploadService,
  ) { }
   // On file Select
   onChange(file:File) {
 
    this.currentFile = file

    this.fileService.uploadFile(this.currentFile).subscribe((response) => {
      //this.selectedFiles.value = '';
      if (response instanceof HttpResponse) {
        let msg = response.body;
        console.log("msg=+msg")
   
      }
    });
    //======ajout 19-8-2023 fin

    this.onUpload();
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;

    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === "object") {
        // Short link via api response
        this.shortLink = event.link;
    
console.log("this.shortLink="+this.shortLink)
      }
    });
  }
}
