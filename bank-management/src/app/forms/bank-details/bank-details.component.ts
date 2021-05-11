import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css'],
})
export class BankDetailsComponent implements OnInit {
  @Input() parentGroupForm!: FormGroup;
  @Input() bankDetailsForm!: FormGroup;

  depositAmount!: number;
  //accountType!: string;

  accountTypes = ['salary', 'savings'];

  idTypes = ['PAN'];

  constructor() {}

  ngOnInit(): void {}

  changeDeposit() {
    var accType: string = this.bankDetailsForm.get('account.type')!.value;

    if (accType == 'savings') {
      this.depositAmount = 5000;
    } else {
      this.depositAmount = 0;
    }

    (<FormControl>(
      this.bankDetailsForm.get('account.depositAmount')
    )).setValidators([Validators.min(this.depositAmount-1), Validators.required]);
    (<FormControl>(
      this.bankDetailsForm.get('account.depositAmount')
    )).updateValueAndValidity();
  }
}
