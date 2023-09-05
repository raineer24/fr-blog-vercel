import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap, tap, map, catchError, every } from 'rxjs/operators';
import {
  HttpEventType,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { WINDOW } from 'src/window.token';
import { Inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
// export interface File {
//   data: any;
//   progress: number;
//   inProgress: boolean;
// }

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
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  //fileUpload!: ElementRef;

  file!: File;
  private fileEvent: any;

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
  onClick(event: Event) {
    this.fileEvent = event;
    this.file = this.fileEvent.target.files[0];
    console.log('FILE', this.file);

    // const input = event.target as HTMLInputElement;
    // if (input.files === null || input.files.length === 0) {
    //   return;
    // }
    // const file = input.files[0];
    //console.log('input files [0]', file);
    // const fileInput = this.fileUpload.nativeElement;
    // console.log('fileInput', fileInput);
    // fileInput.click();
    // fileInput.onchange = () => {
    //   this.file = {
    //     data: fileInput.files[0],
    //     inProgress: false,
    //     progress: 0,
    //   };
    // };
    console.log('this file', this.file);
    this.fileUpload.nativeElement.value = '';
    this.uploadFile();
  }

  uploadFile() {
    const formData: any = new FormData();
    console.log('this.file.data', this.file);
    formData.append('image', this.file);
    // this.file.inProgress = true;
    console.log('formdatas', formData);
    formData.forEach((value: string, key: string) => {
      console.log(key + ' ' + value);
    });
    this.userService
      .uploadProfileImage(formData)
      .pipe(
        map((event) => {
          console.log('map uploadprofile img');
          console.log('this file', this.file);
          console.log('event', event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload complete');
        }
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log('Progress ' + percentDone + '%');
      } 
          // switch (event.type) {
          //   case HttpEventType.UploadProgress:
          //     this.file.progress = Math.round(
          //       (event.loaded * 100) / event.total
          //     );
          //     break;
          //   case HttpEventType.Response:
          //     return event;
          // }
          return event;
        }),
        catchError((err) => {
          console.log('err', err);
          return throwError(err);
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
