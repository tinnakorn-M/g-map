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
  min_rssi;
  max_rssi;
  min_snr;
  max_snr;
  maxdistanceGW1;
  maxdistanceGW2;

  cities1: SelectItem[];

  cities2: City[];

  selectedCity1: City;

  selectedCity2: City;

  team = "background-color: rgb(148, 253, 10);";
  dataColor = "dataColor";
  colorCard = "bg-light";
  colortextCard = "";
  backgroundColor = "bg-light";
  backgrountextdColor = "";

  constructor(private http: HttpClient) {} 

  async ngOnInit() {
    var item = JSON.parse(sessionStorage.getItem('info'));
    // console.log(item);
    if(item != null){
      this.mean_latitude = item.latitude;
      this.mean_longitude = item.longitude;
      this.mean_rssi = item.rssi;
      this.mean_snr = item.snr;
      this.mean_frequency = item.frequency;
      this.mean_time = item.time;
      this.distanceGW1 = item.distanceGW1;
      this.distanceGW2 = item.distanceGW2;
      this.fromgateway = item.fromgateway;

      this.min_rssi = item.min_rssi;
      this.max_rssi = item.max_rssi;
      this.min_snr = item.min_snr;
      this.max_snr = item.max_snr;

      this.maxdistanceGW1 = item.maxdistanceGW1;
      this.maxdistanceGW2 = item.maxdistanceGW2;
    }
    
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  light(event){
    this.colorCard = "bg-light";
    this.colortextCard = "";
  }
  dark(event){
    this.colorCard = "bg-dark";
    this.colortextCard = "text-white";
  }
  primary(event){
    this.colorCard = "bg-primary";
    this.colortextCard = "text-white";
  }
  secondary(event){
    this.colorCard = "bg-secondary";
    this.colortextCard = "text-white";
  }
  success(event){
    this.colorCard = "bg-success";
    this.colortextCard = "text-white";
  }
  danger(event){
    this.colorCard = "bg-danger";
    this.colortextCard = "text-white";
  }
  warning(event){
    this.colorCard = "bg-warning";
    this.colortextCard = "text-white";
  }
  info(event){
    this.colorCard = "bg-info";
    this.colortextCard = "text-white";
  }

  backgroundlight(event){
    this.backgroundColor = "bg-light";
    this.backgrountextdColor = "";
  }
  backgrounddark(event){
    this.backgroundColor = "bg-dark";
    this.backgrountextdColor = "text-white";
  }
  backgroundprimary(event){
    this.backgroundColor = "bg-primary";
    this.backgrountextdColor = "text-white";
  }
  backgroundsecondary(event){
    this.backgroundColor = "bg-secondary";
    this.backgrountextdColor = "text-white";
  }
  backgroundsuccess(event){
    this.backgroundColor = "bg-success";
    this.backgrountextdColor = "text-white";
  }
  backgrounddanger(event){
    this.backgroundColor = "bg-danger";
    this.backgrountextdColor = "text-white";
  }
  backgroundwarning(event){
    this.backgroundColor = "bg-warning";
    this.backgrountextdColor = "text-white";
  }
  backgroundinfo(event){
    this.backgroundColor = "bg-info";
    this.backgrountextdColor = "text-white";
  }

}
