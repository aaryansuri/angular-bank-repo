import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedFormsModule } from '../forms/shared-forms.module';
import { UIModule } from '../ui/ui.module';
import { SharedFormService } from '../forms/shared-form.service';
import { UpdateComponent } from './update.component';
import { User } from '../model/user.model';
import { Loan } from '../model/loan.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { throwError } from 'rxjs';

const dummyUser: User = new User(
  '1234123412341234',
  'R-123',
  'aaryan', //username
  '11/06/2019',
  {
    name: 'Aaryan Suri',
    password: 'Aaryan@123', //password
    email: 'aaryan@gmail.com',
    gender: 'male',
    maritalStatus: 'single',
    contactNo: '9149883351',
    dob: '08/06/1998',
    citizenStatus: 'young',
  },
  {
    addressLines: '46B',
    state: 'Jammu',
    country: 'India',
    citizenship: 'Indian',
  },
  { type: 's/o', name: 'father' },
  {
    account: { type: 'savings', branchName: 'asda', depositAmount: 24000 },
    idProof: { type: 'PAN', number: 'IWYPS7909L' },
    reference: {
      accountName: 'suri',
      accountNumber: 1231231231231231,
      address: 'Jammu',
    },
  }
);

class RouterStub {
  navigate(params: any) {}
}

class UserServiceStub {
  getCurrentAccount() {
    return '1234123412341234';
  }

  getUser(accountNumber: string) {
    var users: User[] = [];
    users.push(dummyUser);

    return Observable.of(dummyUser);
  }

  updateUser(data: any) {
    return Observable.of(data);
  }
}

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let router: Router;
  let userService: UserService;

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
      ],
      declarations: [UpdateComponent],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: UserService, useClass: UserServiceStub },
        SharedFormService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
    fixture.detectChanges();
    component.updateForm.enable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user via User service on submitting', () => {
    spyOn(userService, 'updateUser')
      .withArgs(component.updateForm.value)
      .and.returnValue(Observable.of(component.updateForm.value));
    component.onSubmit();
  });

  it('should fail update user via User service on submitting', () => {
    spyOn(userService, 'updateUser').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });
    component.onSubmit();
  });

  it('should create form', () => {
    expect(component.updateForm).toBeTruthy();
  });

  describe('UpdateForm', () => {
    it('should create form with 4 controls', () => {
      expect(component.updateForm.contains('personal')).toBeTruthy();
      expect(component.updateForm.contains('address')).toBeTruthy();
      expect(component.updateForm.contains('guardian')).toBeTruthy();
      expect(component.updateForm.contains('bankDetails')).toBeTruthy();
    });

    it('should make personal control required', () => {
      let control = component.updateForm.controls['personal']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should make address control required', () => {
      let control = component.updateForm.controls['address']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should make guardian control required', () => {
      let control = component.updateForm.controls['guardian']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should make bankDetails control required', () => {
      let control = component.updateForm.controls['bankDetails']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should be invalid when empty', () => {
      expect(component.updateForm.valid).toBeFalsy();
    });

    it('should be invalid when even one or more control invalid', () => {
      let personalFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['personal']
      );
      Object.keys(personalFormGroup.controls).forEach((k) => {
        personalFormGroup.controls[k].setErrors({ incorrect: true }); //setting one form control invalid
      });

      let addressFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['address']
      );
      Object.keys(addressFormGroup.controls).forEach((k) => {
        addressFormGroup.controls[k].setErrors(null);
      });

      let guardianFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['guardian']
      );
      Object.keys(guardianFormGroup.controls).forEach((k) => {
        guardianFormGroup.controls[k].setErrors(null);
      });

      let bankDetailsFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['bankDetails']
      );
      Object.keys(bankDetailsFormGroup.controls).forEach((k) => {
        let innerFormGroups: FormGroup = <FormGroup>(
          bankDetailsFormGroup.controls[k]
        );

        Object.keys(innerFormGroups.controls).forEach((n) => {
          innerFormGroups.controls[n].setErrors(null);
        });
      });

      expect(component.updateForm.valid).toBeFalsy();
    });

    it('should be valid when all controls valid', () => {
      let personalFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['personal']
      );
      Object.keys(personalFormGroup.controls).forEach((k) => {
        personalFormGroup.controls[k].setErrors(null);
      });

      let addressFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['address']
      );
      Object.keys(addressFormGroup.controls).forEach((k) => {
        addressFormGroup.controls[k].setErrors(null);
      });

      let guardianFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['guardian']
      );
      Object.keys(guardianFormGroup.controls).forEach((k) => {
        guardianFormGroup.controls[k].setErrors(null);
      });

      let bankDetailsFormGroup: FormGroup = <FormGroup>(
        component.updateForm.controls['bankDetails']
      );
      Object.keys(bankDetailsFormGroup.controls).forEach((k) => {
        let innerFormGroups: FormGroup = <FormGroup>(
          bankDetailsFormGroup.controls[k]
        );

        Object.keys(innerFormGroups.controls).forEach((n) => {
          innerFormGroups.controls[n].setErrors(null);
        });
      });

      expect(component.updateForm.valid).toBeTruthy();
    });
  });
});
