import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from './model/user.interface';
import { AuthenticationService } from './services/authentication.service';
import { environment } from '../environments/environment';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user?: UserI | null;
  title = 'fr-blog02';
  isLoggedIn: boolean = false;
  isBroken: boolean = false;

  url!: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  getAuthorization(): any {
    const token = localStorage.getItem('token');
    return token;
  }

  logout() {
    this.authService.logout();
  }

  // getProfileImageUrl(key: string) {
  //   console.log('this.userImg', this.user?.image);
  //   if (!key) {
  //     this.url = 'assets/omg-04.png';
  //   } else {
  //     this.user?.image
  //   }

  //   return this.user?.image;
  // }
  getProfileImageUrl() {
    console.log('this.userImg', this.authService.userValue?.image);
    console.log('x', this.user?.image);
    let x = this.authService.userValue?.image;
    if (!x) {
      console.log('no image');
      this.url = 'https://t4.ftcdn.net/jpg/01/24/65/69/240_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg';
    } else {
      this.url = this.authService.userValue?.image || '';
    }

    return this.url;
  }
}
