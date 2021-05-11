import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedFormsModule } from '../forms/shared-forms.module';
import { UIModule } from '../ui/ui.module';
import { RegistrationComponent } from './registration.component';
import { SharedFormService } from '../forms/shared-form.service';

import { User } from '../model/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { throwError } from 'rxjs';

class RouterStub {
  navigate(params: any) {}
}

class ObserverSuccessServiceStub {
  registerUser(user: User) {
    return Observable.of(user);
  }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;

  let dummyUser: User = new User(
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
      declarations: [RegistrationComponent],
      providers: [
        { provide: UserService, useClass: ObserverSuccessServiceStub },
        { provide: Router, useClass: RouterStub },
        SharedFormService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    userService = TestBed.get(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.registrationForm).toBeTruthy();
  });

  it('should call onSubmit()', () => {
    spyOn(userService, 'registerUser').and.returnValue(
      Observable.of(dummyUser)
    );
    component.onSubmit();
  });

  it('should call onSubmit() and log error', () => {
    spyOn(userService, 'registerUser').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });
    component.onSubmit();
  });

  describe('RegistrationForm', () => {
    it('should create form with 6 controls', () => {
      expect(component.registrationForm.contains('personal')).toBeTruthy();
      expect(component.registrationForm.contains('username')).toBeTruthy();
      expect(component.registrationForm.contains('address')).toBeTruthy();
      expect(component.registrationForm.contains('guardian')).toBeTruthy();
      expect(component.registrationForm.contains('bankDetails')).toBeTruthy();
    });

    it('should make username control required', () => {
      let control = component.registrationForm.controls['username'];
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make personal control required', () => {
      let control = component.registrationForm.controls['personal']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should make address control required', () => {
      let control = component.registrationForm.controls['address']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should make guardian control required', () => {
      let control = component.registrationForm.controls['guardian']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should make bankDetails control required', () => {
      let control = component.registrationForm.controls['bankDetails']; //the default value from service is already invalid
      expect(control?.valid).toBeFalsy();
    });

    it('should be invalid when empty', () => {
      expect(component.registrationForm.valid).toBeFalsy();
    });

    it('should be invalid when even one or more control invalid', () => {
      component.registrationForm.controls['username'].setValue('aa'); //invalid

      let personalFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['personal']
      );
      Object.keys(personalFormGroup.controls).forEach((k) => {
        personalFormGroup.controls[k].setErrors(null);
      });

      let addressFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['address']
      );
      Object.keys(addressFormGroup.controls).forEach((k) => {
        addressFormGroup.controls[k].setErrors(null);
      });

      let guardianFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['guardian']
      );
      Object.keys(guardianFormGroup.controls).forEach((k) => {
        guardianFormGroup.controls[k].setErrors(null);
      });

      let bankDetailsFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['bankDetails']
      );
      Object.keys(bankDetailsFormGroup.controls).forEach((k) => {
        let innerFormGroups: FormGroup = <FormGroup>(
          bankDetailsFormGroup.controls[k]
        );

        Object.keys(innerFormGroups.controls).forEach((n) => {
          innerFormGroups.controls[n].setErrors(null);
        });
      });

      expect(component.registrationForm.valid).toBeFalsy();
    });

    it('should be valid all controls valid', () => {
      component.registrationForm.controls['username'].setValue('aaryan'); //valid

      let personalFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['personal']
      );
      Object.keys(personalFormGroup.controls).forEach((k) => {
        personalFormGroup.controls[k].setErrors(null);
      });

      let addressFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['address']
      );
      Object.keys(addressFormGroup.controls).forEach((k) => {
        addressFormGroup.controls[k].setErrors(null);
      });

      let guardianFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['guardian']
      );
      Object.keys(guardianFormGroup.controls).forEach((k) => {
        guardianFormGroup.controls[k].setErrors(null);
      });

      let bankDetailsFormGroup: FormGroup = <FormGroup>(
        component.registrationForm.controls['bankDetails']
      );
      Object.keys(bankDetailsFormGroup.controls).forEach((k) => {
        let innerFormGroups: FormGroup = <FormGroup>(
          bankDetailsFormGroup.controls[k]
        );

        Object.keys(innerFormGroups.controls).forEach((n) => {
          innerFormGroups.controls[n].setErrors(null);
        });
      });

      expect(component.registrationForm.valid).toBeTruthy();
    });
  });
});
