
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, signal, output, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../api.service';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Boulanger } from '../../identificationBoul';
import { Detail } from '../../models/detail';
import { AddServiceService } from '../../services/add-service.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-select-date-range',
  standalone: true,
  templateUrl: './select-date-range.component.html',
  styleUrl: './select-date-range.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDateRangeComponent implements OnInit {

  @Input() sommeDate1: number
  @Input() sommeDate2: number
  @Input() sommeDate3: number
  @Input() sommeDate4: number

  @Input() dateRangChoix: number;

  status = output<string>();
  add = inject(AddServiceService)
  api = inject(ApiService)
  extract = inject(ExtractLienFTPService)
  router = inject(Router);
  total$: Observable<number>;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  start: string = ""
  end: string = ""
  boulLogin: Boulanger;
  detailRecus = signal<Detail[]>([]);
  selectProduit: string
  private route = inject(ActivatedRoute);

  ngOnInit(): void {

    this.selectProduit = this.route.snapshot.params["type_facture"];

  }
  onSubmitDateCommande() {

    let DateDebut = this.range.value.start
    let DateFin = this.range.value.end
    this.start = this.api.formatDate(DateDebut)
    this.end = this.api.formatDate(DateFin)

    console.log("dans submit date this.start, this.end="+this.start+" "+this.end)

    this.extract.setDateRange(this.start, this.end)


    this.boulLogin = this.extract.boulanger

    let $dossierCommandesWeb = this.boulLogin.dossierCommandesWeb;

    const DetailBetweenObj = {
      dossierCommandesWeb: $dossierCommandesWeb,
      startDate: this.start,
      endDate: this.end,
      unProduit:this.extract.unProduit,
      id_client:this.extract.unClientID
    };
    console.log("unProduit="+this.extract.unProduit)
    console.log("id_client="+this.extract.unClientID)

    console.log("DetailBetweenObj avant extract details"+JSON.stringify(DetailBetweenObj))

    this.api.getDetailsBetweenDates(DetailBetweenObj).subscribe((res: any) => {

      this.detailRecus.set(res.data);

      if(this.detailRecus()===undefined){
        alert("il n'y pas de donnée pour cette requête...")
        stop
      }
 
      let $nbrDetail = this.detailRecus().length
      let $somme: number = 0

      $somme = 0
      this.detailRecus().forEach(user => {
        let $nbrString = user.total_vente.toString()
        let $ajout = (parseFloat($nbrString)); // Conversion en nombre
        $somme += $ajout
      })
      $somme = parseFloat($somme.toFixed(2)); // Arrondir le total si nécessaire
      let startEnd: string
      startEnd = this.start + "-" + this.end

      this.extract.setSommeDate($somme, this.dateRangChoix, startEnd)
      this.onChangeStatus()
    })
  }
  onChangeStatus() {
    this.status.emit('');
  }

}

function Output(): (target: SelectDateRangeComponent, propertyKey: "childVariableStartEnd") => void {
  throw new Error('Function not implemented.');
}

