import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { WeatherService } from '../core/services/weather.service';

@Component({
  selector: 'app-weather7days',
  templateUrl: './weather7days.component.html',
  styleUrls: ['./weather7days.component.scss']
})
export class Weather7daysComponent implements OnInit {
  currentPosition = 1;
  days: any;
  hourly: any;
  city = 'London';

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
      .getWeather7days(city, unit)
      .pipe(first())
      .subscribe((result: any) => {
        console.log('result in component:', result);
        this.days = result;
      });
  }

  togglePosition(position: any): void {
    this.currentPosition = position;
    // this.getData(position.city);
  }

  setMeasurement(unit: string): void {
    this.getData(this.city, unit);
  }
}
