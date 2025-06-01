import { Injectable, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environnement/environnement.prod";
// https://jasonwatmore.com/post/2022/11/29/angular-14-user-registration-and-login-example-tutorial

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  http = inject(HttpClient);
  router = inject(Router);

  constructor() {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem("user")!)
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue() {
    return this.userSubject.value;
  }
  login(username: string, password: string) {
    return this.http.post<User>(`${environment.baseUrl}/users/authenticate`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}

logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
}

register(user: User) {
    return this.http.post(`${environment.baseUrl}/users/register`, user);
}

getAll() {
    return this.http.get<User[]>(`${environment.baseUrl}/users`);
}

getById(id: string) {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`);
}update(id: string, params: any) {
  return this.http.put(`${environment.baseUrl}/users/${id}`, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue?.id) {
              // update local storage
              const user = { ...this.userValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
}

delete(id: string) {
  return this.http.delete(`${environment.baseUrl}/users/${id}`)
      .pipe(map(x => {
          // auto logout if the logged in user deleted their own record
          if (id == this.userValue?.id) {
              this.logout();
          }
          return x;
      }));
}
}
