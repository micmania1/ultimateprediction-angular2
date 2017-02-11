import { async, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppState } from '../app.service';
import { SessionService, ApiService, AuthGuardService, AuthService } from '../services';
import { LoginComponent } from './login.component';
import { Toolbar, FacebookButton, TwitterButton } from '../components';

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

      resolve({ displayName: account.displayName });
    });
  }
}

describe('login screen', () => {

  let fixture;
  let component;

  /** Helpers **/
  const getElementByReference = (el: string): any => {
    return fixture.debugElement.query(de => de.references[el]);
  };

  const updateInputValue = (input: HTMLInputElement, value: any, blur: boolean = true) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));

    // If blur is set to true we'll trigger the blur event after updating the value
    if(blur) {
      input.dispatchEvent(new Event('blur'));
    }

    return fixture.whenStable();
  }

  /** Elements **/
  const loginForm = (): any => {
    return getElementByReference('loginForm');
  }

  const formErrorMsg = (): any => {
    return getElementByReference('formErrorMsg');
  }

  const emailInput = (): any => {
    return getElementByReference('emailInput');
  }

  const emailError = (): any => {
    return getElementByReference('emailError');
  }

  const passwordInput = (): any => {
    return getElementByReference('passwordInput');
  }

  const passwordError = (): any => {
    return getElementByReference('passwordError');
  }

  const submitButton = (): any => {
    return getElementByReference('submitButton');
  }

  /** Actions **/
  const updateEmailValue = (value: string, blur: boolean = true): any => {
    const input = emailInput().nativeElement;
    return updateInputValue(input, value, blur);
  }

  const updatePasswordValue = (value: string, blur: boolean = true): void => {
    const input = passwordInput().nativeElement;
    return updateInputValue(input, value, blur);
  }

  const clickSubmitButton = (): any => {
    submitButton().nativeElement.click();
    return fixture.whenStable();
  }

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
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      fixture.autoDetectChanges(true);

      expect(component.submitted).toBe(false);
    });
  }));

  /** Tests **/
  it('should build the form on initialisation', () => {
    expect(component.form instanceof FormGroup).toBe(true);
    expect(loginForm()).not.toBeNull();
  });

  it('should attempt login with valid credentials', (done) => {
    updateEmailValue('test@example.com');
    updatePasswordValue('somepassword1');

    clickSubmitButton().then(() => {
      expect(component.form.get('email').value).toBe('test@example.com');
      expect(component.form.get('password').value).toBe('somepassword1');
      expect(component.submitted).toBeTruthy();

      const session = fixture.debugElement.injector.get(SessionService);
      expect(session.get('user').displayName).toBe('testuser');
      done();
    });

  });

  it('should not attempt login with an invalid email', () => {
    expect(emailError().properties['hidden']).toBeTruthy('error should be hidden');

    updateEmailValue('invalid email');
    updatePasswordValue('somevalidpassword1');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('email').status).toBe('INVALID');

    clickSubmitButton();

    expect(component.submitted).toBe(false, 'the form should not be submitted');
    expect(emailError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt login with a password less than 8 characters', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('aaaaaaa');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('password').status).toBe('INVALID');

    clickSubmitButton();
    expect(component.submitted).toBe(false);
    expect(passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to login without a non-numeric character in password', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('1234567890');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('password').status).toBe('INVALID');

    clickSubmitButton();
    expect(component.submitted).toBe(false);
    expect(passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to login without a numeric character in password', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('abcdefghij');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('password').status).toBe('INVALID');

    clickSubmitButton();
    expect(component.submitted).toBe(false);
    expect(passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt login with empty passwordy', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('');

    expect(submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(passwordError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should not attempt to login with empty email', () => {
    updateEmailValue('');
    updatePasswordValue('somepassword1');

    expect(submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(emailError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should show an error when user logs in with invalid credentials', (done) => {
    updateEmailValue('invalid@example.com');
    updatePasswordValue('incorrectValue1');

    expect(component.formError).toBe('');
    expect(formErrorMsg().properties['hidden']).toBeTruthy('should not show form error');

    clickSubmitButton().then(() => {
      // Ensure we have set an error message
      expect(component.formError).toBe(FAILED_LOGIN_REASON);
      expect(formErrorMsg().properties['hidden']).toBeFalsy('should show form error');
      done();
    });
  });
});
