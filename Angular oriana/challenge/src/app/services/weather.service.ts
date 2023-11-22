import { ICityWeather } from './../models/IWeatherData.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { IWeatherRawData } from '../models/IWeatherRawData.interface';
import { ISearchResult, IWeatherData } from '../models/IWeatherData.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com';
  cityWeatherData: IWeatherData;

  searchLocation(term): Observable<ISearchResult[]> {
    /*
      CHALLANGE
       - get list of cities based on the searched string
       sample url: baseUrl/api/location/search/?query=paris
    */
    const searchLocationUrl = this.baseUrl + '/api/location/search/?query=' + term;
    return this.http.get<ISearchResult[]>(searchLocationUrl);
  }

  getCityDetails(woeid): Observable<IWeatherData> {
    /*
      woeid is the city id(number).
      you can use below sample url to fetch the city weather details
      sample url : baseUrl/api/location/111111
    */
    const cityUrl = this.baseUrl + '/api/location/' + woeid;
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Methods': 'GET'
    });

    var citySub = this.http.get<IWeatherRawData>(cityUrl, {headers: headers});
    citySub.subscribe(data => {
      this.cityWeatherData = this.transformRawData(data);      
    });

    const mockCityDetails: IWeatherRawData = {
      consolidated_weather: [
          {
              weather_state_name: 'state',
              weather_state_abbr: 'cloudy',
              applicable_date: '2018-08-03',
              the_temp: 29,
          }
      ],
      parent: {
          title: 'country',
      },
      title: 'title',
    };
    const transformedCityDetails = this.transformRawData(mockCityDetails);
    /*
      CHALLENGE
       - fetch the city weather data
       - transform the received data to required "IWeatherData" format using transformRawData() func
    */
   return of(transformedCityDetails);
  }

  transformRawData(rawData: IWeatherRawData) {
    const transformedWeather: Array<ICityWeather> = [];

    rawData.consolidated_weather.forEach(function() {

      transformedWeather.push({ } as ICityWeather);
    });

    return {
      city: rawData.title,
      country: '',
      weather: [],
    };
  }
}
