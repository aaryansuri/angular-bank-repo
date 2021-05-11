import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  wrongCredentials = false;
  passwordHide = true;
  isLogging = false;
  @ViewChild('basicModal') basicModal!: ModalDirective;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.basicModal.show();
  }

  onLogin() {
    this.isLogging = true;
    this.wrongCredentials = false;
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    this.userService
      .hasUser(username, password)
      .pipe(map((users: any) => users[0]))
      .subscribe(
        (user: User) => {
          console.log(user);
          setTimeout(() => {
            if (!user) {
              this.isLogging = false;
              this.wrongCredentials = true;
            } else {
              this.authService
                .login({
                  username: username,
                  password: password,
                })
                .subscribe((success: boolean) => {
                  console.log(success);
                  if (success) {
                    this.userService.setCurrentAccount(user.accountNumber);
                    this.router.navigate(['/dashboard']);
                  } else {
                    this.isLogging = false;
                    this.wrongCredentials = true;
                  }
                });
            }
          });
        },
        (err) => {
          setTimeout(() => (this.wrongCredentials = true), 2000);
        }
      );
    this.wrongCredentials = false;
  }
}
