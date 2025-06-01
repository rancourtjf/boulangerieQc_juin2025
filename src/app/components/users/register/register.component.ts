import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

formBuilder=inject(FormBuilder) 
route=inject(ActivatedRoute)
router=inject(Router)
accountService=inject(AccountService)

ngOnInit() {
  this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
}
get f() { return this.form.controls; }
onSubmit() {
  this.submitted = true;

  // reset alerts on submit
 // this.alertService.clear();

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }

  this.loading = true;
  this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
          next: () => {
            //  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
              this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error: error => {
              //this.alertService.error(error);
              this.loading = false;
          }
      });
}
}
