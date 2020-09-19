import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { } 

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

  }

}
