import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-weather7days',
  templateUrl: './weather7days.component.html',
  styleUrls: ['./weather7days.component.scss']
})
export class Weather7daysComponent implements OnInit {
  currentPosition: any;
  days: any;
  hourly: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService
      .getWeather7days('London', 'celsius')
      .pipe(first())
      .subscribe((result: any) => {
        console.log('result in component:', result);
        this.days = result;
        this.currentPosition = result[0];
      });
  }

  togglePosition(position: string): void {
    this.currentPosition = position;
  }
}
