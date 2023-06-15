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
export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss'],
})
export class UpdateUserProfileComponent implements OnInit {
  @ViewChild('fileUpload', { static: false })
  fileUpload!: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

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
      profileImage: [null]
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
    const fileInput = this.fileUpload.nativeElement;
  }

  uploadFile() {}

  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }
}
