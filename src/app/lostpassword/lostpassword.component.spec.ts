import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LostPasswordPageObject } from '../testing';
import { AppState } from '../app.service';
import { SessionService, ApiService, AuthGuardService, AuthService } from '../services';
import { LostPasswordComponent } from './lostpassword.component';
import { Toolbar } from '../toolbar';

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

  let page: LostPasswordPageObject;

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
      let fixture = TestBed.createComponent(LostPasswordComponent);
      page = new LostPasswordPageObject(fixture);
      expect(page.component.submitted).toBe(false);
    });
  }));

  /** Tests **/
  it('should build the form on initialisation', () => {
    expect(page.component.form instanceof FormGroup).toBe(true);
    expect(page.form()).not.toBeNull();
    expect(page.submitButton().properties['disabled']).toBeTruthy();
  });

  it('should submit a lost password for any valid email', (done) => {
    expect(page.lostPasswordSuccess().properties['hidden']).toBeTruthy('success message should hide');
    expect(page.formHolder().properties['hidden']).toBeFalsy('form should show');

    page.updateEmailValue('test@example.com');
    page.clickSubmitButton().then(() => {
      expect(page.lostPasswordSuccess().properties['hidden']).toBeFalsy('success message should show');
      expect(page.formHolder().properties['hidden']).toBeTruthy('form should hide');
      done();
    });
  });

  it('should not attempt login with an invalid email', () => {
    expect(page.emailError().properties['hidden']).toBeTruthy('error should be hidden');

    page.updateEmailValue('invalid email');

    expect(page.component.form.status).toBe('INVALID');
    expect(page.component.form.get('email').status).toBe('INVALID');

    page.clickSubmitButton().then(() => {
      expect(page.component.submitted).toBe(false, 'the form should not be submitted');
      expect(page.emailError().properties['hidden']).toBeFalsy('error should display');
    });
  });
});
