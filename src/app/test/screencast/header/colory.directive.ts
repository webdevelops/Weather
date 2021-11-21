import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appColory]'
})
export class ColoryDirective {
  private counter = 0;

  @HostBinding('style.color') myColor: string;
  @HostListener('click', ['$event']) changeColor(event: any) {
    this.myColor = '#' + Math.floor(Math.random() * 12345678).toString(16);
    // console.log('myColor', this.myColor);
    this.log();
  }
  
  constructor() { 
    this.myColor = 'red';
    
    setTimeout(() => {
      this.myColor = 'green';
    }, 2000);
  }
  
  log(): void {
    console.log(this.counter++);
  }
}
