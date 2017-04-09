import { Pipe, PipeTransform } from '@angular/core';

declare var require: {
      <T>(path: string): T;
      (paths: string[], callback: (...modules: any[]) => void): void;
      ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
var numeral = require('numeral');

@Pipe({
  name: 'numeral'
})
export class NumeralPipe implements PipeTransform {

  transform(value: any, format: string): any {
    if(!format) {
      return value;
    }

    return numeral(value).format(format);
  }

}
