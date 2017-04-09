import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class AbstractForm {

  protected _form: FormGroup;
  public submitted: boolean = false;
  public showErrors: { [key: string]: boolean } = {};
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public formFieldErrors: { [key: string]: string } = {};
  public formError: string = '';

  public set form(form: FormGroup) {
    this._form = form;
    this._form.valueChanges.subscribe(data => this.onValueChanges(data));
    this.onValueChanges();
  }

  public get form(): FormGroup {
    return this._form;
  }

  protected onValueChanges(data: {} = {}) {
    // console.info(data);
    if(!this._form) {
      return;
    }

    let fields = Object.keys(this._form.controls);
    fields.forEach((field) => {
      this.showErrors[field] = false;
      this.formFieldErrors[field] = null;

      // If the form field is disabled, we can skip it.
      if(!this._form.contains(field)) {
        return;
      }

      const control = this._form.get(field);
      if(this.hasOwnProperty(field) && typeof data[field] === 'string') {
        this[field] = data[field];
      }

      if(control && (control.dirty || this.submitted) && !control.valid) {
        const messages = this.validationMessages[field];

        for(const key in control.errors) {
          // We only show the first error.
          this.formFieldErrors[field] = messages[key];
          break;
        }

        this.showErrors[field] = control.touched || this.submitted;
      }
    });
  }

  public doSubmit(): Promise<string> {
    this.onValueChanges();
    if(!this._form.valid) {
      return Promise.reject('The form is invalid.');
    }

    this.submitted = true;
    return this.performSubmission();
  }

  protected abstract performSubmission(): Promise<string>;

}
