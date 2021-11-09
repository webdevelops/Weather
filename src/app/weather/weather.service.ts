import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  key = 'd4e19a8d70d9803f85089ec38cd99717';

  constructor(private http: HttpClient) { }

  getWeather(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';
    const url = `${this.weatherUrl}?q=${city}&units=${currentUnit}&appid=${this.key}`;
    console.log('unit', unit);

    return this.http.get(url);
  }
}
