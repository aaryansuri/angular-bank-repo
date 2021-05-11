import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedFormsModule } from '../forms/shared-forms.module';
import { UIModule } from '../ui/ui.module';
import { LoginComponent } from './login.component';
import { SharedFormService } from '../forms/shared-form.service';

import { User } from '../model/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthService } from '../auth/services/auth.service';
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

class AuthStub {
  login(user: { username: string; password: string }) {
    return Observable.of(true);
  }
}

class ObserverSuccessServiceStub {
  hasUser(username: string, password: string) {
    var users: User[] = [];

    users.push(dummyUser);

    return Observable.of(users);
  }

  setCurrentAccount(accountNumber: string) {
    return accountNumber;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        UIModule,
        SharedFormsModule,
        ReactiveFormsModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: UserService, useClass: ObserverSuccessServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthStub },
        SharedFormService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a login form with 2 controls', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make username control required', () => {
    let control = component.loginForm.get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should not login when authserver fails and show wrong credentials', () => {
    spyOn(component.loginForm, 'get').and.returnValue(
      new FormControl('validCredentials')
    );
    var users: User[] = [];
    users.push(dummyUser);

    spyOn(userService, 'hasUser').and.returnValue(Observable.of(users));
    spyOn(authService, 'login').and.returnValue(Observable.of(false));
    jasmine.clock().install();
    component.onLogin();
    jasmine.clock().tick(2000);
    expect(component.wrongCredentials).toBe(true);
    jasmine.clock().uninstall();
  });

  it('should not login when not in the system and show wrong credentials', () => {
    spyOn(component.loginForm, 'get').and.returnValue(
      new FormControl('validCredentials')
    );
    var users: User[] = [];

    spyOn(userService, 'hasUser').and.returnValue(Observable.of(users));
    spyOn(authService, 'login').and.returnValue(Observable.of(false));
    jasmine.clock().install();
    component.onLogin();
    jasmine.clock().tick(2000);
    expect(component.wrongCredentials).toBe(true);
    jasmine.clock().uninstall();
  });

  it('should login and navigate user to dashboard', () => {
    let spy = spyOn(router, 'navigate');

    spyOn(component.loginForm, 'get').and.returnValue(
      new FormControl('validCredentials')
    );
    var users: User[] = [];
    users.push(dummyUser);

    spyOn(userService, 'hasUser').and.returnValue(Observable.of(users));
    spyOn(authService, 'login').and.returnValue(Observable.of(true));
    jasmine.clock().install();
    component.onLogin();
    jasmine.clock().tick(2000);
    jasmine.clock().uninstall();

    expect(spy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should login and show error message if the server fails ', () => {
    spyOn(component.loginForm, 'get').and.returnValue(
      new FormControl('invalidCredentials')
    );

    spyOn(userService, 'hasUser').and.callFake(() => {
      return throwError(new Error('Fake error'));
    });

    jasmine.clock().install();
    component.onLogin();
    jasmine.clock().tick(2000);
    expect(component.wrongCredentials).toBe(true);
    jasmine.clock().uninstall();
  });
});
