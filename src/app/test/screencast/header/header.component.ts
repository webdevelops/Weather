import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // user?: {name: string};
  width?: '';
  myClass = "red";
  myColor = 'red';
  user = { name: 'Oleh' };

  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
      // this.myClass = 'blue';
      // this.user = { name: 'Oleh' };

      // setTimeout(() => this.myClass = 'green', 2000);
    // }, 2000)
  }

  changeColor(color: string): void {  
    this.myColor = color;
  }

  setColor(event: any): void {
    this.myColor = event.target.value;
    console.log('color', event.target.value);
  }

  inputColor(event: any): void {}
}
