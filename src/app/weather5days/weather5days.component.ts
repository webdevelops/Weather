import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { WeatherService } from '../core/services/weather.service';

@Component({
  selector: 'app-weather5days',
  templateUrl: './weather5days.component.html',
  styleUrls: ['./weather5days.component.scss']
})
export class Weather5daysComponent implements OnInit {
  currentPosition = 1;
  days: any;
  hourly: any;
  city = 'Rivne';
  isDayOfRest = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getData(this.city, 'celsius');
  }

  getWeatherBySity(city: string): void {
    this.city = city; 
    this.getData(city, 'celsius');
  }

  getData(city: string, unit: string): void {
    this.weatherService
      .getWeather5days(city, unit)
      .pipe(first())
      .subscribe((result: any) => {
        // console.log('result in component:', result);
        this.days = result;
        this.isDayOfRest = result.weekDay === 'Saturday' || result.weekDay === 'Sunday';
      });
  }

  togglePosition(position: any): void {
    this.currentPosition = position;
  }

  setMeasurement(unit: string): void {
    this.getData(this.city, unit);
  }
}
