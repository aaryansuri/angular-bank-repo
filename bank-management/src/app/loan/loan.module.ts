import { NgModule } from '@angular/core';
import { LoanComponent } from './loan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app.material.module';


@NgModule({
  declarations: [LoanComponent],
  imports: [ReactiveFormsModule, AppMaterialModule],

  exports: [LoanComponent],
})
export class LoanModule {}
