/**
 * Create a basic login form model which we'll use to bind changes to the actual
 * form controls.
 */
export class LoginForm {
  constructor(
    public email: string = '',
    public password: string = '') {
  }
}

