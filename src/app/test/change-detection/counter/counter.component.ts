import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  count = 0;

  constructor(private cdr: ChangeDetectorRef) { 
    setTimeout(() => {
      this.count = 5;
      this.cdr.detectChanges();
    }, 1000);

    // setInterval(() => this.count = 6, 100);

    // Promise.resolve().then(() => this.count = 7);
  }

  ngOnInit(): void {
  }
  
  add() {
    this.count++;
  }
}
