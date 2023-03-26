import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fr-blog02';
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  navigateTo(value: any) {
    this.router.navigate(['../', value]);
    console.log('router', this.router.navigate(['/public/', value]));
  }
}
