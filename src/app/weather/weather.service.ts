import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  key = 'd4e19a8d70d9803f85089ec38cd99717';
  measurement = 'metric';
  isMetric = false;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.weatherUrl}?q=${city}&units=${this.measurement}&appid=${this.key}`;
    
    return this.http.get(url);
  }
}
