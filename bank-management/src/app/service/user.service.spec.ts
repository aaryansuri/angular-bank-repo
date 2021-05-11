import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Loan } from '../model/loan.model';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a loan and return it', () => {
    const dummyLoan: Loan = new Loan(
      'personal',
      120000,
      '11/12/2018',
      '12/12/2018',
      20,
      5,
      {} as any
    );

    service.currAccount = '1234123412341234';

    const dummyResponseBody: any = {
      accountNumber: service.getCurrentAccount(),
      loan: dummyLoan,
    };

    service
      .addNewLoan(dummyLoan)
      .subscribe(
        (data) =>
          expect(data).toEqual(dummyResponseBody, 'should return the loan'),
        fail
      );

    const req = httpMock.expectOne(service.LOANS_REST_API);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(dummyResponseBody);

    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: dummyResponseBody,
    });
    req.event(expectedResponse);
  });

  it('should turn 404 error into return of the requested loan', () => {
    const dummyLoan: Loan = new Loan(
      'personal',
      120000,
      '11/12/2018',
      '12/12/2018',
      20,
      5,
      {} as any
    );

    service
      .addNewLoan(dummyLoan)
      .subscribe(
        (data) => expect(data).toEqual(dummyLoan, 'should return the loan'),
        fail
      );

    const req = httpMock.expectOne(service.LOANS_REST_API);

    // respond with a 404 and the error message in the body
    const msg = '404 error';
    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should add a user and return it', () => {
    service
      .registerUser(dummyUser)
      .subscribe(
        (data) => expect(data).toEqual(dummyUser, 'should return the user'),
        fail
      );

    const req = httpMock.expectOne(service.USERS_REST_API);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(dummyUser);

    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'Created',
      body: dummyUser,
    });
    req.event(expectedResponse);
  });

  it('should turn 404 error into return of the requested user', () => {
    service
      .registerUser(dummyUser)
      .subscribe(
        (data) => expect(data).toEqual(dummyUser, 'should return the user'),
        fail
      );

    const req = httpMock.expectOne(service.USERS_REST_API);

    // respond with a 404 and the error message in the body
    const msg = '404 error';
    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });

  it('should return the user based on username and password', () => {
    let dummyUsername = 'aaryan';
    let dummyPassword = 'password';

    service
      .hasUser(dummyUsername, dummyPassword)
      .pipe(map((users: any) => users[0]))
      .subscribe((res: User) => {
        expect(res).toEqual(dummyUser);
      });

    const loansRequest = httpMock.expectOne({
      method: 'GET',
      url:
        service.USERS_REST_API +
        `?username=${dummyUsername}&personal.password=${dummyPassword}`,
    });

    expect(loansRequest.request.method).toBe('GET');
    expect(loansRequest.request.params.get('username')).toEqual(dummyUsername);
    expect(loansRequest.request.params.get('personal.password')).toEqual(
      dummyPassword
    );

    var users: User[] = [];
    users.push(dummyUser);
    loansRequest.flush(users);
  });

  it('should return the user based on account Number', () => {
    let dummyAccountNumber = '1234123412341234';

    service
      .getUser(dummyAccountNumber)
      .pipe(map((users: any) => users[0]))
      .subscribe((res: User) => {
        expect(res).toEqual(dummyUser);
      });

    const loansRequest = httpMock.expectOne({
      method: 'GET',
      url: service.USERS_REST_API + `?accountNumber=${dummyAccountNumber}`,
    });

    expect(loansRequest.request.method).toBe('GET');
    expect(loansRequest.request.params.get('accountNumber')).toEqual(
      dummyAccountNumber
    );

    var users: User[] = [];
    users.push(dummyUser);
    loansRequest.flush(users);
  });

  it('should set the current user account Number to be valid', () => {
    let dummyAccountNumber = '1234123412341234';
    service.setCurrentAccount(dummyAccountNumber);
    expect(service.getCurrentAccount()).toEqual(dummyAccountNumber);
  });

  it('should get Account Balance from the API via GET', () => {
    let dummy = { accountNumer: '1234123412341234', balance: 24000 };
    let dummyUser = new User('', '', '', '', {} as any, {} as any, {} as any, {
      account: { type: 'savings', branchName: 'asda', depositAmount: 24000 },
      idProof: {} as any,
      reference: {} as any,
    });

    service
      .getAccountBalance(dummy.accountNumer)
      .pipe(map((users: any) => users[0]))
      .subscribe((res: User) => {
        expect(res.bankDetails.account.depositAmount).toBe(dummy.balance);
      });

    const loansRequest = httpMock.expectOne({
      method: 'GET',
      url: service.USERS_REST_API + `?accountNumber=${dummy.accountNumer}`,
    });

    expect(loansRequest.request.method).toBe('GET');
    expect(loansRequest.request.params.get('accountNumber')).toEqual(
      dummy.accountNumer
    );

    var users: User[] = [];
    users.push(dummyUser);

    loansRequest.flush(users);
  });

  it('should retrieve loans from the API via GET', () => {
    const dummyLoans: Loan[] = [
      {
        type: 'education',
        amount: 1200000,
        applyDate: '05/06/2020',
        issueDate: '07/06/2020',
        interest: 10,
        duration: 10,
        details: {},
      },
      {
        type: 'personal',
        amount: 200000,
        applyDate: '05/06/2021',
        issueDate: '07/06/2021',
        interest: 20,
        duration: 5,
        details: {},
      },
      {
        type: 'education',
        amount: 2000000,
        applyDate: '05/06/2021',
        issueDate: '07/06/2021',
        interest: 10,
        duration: 5,
        details: {},
      },
    ];

    let dummyAccount: string = '1234123412341234';

    service.getUserLoans(dummyAccount).subscribe((loans) => {
      expect(loans.length).toBe(3);
      expect(loans).toEqual(dummyLoans);
    });

    const loansRequest = httpMock.expectOne({
      method: 'GET',
      url: service.LOANS_REST_API + `?accountNumber=${dummyAccount}`,
    });

    expect(loansRequest.request.method).toBe('GET');
    expect(loansRequest.request.params.get('accountNumber')).toEqual(
      dummyAccount
    );

    loansRequest.flush(dummyLoans);
  });
});
