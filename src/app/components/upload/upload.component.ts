import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  file: File;

  constructor(private http:HttpClient,private uploader:UploadService){}

  onChange($event: any) {
    this.file = $event.target.files[0];

    }

  onFilechange(event: any) {

    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.file) {
      this.uploader.uploadfile(this.file).subscribe(resp => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }

}
