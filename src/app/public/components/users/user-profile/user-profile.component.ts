import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Subscription } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: UserI | null = null;
  private sub: Subscription | undefined;
  userId: number | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.userId = parseInt(params['id']);
      this.userService
        .findOne(this.userId)
        .pipe(map((user: UserI) => (this.user = user)))
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
