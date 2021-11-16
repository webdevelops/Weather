import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { WeatherService } from '../core/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherForm!: FormGroup;
  data: any;
  description = '';
  windDerection = '';
  visibility = '';
  temp = 0;
  temp_min = 0;
  isCelsius = true;
  currentData = new Date();

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getData(this.weatherForm.get('city')?.value, 'celsius');
  }

  initForm(): void {
    this.weatherForm = this.fb.group({
      city: ['London', [Validators.required, Validators.minLength(3)]]
    });
  }

  getWeatherBySity(city: any): void {
    this.getData(city, 'celsius');
  }
 
  getData(city: string, unit: string): void {
    this.weatherService
      .getWeather(city, unit)
      .pipe(first())
      .subscribe(data => {
        this.data = this.weatherService.transformOneDayData(data, unit);
      });
  }

  setMeasurement(unit: string): void {
    this.getData(this.weatherForm.get('city')?.value, unit);
  }
 }
