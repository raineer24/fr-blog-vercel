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
  HttpResponse,
  HttpClient,
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
  progress: number | undefined;
  imageUrl: any;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  private fileEvent: any;

  origin = this.window.location.origin;

  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient,
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
  onClick() {
    //  this.fileEvent = event;

    console.log('FILE', this.file);
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageUrl = event.target.result;
        console.log('thisimgurl', reader.result)
      }
      reader.readAsDataURL(this.file.data);
      this.uploadFile();
    };
  }



  uploadFile() {
    const formData: any = new FormData();
    console.log('this.file.data', this.file);
    formData.append('image', this.file.data);
    // this.file.inProgress = true;
    this.file.inProgress = true;

    this.userService
      .uploadProfileImage(formData)
      .pipe(
        map((event) => {
          console.log('upload img', this.file.progress);
          if (event.type === HttpEventType.UploadProgress) {
            console.log('100 hunderd', this.file.progress);
            if (this.file.progress == 100) {
              console.log('100 hunderd');
            }
            const percentDone = Math.round((event.loaded / event.total) * 100);
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
            console.log(event.body);
          }
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              console.log('file.progress', this.file.progress);
              console.log('file.progress');
              break;
            case HttpEventType.Response:
              return event;
          }

          // return event;
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ image_url: event.body.image_url });
        }
      });
  }

  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
  }
}
