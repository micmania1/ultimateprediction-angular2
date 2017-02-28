import { PageObject } from './pageobject';

export class LostPasswordPageObject extends PageObject {

  public form() {
    return this.element('lostPasswordForm');
  }

  public lostPasswordSuccess() {
    return this.element('lostPasswordSuccess');
  }

  public formHolder() {
    return this.element('formHolder');
  }

  public emailInput() {
    return this.element('emailInput');
  }

  public emailError() {
    return this.element('emailError');
  }

  public submitButton() {
    return this.element('submitButton');
  }

  public updateEmailValue(value: string) {
    return this.updateInputValue('emailInput', value);
  }

  public clickSubmitButton() {
    return this.click('submitButton');
  }

}
