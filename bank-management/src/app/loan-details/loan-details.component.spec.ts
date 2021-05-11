import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../model/user.model';

import { LoanDetailsComponent } from './loan-details.component';

import { UserService } from '../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedFormsModule } from '../forms/shared-forms.module';
import { UIModule } from '../ui/ui.module';
import { SharedFormService } from '../forms/shared-form.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { throwError } from 'rxjs';
import { Loan } from '../model/loan.model';

let loans: any[] = [
  {
    accountNumber: '112321312',
    loan: {
      type: 'personal',
      amount: 12000000,
      applyDate: '12/12/2018',
      issueDate: '20/15/2018',
      interest: 10,
      duration: 5,
      details: {},
    },
  },
  {
    accountNumber: '112321312',
    loan: {
      type: 'education',
      amount: 40000000,
      applyDate: '12/12/2018',
      issueDate: '20/15/2018',
      interest: 10,
      duration: 5,
      details: {},
    },
  },
];

class UserServiceStub {
  getUserLoans(accountNumber: string) {
    return Observable.of(loans);
  }
  getCurrentAccount() {
    return '12312312312312';
  }
}

describe('LoanDetailsComponent', () => {
  let component: LoanDetailsComponent;
  let fixture: ComponentFixture<LoanDetailsComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        UIModule,
        SharedFormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LoanDetailsComponent],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        SharedFormService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailsComponent);
    service = TestBed.get(UserService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update loans into the table', () => {
    spyOn(service, 'getUserLoans').and.returnValue(Observable.of(loans));
    jasmine.clock().install();
    component.ngOnInit();

    jasmine.clock().tick(2000);

    jasmine.clock().uninstall();

    var filteredLoans: Loan[] = [];

    loans.forEach((e) => {
      filteredLoans.push(e.loan);
    });

    expect(component.dataSource).toEqual(filteredLoans);
  });
});
