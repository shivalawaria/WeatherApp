import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  weatherData;
  filterData = [];
  showData;
  timer: number;
  index = 1;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherDetails();
  }

  getWeatherDetails() {
    this.weatherService.getWeatherData().subscribe(response => {

      this.weatherData = response;
      this.weatherData.list.forEach(item => {
        item.main.temp = this.convertKelvinToCelcius(item.main.temp);
        this.filterData.push({
          'name': item.name,
          'temperature': item.main.temp,
        });
      });
      this.initialValue();
      this.timer = setInterval(() => {
        if (this.index < this.filterData.length) {
          this.showData = this.filterData[this.index];
          this.index++;
          console.log(this.showData);
        } else if (this.index == this.filterData.length) {
          this.initialValue();
          this.index = 1;
        } else {
          clearInterval(this.timer);
        }
      }, 10000);
    });
  }

  initialValue() {
    this.showData = this.filterData[0];
  }

  convertKelvinToCelcius(val) {
    return (val - 273.15).toFixed(0);
  }
}
