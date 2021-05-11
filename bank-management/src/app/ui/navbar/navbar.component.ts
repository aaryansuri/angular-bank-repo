import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() accountShow!: boolean;
  @Input() logoutShow!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe((success) => {
      if (success) {
        this.router.navigate(['/login']);
      }
    });
  }
}
