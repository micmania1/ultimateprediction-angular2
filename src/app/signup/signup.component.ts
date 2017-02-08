import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ROUTE_MAP } from '../app.routes';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_DISPLAY_NAME_LENGTH } from '../app.config';
import {
  emailValidator,
  passwordStrengthValidator,
  displayNameValidator } from '../app.validators';
import { FacebookButton, TwitterButton, AbstractForm } from '../components';
import { ApiService } from '../services';

@Component({
  selector: 'signup',
  styles: [ require('!raw-loader!sass-loader!./signup.component.scss') ],
  template: require('!raw-loader!./signup.component.html')
})
export class SignupComponent extends AbstractForm implements OnInit{
  public homeLink: string = ROUTE_MAP['HOME'];
  public pageTitle: string = 'Signup';
  public signupInProgress: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  protected buildForm() {
   this.validationMessages = {
     'displayName': {
       'required': 'Display name is required',
       'displayname': 'Your display name must contain only numbers, letters, - and _',
       'maxlength': `Display name must be no more than ${MAX_DISPLAY_NAME_LENGTH} characters long`
     },
      'email': {
        'required': 'Email is required',
        'email': 'Please enter a valid email address'
      },
      'password': {
        'required': 'Password is requried',
        'minlength': `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        'passwordstrength': 'Your password must contain at least one numeric character and one non-numeric character'
      }
    };

    this.form = this.fb.group({
      'displayName': ['', [
        Validators.required,
        Validators.maxLength(MAX_DISPLAY_NAME_LENGTH),
        displayNameValidator()
      ]],
      'email': ['', [
        Validators.required,
        emailValidator()
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(MIN_PASSWORD_LENGTH),
        Validators.maxLength(MAX_PASSWORD_LENGTH),
        passwordStrengthValidator()
      ]]
    });
  }

  protected performSubmission(): Promise<string> {
    console.info('do signup pls');
    return Promise.resolve('resolve the promise');
  }

  public attemptFacebookSignup() {
    console.log('attempt facebook signup');
    this.signupInProgress = true;

    setTimeout(() => {
      this.signupInProgress = false;
    }, 2000);
  }

  public attemptTwitterSignup() {
    console.log('attempt twitter signup');
    this.signupInProgress = true;

    setTimeout(() => {
      this.signupInProgress = false;
    }, 2000);
  }
}
