import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personLabel'
})
export class PersonLabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.capitalize(value).replace(new RegExp('_', 'g'), ' ');
  }

  capitalize(value){
    const first = value.charAt(0);

    return `${first.toUpperCase()}${value.slice(1).toLowerCase()}`
  }

}
