import { AbstractControl, ValidatorFn } from '@angular/forms';

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    // SO: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let regex = new RegExp(emailRegex);
    return regex.test(control.value) ? null : { email: true };
  };
};

export const passwordStrengthValidator = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    let containsNumeric = new RegExp(/[0-9]/);
    let containsNonNumeric = new RegExp(/[^0-9]/);

    let value = typeof control.value === 'string' ? control.value.trim() : '';

    const passed = value !== ''
      && containsNumeric.test(value)
      && containsNonNumeric.test(value);

    return passed ? null : { 'passwordstrength': true };
  };
};

export const displayNameValidator = (): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const regex = new RegExp(/^[a-zA-Z0-9\-_]{2,20}$/);

    let value = typeof control.value === 'string' ? control.value.trim() : '';

    return regex.test(value) ? null : { 'displayname': true };
  };
};
