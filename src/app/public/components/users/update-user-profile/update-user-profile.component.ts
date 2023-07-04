import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import {
  HttpEventType,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { WINDOW } from 'src/window.token';
import { Inject } from '@angular/core';
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

  origin = this.window.location.origin;

  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {
    console.log('origin', this.origin);
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      firstName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      image_url: [null],
    });

    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number) => {
          console.log('id', id);
          return this.userService.findOne(id).pipe(
            tap((user: UserI) => {
              this.form.patchValue({
                id: user.id,
                firstName: user.firstName,
                username: user.username,
                image_url: user.image_url,
              });
            })
          );
        })
      )
      .subscribe();
  }

  get profileImg(): FormControl {
    return this.form.get('profileImage') as FormControl;
  }
  onClick(event: any) {
    this.file = event.target.files[0];
    console.log('FILE',this.file);
    const fileInput = this.fileUpload.nativeElement;
    console.log('fileInput', fileInput);
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
    };
    console.log('this file', this.file);
    this.fileUpload.nativeElement.value = '';
    this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    console.log('this.file.data', this.file.data);
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.userService
      .uploadProfileImage(formData)
      .pipe(
        map((event) => {
          console.log('map uploadprofile img');
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ image_url: event.image_url });
        }
      });
  }

  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }
}
