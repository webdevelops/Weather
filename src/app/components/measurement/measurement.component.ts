import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {
  @Input() measurement?: string;
  @Output() sendMeasurement: EventEmitter<string> = new EventEmitter();
  isCelsius?: boolean;

  constructor() { }

  ngOnInit(): void { 
    this.isCelsius = this.measurement === 'celsius';
  }

  setMeasurement(unit: string): void {
    this.sendMeasurement.emit(unit);
    this.isCelsius = unit === 'celsius';
  }
}
