import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from './model/user.interface';
import { AuthenticationService } from './services/authentication.service';
import { environment } from '../environments/environment';
import { ChangeDetectionStrategy } from '@angular/core';
import { BlogService } from './services/blog.service';
import { PageEvent } from '@angular/material/paginator';
import { BlogEntriesPageable, BlogEntry } from './model/blog-entry.interface';
import { Observable, map } from 'rxjs';
@Component({
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
    private authService: AuthenticationService,
    private blogService: BlogService
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

  blogEntries$: Observable<BlogEntriesPageable> = this.blogService.indexAll(
    1,
    10
  );

  // onPaginateChange(event: PageEvent) {
  //   this.blogEntries$ = this.blogService.indexAll(
  //     event.pageIndex,
  //     event.pageSize
  //   );
  // }
  onPaginateChange1(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.blogService
      .findAll(page, size)
      .pipe(map((blogData: BlogEntry) => {
        console.log('blogdata', blogData);
        return blogData;
      }))
      .subscribe();
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
      this.url =
        'https://t4.ftcdn.net/jpg/01/24/65/69/240_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg';
    } else {
      this.url = this.authService.userValue?.image || '';
    }

    return this.url;
  }
}
