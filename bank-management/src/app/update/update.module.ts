import { NgModule } from '@angular/core';
import { UpdateComponent } from './update.component';
import { SharedFormsModule } from '../forms/shared-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app.material.module';
import { UIModule } from '../ui/ui.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UpdateComponent],
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
export class UpdateModule {}
