import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import * as moment from 'moment';
import { Loan } from './../model/loan.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class LoanComponent implements OnInit {
  loanForm!: FormGroup;
  educationForm!: FormGroup;
  personalForm!: FormGroup;
  loanType = '';
  durationTypes = [5, 10, 15, 20];
  minDate!: Date;
  interest!: number;

  progressBardDisabled = true;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.educationForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      fee: new FormControl('', [Validators.required, Validators.min(0)]),
      occupation: new FormControl('', [Validators.required]),
      exp: new FormControl('', [Validators.required, Validators.min(0)]),
      currentExp: new FormControl('', [Validators.required, Validators.min(0)]),
      rationCard: new FormControl('', [Validators.required, Validators.min(0)]),
      income: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    this.personalForm = this._formBuilder.group({
      income: new FormControl('', [Validators.required, Validators.min(0)]),
      company: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      totalExp: new FormControl('', [Validators.required, Validators.min(0)]),
      currentExp: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    this.loanForm = this._formBuilder.group({
      type: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      applyDate: new FormControl('', [Validators.required]),
      issueDate: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
    });

    const currentMoment = moment();
    const year = currentMoment.year();
    const month = currentMoment.month();
    const day = currentMoment.date();

    this.minDate = new Date(year, month, day);
  }

  onLoanTypeChange(type: string) {
    if (type === 'personal') {
      this.interest = 20;
    } else if (type == 'education') {
      this.interest = 10;
    }
    this.loanType = type;
    (<FormControl>this.loanForm.get('interest')).disable();
  }

  createNewLoan(loanValues: any, typeValues: any) {
    var applyDate = loanValues.applyDate;
    var issueDate = loanValues.issueDate;

    applyDate = moment(applyDate).format('DD/MM/YYYY').toString();
    issueDate = moment(issueDate).format('DD/MM/YYYY').toString();

    var loan = new Loan(
      loanValues.type,
      loanValues.amount,
      applyDate,
      issueDate,
      this.interest,
      loanValues.duration,
      typeValues
    );

    console.log(loan);

    this.userService.addNewLoan(loan).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  onSubmit() {
    var typeForm: FormGroup;

    if (this.educationForm.valid) {
      typeForm = this.educationForm;
    } else {
      typeForm = this.personalForm;
    }

    this.createNewLoan(this.loanForm.value, typeForm.value);

    this.progressBardDisabled = false;
    setTimeout(() => {
      this.router.navigate(['/loanDetails']);
      this.progressBardDisabled = true;
    }, 2000);
  }
}
