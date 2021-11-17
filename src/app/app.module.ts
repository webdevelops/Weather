import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { Weather7daysComponent } from './weather7days/weather7days.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { ChangeDetectionComponent } from './test/change-detection/change-detection.component';
import { HelloComponent } from './test/change-detection/hello/hello.component';
import { TooltipComponent } from './test/change-detection/tooltip/tooltip.component';
import { CounterComponent } from './test/change-detection/counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    Weather7daysComponent,
    SearchComponent,
    MeasurementComponent,
    ChangeDetectionComponent,
    HelloComponent,
    TooltipComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
