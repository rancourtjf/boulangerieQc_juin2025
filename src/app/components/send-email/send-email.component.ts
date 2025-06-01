import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { FormArray, FormBuilder, FormControl, Validators,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { EnvoiAuBoulangerService } from 'src/app/services/envoi-au-boulanger.service';
import { Router } from '@angular/router';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { FileUploadService } from 'src/app/services/file-upload.service';


//https://www.itsolutionstuff.com/post/file-upload-with-angular-reactive-forms-exampleexample.html
//https://blog.angular-university.io/angular-file-upload/

@Component({
  selector: 'app-send-email',
  imports: [  ReactiveFormsModule,CommonModule],
  standalone: true,
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit{
       // Variable to store shortLink from api response
       shortLink: string = "";
       loading: boolean = false; // Flag variable
       file: File = null; // Variable to store file

  SERVER_URL = "https://www.boulangerieqc.com/uploadCommandes";
  //SERVER_URL = "https://www.file.io/";
  fb=inject(FormBuilder)

  addForm: any;
 
  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });

  myForm = this.fb.group({
    name: ['', Validators.required], 
    file: ['', Validators.required], 
    fileSource: ['', Validators.required], 
  });

  constructor(public auth:AuthService,
    private http:HttpClient,
    private sendEmail:EnvoiAuBoulangerService,
    private router:Router,
    private formBuilder:FormBuilder,
    private extract:ExtractLienFTPService,
    private fileUpload:FileUploadService
    ){
      this.addForm = this.formBuilder.group({
        to: [this.extract.emailAuBoulanger, Validators.required],  
        subject: ['envoi de commande'],  
        message: ['Voici ma commande du ',new Date()] ,
        from: [this.extract.boulanger.emailClient, Validators.required] ,
        file: ['', Validators.required],    
        fileSource: new FormControl('', [Validators.required])

      })
      
      }

  ngOnInit(): void {

  }
   // On file Select
   onChange(event:any) {
    this.file = event.target.files[0];
   }
      // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;

    this.fileUpload.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable 
                //this.sendEmail.createCommande(this.shortLink)
            }
        }
    );
  } 

  onSubmit(){
    this.sendEmail.createCommande(this.addForm.value).subscribe(
      (data:any)=>{
        this.router.navigate(['/commande']);  
      },  
     error => {  
       alert(error);
     });
  }
  get f(){
    return this.myForm.controls;
  }
  submit() {
    const formData = new FormData();
    formData.append('file', this.addForm.get('fileSource').value);
   
    alert('formData:'+(this.addForm.get('fileSource').value))
    // this.http.post('http://localhost:8001/upload.php', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
      this.http.post(this.SERVER_URL, formData)
      .subscribe(res => {

        alert('Uploaded Successfully.');
      })
      this.http.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }   

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
 }
  

