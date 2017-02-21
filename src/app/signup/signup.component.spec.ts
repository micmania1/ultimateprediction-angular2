import { async, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

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
  const form = (): any => {
    return getElementByReference('signupForm');
  }

  const formErrorMsg = (): any => {
    return getElementByReference('formErrorMsg');
  }

  const displayNameInput = (): any => {
    return getElementByReference('displayNameInput');
  }

  const displayNameError = (): any => {
    return getElementByReference('displayNameError');
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
  const updateDisplayNameValue = (value: string, blur: boolean = true): any => {
    const input = displayNameInput().nativeElement;
    return updateInputValue(input, value, blur);
  }

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
      fixture = TestBed.createComponent(SignupComponent);
      component = fixture.componentInstance;

      fixture.autoDetectChanges(true);

      expect(component.submitted).toBe(false);
    });
  }));

  /** Tests **/
  it('should build the form on initialisation', () => {
    expect(component.form instanceof FormGroup).toBe(true);
    expect(form()).not.toBeNull();
  });

  it('should show an error when a display name is too short', () => {
    expect(displayNameError().properties['hidden']).toBeTruthy('error should be hidden');

    updateDisplayNameValue('a');
    expect(displayNameError().properties['hidden']).toBeFalsy('error should show');

    updateDisplayNameValue('ab');
    expect(displayNameError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should show an error when display name is too long', () => {
    expect(displayNameError().properties['hidden']).toBeTruthy('error should be hidden');

    // Update display name with 21 "a's" (20 is limit)
    updateDisplayNameValue('aaaaaaaaaaaaaaaaaaaaa');
    expect(displayNameError().properties['hidden']).toBeFalsy('error should show');

    updateDisplayNameValue('aaaaa');
    expect(displayNameError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should show an error when invalid characters are used in display name', () => {
    expect(displayNameError().properties['hidden']).toBeTruthy('error should be hidden');

    // Update display name with 21 "a's" (20 is limit)
    updateDisplayNameValue('aaa!bbb');
    expect(displayNameError().properties['hidden']).toBeFalsy('error should show');

    updateDisplayNameValue('aaa-bbb');
    expect(displayNameError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should attempt signup with valid credentials', (done) => {
    updateDisplayNameValue('testDisplayName');
    updateEmailValue('test@example.com');
    updatePasswordValue('somepassword1');

    clickSubmitButton().then(() => {
      expect(component.form.get('displayName').value).toBe('testDisplayName');
      expect(component.form.get('email').value).toBe('test@example.com');
      expect(component.form.get('password').value).toBe('somepassword1');
      expect(component.submitted).toBeTruthy();

      // const session = fixture.debugElement.injector.get(SessionService);
      // expect(session.get('user').displayName).toBe('testuser');
      done();
    });

  });

  it('should show an error when an invalid email is entered', () => {
    expect(emailError().properties['hidden']).toBeTruthy('error should be hidden');

    // Update display name with 21 "a's" (20 is limit)
    updateEmailValue('aaaaa');
    expect(emailError().properties['hidden']).toBeFalsy('error should show');

    updateEmailValue('test@test.com');
    expect(emailError().properties['hidden']).toBeTruthy('error should be hidden');
  });

  it('should not attempt signup with an invalid email', () => {
    expect(emailError().properties['hidden']).toBeTruthy('error should be hidden');

    updateEmailValue('invalid email');
    updatePasswordValue('somevalidpassword1');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('email').status).toBe('INVALID');

    clickSubmitButton();

    expect(component.submitted).toBe(false, 'the form should not be submitted');
    expect(emailError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt signup with a password less than 8 characters', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('aaaaaaa');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('password').status).toBe('INVALID');

    clickSubmitButton();
    expect(component.submitted).toBe(false);
    expect(passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to signup without a non-numeric character in password', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('1234567890');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('password').status).toBe('INVALID');

    clickSubmitButton();
    expect(component.submitted).toBe(false);
    expect(passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt to signup without a numeric character in password', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('abcdefghij');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('password').status).toBe('INVALID');

    clickSubmitButton();
    expect(component.submitted).toBe(false);
    expect(passwordError().properties['hidden']).toBeFalsy('error should display');
  });

  it('should not attempt signup with empty password', () => {
    updateEmailValue('test@example.com');
    updatePasswordValue('');

    expect(submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(passwordError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should not attempt to signup with empty email', () => {
    updateEmailValue('');
    updatePasswordValue('somepassword1');

    expect(submitButton().properties['disabled']).toBeTruthy('submit button should be disabled');

    expect(emailError().properties['hidden']).toBeFalsy('should show error');
  });

  it('should show an error when user signs up with existing display name', (done) => {
    updateDisplayNameValue('testuser');
    updateEmailValue('valid@example.com');
    updatePasswordValue('validpassword1');

    expect(component.formError).toBe('');
    expect(formErrorMsg().properties['hidden']).toBeTruthy('should not show form error');

    clickSubmitButton().then(() => {
      // Ensure we have set an error message
      expect(component.formError).toBe(FAILED_DUPLICATE_DISPLAYNAME);
      expect(formErrorMsg().properties['hidden']).toBeFalsy('should show form error');
      done();
    });
  });

  if('should show an error when user signs up with existing email address', () => {
    updateDisplayNameValue('newuser');
    updateEmailValue('test@example.com');
    updatePasswordValue('validpassword1');

    expect(component.formError).toBe('');
    expect(formErrorMsg().properties['hidden']).toBeTruthy('should not show form error');

    clickSubmitButton().then(() => {
      // Ensure we have set an error message
      expect(component.formError).toBe(FAILED_DUPLICATE_EMAIL);
      expect(formErrorMsg().properties['hidden']).toBeFalsy('should show form error');
      done();
    });
  });
});
