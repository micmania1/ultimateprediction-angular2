/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NumeralPipe } from './numeral.pipe';

describe('NumeralPipe', () => {
  it('create an instance', () => {
    const pipe = new NumeralPipe();
    expect(pipe instanceof NumeralPipe).toBeTruthy();
  });

  it('should format positions with correct suffix', () => {
    const pipe = new NumeralPipe();

    let value = 1;
    expect(pipe.transform(value, 'Oo')).toEqual('1st');
  });
});
