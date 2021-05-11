import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { SharedFormService } from '../shared-form.service';
import { BankDetailsComponent } from './bank-details.component';

describe('BankDetailsComponent', () => {
  let component: BankDetailsComponent;
  let sharedFormService: SharedFormService;

  beforeEach(() => {
    component = new BankDetailsComponent();
    sharedFormService = new SharedFormService(new FormBuilder());
    component.bankDetailsForm = sharedFormService.sharedBankDetailsForm();
  });

  it('should create a form with 4 controls', () => {
    expect(component.bankDetailsForm.contains('account')).toBeTruthy();

    expect(component.bankDetailsForm.contains('idProof')).toBeTruthy();

    expect(component.bankDetailsForm.contains('reference')).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('account')).contains('type')
    ).toBeTruthy();

    expect(<FormGroup>component.bankDetailsForm.get('account')).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('account')).contains(
        'branchName'
      )
    ).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('account')).contains(
        'depositAmount'
      )
    ).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('idProof')).contains('type')
    ).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('idProof')).contains('number')
    ).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('reference')).contains(
        'accountName'
      )
    ).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('reference')).contains(
        'accountNumber'
      )
    ).toBeTruthy();

    expect(
      (<FormGroup>component.bankDetailsForm.get('reference')).contains(
        'address'
      )
    ).toBeTruthy();
  });

  it('should make account control required', () => {
    let control = component.bankDetailsForm.get('account');
    control?.setValue({
      type: '',
      branchName: '',
      depositAmount: '',
    });
    expect(control?.valid).toBeFalsy();
  });

  it('should make idProof control required', () => {
    let control = component.bankDetailsForm.get('idProof');
    control?.setValue({
      type: '',
      number: '',
    });
    expect(control?.valid).toBeFalsy();
  });

  it('should make reference control required', () => {
    let control = component.bankDetailsForm.get('reference');
    control?.setValue({
      accountName: '',
      accountNumber: '',
      address: '',
    });
    expect(control?.valid).toBeFalsy();
  });

  it('should change deposit amount to 5000 when account type savings', () => {
    spyOn(component.bankDetailsForm, 'get').and.returnValue(
      new FormControl('savings')
    );

    component.changeDeposit();

    expect(component.depositAmount).toEqual(5000);
  });

  it('should change deposit amount to 0 when account type salary', () => {
    spyOn(component.bankDetailsForm, 'get').and.returnValue(
      new FormControl('salary')
    );
    component.changeDeposit();

    expect(component.depositAmount).toEqual(0);
  });

  it('account type control should have 2 types', () => {
    const expectedAccounts: string[] = ['salary', 'savings'];

    expect(component.accountTypes).toEqual(expectedAccounts);
  });

  it('form should be invalid when empty', () => {
    expect(component.bankDetailsForm.valid).toBeFalsy();
  });

  it('form should be invalid when even one control invalid', () => {
    component.bankDetailsForm.get('account')?.setValue({
      type: 'salary',
      branchName: 'Downtown',
      depositAmount: '5000',
    });

    component.bankDetailsForm.get('idProof')?.setValue({
      type: 'PAN',
      number: 'IWYPS7909', //pan invalid
    });

    component.bankDetailsForm.get('reference')?.setValue({
      accountName: 'Aaryan',
      accountNumber: '1111111111111111',
      address: 'Jammu Jammu',
    });

    expect(component.bankDetailsForm.valid).toBeFalsy();
  });

  it('form should be valid when all controls invalid', () => {
    component.bankDetailsForm.get('account')?.setValue({
      type: 'salary',
      branchName: 'Downtown',
      depositAmount: '5000',
    });

    component.bankDetailsForm.get('idProof')?.setValue({
      type: 'PAN',
      number: 'IWYPS7909L',
    });

    component.bankDetailsForm.get('reference')?.setValue({
      accountName: 'Aaryan',
      accountNumber: '1111111111111111',
      address: 'Jammu Jammu',
    });

    expect(component.bankDetailsForm.valid).toBeTruthy();
  });
});
