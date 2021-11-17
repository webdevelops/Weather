import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openWeather';
  isDay = false;

  // ------- change detection
  // get Check() {
  //   console.log('check in app.component');
  //   return true;
  // }

  toggleDays(): void {
    this.isDay = !this.isDay;
  }
}
