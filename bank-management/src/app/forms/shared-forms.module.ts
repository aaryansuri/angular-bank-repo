import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { GuardianComponent } from './guardian/guardian.component';
import { PersonalFormComponent } from './personal/personal.component';

import { AppMaterialModule } from '../app.material.module';

@NgModule({
  declarations: [
    AddressComponent,
    BankDetailsComponent,
    GuardianComponent,
    PersonalFormComponent,
  ],
  imports: [ReactiveFormsModule, AppMaterialModule],
  exports: [
    AddressComponent,
    BankDetailsComponent,
    GuardianComponent,
    PersonalFormComponent,
  ],
})
export class SharedFormsModule {}
