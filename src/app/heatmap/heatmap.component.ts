import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  // 16.240584
  // 103.2569
  lat = 16.240652812500006;
  lng = 103.25703583333335;
  zoom = 18;
  latitude: any;
  longitude: any;
  location: any;
  
  alldata;
  lati;
  longi;
  frequency;
  rssi;
  snr;

  public map: google.maps.Map;
  public heatmap: google.maps.visualization.HeatmapLayer; 


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  BT_Test_Mean(){
    this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
    .subscribe(data => {

    },error => {
      console.log(error);
    });
  }
  async BT_Test_Location(){
    await this.http.get<[]>('http://202.28.34.197/LoRaTracker/location')
    .subscribe(data => {
      for (let index = 1; index < data.length; index++) {
        this.lati = data[index]['latitude'];
        this.longi = data[index]['longitude'];
        this.frequency = data[index]['frequency'];
        this.rssi = data[index]['rssi'];
        this.snr = data[index]['snr'];

        console.log(this.lati);
        console.log(this.longi);
        console.log(this.frequency);
        console.log(this.rssi);
        console.log(this.snr);
      }
    },error => {
      console.log(error);
    });
  }
  async onChoseLocation(event){
    let latitude = event.coords.lat;
    let longitude = event.coords.lng;

    let response = await this.http
      .get('http://202.28.34.197/LoRaTracker/meanLocation/'+JSON.stringify(latitude)+'/'+JSON.stringify(longitude)+'/'+JSON.stringify(0.00005)).toPromise();

    let mean_latitude = response[0]['latitude'];
    let mean_longitude = response[0]['longitude'];
    let mean_rssi = response[0]['rssi'];
    let mean_snr = response[0]['snr'];
    let mean_frequency = response[0]['frequency'];
    let mean_time = response[0]['time'];

    moment.locale('EN');    
    let date = moment(mean_time).format('L'), time= moment(mean_time).format('LTS');
    let Date_Time = date+" "+time;
    
    console.log(Date_Time);

    let info;
    let locals = {latitude : mean_latitude, longitude : mean_longitude, rssi : mean_rssi, snr : mean_snr,
                  frequency : mean_frequency, time : Date_Time};
    localStorage.setItem(info, JSON.stringify(locals));
    let item = JSON.parse(localStorage.getItem(info));
    console.log(item);
  }

  async onLoadHeatmap(LatLng){
    var gradient = [
      'rgba(0, 0, 0, 0)', // white
      'rgba(0, 255, 0, 255)', // green
      'rgba(255, 255, 0, 255)',  // yellow
      'rgba(255,0,0,1)', 
    ]
    let response = await this.http.get<[]>('http://202.28.34.197/LoRaTracker/location').toPromise();

      for (let index = 40; index < 50; index++) {
        let lati = response[index]['latitude'];
        let longi = response[index]['longitude'];
        let frequency = response[index]['frequency'];
        let rssi = response[index]['rssi'];
        let snr = response[index]['snr'];

        // console.log(this.lati);
        // console.log(this.longi);
        // console.log(this.frequency);
        // console.log(this.rssi);
        // console.log(this.snr);
        if(Math.abs(rssi) > 90){
          this.rssi = 30;
        }else if(Math.abs(rssi) > 800){
          this.rssi = 40;
        }else if(Math.abs(rssi) > 70){
          this.rssi = 50;
        }else if(Math.abs(rssi) > 60){
          this.rssi = 60;
        }else if(Math.abs(rssi) > 50){
          this.rssi = 70;
        }else if(Math.abs(rssi) > 40){
          this.rssi = 10;
        }else if(Math.abs(rssi) > 30){
          this.rssi = 90;
        }else if(Math.abs(rssi) > 20){
          this.rssi = 100;
        }else if(Math.abs(rssi) > 10){
          this.rssi = 110;
        }else{
          this.rssi = 120;
        }
        console.log('rssi = ',rssi);
        LatLng = [
          {location: new google.maps.LatLng(lati, longi),weight:Math.abs(rssi)}
        ];
        // console.log(LatLng);
        this.heatmap = new google.maps.visualization.HeatmapLayer({
          map: this.map,
          data: LatLng
        });
        // console.log(this.heatmap);
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.9);
        this.heatmap.set('dissipating', this.heatmap.get('dissipating') ? null : true);
        this.heatmap.set('maxIntensity', this.heatmap.get('maxIntensity') ? null : 0);
      }
      console.log('success');
    
  }

  async onMapLoad(mapInstance:  google.maps.Map,LatLng) {
    this.map = mapInstance;
    this.map.setCenter(new google.maps.LatLng(16.240584, 103.2569));
  }

}
