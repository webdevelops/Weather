import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
  weather7daysUrl = 'https://api.openweathermap.org/data/2.5/onecall';

  key = 'd4e19a8d70d9803f85089ec38cd99717';

  constructor(private http: HttpClient) { }

  getWeather(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';
    const weatherUrl = `${this.weatherUrl}?q=${city}&units=${currentUnit}&appid=${this.key}`;

    return this.http.get(weatherUrl);
  }

  getWeather7days(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';

    return this
      .getWeather(city, unit)
      .pipe(
        switchMap(({coord}) => {
          const weather7daysUrl = 
            `${this.weather7daysUrl}?lat=${coord.lat}&lon=${coord.lon}&units=${currentUnit}&exclude=${'minutely'}&appid=${this.key}`;

          return this.http
            .get(weather7daysUrl)
            .pipe(
              map((data: any) => {
                console.log('response by coordinates:', data)
                return this.transformDailyData(data);
              })
            );
        })
      )
  }

  transformDailyData(data: any): any {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const iconUrl = 'http://openweathermap.org/img/wn/';
    const imageUrl = 'https://sinst.fwdcdn.com/img/weatherImg/b/d';
    const days = data.daily.slice(0, -1);
    const hourly = this.transormHourlyData(data);

    return days.map((day: any, idx: number) => {
      return {
        // weekDay: weekDays[new Date(day.dt).getDay()],
        weekDay: weekDays[idx],
        // dayNumber: new Date(day.dt).getDate(),
        dayNumber: 20 + idx,
        month: months[new Date(day.dt).getMonth()],
        minTemp: Math.round(day.temp.min),
        maxTemp: Math.round(day.temp.max),
        weather: day.weather[0].description,
        iconUrl: iconUrl + day.weather[0].icon + '@2x.png',
        imageUrl: imageUrl + idx + '00.jpg',
        hourly: hourly
      }
    })
  }

  transormHourlyData(data: any): any {
    const iconUrl = 'http://openweathermap.org/img/wn/';
    const periods = [2, 5, 8, 11, 14, 17, 20, 23];
    let time = 0;

    return data.hourly
      .filter((hour: any, idx: number) => periods.includes(idx))
      .map((hour: any, idx: number) => {
        time = idx === 0 ? 2 : time + 3;

        return {
          time: time,
          iconUrl: iconUrl + hour.weather[0].icon + '@2x.png',
          temp: Math.round(hour.temp),
          feelsLike: Math.round(hour.feels_like),
          pressure: hour.pressure,
          humidity: hour.humidity,
          windDeg: hour.wind_deg,
          windSpeed: Number(hour.wind_speed).toFixed(1)
        }
      })
  }
}
