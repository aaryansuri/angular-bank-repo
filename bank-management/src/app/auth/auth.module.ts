import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { OtherGuard } from './guards/other.guard';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [],
  providers: [
    AuthGuard,
    AuthService,
    OtherGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class AuthModule {}
