import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoginModule } from './login/login.module';
import { LoanModule } from './loan/loan.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UIModule } from './ui/ui.module';
import { LayoutModule } from '@angular/cdk/layout';
import { LoanDetailsModule } from './loan-details/loan-details.module';
import { AppRoutingModule } from './app.routing.module';
import { RegistrationModule } from './registration/registration.module';
import { UpdateModule } from './update/update.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    LoginModule,
    RegistrationModule,
    LoanModule,
    LoanDetailsModule,
    DashboardModule,
    UIModule,
    UpdateModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
