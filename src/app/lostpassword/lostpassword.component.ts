import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ROUTE_MAP } from '../app.routes';
import { emailValidator } from '../app.validators';
import { ApiService } from '../services/api.service';
import { AbstractForm } from '../forms';

@Component({
  selector: 'lostpassword',
  styles: [ require('!raw-loader!sass-loader!./lostpassword.component.scss') ],
  template: require('!raw-loader!./lostpassword.component.html')
})
export class LostPasswordComponent extends AbstractForm implements OnInit {
  public pageTitle: string = 'Lost Password';
  public loginLink: string = ROUTE_MAP['LOGIN'];
  public submissionSuccessful: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService) {
      super();
  }

  ngOnInit() {
    this.buildForm();
  }

  protected buildForm(): void {
    this.validationMessages = {
      email: {
        'required': 'Please enter your email address.',
        'email': 'Please enter a valid email address'
      }
    };

    this.form = this.fb.group({
      'email': ['', [
        Validators.required,
        emailValidator()
      ]]
    });
  }

  protected performSubmission(): Promise<string> {
    const email = this.form.get('email').value;
    return this.api.lostPassword(email)
      .then(data => this.submissionDone(data))
      .catch(reason => this.submissionError(reason));
  }

  protected submissionDone(data) {
    this.formError = '';
    this.submissionSuccessful= true;
  }

  protected submissionError(reason) {
    this.formError = 'Uh oh! An unknown error occured and we were unable to send password reset instructions';
    this.submissionSuccessful = false;
  }
}
