import { Component, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './../model/user.model';
import { CurrencyPipe } from '@angular/common';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CurrencyPipe],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  progressBardDisabled = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private currencyPipe: CurrencyPipe
  ) {}

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Loans',
            cols: 2,
            rows: 1,
            icon: 'envelope',
            color: '#FFF9C4',
            buttonText: 'Apply',
          },
          {
            title: 'My Account',
            cols: 2,
            rows: 1,
            icon: 'user-secret',
            color: '#ffcdd2',
            buttonText: 'View',
          },
          {
            title: 'Account Balance',
            cols: 2,
            rows: 1,
            icon: 'rupee-sign',
            color: '#E0E0E0',
            buttonText: 'Show',
          },
          {
            title: 'My Loans',
            cols: 2,
            rows: 1,
            icon: 'money-check',
            color: '#C8E6C9',
            buttonText: 'Check',
          },
        ];
      }

      return [
        {
          title: 'Loans',
          cols: 1,
          rows: 1,
          icon: 'envelope',
          color: '#FFF9C4',
          buttonText: 'Apply',
        },
        {
          title: 'My Account',
          cols: 1,
          rows: 1,
          icon: 'user-secret',
          color: '#ffcdd2',
          buttonText: 'View',
        },
        {
          title: 'Account Balance',
          cols: 1,
          rows: 1,
          icon: 'rupee-sign',
          color: '#E0E0E0',
          buttonText: 'Show',
        },
        {
          title: 'My Loans',
          cols: 1,
          rows: 1,
          icon: 'money-check',
          color: '#C8E6C9',
          buttonText: 'Check',
        },
      ];
    })
  );

  cardClick(cardName: string) {
    switch (cardName) {
      case 'Loans':
        this.router.navigate(['applyLoan']);
        this.progressBardDisabled = true;

        break;
      case 'My Account':
        this.router.navigate(['update']);
        this.progressBardDisabled = true;

        break;
      case 'My Loans':
        this.router.navigate(['loanDetails']);
        this.progressBardDisabled = true;

        break;
      case 'Account Balance':
        this.userService
          .getAccountBalance(this.userService.getCurrentAccount())
          .pipe(map((users: any) => users[0]))
          .subscribe(
            (curr: User) => {
              const balance = this.currencyPipe
                .transform(
                  curr.bankDetails.account.depositAmount.toString(),
                  'INR'
                )!
                .toString();
              this._snackBar.open(balance, 'Hiding....', {
                duration: 3000,
              });
            },
            (error) => {
              this._snackBar.open('Server Problem', 'Try after some time....', {
                duration: 3000,
              });
            }
          );
        break;
    }
  }
}
