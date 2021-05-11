import { NgModule } from '@angular/core';

import { SharedFormsModule } from '../forms/shared-forms.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration.component';
import { UIModule } from '../ui/ui.module';
import { AppMaterialModule } from '../app.material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegistrationComponent],

  imports: [
    AppMaterialModule,
    UIModule,
    SharedFormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],

  exports: [],
})
export class RegistrationModule {}
