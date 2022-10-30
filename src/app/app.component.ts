import { Component } from '@angular/core';

// part_1

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openWeather';
  isDay = false;
  is5Days = true;

  // update_1 continue from test_1
}
