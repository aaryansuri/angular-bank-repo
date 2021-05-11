import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './../app.material.module';
import { UIModule } from '../ui/ui.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [ReactiveFormsModule, AppMaterialModule, UIModule,RouterModule],
})

export class LoginModule {}
