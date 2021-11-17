import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit {
  @Input() config: any;

  get runChangeDetection() {
    console.log('Checking "tooltip" view');
    return true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
