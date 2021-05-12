import { ApplicationRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { SharedFormService } from '../forms/shared-form.service';
import { UserService } from './../service/user.service';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;

  currentUser: any;
  accountNumber!: String;

  constructor(
    private fb: FormBuilder,
    private sharedFormService: SharedFormService,
    private userService: UserService,
    private router: Router,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      personal: this.sharedFormService.sharedPersonalForm(),
      address: this.sharedFormService.sharedAddressForm(),
      guardian: this.sharedFormService.sharedGuardianForm(),
      bankDetails: this.sharedFormService.sharedBankDetailsForm(),
    });
    this.patchUpdateForm();
    this.updateForm.disable();
  }

  patchUpdateForm() {
    this.userService
      .getUser(this.userService.getCurrentAccount())
      .pipe(map((users: any) => users[0]))
      .subscribe((curr: User) => {
        setTimeout(() => {
          this.updateForm.patchValue(curr);
          this.accountNumber = curr.accountNumber;
        }, 1000);
      });
  }

  onSubmit() {
    console.log(this.updateForm.value);

    this.userService.updateUser(this.updateForm.value);

    this.router.navigate(['/dashboard']);
  }
}
