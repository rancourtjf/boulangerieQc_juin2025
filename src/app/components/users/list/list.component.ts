import { Component, inject ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from "@angular/router";
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
 
  router = inject(Router);
  api=inject(ApiService)
  users?: any[];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter(x => x.id !== id));
    }
}
