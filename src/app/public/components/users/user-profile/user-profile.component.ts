import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Subscription, Observable } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';
import { WINDOW } from 'src/window.token';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    @Inject(WINDOW) private window: Window
  ) {}

  private userId$: Observable<number> = th;
}
