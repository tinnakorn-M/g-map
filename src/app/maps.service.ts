import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location {
  latitude: string;
  longitude: string;
}
@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() {
    console.log('TIN');
    return this.http.get<Location>('https://ipapi.co/json/');
  }
}
