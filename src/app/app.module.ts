import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { Weather7daysComponent } from './weather7days/weather7days.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { Weather5daysComponent } from './weather5days/weather5days.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    Weather5daysComponent,
    Weather7daysComponent,
    SearchComponent,
    MeasurementComponent
  ],
  imports: [
    CommonModule,
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
