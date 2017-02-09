import { Pipe, PipeTransform } from '@angular/core';
const numeral = require('numeral');

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
