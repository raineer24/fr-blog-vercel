import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import {
  HttpEventType,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss'],
})
export class UpdateUserProfileComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      firstName: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });

    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number) =>
          this.userService.findOne(id).pipe(
            tap((user: UserI) => {
              this.form.patchValue({
                id: user.id,
                firstName: user.firstName,
                username: user.username,
              });
            })
          )
        )
      )
      .subscribe();
  }

  onClick() {

  }

  uploadFile() {}

  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }
}
