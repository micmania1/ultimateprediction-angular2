import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  public login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // reject('Authentication failed');
      resolve( { id: 1, displayName: 'micmania1' } );
    });
  }

  public lostPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.info('Password reset sent: ' + email);
      // reject('Something is wrong. eg. non-200 response');
      resolve( { success: true } );
    });
  }

  public signup(displayName: string, email: string, password: string)
  {
    return new Promise((resolve, reject) => {
      console.info('signup attempted: ' + displayName + ' ' + email + ' ' + password);
      // reject('Something is wrong. eg. non-200 response');
      resolve( { id: 1, displayName: 'micmania1' } );
    });
  }

}
