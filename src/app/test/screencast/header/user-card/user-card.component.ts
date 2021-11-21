import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user?: {name: string};

  constructor() { 
    console.log('user - 1', this.user)
  }

  ngOnInit(): void {
    console.log('user - 2 ', this.user)
  }

}
