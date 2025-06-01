import { Component } from "@angular/core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-accordion-rens",
  templateUrl: "./accordion-rens.component.html",

  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  styleUrls: ["./accordion-rens.component.scss"],
})
export class AccordionRensComponent {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  expanded1: boolean = false;
  expanded2: boolean = false;
  expanded3: boolean = false;
  expanded4: boolean = false;

  onExpanded(noExp: number) {
    switch (noExp) {
      case 1: {
        this.expanded1 = !this.expanded1;
        break;
      }
      case 2: {
        this.expanded2 = !this.expanded2;
        break;
      }
      case 3: {
        this.expanded3 = !this.expanded3;
        break;
      }
      case 4: {
        this.expanded4 = !this.expanded4;
        break;
      }
    }
  }
}
