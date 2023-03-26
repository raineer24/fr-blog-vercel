import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/model/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  user: UserI | null;

  constructor(private authService: AuthenticationService) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {}
}
