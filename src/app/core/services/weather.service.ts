import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { get } from 'lodash';

import { Derection, weekDays, months, iconUrl, imageUrl, weatherUrl, weather7daysUrl, key, accuUrl, iconAccuUrl } from '../data/weather.data';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  days: any;

  getWeather(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';
    const url = `${weatherUrl}?q=${city}&units=${currentUnit}&appid=${key}`;

    return this.http.get(url);
  }

  getWeather5days(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';
    
    return this.http
      .get(accuUrl)
      .pipe(
        map((result: any) => {
          // console.log('result - 5days', result.DailyForecasts);
          return result.DailyForecasts.map((day: any, idx: number) => {
            const iconDay = get(day, 'Day.Icon');
            const iconNight = get(day, 'Night.Icon');
            const iconNumber = iconDay < 10 ? '0' + iconDay : iconDay;
            const iconNumberNight = iconNight < 10 ? '0' + iconNight : iconNight;

              return {
                city: city,
                position: 1 + idx,
                date: new Date(get(day, 'Date')).getDate(),
                weekDay: weekDays[new Date(get(day, 'Date')).getDay()],
                month: months[new Date(get(day, 'Date')).getMonth()],
                iconUrl: iconAccuUrl + iconNumber + '-s.png',
                iconUrlNight: iconAccuUrl + iconNumberNight + '-s.png',
                minTemp: Math.round(get(day, 'Temperature.Minimum.Value')),
                maxTemp: Math.round(get(day, 'Temperature.Maximum.Value')),
                realFeelMinTemp: Math.round(get(day, 'RealFeelTemperature.Minimum.Value')),
                realFeelMaxTemp: Math.round(get(day, 'RealFeelTemperature.Maximum.Value')),
                cloudCoverNight: get(day, 'Night.CloudCover'),
                cloudCoverDay: get(day, 'Day.CloudCover'),
                rainProbabilityNight: get(day, 'Night.RainProbability'),
                rainProbabilityDay: get(day, 'Day.RainProbability'),
                snowProbabilityNight: get(day, 'Night.SnowProbability'),
                snowProbabilityDay: get(day, 'Day.SnowProbability'),
                windNight: get(day, 'Night.Wind.Speed.Value'),
                windDay: get(day, 'Day.Wind.Speed.Value'),
                sunRise: new Date(get(day, 'Sun.Rise')),
                sunSet: new Date(get(day, 'Sun.Set')),
                sunRiseUrl: iconAccuUrl + '01-s.png'
              }
            })
          })
        );
  }

  getWeather7days(city: string, unit: string): Observable<any> {
    const currentUnit = unit === 'celsius' ? 'metric' : 'imperial';

    return this
      .getWeather(city, unit)
      .pipe(
        switchMap(({coord}) => {
          const url = 
            `${weather7daysUrl}?lat=${coord.lat}&lon=${coord.lon}&units=${currentUnit}&exclude='minutely'&appid=${key}`;

          return this.http
            .get(url)
            .pipe(
              map((data: any) => {
                // console.log('response by coordinates:', data)
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
        // dayNumber: new Date(get(day, 'dt')).getDate(),
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
