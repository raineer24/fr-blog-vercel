import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  login() {
    console.log('test');
    console.log('login');
    return this.authService.login('raineerdelarita81@gmail.com', 'test123').subscribe((data) => console.log('success'));
  }
}
