import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { MapsService } from '../maps.service';


@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  title = "Tracker";

  latCenter = 16.240381219382527;
  lngCenter = 103.25696643137027;
  zoom = 16;
  make_lat;
  make_long;

  mean_latitude;
  mean_longitude;
  mean_rssi;
  mean_snr;
  mean_frequency;
  mean_time;
  distanceGW1;
  distanceGW2;
  fromgateway;
  sf = 7;

  public map: google.maps.Map;
  public heatmap: google.maps.visualization.HeatmapLayer; 

  constructor(private http: HttpClient, private maps: MapsService) { }

  ngOnInit() {
    // this.maps.getLocation().subscribe(data => {
    //   console.log(data);
    //   this.latCenter = data.latitude;
    //   this.lngCenter = data.longitude;
    // });

    // if(!navigator.geolocation){
    //   console.log('location is not supported');
    // }
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position);
    //   this.latCenter = position.coords.latitude;
    //   this.lngCenter = position.coords.longitude;
    // });
  }

  
  async onChoseLocation(event){
    this.make_lat = event.coords.lat;
    this.make_long = event.coords.lng;
    this.mean_latitude = this.make_lat.toFixed(6);
    this.mean_longitude = this.make_long.toFixed(6);
    var url = 'http://202.28.34.197/LoRaTracker/SmartMeanLocation/16.240449/103.256952/16.2466187/103.2521929/'+
      JSON.stringify(this.make_lat)+'/'+JSON.stringify(this.make_long)+'/'+JSON.stringify(this.sf)+'/'+JSON.stringify(10);
    let response = await this.http.get(url).toPromise();
    console.log(url);
    if(response){
      this.mean_rssi = response[0]['rssi'];
      this.mean_snr = response[0]['snr'];

      let max_rssi = response[0]['max_rssi'];
      let min_rssi = response[0]['min_rssi'];
      let max_snr = response[0]['max_snr'];
      let min_snr = response[0]['min_snr'];
      let maxdistanceGW1 = response[0]['maxdistanceGW1'];
      let maxdistanceGW2 = response[0]['maxdistanceGW2'];
      this.mean_frequency = response[0]['frequency'];
      this.mean_time = response[0]['time'];
      this.distanceGW1 = response[0]['distanceGW1'];
      this.distanceGW2 = response[0]['distanceGW2'];
      this.fromgateway = response[0]['fromgateway'];

      let locals = {latitude : this.mean_latitude, longitude : this.mean_longitude, rssi : this.mean_rssi, snr : this.mean_snr, 
                    frequency : this.mean_frequency, time : this.mean_time, distanceGW1 : this.distanceGW1, distanceGW2 : this.distanceGW2, 
                    fromgateway : this.fromgateway, min_rssi : min_rssi, max_rssi : max_rssi, min_snr : min_snr, max_snr : max_snr, 
                    maxdistanceGW1 : maxdistanceGW1.toFixed(2), maxdistanceGW2 : maxdistanceGW2.toFixed(2)};
      sessionStorage.setItem('info', JSON.stringify(locals)); // เก็บข้อมูลในตัวแปล locals ลงในsession
    }
  }

  zoomChange(z){
    this.zoom = z;
    if(this.zoom > 15){
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : this.zoom+5); // รัศมี
    }else{
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : this.zoom-5); // รัศมี
    }
    // console.log('heatmap ',this.heatmap);
    // console.log(z);
  }

  myLocation(){
    if(!navigator.geolocation){
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      this.zoom = 15;
    });
  }

  async sf7(){
    this.sf = 7;
    this.toggleHeatmap();
    await this.SmartLocation();
  }
  async sf9(){
    this.sf = 9;
    this.toggleHeatmap();
    await this.SmartLocation();
  }
  async sf12(){
    this.sf = 12;
    this.toggleHeatmap();
    await this.SmartLocation();
  }
  async Allsf(){
    this.sf = 1;
    this.toggleHeatmap();
    await this.SmartLocation();
  }
  toggleHeatmap() {
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }
  
  async SmartLocation(){
    let response = await this.http.get<[]>('http://202.28.34.197/LoRaTracker/SmartLocation/'+JSON.stringify(this.sf)+'/'+JSON.stringify(10)).toPromise();
    let LatLng = [];
    for (let index in response) {
      LatLng.push({location: new google.maps.LatLng(response[index]['latitude'], response[index]['longitude']),weight:Math.abs(response[index]['rssi_p'])});
    }
    this.heatmap = new google.maps.visualization.HeatmapLayer({         
      map: this.map,
      data: LatLng
    });
    var gradient = [
      'rgba(0, 0, 0, 0)', // white
      'rgba(0, 255, 0, 255)', // green
      'rgba(255, 255, 0, 255)',  // yellow
      'rgba(255,0,0,1)', // red
    ]
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient) // ไล่ระดับสี
    this.heatmap.set('radius', this.heatmap.get('radius') ? null : this.zoom); // รัศมี
    this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 1); // ความทึบ
    this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true); // ทำให้กระจายตัว
    this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 80); // ความเข้มสูงสุด 
  }

  async onMapLoad(mapInstance:  google.maps.Map) {
    this.map = mapInstance;
    // this.map.setCenter(new google.maps.LatLng(this.latCenter, this.lngCenter)); //16.246261 103.252502
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('myLocation'));
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('home'));
    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('changSF'));

    await this.SmartLocation();
  }
}
