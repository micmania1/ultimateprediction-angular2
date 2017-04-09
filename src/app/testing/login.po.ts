import { PageObject } from './pageobject';

export class LoginPageObject extends PageObject {

  public form() {
    return this.element('loginForm');
  }

  public formErrorMsg() {
    return this.element('formErrorMsg');
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
