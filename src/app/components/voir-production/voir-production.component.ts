import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ExtractLienFTPService } from "src/app/extract-lien-ftp.service";
import { AuthService } from "@auth0/auth0-angular";
import { Router } from "@angular/router";
import { SafePipe } from "safe-pipe";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-voir-production",
  standalone: true,
  imports: [SafePipe, CommonModule],
  templateUrl: "./voir-production.component.html",
  styleUrls: ["./voir-production.component.scss"],
})

export class VoirProductionComponent implements OnInit, OnChanges {
  date = Date();

  documents: any;
  @Input() formDate!: object;
  @Input() isOpen: boolean = false;
  lienURL!: string;
  lienURLProduction!: string;
  lienCommande!: string;
  lienRecettes!:string;
  logo!: string;
  role: string;
  dossier: string;
  lienURLFacturation: string;
  sanitizer: any;

  // https://www.boulangerieqc.com/croissantdelune/recettesPDF/


  constructor(
    public extractLienFTPService: ExtractLienFTPService,
    public auth: AuthService,
    public router: Router
  ) {
    this.lienURL = this.extractLienFTPService.boulanger.userURLSiteFTP;
    this.logo = this.extractLienFTPService.boulanger.logoBoulangerie;
    this.role = this.extractLienFTPService.boulanger.role;


    let siteFtpClient: string;
    if (this.role == "client") {
      siteFtpClient = this.extractLienFTPService.boulanger.userURLSiteCommande;
      this.lienURL = siteFtpClient;
      this.lienURLProduction = "";
    }
  }
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    console.log("On est dans le ngOninit de voir-production");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("On est dans le ngonchange de voir-production");
    let siteFtpClient: string;
    if (this.role == "boulanger") {

      siteFtpClient = this.extractLienFTPService.boulanger.userURLSiteFTP;
      this.lienRecettes =siteFtpClient+"recettesPDF/"
  

      this.lienURL =
        siteFtpClient +
        changes["formDate"].currentValue.dossier +
        "/" +
        changes["formDate"].currentValue.date +
        "/";
   
      this.lienURLProduction = this.lienURL;
      this.lienURLFacturation =
        this.extractLienFTPService.boulanger.userURLSiteFTP +
        "/FacturationQuotidienne/" +
        changes["formDate"].currentValue.date +
        "/";

      this.dossier = changes["formDate"].currentValue.dossier;
    } else {
      this.lienURL = this.extractLienFTPService.boulanger.userURLSiteCommande;
    }
  }
}
