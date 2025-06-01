import { AfterViewInit, Component,inject,OnInit, signal } from '@angular/core';
import { EditorModule } from 'primeng/editor';
import { FormsModule,ReactiveFormsModule,FormGroup, FormBuilder, FormGroupName, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams,httpResource } from '@angular/common/http';
//import { environment } from 'src/environnement/environnement';
import { environment } from 'src/environnement/environnement.prod';
import { ExtractLienFTPService } from 'src/app/extract-lien-ftp.service';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-editor',
  imports: [EditorModule,FormsModule,ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit{
 
  baseUrl = environment.baseUrl;
  content: string = '';
  dateMAJ: Date;
  http=inject(HttpClient)
  extract=inject(ExtractLienFTPService)
  api=inject(ApiService)
  fb=inject(FormBuilder)
  private apiUrl = this.baseUrl+'save-content.php'; // ← ajuste l'URL
  contentAjout: any = null

  contentEditor:any
  dossierCommandesWeb: string;
  dossierContent: any={};
  formdateMAJ: any;
  dateMAJImport:any;
  role:string=""


  constructor( private formBuilder: FormBuilder,){

    this.formdateMAJ = this.formBuilder.group({
      dateMAJ: [""],
    });
    let dossierConnection:any={}
    dossierConnection.dossierCommandesWeb=this.extract.boulanger.dossierCommandesWeb;
    this.dossierCommandesWeb=dossierConnection.dossierCommandesWeb
    this.dossierContent.dossierCommandesWeb=this.extract.boulanger.dossierCommandesWeb;
    this.role=this.extract.boulanger.role
    console.log("role="+this.role)

    let queryParams = new HttpParams({ fromObject: dossierConnection });

  this.contentEditor = httpResource<any>({
      url: this.baseUrl + 'load-content.php',
      method: 'GET',
      params: queryParams,
      headers: {
        'Accept': 'application/json'
      }
    });

this.dateMAJImport=
  httpResource<any>({
    url: this.baseUrl + 'load_date_pageContent.php',
    method: 'GET',
    params: queryParams,
    headers: {
      'Accept': 'application/json'
    }
  })

    this.http.get<{ dateMAJ: Date }>(this.baseUrl+'load_date_pageContent.php?dossierCommandesWeb='+this.dossierCommandesWeb).subscribe({
      next: (data) => {this.dateMAJ=data.dateMAJ},
      error: (err) => console.error('Erreur chargement ❌', err)
    });

  }

  ngOnInit(): void {

  // D'abord, vérifions ce que contient réellement contentEditor

  // Ensuite, essayons d'accéder à la valeur après un court délai
  setTimeout(() => {
   this.content= this.contentEditor.value().data.content;
   this.dossierContent.content=this.content;
   this.dateMAJ=this.dateMAJImport.value().data.dateMAJ;
   this.formdateMAJ.patchValue({
    dateMAJ: this.dateMAJ
  });
  }, 500);


  }

  onContentChange(): void {
   // this.saveContent();
   console.log("on entre dans onContentChange")
   this.saveContent();
  }

  saveContent() {
    this.http.post(this.apiUrl, {
      dossierCommandesWeb: this.dossierCommandesWeb,
      content: this.content,
      dateMAJ:this.dateMAJ
    }).subscribe({
      next: (res) => console.log('Contenu sauvegardé ✅'),
      error: (err) => console.error('Erreur sauvegarde ❌', err)
    });
  }
  loadContent(dossierCommandesWeb:string) {
    this.http.get<{ content: string }>(this.baseUrl+'load-content.php?dossierCommandesWeb='+this.dossierCommandesWeb).subscribe({
      next: (data) => {this.content = data.content;
        // this.dateMAJ=data.dateMAJ;
        console.log(data.content)},
      error: (err) => console.error('Erreur chargement ❌', err)
    });
    
  }
  saveDateMAJ($event:Event){
    this.dateMAJ=this.formdateMAJ.value.dateMAJ
console.log(this.dateMAJ)
  }


  
}


