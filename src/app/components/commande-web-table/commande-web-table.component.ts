import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatSort, Sort, MatSortModule, } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
//import { NgbdSortableHeader } from './directives/sortable.directive';
import { FileSaveComponent } from '../file-save/file-save.component';
import { CommandeWeb } from 'src/app/models/commandeWeb';
import { ApiService } from '../../api.service';
import { Facture } from '../../models/facture';
import { ItemService } from '../../services/item.service';
import { PageEvent } from '@angular/material/paginator';
import { ExtractLienFTPService } from '../../extract-lien-ftp.service';
import { Observable, from, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Boulanger } from '../../identificationBoul';
import { CommandesWebComponent } from 'src/app/components/commandes-web/commandes-web.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { getDay, getMonth, getYear } from 'date-fns';

@Component({
  selector: 'app-commande-web-table',
  standalone: true,
  imports:[MatTableModule,MatSortModule,FileSaveComponent],
  templateUrl: './commande-web-table.component.html',
  styleUrls: ['./commande-web-table.component.scss']
})
export class CommandeWebTableComponent implements OnInit {
  @ViewChild(MatSort)
  sort: MatSort | undefined;
  api = inject(ApiService);
  item = inject(ItemService);
  extract = inject(ExtractLienFTPService);
  router = inject(Router);
  displayedColumns: string[] = [
    'nom_commandeCSV',
    'dateLundi',
    'montant',
    'invendus',
    'id',
    'timeStamp',
    'idclient',
    'nomClient',

  ];
  dataSource!: CommandeWeb[];
  sortedData!: CommandeWeb[];
  postPerPage: number;
  pageNumber: number;
  isAsc: boolean = true;
  itemObservable: any;
  boulLogin: Boulanger;
  $connection: string;
  rechercheFactFind: CommandeWeb;
  resultOnefactExtract: any;
  Idetconnection: any;
  commandeWebToFind:Object;

  constructor() {

  }
  ngOnInit(): void {
    console.log('on entre dans ngONInit voir-commande-web-table')
    this.boulLogin = this.extract.getBoulanger();

    let $db_host = this.boulLogin.db_host;
    let $db_name = this.boulLogin.db_name;
    let $db_username = this.boulLogin.db_username;
    let $db_password = this.boulLogin.db_password;
    var $idclient=this.boulLogin.idclient
    if(this.boulLogin.role=='boulanger'){
// on veut chercher toutes les commandes et non seulement celles d'un client
$idclient=0
    }
    else{
      $idclient=this.boulLogin.idclient;
    }

    this.commandeWebToFind={
      dossierCommandesWeb:this.boulLogin.dossierCommandesWeb
     // idclient:$idclient
    }

    this.api
      .getCommandeWebInformation(this.commandeWebToFind)
      .subscribe((result: any) => {
        this.dataSource = result.data;

        if (this.boulLogin.role == 'client') {
          const source: Observable<CommandeWeb> = from(this.dataSource);
          const req = [];
          const example = source.pipe(
            filter((obj) => obj.idclient == this.boulLogin.idclient)
          );

          const subscribe = example.subscribe((val) => {
            req.push(val);
            return merge(req);
          });

          this.dataSource = req;
        } else {
          //le boulanger peut voir toutes les factures
  
        }

        // this.dataSource = this.dataSource.sort((p1, p2) =>
        //   p1.dateLundi < p2.dateLundi ? 1 : p1.dateLundi > p2.dateLundi ? -1 : 0
        // );
        this.dataSource = this.dataSource.sort((p1, p2) =>
        p1.timeStamp < p2.timeStamp ? 1 : p1.timeStamp > p2.timeStamp ? -1 : 0
      );
      });
  }


  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.dataSource = data.sort((a: any, b: any) => {
      this.isAsc = sort.direction === 'desc';

      switch (sort.active) {
        case 'dateLundi':
          return compare(a.dateLundi, b.dateLundi, this.isAsc);
        case 'idclient':
          return compare(a.idclient, b.idclient, this.isAsc);
          case 'nom_commandeCSV':
            return compare(a.nom_commandeCSV, b.nom_commandeCSV, this.isAsc);
            case 'id':
              return compare(a.id, b.id, this.isAsc);
              case 'nomClient':
                return compare(a.nomClient, b.nomClient, this.isAsc);
      
          case 'timeStamp':
            return compare(a.timeStamp, b.timeStamp, this.isAsc);
  
        default:
          return 0;
      }
    });
  }
  onPaginate(pageEvent: PageEvent) {
    //https://medium.com/swlh/data-table-pagination-using-angular-material-f397e3d14308
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    this.item.getItems(this.postPerPage, this.pageNumber);
  }
  goToCommande() {
    this.router.navigate(['/commande']);
  }

  simpleAlertConfirm(textAlert: string) {
    Swal.fire({
      icon: 'success',
      title: 'Livraison faite...',
      text: textAlert,
      timer: 2500,
      toast: true,
    });
  }
  SimpleAlertLivraison(textAlert: string) {
    Swal.fire({
      icon: 'success',
      title: 'Livraison faite...',
      text: textAlert,
      footer: '<a href="">Au plaisir de vous servir!</a>',
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}