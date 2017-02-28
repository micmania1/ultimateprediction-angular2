import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupPageObject } from '../testing';
import { AppState } from '../app.service';
import { SessionService, ApiService, AuthGuardService, AuthService } from '../services';
import { SignupComponent } from './signup.component';
import { Toolbar, FacebookButton, TwitterButton } from '../components';

const FAILED_DUPLICATE_EMAIL = 'duplicate email error';
const FAILED_DUPLICATE_DISPLAYNAME = 'duplicate display name error';

class MockApiService {

  protected accounts = [
    {
      email: 'test@example.com',
      password: 'somepassword1',
      displayName: 'testuser',
    }
  ];

  public signup(displayName: string, email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.emailExists(email)) {
        reject(FAILED_DUPLICATE_EMAIL);
      } else if (this.displayNameExists(displayName)) {
        reject(FAILED_DUPLICATE_DISPLAYNAME);
      }

      resolve({ id: 1, displayName: displayName });
    });
  }

  private emailExists(email: string): boolean {
    return this.accounts.find(user => user.email === email);
  }

  private displayNameExists(displayName: string): boolean {
    return this.accounts.find(user => user.displayName === displayName);
  }
}

describe('signup screen', () => {

  let page: SignupPageObject;

  /** Setup **/
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        SignupComponent,
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
      let fixture = TestBed.createComponent(SignupComponent);
      page = new SignupPageObject(fixture);

      expect(page.component.submitted).toBe(false);
    });
  }));

  /** Tests **/
  it('should build the form on initialisation', () => {
    expect(page.component.form instanceof FormGroup).toBe(true);
    expect(page.form()).not.toBeNull();
  });

  it('should show an error when a display name is too short', () => {
    expect(page.displayNameError().properties['hidden']).toBeTruthy('error should be hidden');

    page.updateDisplayNameValue('a');
    expect(page.displayNameError().properties['hidden']).toBeFalsy('error should show');

    page.updateDisplayNameValue('ab');
    expect(page.displayNameError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should show an error when display name is too long', () => {
    expect(page.displayNameError().properties['hidden']).toBeTruthy('error should be hidden');

    // Update display name with 21 "a's" (20 is limit)
    page.updateDisplayNameValue('aaaaaaaaaaaaaaaaaaaaa');
    expect(page.displayNameError().properties['hidden']).toBeFalsy('error should show');

    page.updateDisplayNameValue('aaaaa');
    expect(page.displayNameError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should show an error when invalid characters are used in display name', () => {
    expect(page.displayNameError().properties['hidden']).toBeTruthy('error should be hidden');

    // Update display name with 21 "a's" (20 is limit)
    page.updateDisplayNameValue('aaa!bbb');
    expect(page.displayNameError().properties['hidden']).toBeFalsy('error should show');

    page.updateDisplayNameValue('aaa-bbb');
    expect(page.displayNameError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should attempt signup with valid credentials', (done) => {
    page.updateDisplayNameValue('testDisplayName');
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('somepassword1');

    page.clickSubmitButton().then(() => {
      expect(page.component.form.get('displayName').value).toBe('testDisplayName');
      expect(page.component.form.get('email').value).toBe('test@example.com');
      expect(page.component.form.get('password').value).toBe('somepassword1');
      expect(page.component.submitted).toBeTruthy();

      // const session = fixture.debugElement.injector.get(SessionService);
      // expect(session.get('user').displayName).toBe('testuser');
      done();
    });

  });

  it('should show an error when an invalid email is entered', () => {
    expect(page.emailError().properties['hidden']).toBeTruthy('error should be hidden');

    // Update display name with 21 "a's" (20 is limit)
    page.updateEmailValue('aaaaa');
    expect(page.emailError().properties['hidden']).toBeFalsy('error should show');

    page.updateEmailValue('test@test.com');
    expect(page.emailError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should not attempt signup with an invalid email', () => {
    expect(page.emailError().properties['hidden']).toBeTruthy('error should be hidden');

    page.updateEmailValue('invalid email');
    page.updatePasswordValue('somevalidpassword1');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('email').status).toBe('INVALID');

    page.clickSubmitButton();

    expect(page.component.submitted).toBe(false, 'the form should not be submitted');
    expect(page.emailError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt signup with a password less than 8 characters', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('aaaaaaa');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('password').status).toBe('INVALID');

    page.clickSubmitButton();
    expect(page.component.submitted).toBe(false);
    expect(page.passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to signup without a non-numeric character in password', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('1234567890');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('password').status).toBe('INVALID');

    page.clickSubmitButton();
    expect(page.component.submitted).toBe(false);
    expect(page.passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to signup without a numeric character in password', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('abcdefghij');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('password').status).toBe('INVALID');

    page.clickSubmitButton();
    expect(page.component.submitted).toBe(false);
    expect(page.passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt signup with empty password', () => {
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('');

    expect(page.submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(page.passwordError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should not attempt to signup with empty email', () => {
    page.updateEmailValue('');
    page.updatePasswordValue('somepassword1');

    expect(page.submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(page.emailError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should show an error when user signs up with existing display name', (done) => {
    page.updateDisplayNameValue('testuser');
    page.updateEmailValue('valid@example.com');
    page.updatePasswordValue('validpassword1');

    expect(page.component.formError).toBe('');
    expect(page.formErrorMsg().properties['hidden']).toBeTruthy('should not show form error');

    page.clickSubmitButton().then(() => {
      // Ensure we have set an error message
      expect(page.component.formError).toBe(FAILED_DUPLICATE_DISPLAYNAME);
      expect(page.formErrorMsg().properties['hidden']).toBeFalsy('should show form error');
      done();
    });
  });

  if('should show an error when user signs up with existing email address', () => {
    page.updateDisplayNameValue('newuser');
    page.updateEmailValue('test@example.com');
    page.updatePasswordValue('validpassword1');

    expect(page.component.formError).toBe('');
    expect(page.formErrorMsg().properties['hidden']).toBeTruthy('should not show form error');

    page.clickSubmitButton().then(() => {
      // Ensure we have set an error message
      expect(page.component.formError).toBe(FAILED_DUPLICATE_EMAIL);
      expect(page.formErrorMsg().properties['hidden']).toBeFalsy('should show form error');
      done();
    });
  });
});
