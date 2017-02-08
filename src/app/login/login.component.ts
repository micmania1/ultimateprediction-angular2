import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTE_MAP } from '../app.routes';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../app.config';
import { emailValidator, passwordStrengthValidator } from '../app.validators';
import { Toolbar, FacebookButton, TwitterButton, AbstractForm } from '../components';
import { ApiService, AuthService, SessionService } from '../services';
import { User } from '../model';

@Component({
  selector: 'login',
  styles: [ require('!raw-loader!sass-loader!./login.component.scss') ],
  template: require('!raw-loader!./login.component.html')
})
export class LoginComponent extends AbstractForm implements OnInit {

  public pageTitle: string = 'Log in';
  public homeLink: string = ROUTE_MAP['HOME'];
  public lostPasswordLink: string = ROUTE_MAP['LOSTPASSWORD'];

  // state
  public loginInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private session: SessionService,
    private router: Router) {
      super();
  }

  ngOnInit(): void {
    this.session.clear();
    this.buildForm();
  }

  protected buildForm(): void {
    this.validationMessages = {
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

  attemptFacebookLogin() {
    // console.info('Attempt facebook login');
    this.loginInProgress = true;

    // Mimic network request for now
    setTimeout(() => {
      this.loginInProgress = false;
    }, 2000);
  }

  attemptTwitterLogin() {
    // console.info('Attempt twitter login');
    this.loginInProgress = true;

    // Mimic network request for now
    setTimeout(() => {
      this.loginInProgress = false;
    }, 2000);
  }

  performSubmission(): Promise<any> {
    this.loginInProgress = true;

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    return this.api.login(email, password)
      .then(
        (data) => this.loginSuccess(data),
        (reason) => this.loginFailure(reason)
      )
      .catch((reason) => this.loginError(reason));
  }

  /**
   * This gets called whena  user logs in successfully
   */
  private loginSuccess(data: any) {
    this.loginInProgress = false;
    this.formError = '';

    this.session.set('user', data);
    this.auth.refresh();

    this.router.navigate(['dashboard']);
  }

  /**
   * This gets called when the users login attempt fails due to invalid details
   */
  private loginFailure(reason: string) {
    this.loginInProgress = false;
    this.formError = reason;
  }

  /**
   * This is a generic way of handling unknown erros during login
   */
  private loginError(error) {
    this.loginInProgress = false;
    this.formError = 'Ooop! Something went wrong and we weren&#039;t able to log you in.';
  }
}

