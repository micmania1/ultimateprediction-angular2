import { async, inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppState } from '../app.service';
import { SessionService, ApiService, AuthGuardService, AuthService } from '../services';
import { LostPasswordComponent } from './lostpassword.component';
import { Toolbar } from '../components';

const FAILED_LOGIN_REASON = 'Invalid username or password.';

class MockApiService {

  protected accounts = {
    'test@example.com': {
      password: 'somepassword1',
      displayName: 'testuser',
    }
  };

  public lostPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }
}

describe('lost password screen', () => {

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
  const lostPasswordSuccess = (): any => {
    return getElementByReference('lostPasswordSuccess');
  }

  const lostPasswordForm = (): any => {
    return getElementByReference('lostPasswordForm');
  }

  const formHolder = (): any => {
    return getElementByReference('formHolder');
  }

  const emailInput = (): any => {
    return getElementByReference('emailInput');
  }

  const emailError = (): any => {
    return getElementByReference('emailError');
  }

  const submitButton = (): any => {
    return getElementByReference('submitButton');
  }

  /** Actions **/
  const updateEmailValue = (value: string, blur: boolean = true): any => {
    const input = emailInput().nativeElement;
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
        LostPasswordComponent,
        Toolbar
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
      fixture = TestBed.createComponent(LostPasswordComponent);
      component = fixture.componentInstance;

      fixture.autoDetectChanges(true);

      expect(component.submitted).toBe(false);
    });
  }));

  /** Tests **/
  it('should build the form on initialisation', () => {
    expect(component.form instanceof FormGroup).toBe(true);
    expect(lostPasswordForm()).not.toBeNull();
    expect(submitButton().properties['disabled']).toBeTruthy();
  });

  it('should submit a lost password for any valid email', (done) => {
    expect(lostPasswordSuccess().properties['hidden']).toBeTruthy('success message should hide');
    expect(formHolder().properties['hidden']).toBeFalsy('form should show');

    updateEmailValue('test@example.com');
    clickSubmitButton().then(() => {
      expect(lostPasswordSuccess().properties['hidden']).toBeFalsy('success message should show');
      expect(formHolder().properties['hidden']).toBeTruthy('form should hide');
      done();
    });
  });

  it('should not attempt login with an invalid email', () => {
    expect(emailError().properties['hidden']).toBeTruthy('error should be hidden');

    updateEmailValue('invalid email');

    expect(component.form.status).toBe('INVALID');
    expect(component.form.get('email').status).toBe('INVALID');

    clickSubmitButton().then(() => {
      expect(component.submitted).toBe(false, 'the form should not be submitted');
      expect(emailError().properties['hidden']).toBeFalsy('error should display');
    });
  });
});
