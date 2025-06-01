import { Component } from '@angular/core';
import { MatSort, Sort,MatSortModule } from '@angular/material/sort';
import {MatToolbarModule } from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-banner',
  standalone: true,
  imports:[MatSortModule,MatToolbarModule,MatIconModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

}
