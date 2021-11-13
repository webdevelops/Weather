import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { Weather7daysComponent } from './weather7days/weather7days.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    Weather7daysComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  exports: [MatTabsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
