import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData, UserService } from '../../../services/user.service';
import { map, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: UserData | null = null;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initDataSource();
  }
  initDataSource() {
    this.userService
      .findAll(1, 10)
      .pipe(
        tap((users) => console.log(users)),
        map((userData: UserData) => (this.dataSource = userData))
      )
      .subscribe();
  }
}
