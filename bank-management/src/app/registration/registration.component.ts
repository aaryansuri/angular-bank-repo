import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SharedFormService } from '../forms/shared-form.service';
import { UserService } from './../service/user.service';
import { User } from './../model/user.model';
import { CreateUser } from './user-creation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  showRegistrationModal: boolean = false;
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedFormService: SharedFormService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      personal: this.sharedFormService.sharedPersonalForm(),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      address: this.sharedFormService.sharedAddressForm(),
      guardian: this.sharedFormService.sharedGuardianForm(),
      bankDetails: this.sharedFormService.sharedBankDetailsForm(),
    });
  }

  onSubmit() {
    const newUser: User = CreateUser.createNew(this.registrationForm.value);
    this.userService.registerUser(newUser).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.showRegistrationModal = true;
  }
}
