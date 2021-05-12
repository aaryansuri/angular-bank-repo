import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from './../model/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Loan } from './../model/loan.model';
import { Observable, of, throwError } from 'rxjs';

import 'rxjs/add/observable/of';
import { isJSDocThisTag } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currAccount!: string;

  LOANS_REST_API: string = 'http://localhost:3000/loans';
  USERS_REST_API: string = 'http://localhost:3100/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAccountBalance(accountNumber: string) {
    return this.http
      .get<User[]>(`${this.USERS_REST_API}`, {
        params: {
          accountNumber: accountNumber,
        },
      })
      .pipe(catchError(this.handleError(accountNumber)));
  }

  hasUser(name: string, pass: string) {
    return this.http
      .get<User[]>(`${this.USERS_REST_API}`, {
        params: {
          username: name,
          'personal.password': pass,
        },
      })
      .pipe(catchError(this.handleError(name)));
  }

  getUserLoans(accountNumber: string) {
    return this.http
      .get<any>(`${this.LOANS_REST_API}`, {
        params: {
          accountNumber: accountNumber,
        },
      })
      .pipe(catchError(this.handleError(accountNumber)));
  }

  addNewLoan(loan: Loan) {
    return this.http
      .post<any>(
        `${this.LOANS_REST_API}`,
        {
          accountNumber: this.getCurrentAccount(),
          loan: loan,
        },
        this.httpOptions
      )
      .pipe(catchError(this.handleError(loan)));
  }

  registerUser(user: User) {
    return this.http
      .post<any>(`${this.USERS_REST_API}`, user, this.httpOptions)
      .pipe(catchError(this.handleError(user)));
  }

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }

  updateUser(data: any) {
    console.log(data);

    this.getUser(this.getCurrentAccount())
      .pipe(map((users: any) => users[0]))
      .subscribe(
        (user: any) => {
          return this.http
            .patch(`${this.USERS_REST_API}/${user.id}`, data, this.httpOptions)
            .pipe(catchError(this.handleError(data)))
            .subscribe((res) => {
              console.log(res);
            });
        },
        (error: any) => console.log(error)
      );
  }

  getUser(accountNumber: string) {
    return this.http
      .get<User[]>(`${this.USERS_REST_API}`, {
        params: {
          accountNumber: accountNumber,
        },
      })
      .pipe(catchError(this.handleError(accountNumber)));
  }

  setCurrentAccount(accountNumber: string) {
    this.currAccount = accountNumber;
  }

  getCurrentAccount() {
    return this.currAccount;
  }
}
