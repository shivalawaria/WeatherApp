import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(): Observable<any> {
    let url = "https://api.openweathermap.org/data/2.5/group?id=4350049,5128581,5391959,4887398&appid=3503d3f1622aaed612397c1e7032effc";
    return this.http.get(url);
  }
}
