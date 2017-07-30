import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetical'
})
export class AlphabeticalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
