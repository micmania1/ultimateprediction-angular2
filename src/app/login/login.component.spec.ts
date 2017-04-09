import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppState } from '../app.service';
import { SessionService, ApiService, AuthGuardService, AuthService } from '../services';
import { LoginComponent } from './login.component';
import { Toolbar } from '../toolbar';
import { LoginPageObject } from '../testing';
import { FacebookButton } from '../facebook-button';
import { TwitterButton } from '../twitter-button';

const FAILED_LOGIN_REASON = 'Invalid username or password.';

class MockApiService {

  protected accounts = {
    'test@example.com': {
      password: 'somepassword1',
      displayName: 'testuser',
    }
  };

  public login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const account = this.accounts[email];
      if(!account || account.password !== password) {
        reject(FAILED_LOGIN_REASON);
        return;
      }

      resolve({ id: 1, displayName: account.displayName });
    });
  }
}

describe('login screen', () => {

  let page: LoginPageObject;

  /** Setup **/
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        LoginComponent,
        Toolbar,
        FacebookButton,
        TwitterButton
      ],
      providers: [
        AppState,
        SessionService,
        FormBuilder,
        AuthGuardService,
        AuthService,
        { provide: ApiService, useClass: MockApiService }
      ]
    })
    .compileComponents()
    .then(() => {
      let fixture = TestBed.createComponent(LoginComponent);
      page = new LoginPageObject(fixture);

      expect(page.component.submitted).toBe(false);
    });
  }));

  /** Tests **/
  it('should build the form on initialisation', () => {
    expect(page.component.form instanceof FormGroup).toBe(true);
    expect(page.form()).not.toBeNull();
  });

  it('should attempt login with valid credentials', (done) => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('somepassword1');

    page.clickSubmitButton().then(() => {
      expect(page.component.form.get('email').value).toBe('test@example.com');
      expect(page.component.form.get('password').value).toBe('somepassword1');
      expect(page.component.submitted).toBeTruthy();

      const session = page.service(SessionService);
      expect(session.get('user').displayName).toBe('testuser');
      done();
    });

  });

  it('should not attempt login with an invalid email', () => {
    expect(page.emailError().properties['hidden']).toBeTruthy('error should be hidden');

    page.updateEmailValue('invalid email');
    page.updatePasswordValue('somevalidpassword1');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('email').status).toBe('INVALID');

    page.clickSubmitButton();

    expect(page.component.submitted).toBe(false, 'the form should not be submitted');
    expect(page.emailError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt login with a password less than 8 characters', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('aaaaaaa');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('password').status).toBe('INVALID');

    page.clickSubmitButton();
    expect(page.component.submitted).toBe(false);
    expect(page.passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to login without a non-numeric character in password', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('1234567890');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('password').status).toBe('INVALID');

    page.clickSubmitButton();
    expect(page.component.submitted).toBe(false);
    expect(page.passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to login without a numeric character in password', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('abcdefghij');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('password').status).toBe('INVALID');

    page.clickSubmitButton();
    expect(page.component.submitted).toBe(false);
    expect(page.passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt login with empty passwordy', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('');

    expect(page.submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(page.passwordError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should not attempt to login with empty email', () => {
    page.updateEmailValue('');
    page.updatePasswordValue('somepassword1');

    expect(page.submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(page.emailError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should show an error when user logs in with invalid credentials', (done) => {
    page.updateEmailValue('invalid@example.com');
    page.updatePasswordValue('incorrectValue1');

    expect(page.component.formError).toBe('');
    expect(page.formErrorMsg().properties['hidden']).toBeTruthy('should not show form error');

    page.clickSubmitButton().then(() => {
      // Ensure we have set an error message
      expect(page.component.formError).toBe(FAILED_LOGIN_REASON);
      expect(page.formErrorMsg().properties['hidden']).toBeFalsy('should show form error');
      done();
    });
  });
});
