import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Derection, weekDays, months, iconUrl, imageUrl, weatherUrl, weather7daysUrl, key } from '../data/weather.data';

const get = require('lodash/get');

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeather(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';
    const url = `${weatherUrl}?q=${city}&units=${currentUnit}&appid=${key}`;

    return this.http.get(url);
  }

  getWeather7days(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';

    return this
      .getWeather(city, unit)
      .pipe(
        switchMap(({coord}) => {
          const url = 
            `${weather7daysUrl}?lat=${coord.lat}&lon=${coord.lon}&units=${currentUnit}&exclude=${'minutely'}&appid=${key}`;

          return this.http
            .get(url)
            .pipe(
              map((data: any) => {
                console.log('response by coordinates:', data)
                return this.transformDailyData(data, city, unit);
              })
            );
        })
      )
  }

  transformDailyData(data: any, city: string, unit: string): any {
    const days = get(data, 'daily').slice(0, -1);
    const hourly = this.transormHourlyData(data);

    return days.map((day: any, idx: number) => {
      return {
        position: 1 + idx,
        // weekDay: weekDays[new Date(day.dt).getDay()],
        weekDay: weekDays[idx],
        // dayNumber: new Date(day.dt).getDate(),
        dayNumber: 20 + idx,
        measurement: unit,
        month: months[new Date(get(day, 'dt')).getMonth()],
        minTemp: Math.round(get(day, 'temp.min')),
        maxTemp: Math.round(get(day, 'temp.max')),
        weather: get(day, 'weather[0].description'),
        iconUrl: iconUrl + get(day, 'weather[0].icon') + '@2x.png',
        imageUrl: imageUrl + idx + '00.jpg',
        city: city,
        hourly: hourly
      }
    })
  }

  transormHourlyData(data: any): any {
    const periods = [2, 5, 8, 11, 14, 17, 20, 23];
    let time = 0;

    return data.hourly
      .filter((hour: any, idx: number) => periods.includes(idx))
      .map((hour: any, idx: number) => {
        time = idx === 0 ? 2 : time + 3;
        const period = (time > 5 && time < 17) ? 'd' : 'n';

        return {
          time: time,
          iconUrl: iconUrl + get(hour, 'weather[0].icon').slice(0, -1) + period + '@2x.png',
          // sinopticIconUrl: imageUrl + p + (idx - 1) + '00.jpg',
          temp: Math.round(get(hour, 'temp')),
          feelsLike: Math.round(get(hour, 'feels_like')),
          pressure: get(hour, 'pressure'),
          humidity: get(hour, 'humidity'),
          windDeg: get(hour, 'wind_deg'),
          windSpeed: Number(get(hour, 'wind_speed')).toFixed(1)
        }
      })
  }

  transformOneDayData(data: any, unit: string): void {
    // let description = data.weather[0].description;
    // const visibility = (data.visibility / 1000).toFixed(1);
    let description = get(data, 'weather[0].description');
    description = description[0].toUpperCase() + description.slice(1);
    const visibility = (get(data, 'visibility') / 1000).toFixed(1);
    const temp = Math.round(get(data, 'main.temp'));
    const temp_min = Math.round(get(data, 'main.temp_min'));
    let windDerection = '';

    const deg = get(data, 'wind.deg');
    switch (true) {
      case deg < 10:
        windDerection = Derection.North;
        break;
      case deg < 80:
        windDerection = Derection.NorthEast;
        break;
      case deg < 100:
        windDerection = Derection.East;
        break;
      case deg < 170:
        windDerection = Derection.SouthEast;
        break;
      case deg < 190:
        windDerection = Derection.South;
        break;
      case deg < 260:
        windDerection = Derection.SouthWest;
        break;
      case deg < 280:
        windDerection = Derection.West;
        break;
      case deg < 350:
        windDerection = Derection.NorthWest;
        break;
      default:
        windDerection = Derection.North;
    }

    data.measurement = unit;
    data.description = description;
    data.visibility = visibility;
    data.temp = temp;
    data.temp_min = temp_min;
    data.windDerection = windDerection;
    
    return data;
  }
}
