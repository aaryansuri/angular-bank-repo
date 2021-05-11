import { Injectable } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedFormService {
  constructor(private fb: FormBuilder) {}

  regexTexts = '^[a-zA-Z][a-zA-Z\\s]{3,}';
  regexTextsAndNumber = '[a-zA-Z0-9,\\s]{3,}';
  regexId = '^([2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}|[A-Z]{5}[0-9]{4}[A-Z]{1})$';
  regexAccountNumber = '^[0-9]{16}$';
  regexPassword =
    '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$';

  sharedGuardianForm(): FormGroup {
    const fg = this.fb.group({
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexTexts),
      ]),
    });
    return fg;
  }

  sharedAddressForm(): FormGroup {
    const fg = this.fb.group({
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      addressLines: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexTextsAndNumber),
      ]),
      citizenship: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexTexts),
      ]),
    });

    return fg;
  }

  sharedBankDetailsForm(): FormGroup {
    const fg = this.fb.group({
      account: new FormGroup({
        type: new FormControl('', [Validators.required]),
        branchName: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regexTexts),
        ]),
        depositAmount: new FormControl('', [
          Validators.required,
          Validators.min(0),
        ]),
      }),
      idProof: new FormGroup({
        type: new FormControl('', [Validators.required]),
        number: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regexId),
        ]),
      }),
      reference: new FormGroup({
        accountName: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regexTexts),
        ]),
        accountNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regexAccountNumber),
        ]),
        address: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regexTextsAndNumber),
        ]),
      }),
    });

    return fg;
  }

  sharedPersonalForm(): FormGroup {
    const fg = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexTexts),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regexPassword),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [
        Validators.min(5000000000),
        Validators.max(9999999999),
        Validators.required,
      ]),
    });

    return fg;
  }
}
