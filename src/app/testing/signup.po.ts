import { PageObject } from './pageobject';

export class SignupPageObject extends PageObject {

  public form() {
    return this.element('signupForm');
  }

  public formErrorMsg() {
    return this.element('formErrorMsg');
  }

  public displayNameInput() {
    return this.element('displayNameInput');
  }

  public displayNameError() {
    return this.element('displayNameError');
  }

  public emailInput() {
    return this.element('emailInput');
  }

  public emailError() {
    return this.element('emailError');
  }

  public passwordInput() {
    return this.element('passwordInput');
  }

  public passwordError() {
    return this.element('passwordError');
  }

  public submitButton() {
    return this.element('submitButton');
  }

  public updateDisplayNameValue(value: string) {
    return this.updateInputValue('displayNameInput', value);
  }

  public updateEmailValue(value: string) {
    return this.updateInputValue('emailInput', value);
  }

  public updatePasswordValue(value: string) {
    return this.updateInputValue('passwordInput', value);
  }

  public clickSubmitButton() {
    return this.click('submitButton');
  }

}
