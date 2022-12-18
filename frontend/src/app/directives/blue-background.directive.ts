import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[blueBackground]'
})
export class BlueBackgroundDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = "rgb(0, 98, 179)";
  }
}