import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SelectItem} from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  latitude = 16.240584;
  longitude = 103.2569;
  mean_latitude;
  mean_longitude;
  mean_rssi;
  mean_snr;
  mean_frequency;
  mean_time;
  distanceGW1;
  distanceGW2;
  fromgateway;

  cities1: SelectItem[];

  cities2: City[];

  selectedCity1: City;

  selectedCity2: City;

  team = "team";
  dataColor = "dataColor";

  constructor(private http: HttpClient) {
    this.cities1 = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
  ];

  //An array of cities
  this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
   } 

  async ngOnInit() {
    let info;
    var item = JSON.parse(localStorage.getItem(info));
    // console.log(item);

    this.mean_latitude = item.latitude;
    this.mean_longitude = item.longitude;
    this.mean_rssi = item.rssi;
    this.mean_snr = item.snr;
    this.mean_frequency = item.frequency;
    this.mean_time = item.time;
    this.distanceGW1 = item.distanceGW1;
    this.distanceGW2 = item.distanceGW2;
    this.fromgateway = item.fromgateway;

  }
  setting(){
    this.team = "team1";
    this.dataColor = "dataColor1";
  }

}
