import { NgModule } from '@angular/core';

import { LoanDetailsComponent } from './loan-details.component';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  declarations: [LoanDetailsComponent],
  imports: [AppMaterialModule],
})
export class LoanDetailsModule {}
