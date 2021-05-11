import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, ModalComponent],
  imports: [AppMaterialModule, RouterModule],

  exports: [ModalComponent, NavbarComponent, FooterComponent],
})
export class UIModule {}
