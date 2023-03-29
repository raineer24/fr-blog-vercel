import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
[x: string]: any;
  title = 'fr-blog02';
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

 
  getAuthorization(): any {
    const token = localStorage.getItem("token");
    return token; 
  }
}
