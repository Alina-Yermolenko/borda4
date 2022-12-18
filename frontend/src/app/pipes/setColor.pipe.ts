import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'setColor'
})
export class setColorPipe implements PipeTransform {
  transform(value: any): any {
    if(value === true){
        return '#F67280';
    }
    if(value === false){
        return 'black';
    }
  }
}