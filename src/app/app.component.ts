import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openWeather';
  isDay = false;

  toggleDays(): void {
    this.isDay = !this.isDay;
  }
}
