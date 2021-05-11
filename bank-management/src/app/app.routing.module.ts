import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { OtherGuard } from './auth/guards/other.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegistrationComponent },
  {
    path: '',
    canActivate: [OtherGuard],
    canLoad: [OtherGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'applyLoan', component: LoanComponent },
      { path: 'loanDetails', component: LoanDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
