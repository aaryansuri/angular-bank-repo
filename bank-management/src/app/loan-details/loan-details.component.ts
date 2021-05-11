import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Loan } from '../model/loan.model';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css'],
})
export class LoanDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'Type',
    'Amount',
    'Apply Date',
    'Issue Date',
    'Interest',
    'Duration',
  ];

  dataSource: Loan[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService
        .getUserLoans(this.userService.getCurrentAccount())
        .subscribe((curr) => {
          this.updateDataSource(curr);
        });
    }, 1000);
  }

  updateDataSource(loans: any) {
    var loanRows: Loan[] = [];

    loans.forEach((e: any) => {
      loanRows.push(e.loan);
    });

    this.dataSource = loanRows;
  }
}
