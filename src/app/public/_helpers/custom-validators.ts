import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (
      password === passwordConfirm &&
      password !== null &&
      passwordConfirm &&
      passwordConfirm !== null
    ) {
      return null;
    } else {
      return { passwordNotMatching: true };
    }
  }

  static passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
    const regex = /\d/;

    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }
}
