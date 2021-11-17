import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.scss']
})
export class ChangeDetectionComponent implements OnInit {
  config = {
    position: 'top'
  };

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    // this.config.position = 'bottom';
    this.config = {
      position:'bottom'
    };
  }
}
