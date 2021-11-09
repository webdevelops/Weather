import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  weatherForm!: FormGroup;
  weatherSubscribtiob?: Subscription;
  data: any;
  description = '';
  windDerection = '';
  visibility = '';
  temp = 0;
  temp_min = 0;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const city = this.weatherForm.controls['city'].value;

    this.weatherSubscribtiob = this.weatherService
      .getWeather(city)
      .subscribe(data => {
        this.data = data;
        this.transformData(data);
        // console.log('data', data);
      });
  }

  transformData(data: any): void {
    this.description = data.weather[0].description;
    this.description = this.description[0].toUpperCase() + this.description.slice(1);
    this.visibility = (data.visibility / 1000).toFixed(1);
    this.temp = Math.round(data.main.temp);
    this.temp_min = Math.round(data.main.temp_min);
    
    const deg = data.wind.deg;
    switch (true) {
      case deg < 10:
        this.windDerection = 'N';
        break;
      case deg < 80:
        this.windDerection = 'NE';
        break;
      case deg < 100:
        this.windDerection = 'E';
        break;
      case deg < 170:
        this.windDerection = 'SE';
        break;
      case deg < 190:
        this.windDerection = 'S';
        break;
      case deg < 260:
        this.windDerection = 'SW';
        break;
      case deg < 280:
        this.windDerection = 'W';
        break;
      case deg < 350:
        this.windDerection = 'NW';
        break;
      default:
        this.windDerection = 'N';
    }
  }

  ngOnDestroy(): void {
    this.weatherSubscribtiob?.unsubscribe();
  }
 }