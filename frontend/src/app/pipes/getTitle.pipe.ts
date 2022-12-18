import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'getTitle'
})
export class getTitlePipe implements PipeTransform {
  transform(value: any): string {
    return value.title;
  }
}