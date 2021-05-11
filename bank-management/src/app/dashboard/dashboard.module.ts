import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [AppMaterialModule],
})
export class DashboardModule {}
