import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH } from '../app.config';
import {
  emailValidator,
  passwordStrengthValidator,
  displayNameValidator } from '../app.validators';
import { AbstractForm } from '../forms';
import { FacebookButton } from '../facebook-button';
import { TwitterButton } from '../twitter-button';
import { ApiService, AuthService, SessionService } from '../services';

@Component({
  selector: 'signup',
  styleUrls: [ './signup.component.scss' ],
  templateUrl: './signup.component.html'
})
export class SignupComponent extends AbstractForm implements OnInit {
  public homeLink: string = '/';
  public pageTitle: string = 'Signup';
  public signupInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private session: SessionService,
    private router: Router) {
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
       'minlength': `Display name must be at least ${MIN_DISPLAY_NAME_LENGTH} characters long`,
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
        Validators.minLength(MIN_DISPLAY_NAME_LENGTH),
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
    this.signupInProgress = true;

    const displayName = this.form.get('displayName').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    return this.api.signup(displayName, email, password)
      .then(
        (data) => this.signupSuccess(data),
        (reason) => this.signupFailure(reason)
      )
      .catch((reason) => this.signupError(reason));
  }

  /**
   * Handle successful login
   */
  private signupSuccess(data: any) {
    this.signupInProgress = false;
    this.formError = '';

    this.session.set('user', data);
    this.auth.refresh();

    this.router.navigate(['dashboard']);
  }

  /**
   * Handle signup failure
   */
  private signupFailure(reason: string) {
    this.signupInProgress = false;
    this.formError = reason;
  }

  /**
   * This is a generic way of handling unknown erros during signup
   */
  private signupError(error) {
    this.signupInProgress = false;
    this.formError = 'Ooop! Something went wrong and we weren\'t able to log you in.';
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
