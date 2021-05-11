import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanComponent } from './loan.component';
import { UserService } from '../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Loan } from '../model/loan.model';
import { throwError } from 'rxjs';

class RouterStub {
  navigate(params: any) {}
}

class UserServiceStub {
  getCurrentAccount() {
    return '1234123412341234';
  }

  addNewLoan(loan: Loan) {
    return Observable.of(loan);
  }
}

describe('LoanComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        AppMaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoanComponent],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComponent);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() type education and navigate to loanDetails', () => {
    let spy = spyOn(router, 'navigate');

    Object.keys(component.educationForm.controls).forEach((k) => {
      component.educationForm.controls[k].setErrors(null);
    });

    jasmine.clock().install();
    component.onSubmit();
    jasmine.clock().tick(2000);
    jasmine.clock().uninstall();

    expect(spy).toHaveBeenCalledWith(['/loanDetails']);
  });

  it('should call onSubmit() type personal and navigate to loanDetails', () => {
    let spy = spyOn(router, 'navigate');

    Object.keys(component.personalForm.controls).forEach((k) => {
      component.personalForm.controls[k].setErrors(null);
    });

    jasmine.clock().install();
    component.onSubmit();
    jasmine.clock().tick(2000);
    jasmine.clock().uninstall();

    expect(spy).toHaveBeenCalledWith(['/loanDetails']);
  });

  it('should call createNewLoan() and post the loan to service', () => {
    let dummyTypeValues: any;
    let dummyLoanValues: any = {
      type: 'personal',
      amount: 1230000,
      applyDate: new Date(),
      issueDate: new Date(),
      interest: 10,
      duration: 5,
      details: dummyTypeValues,
    };

    spyOn(userService, 'addNewLoan').and.returnValue(
      Observable.of(dummyLoanValues)
    );

    component.createNewLoan(dummyLoanValues, dummyTypeValues);
  });

  it('should call createNewLoan() and log error message if the service fails', () => {
    let dummyTypeValues: any;
    let dummyLoanValues: any = {
      type: 'personal',
      amount: 1230000,
      applyDate: new Date(),
      issueDate: new Date(),
      interest: 10,
      duration: 5,
      details: dummyTypeValues,
    };

    spyOn(userService, 'addNewLoan').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });

    component.createNewLoan(dummyLoanValues, dummyTypeValues);
  });

  it('should change interest when loan type changes', () => {
    component.onLoanTypeChange('personal');
    expect(component.interest).toBe(20);
    component.onLoanTypeChange('education');
    expect(component.interest).toBe(10);
  });

  it('should create 3 forms', () => {
    expect(component.loanForm).toBeTruthy();
    expect(component.educationForm).toBeTruthy();
    expect(component.personalForm).toBeTruthy();
  });

  it('should create loan form with 6 controls', () => {
    expect(component.loanForm.contains('type')).toBeTruthy();
    expect(component.loanForm.contains('amount')).toBeTruthy();
    expect(component.loanForm.contains('applyDate')).toBeTruthy();
    expect(component.loanForm.contains('issueDate')).toBeTruthy();
    expect(component.loanForm.contains('duration')).toBeTruthy();
    expect(component.loanForm.contains('interest')).toBeTruthy();
  });

  it('should create education form with 7 controls', () => {
    expect(component.educationForm.contains('name')).toBeTruthy();
    expect(component.educationForm.contains('fee')).toBeTruthy();
    expect(component.educationForm.contains('occupation')).toBeTruthy();
    expect(component.educationForm.contains('exp')).toBeTruthy();
    expect(component.educationForm.contains('currentExp')).toBeTruthy();
    expect(component.educationForm.contains('rationCard')).toBeTruthy();
    expect(component.educationForm.contains('income')).toBeTruthy();
  });

  it('should create personal form with 5 controls', () => {
    expect(component.personalForm.contains('income')).toBeTruthy();
    expect(component.personalForm.contains('company')).toBeTruthy();
    expect(component.personalForm.contains('designation')).toBeTruthy();
    expect(component.personalForm.contains('totalExp')).toBeTruthy();
    expect(component.personalForm.contains('currentExp')).toBeTruthy();
  });

  describe('LoanForm', () => {
    it('should make type control required', () => {
      let control = component.loanForm.controls['type'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make amount control required', () => {
      let control = component.loanForm.controls['amount'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make applyDate control required', () => {
      let control = component.loanForm.controls['applyDate'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make issueDate control required', () => {
      let control = component.loanForm.controls['issueDate'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make interest control required', () => {
      let control = component.loanForm.controls['interest'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make duration control required', () => {
      let control = component.loanForm.controls['duration'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });
    it('loan form should be invalid when empty', () => {
      expect(component.loanForm.valid).toBeFalsy();
    });
    it('loan form should be invalid when even one control invalid', () => {
      component.loanForm.controls['type'].setValue('education');
      component.loanForm.controls['amount'].setValue(0); //invalid amount
      component.loanForm.controls['applyDate'].setValue(new Date());
      component.loanForm.controls['issueDate'].setValue(new Date());
      component.loanForm.controls['interest'].setValue(10);
      component.loanForm.controls['duration'].setValue(10);

      expect(component.loanForm.valid).toBeFalsy();
    });
    it('loan form should be valid when all controls valid', () => {
      component.loanForm.controls['type'].setValue('education');
      component.loanForm.controls['amount'].setValue(1000);
      component.loanForm.controls['applyDate'].setValue(new Date());
      component.loanForm.controls['issueDate'].setValue(new Date());
      component.loanForm.controls['interest'].setValue(10);
      component.loanForm.controls['duration'].setValue(15);

      expect(component.loanForm.valid).toBeTruthy();
    });
  });

  describe('PersonalForm', () => {
    it('should make income control required', () => {
      let control = component.personalForm.controls['income'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make company control required', () => {
      let control = component.personalForm.controls['company'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make designation control required', () => {
      let control = component.personalForm.controls['designation'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make totalExperience control required', () => {
      let control = component.personalForm.controls['totalExp'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make currentExp control required', () => {
      let control = component.personalForm.controls['currentExp'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should be invalid when empty', () => {
      expect(component.personalForm.valid).toBeFalsy();
    });

    it('should be invalid when even one or more control invalid', () => {
      component.personalForm.controls['income'].setValue(1000000);
      component.personalForm.controls['company'].setValue('My Company');
      component.personalForm.controls['designation'].setValue('CEO');
      component.personalForm.controls['totalExp'].setValue(-1); //invalid experience
      component.personalForm.controls['currentExp'].setValue(1);

      expect(component.personalForm.valid).toBeFalsy();
    });
    it('should be valid when all controls valid', () => {
      component.personalForm.controls['income'].setValue(1000000);
      component.personalForm.controls['company'].setValue('My Company');
      component.personalForm.controls['designation'].setValue('CEO');
      component.personalForm.controls['totalExp'].setValue(1); //valid experience
      component.personalForm.controls['currentExp'].setValue(1);
      expect(component.personalForm.valid).toBeTruthy();
    });
  });

  describe('EducationForm', () => {
    it('should make name control required', () => {
      let control = component.educationForm.controls['name'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make fee control required', () => {
      let control = component.educationForm.controls['fee'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make occupation control required', () => {
      let control = component.educationForm.controls['occupation'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make exp control required', () => {
      let control = component.educationForm.controls['exp'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make currentExp control required', () => {
      let control = component.educationForm.controls['currentExp'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make rationCard control required', () => {
      let control = component.educationForm.controls['rationCard'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make income control required', () => {
      let control = component.educationForm.controls['income'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should be invalid when empty', () => {
      expect(component.educationForm.valid).toBeFalsy();
    });

    it('should be invalid when even one or more control invalid', () => {
      component.educationForm.controls['name'].setValue('High School');
      component.educationForm.controls['fee'].setValue(120000);
      component.educationForm.controls['occupation'].setValue('Bussiness');
      component.educationForm.controls['exp'].setValue(-1); //invalid experience
      component.educationForm.controls['currentExp'].setValue(1);
      component.educationForm.controls['rationCard'].setValue(12345);
      component.educationForm.controls['income'].setValue(100000);
      expect(component.educationForm.valid).toBeFalsy();
    });
    it('should be valid when all controls valid', () => {
      component.educationForm.controls['name'].setValue('High School');
      component.educationForm.controls['fee'].setValue(120000);
      component.educationForm.controls['occupation'].setValue('Bussiness');
      component.educationForm.controls['exp'].setValue(10); //valid experience
      component.educationForm.controls['currentExp'].setValue(1);
      component.educationForm.controls['rationCard'].setValue(12345);
      component.educationForm.controls['income'].setValue(100000);
      expect(component.educationForm.valid).toBeTruthy();
    });
  });
});
